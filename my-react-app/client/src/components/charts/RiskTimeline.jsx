import React from 'react';
import { TrendingUp } from 'lucide-react';

const RiskTimeline = ({ simulatedRainfall }) => {
  const timelineData = [
    { time: 'Now', risk: 35 },
    { time: '2h', risk: 42 },
    { time: '4h', risk: 58 },
    { time: '6h', risk: 72 },
    { time: '12h', risk: 68 },
    { time: '24h', risk: 45 },
  ];

  const maxRisk = Math.max(...timelineData.map(d => d.risk));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        Risk Timeline
      </h3>
      <div className="space-y-4">
        <div className="flex items-end gap-2 h-32 justify-between">
          {timelineData.map((item, index) => {
            const heightPercentage = (item.risk / maxRisk) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full relative">
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all duration-300 hover:opacity-80"
                    style={{ height: `${heightPercentage * 1.2}px` }}
                    title={`${item.risk}% risk`}
                  ></div>
                </div>
                <span className="text-xs text-slate-500 font-medium">{item.time}</span>
              </div>
            );
          })}
        </div>
        <div className="pt-2 border-t border-slate-200">
          <p className="text-xs text-slate-500">Risk projection next 24 hours</p>
        </div>
      </div>
    </div>
  );
};

export default RiskTimeline;
