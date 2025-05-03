import React, { useState } from 'react';
import { Incident, FilterValue, SortDirection } from '../types/incident';
import IncidentList from './IncidentList';
import IncidentFilters from './IncidentFilters';
import IncidentForm from './IncidentForm';
import { mockIncidents } from '../data/mockIncidents';
import { AlertTriangle, Plus, X } from 'lucide-react';

const IncidentDashboard: React.FC = () => {
  // State for incident data
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  
  // State for filters and sorting
  const [filter, setFilter] = useState<FilterValue>('All');
  const [sortDirection, setSortDirection] = useState<SortDirection>('newest');
  
  // State for form visibility
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  // Handle adding a new incident
  const handleAddIncident = (newIncident: Omit<Incident, 'id' | 'reported_at'>) => {
    const now = new Date();
    
    const incident: Incident = {
      ...newIncident,
      id: Math.max(...incidents.map(i => i.id), 0) + 1,
      reported_at: now.toISOString()
    };
    
    setIncidents([...incidents, incident]);
    setIsFormVisible(false);
    
    // After adding, scroll to the top of the list if it's sorted by newest
    if (sortDirection === 'newest') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Count incidents by severity
  const highCount = incidents.filter(i => i.severity === 'High').length;
  const mediumCount = incidents.filter(i => i.severity === 'Medium').length;
  const lowCount = incidents.filter(i => i.severity === 'Low').length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Safety Incident Dashboard</h1>
          <button
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="flex items-center justify-center px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors duration-150"
          >
            {isFormVisible ? (
              <>
                <X size={16} className="mr-1.5" />
                <span>Cancel Report</span>
              </>
            ) : (
              <>
                <Plus size={16} className="mr-1.5" />
                <span>Report New Incident</span>
              </>
            )}
          </button>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mt-4">
          <div className="flex items-start">
            <AlertTriangle size={18} className="text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-800">
                This dashboard shows AI safety incidents reported across our systems. 
                Track, filter, and report new incidents as they occur.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2">
                <span className="text-xs text-gray-600">Total: {incidents.length}</span>
                <span className="text-xs text-red-600">High: {highCount}</span>
                <span className="text-xs text-yellow-600">Medium: {mediumCount}</span>
                <span className="text-xs text-blue-600">Low: {lowCount}</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {isFormVisible && (
        <div className="mb-8 animate-[fadeIn_0.2s_ease-in-out]">
          <IncidentForm onSubmit={handleAddIncident} />
        </div>
      )}
      
      <main>
        <IncidentFilters
          currentFilter={filter}
          setFilter={setFilter}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
        
        <IncidentList
          incidents={incidents}
          filter={filter}
          sortDirection={sortDirection}
        />
      </main>
    </div>
  );
};

export default IncidentDashboard;