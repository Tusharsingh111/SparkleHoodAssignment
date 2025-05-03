import React, { useState } from 'react';
import { Incident, Severity } from '../types/incident';
import { AlertCircle } from 'lucide-react';

interface IncidentFormProps {
  onSubmit: (incident: Omit<Incident, 'id' | 'reported_at'>) => void;
}

const IncidentForm: React.FC<IncidentFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<Severity>('Medium');
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const newErrors: {
      title?: string;
      description?: string;
    } = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Clear any existing errors
    setErrors({});
    
    // Submit the new incident
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      severity
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setSeverity('Medium');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Report New Incident</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-3 py-2 border ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Concise title describing the incident"
          />
          {errors.title && (
            <div className="mt-1 flex items-center text-sm text-red-600">
              <AlertCircle size={14} className="mr-1" />
              {errors.title}
            </div>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className={`w-full px-3 py-2 border ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Detailed description of what happened and potential impact"
          />
          {errors.description && (
            <div className="mt-1 flex items-center text-sm text-red-600">
              <AlertCircle size={14} className="mr-1" />
              {errors.description}
            </div>
          )}
        </div>
        
        <div className="mb-5">
          <span className="block text-sm font-medium text-gray-700 mb-1">
            Severity <span className="text-red-500">*</span>
          </span>
          <div className="flex gap-4">
            {(['Low', 'Medium', 'High'] as Severity[]).map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name="severity"
                  value={option}
                  checked={severity === option}
                  onChange={() => setSeverity(option)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full sm:w-auto px-5 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150"
        >
          Submit Incident Report
        </button>
      </form>
    </div>
  );
};

export default IncidentForm;