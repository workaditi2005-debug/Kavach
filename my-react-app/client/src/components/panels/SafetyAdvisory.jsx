import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';

const SafetyAdvisory = ({ riskLevel }) => {
  const advisories = {
    high: [
      'Avoid mountainous and elevated terrain',
      'Monitor weather updates closely',
      'Prepare emergency evacuation routes',
      'Keep emergency supplies ready',
    ],
    medium: [
      'Stay alert to weather changes',
      'Review evacuation procedures',
      'Keep communication channels open',
      'Avoid unnecessary travel',
    ],
    low: [
      'Continue normal activities',
      'Monitor weather forecasts',
      'Maintain emergency preparedness',
    ],
  };

  const currentAdvisories = advisories[riskLevel?.toLowerCase()] || advisories.medium;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5 text-green-600" />
        Safety Advisory
      </h3>
      <div className="space-y-3">
        {currentAdvisories.map((advisory, index) => (
          <div key={index} className="flex gap-3">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-slate-700">{advisory}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-slate-200">
        <p className="text-xs text-slate-500">Risk Level: <span className="font-semibold text-slate-900">{riskLevel?.toUpperCase() || 'MODERATE'}</span></p>
      </div>
    </div>
  );
};

export default SafetyAdvisory;
