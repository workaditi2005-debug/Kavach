import React from 'react';
import { BarChart3 } from 'lucide-react';

const HazardBreakdown = ({ location, simulatedRainfall }) => {
  const hazards = [
    { name: 'Landslides', percentage: 65, color: 'bg-red-500' },
    { name: 'Flash Floods', percentage: 52, color: 'bg-blue-500' },
    { name: 'Rockfalls', percentage: 38, color: 'bg-orange-500' },
    { name: 'Erosion', percentage: 28, color: 'bg-yellow-500' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-blue-600" />
        Hazard Breakdown
      </h3>
      <div className="space-y-4">
        {hazards.map((hazard, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-slate-700">{hazard.name}</span>
              <span className="text-sm font-bold text-slate-900">{hazard.percentage}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${hazard.color}`}
                style={{ width: `${hazard.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      {simulatedRainfall > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          <p className="text-xs text-slate-500">Adjusted for {simulatedRainfall}mm rainfall</p>
        </div>
      )}
    </div>
  );
};

export default HazardBreakdown;
