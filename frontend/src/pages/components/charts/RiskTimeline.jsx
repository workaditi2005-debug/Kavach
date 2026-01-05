import React, { useMemo } from 'react';
import { TrendingUp } from 'lucide-react';

const RiskTimeline = ({ simulatedRainfall = 0 }) => {
  /**
   * Generate risk projection based on rainfall.
   * This is a placeholder heuristic — replace with ML/API later.
   */
  const timelineData = useMemo(() => {
    const baseRisk = 30;
    const rainfallImpact = simulatedRainfall * 0.4;

    return [
      { time: 'Now', risk: baseRisk + rainfallImpact * 0.2 },
      { time: '2h', risk: baseRisk + rainfallImpact * 0.4 },
      { time: '4h', risk: baseRisk + rainfallImpact * 0.7 },
      { time: '6h', risk: baseRisk + rainfallImpact },
      { time: '12h', risk: baseRisk + rainfallImpact * 0.9 },
      { time: '24h', risk: baseRisk + rainfallImpact * 0.6 },
    ].map(point => ({
      ...point,
      risk: Math.min(Math.round(point.risk), 100),
    }));
  }, [simulatedRainfall]);

  const maxRisk = Math.max(...timelineData.map(d => d.risk));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        Risk Timeline
      </h3>

      <div className="space-y-4">
        <div className="flex items-end gap-2 h-36">
          {timelineData.map((item, index) => {
            const heightPercent = (item.risk / maxRisk) * 100;

            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center justify-end gap-2"
              >
                <div className="w-full h-full flex items-end">
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all duration-300"
                    style={{ height: `${heightPercent}%` }}
                    title={`${item.risk}% risk`}
                  />
                </div>

                <span className="text-xs text-slate-500 font-medium">
                  {item.time}
                </span>
              </div>
            );
          })}
        </div>

        <div className="pt-2 border-t border-slate-200">
          <p className="text-xs text-slate-500">
            Projected risk trend over the next 24 hours
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiskTimeline;
