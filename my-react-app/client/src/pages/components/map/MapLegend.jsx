import React from 'react';

const MapLegend = () => {
  const legendItems = [
    { color: 'bg-green-500', label: 'Low Risk', value: '0-20%' },
    { color: 'bg-yellow-500', label: 'Medium Risk', value: '20-50%' },
    { color: 'bg-orange-500', label: 'High Risk', value: '50-80%' },
    { color: 'bg-red-500', label: 'Critical Risk', value: '80-100%' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs">
      <h3 className="font-semibold text-slate-800 mb-3 text-sm">Risk Levels</h3>
      <div className="space-y-2">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded ${item.color}`}></div>
            <div className="flex-1">
              <p className="text-xs font-medium text-slate-900">{item.label}</p>
              <p className="text-xs text-slate-500">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapLegend;
