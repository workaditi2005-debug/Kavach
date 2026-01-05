import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const AlertBanner = ({ riskLevel, location, onDismiss }) => {
  const getBannerStyles = (risk) => {
    switch(risk?.toLowerCase()) {
      case 'high':
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-900';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-900';
      case 'low':
        return 'bg-green-50 border-green-200 text-green-900';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-900';
    }
  };

  const getIconColor = (risk) => {
    switch(risk?.toLowerCase()) {
      case 'high':
      case 'critical':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className={`rounded-lg border p-4 flex items-start gap-4 ${getBannerStyles(riskLevel)}`}>
      <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${getIconColor(riskLevel)}`} />
      <div className="flex-1">
        <h4 className="font-semibold mb-1">
          {riskLevel?.toUpperCase() || 'MODERATE'} Risk Alert
        </h4>
        <p className="text-sm opacity-90">
          {location?.name && `${location.name}: `}
          Significant risk detected. Please review the detailed risk assessment and take appropriate precautions.
        </p>
      </div>
      <button
        onClick={onDismiss}
        className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default AlertBanner;
