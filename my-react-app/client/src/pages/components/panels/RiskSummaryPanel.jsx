import React from 'react';
import { AlertCircle } from 'lucide-react';

const RISK_STYLES = {
  low: 'text-green-700 bg-green-50',
  moderate: 'text-yellow-700 bg-yellow-50',
  high: 'text-orange-700 bg-orange-50',
  severe: 'text-red-700 bg-red-50',
};

const RiskSummaryPanel = ({ location, simulatedRainfall = 0, riskLevel }) => {
  if (!location) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <p className="text-slate-500 text-sm">
          Search for a location to view risk details
        </p>
      </div>
    );
  }

  const { name, coordinates } = location;
  const normalizedRisk = riskLevel || 'moderate';
  const riskStyle = RISK_STYLES[normalizedRisk] || RISK_STYLES.moderate;

  // Scale rainfall bar relative to max simulation (500mm)
  const rainfallPercent = Math.min((simulatedRainfall / 500) * 100, 100);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-blue-600" />
        Risk Summary
      </h3>

      <div className="space-y-4">
        {/* Location */}
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
            Location
          </p>
          <p className="text-lg font-bold text-slate-900">
            {name}
          </p>
        </div>

        {/* Risk Level */}
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
            Risk Level
          </p>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${riskStyle}`}
          >
            {normalizedRisk.toUpperCase()}
          </span>
        </div>

        {/* Coordinates */}
        {coordinates && (
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
              Coordinates
            </p>
            <p className="text-sm text-slate-600 font-mono">
              {coordinates.lat.toFixed(2)}, {coordinates.lng.toFixed(2)}
            </p>
          </div>
        )}

        {/* Simulated Rainfall */}
        {simulatedRainfall > 0 && (
          <div className="pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">
              Simulated Rainfall
            </p>

            <div className="w-full bg-slate-100 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${rainfallPercent}%` }}
              />
            </div>

            <p className="text-sm font-semibold text-slate-900 mt-2">
              {simulatedRainfall} mm
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskSummaryPanel;
