// src/components/charts/HazardBreakdown.jsx
import { BarChart3 } from "lucide-react";

const HazardBreakdown = ({ hazards = [], rainfall = 0 }) => {
  if (!hazards.length) {
    return (
      <div className="card">
        <h3 className="card-title">
          <BarChart3 size={18} />
          Hazard Breakdown
        </h3>
        <p className="text-sm text-slate-400">
          Select a location to view hazard distribution.
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="card-title flex items-center gap-2">
        <BarChart3 size={18} />
        Hazard Breakdown
      </h3>

      <div className="space-y-3">
        {hazards.map((h, i) => (
          <div key={i} className="hazard-row">
            <div className="label flex justify-between text-sm">
              <span>{h.name}</span>
              <strong>{h.value}%</strong>
            </div>

            <div className="bar-bg">
              <div
                className={`bar ${h.color}`}
                style={{ width: `${h.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {rainfall > 0 && (
        <p className="footnote mt-3 text-xs text-slate-400">
          Adjusted for {rainfall} mm rainfall
        </p>
      )}
    </div>
  );
};

export default HazardBreakdown;
