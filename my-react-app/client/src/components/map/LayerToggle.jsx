import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

const LayerToggle = ({ layers, onToggle }) => {
  const layerDefinitions = [
    { id: 'landslide', name: 'Landslide Risk', icon: '🏔️' },
    { id: 'flood', name: 'Flood Risk', icon: '🌊' },
    { id: 'rivers', name: 'River Networks', icon: '💧' },
    { id: 'elevation', name: 'Elevation', icon: '📋' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs">
      <h3 className="font-semibold text-slate-800 mb-3 text-sm">Map Layers</h3>
      <div className="space-y-2">
        {layerDefinitions.map(layer => (
          <button
            key={layer.id}
            onClick={() => onToggle(layer.id)}
            className="w-full flex items-center gap-3 p-2 rounded hover:bg-slate-50 transition-colors group"
          >
            <div className="text-lg">{layer.icon}</div>
            <span className="flex-1 text-left text-sm text-slate-700 font-medium">{layer.name}</span>
            {layers[layer.id] ? (
              <Eye className="w-4 h-4 text-blue-500" />
            ) : (
              <EyeOff className="w-4 h-4 text-slate-300" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LayerToggle;
