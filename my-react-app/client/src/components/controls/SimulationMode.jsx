import React from 'react';
import { Cloud, RotateCcw } from 'lucide-react';

const SimulationMode = ({ isActive, onToggle, rainfall, onRainfallChange, onReset }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <Cloud className="w-5 h-5 text-blue-600" />
          Simulation Mode
        </h3>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isActive}
            onChange={() => onToggle(!isActive)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
      {isActive && (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-2">
              Rainfall: {rainfall}mm
            </label>
            <input
              type="range"
              min="0"
              max="500"
              value={rainfall}
              onChange={(e) => onRainfallChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>0mm</span>
              <span>500mm</span>
            </div>
          </div>
          <button
            onClick={onReset}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Simulation
          </button>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-900">
            <p className="font-semibold mb-1">Simulation Active</p>
            <p>Adjust rainfall to see updated risk assessments in real-time.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimulationMode;
