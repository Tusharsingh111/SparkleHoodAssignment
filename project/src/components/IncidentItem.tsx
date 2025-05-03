import React, { useState } from 'react';
import { Incident } from '../types/incident';
import { formatDate, getRelativeTime } from '../utils/dateUtils';
import SeverityBadge from './SeverityBadge';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface IncidentItemProps {
  incident: Incident;
}

const IncidentItem: React.FC<IncidentItemProps> = ({ incident }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md mb-4">
      <div className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{incident.title}</h3>
            <div className="flex flex-col sm:flex-row sm:items-center mt-2 space-y-2 sm:space-y-0 sm:space-x-4">
              <SeverityBadge severity={incident.severity} />
              <div className="text-sm text-gray-500">
                <span className="hidden sm:inline">{formatDate(incident.reported_at)}</span>
                <span className="sm:hidden">{getRelativeTime(incident.reported_at)}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={toggleDetails}
            className="mt-3 sm:mt-0 flex items-center justify-center px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors duration-150"
          >
            {isExpanded ? (
              <>
                <span>Hide Details</span>
                <ChevronUp size={16} className="ml-1" />
              </>
            ) : (
              <>
                <span>View Details</span>
                <ChevronDown size={16} className="ml-1" />
              </>
            )}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 pt-1 border-t border-gray-100 bg-gray-50 animate-[fadeIn_0.2s_ease-in-out]">
          <div className="text-gray-700 text-sm">
            <h4 className="font-medium text-gray-900 mb-1">Description:</h4>
            <p className="whitespace-pre-line">{incident.description}</p>
            <div className="mt-3 text-xs text-gray-500">
              ID: #{incident.id} • Reported: {formatDate(incident.reported_at)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentItem;