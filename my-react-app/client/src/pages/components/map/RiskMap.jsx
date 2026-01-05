import React from 'react';

const RiskMap = ({
  onLocationSelect,
  selectedLocation,
  layers,
  simulatedRainfall = 0,
}) => {
  const activeLayers = Object.entries(layers || {})
    .filter(([, enabled]) => enabled)
    .map(([key]) => key);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg overflow-hidden border border-slate-400">

      {/* Grid Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Placeholder Map Body */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4">

        <h3 className="text-xl font-bold text-slate-700 mb-1">
          Risk Assessment Map
        </h3>

        {!selectedLocation ? (
          <p className="text-slate-600 text-sm mb-4">
            Search or select a location to view risk analysis
          </p>
        ) : (
          <p className="text-slate-600 text-sm mb-4">
            Showing risk overview for{' '}
            <span className="font-semibold">
              {selectedLocation.name}
            </span>
          </p>
        )}

        {/* Simulated Rainfall Indicator */}
        {simulatedRainfall > 0 && (
          <div className="mb-3 inline-block px-4 py-2 bg-blue-100 text-blue-900 rounded-lg text-sm font-medium">
            Simulated Rainfall: {simulatedRainfall} mm
          </div>
        )}

        {/* Active Layers */}
        {activeLayers.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 text-xs text-slate-700">
            {activeLayers.map((layer) => (
              <span
                key={layer}
                className="px-2 py-1 bg-white/70 rounded border border-slate-300"
              >
                {layer}
              </span>
            ))}
          </div>
        )}

        {/* Mock Interaction Area */}
        {!selectedLocation && (
          <button
            onClick={() =>
              onLocationSelect?.({
                name: 'Demo Region',
                coordinates: { lat: 0, lng: 0 },
                riskLevel: 'moderate',
              })
            }
            className="mt-6 px-4 py-2 bg-slate-700 text-white rounded-lg text-sm hover:bg-slate-800 transition"
          >
            Click to simulate map selection
          </button>
        )}
      </div>

      {/* Selected Location Marker (Symbolic, Not Geographic) */}
      {selectedLocation && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative">
            <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg" />
            <div className="absolute -inset-4 bg-red-500 rounded-full opacity-20 animate-ping" />
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskMap;
