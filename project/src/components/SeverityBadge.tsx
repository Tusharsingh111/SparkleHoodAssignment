import React from 'react';
import { Severity } from '../types/incident';

interface SeverityBadgeProps {
  severity: Severity;
}

const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity }) => {
  let badgeClasses = 'px-2 py-1 rounded-full text-xs font-medium';
  
  switch (severity) {
    case 'Low':
      badgeClasses += ' bg-blue-100 text-blue-800';
      break;
    case 'Medium':
      badgeClasses += ' bg-yellow-100 text-yellow-800';
      break;
    case 'High':
      badgeClasses += ' bg-red-100 text-red-800';
      break;
    default:
      badgeClasses += ' bg-gray-100 text-gray-800';
  }
  
  return (
    <span className={badgeClasses}>
      {severity}
    </span>
  );
};

export default SeverityBadge;