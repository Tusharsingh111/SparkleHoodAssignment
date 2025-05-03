import React from 'react';
import { FilterValue, SortDirection } from '../types/incident';
import { ArrowDownAZ, ArrowUpAZ } from 'lucide-react';

interface IncidentFiltersProps {
  currentFilter: FilterValue;
  setFilter: (filter: FilterValue) => void;
  sortDirection: SortDirection;
  setSortDirection: (direction: SortDirection) => void;
}

const IncidentFilters: React.FC<IncidentFiltersProps> = ({ 
  currentFilter, 
  setFilter, 
  sortDirection, 
  setSortDirection 
}) => {
  const filterOptions: FilterValue[] = ['All', 'Low', 'Medium', 'High'];
  
  return (
    <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium text-gray-700 self-center">Filter by severity:</span>
        <div className="flex gap-2">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 ${
                currentFilter === option
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Sort by date:</span>
        <div className="flex rounded-md overflow-hidden border border-gray-200">
          <button
            onClick={() => setSortDirection('newest')}
            className={`px-3 py-1.5 flex items-center gap-1 text-sm font-medium transition-colors duration-150 ${
              sortDirection === 'newest'
                ? 'bg-gray-200 text-gray-900'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ArrowDownAZ size={16} />
            <span className="hidden sm:inline">Newest First</span>
          </button>
          <button
            onClick={() => setSortDirection('oldest')}
            className={`px-3 py-1.5 flex items-center gap-1 text-sm font-medium transition-colors duration-150 ${
              sortDirection === 'oldest'
                ? 'bg-gray-200 text-gray-900'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            } border-l border-gray-200`}
          >
            <ArrowUpAZ size={16} />
            <span className="hidden sm:inline">Oldest First</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidentFilters;