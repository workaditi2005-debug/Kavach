import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';

const ADVISORY_CONFIG = {
  low: {
    color: 'text-green-600',
    advisories: [
      'Continue normal activities',
      'Monitor routine weather forecasts',
      'Maintain basic emergency preparedness',
    ],
  },
  moderate: {
    color: 'text-yellow-600',
    advisories: [
      'Stay alert to changing weather conditions',
      'Review local evacuation procedures',
      'Avoid unnecessary travel in vulnerable areas',
      'Keep communication channels open',
    ],
  },
  high: {
    color: 'text-orange-600',
    advisories: [
      'Avoid mountainous and elevated terrain',
      'Closely monitor official weather alerts',
      'Prepare emergency evacuation routes',
      'Ensure emergency supplies are accessible',
    ],
  },
  severe: {
    color: 'text-red-600',
    advisories: [
      'Avoid all high-risk zones immediately',
      'Follow evacuation orders from authorities',
      'Suspend non-essential travel and activities',
      'Keep emergency services contact information ready',
    ],
  },
};

const SafetyAdvisory = ({ riskLevel = 'moderate' }) => {
  const normalizedRisk = riskLevel.toLowerCase();
  const config = ADVISORY_CONFIG[normalizedRisk] || ADVISORY_CONFIG.moderate;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Shield className={`w-5 h-5 ${config.color}`} />
        Safety Advisory
      </h3>

      <div className="space-y-3">
        {config.advisories.map((advisory, index) => (
          <div key={index} className="flex gap-3 items-start">
            <CheckCircle
              className={`w-4 h-4 ${config.color} flex-shrink-0 mt-0.5`}
            />
            <p className="text-sm text-slate-700">
              {advisory}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200">
        <p className="text-xs text-slate-500">
          Risk Level:{' '}
          <span className="font-semibold text-slate-900">
            {normalizedRisk.toUpperCase()}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SafetyAdvisory;
