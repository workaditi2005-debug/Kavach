import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const RISK_CONFIG = {
  low: {
    styles: 'bg-green-50 border-green-200 text-green-900',
    icon: 'text-green-600',
    message: 'Conditions are stable. Continue monitoring the situation.',
  },
  moderate: {
    styles: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    icon: 'text-yellow-600',
    message: 'Elevated risk detected. Stay alert and review safety guidance.',
  },
  high: {
    styles: 'bg-orange-50 border-orange-200 text-orange-900',
    icon: 'text-orange-600',
    message: 'High risk conditions detected. Preparedness is strongly advised.',
  },
  severe: {
    styles: 'bg-red-50 border-red-200 text-red-900',
    icon: 'text-red-600',
    message: 'Severe risk detected. Immediate precautions may be required.',
  },
};

const AlertBanner = ({ riskLevel = 'moderate', location, onDismiss }) => {
  const normalizedRisk = riskLevel.toLowerCase();
  const config = RISK_CONFIG[normalizedRisk] || RISK_CONFIG.moderate;

  return (
    <div
      role="alert"
      className={`rounded-lg border p-4 flex items-start gap-4 ${config.styles}`}
    >
      <AlertTriangle
        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.icon}`}
      />

      <div className="flex-1">
        <h4 className="font-semibold mb-1">
          {normalizedRisk.toUpperCase()} Risk Alert
        </h4>

        <p className="text-sm opacity-90">
          {location?.name && (
            <span className="font-medium">{location.name}: </span>
          )}
          {config.message}
        </p>
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss alert"
          className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default AlertBanner;

