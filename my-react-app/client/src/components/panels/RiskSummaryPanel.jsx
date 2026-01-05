import React from 'react';
import { AlertCircle } from 'lucide-react';

const RiskSummaryPanel = ({ location, simulatedRainfall }) => {
  const getRiskColor = (risk) => {
    switch(risk?.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-blue-600" />
        Risk Summary
      </h3>
      {location ? (
        <div className="space-y-4">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Location</p>
            <p className="text-lg font-bold text-slate-900">{location.name}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Risk Level</p>
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getRiskColor(location.risk)}`}>
              {location.risk?.toUpperCase() || 'MODERATE'}
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Coordinates</p>
            <p className="text-sm text-slate-600 font-mono">{location.lat?.toFixed(2)}, {location.lng?.toFixed(2)}</p>
          </div>
          {simulatedRainfall > 0 && (
            <div className="pt-4 border-t border-slate-200">
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Simulated Rainfall</p>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: `${Math.min(simulatedRainfall, 100)}%`}}></div>
              </div>
              <p className="text-sm font-semibold text-slate-900 mt-2">{simulatedRainfall}mm</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-slate-500 text-sm">Search for a location to view risk details</p>
        </div>
      )}
    </div>
  );
};

export default RiskSummaryPanel;
