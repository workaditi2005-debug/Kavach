import React from 'react';
import { Cloud, CloudRain, Wind, Droplets } from 'lucide-react';

const WeatherPanel = ({ simulatedRainfall = 0 }) => {
  const isSimulated = simulatedRainfall > 0;

  // Baseline (placeholder until real API)
  const baselineWeather = {
    rainfall: 45,
    windSpeed: 28,
    windDirection: 'SSW',
    humidity: 78,
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Cloud className="w-5 h-5 text-blue-600" />
        Weather Conditions
      </h3>

      <div className="space-y-4">
        {/* Rainfall + Wind */}
        <div className="grid grid-cols-2 gap-4">
          {/* Rainfall */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CloudRain className="w-4 h-4 text-blue-600" />
              <p className="text-xs text-blue-700 font-medium">
                Rainfall
              </p>
            </div>

            <p className="text-2xl font-bold text-blue-900">
              {isSimulated
                ? `${simulatedRainfall} mm`
                : `${baselineWeather.rainfall} mm`}
            </p>

            <p className="text-xs text-blue-600 mt-1">
              {isSimulated ? 'Simulated (last 24h)' : 'Baseline (last 24h)'}
            </p>
          </div>

          {/* Wind */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Wind className="w-4 h-4 text-amber-600" />
              <p className="text-xs text-amber-700 font-medium">
                Wind Speed
              </p>
            </div>

            <p className="text-2xl font-bold text-amber-900">
              {baselineWeather.windSpeed} km/h
            </p>

            <p className="text-xs text-amber-600 mt-1">
              {baselineWeather.windDirection} Direction
            </p>
          </div>
        </div>

        {/* Humidity */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="w-4 h-4 text-slate-600" />
            <p className="text-xs text-slate-700 font-medium">
              Humidity
            </p>
          </div>

          <p className="text-2xl font-bold text-slate-900">
            {baselineWeather.humidity}%
          </p>

          <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
            <div
              className="bg-slate-600 h-2 rounded-full transition-all"
              style={{ width: `${baselineWeather.humidity}%` }}
            />
          </div>
        </div>

        {/* Mode Indicator */}
        <p className="text-xs text-slate-500 text-center pt-2">
          {isSimulated
            ? 'Weather adjusted using simulation parameters'
            : 'Showing baseline weather conditions'}
        </p>
      </div>
    </div>
  );
};

export default WeatherPanel;
