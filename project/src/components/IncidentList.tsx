import React from 'react';
import { Incident, FilterValue, SortDirection } from '../types/incident';
import IncidentItem from './IncidentItem';
import { AlertCircle } from 'lucide-react';

interface IncidentListProps {
  incidents: Incident[];
  filter: FilterValue;
  sortDirection: SortDirection;
}

const IncidentList: React.FC<IncidentListProps> = ({ incidents, filter, sortDirection }) => {
  // Apply filter
  const filteredIncidents = filter === 'All' 
    ? incidents 
    : incidents.filter(incident => incident.severity === filter);
  
  // Apply sorting
  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const dateA = new Date(a.reported_at).getTime();
    const dateB = new Date(b.reported_at).getTime();
    
    return sortDirection === 'newest' ? dateB - dateA : dateA - dateB;
  });
  
  if (sortedIncidents.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <div className="flex justify-center mb-3">
          <AlertCircle size={24} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-1">No incidents found</h3>
        <p className="text-gray-500">
          {filter === 'All' 
            ? 'There are no reported incidents in the system.' 
            : `There are no ${filter} severity incidents reported.`}
        </p>
      </div>
    );
  }
  
  return (
    <div>
      {sortedIncidents.map(incident => (
        <IncidentItem key={incident.id} incident={incident} />
      ))}
    </div>
  );
};

export default IncidentList;