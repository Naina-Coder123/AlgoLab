import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./AnalyzerChart.css";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="analyzer-tooltip">
      <p className="analyzer-tooltip-title">Input Size: {label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="analyzer-tooltip-row">
          <span className={`tooltip-dot tooltip-dot-${entry.dataKey}`}></span>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

function AnalyzerChart({ data }) {
  return (
    <div className="analyzer-chart-wrapper">
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.12)" />
          <XAxis
            dataKey="size"
            stroke="#94a3b8"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />
          <YAxis
            stroke="#94a3b8"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="steps"
            name="Steps"
            stroke="#22d3ee"
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="comparisons"
            name="Comparisons"
            stroke="#38bdf8"
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="writes"
            name="Writes"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AnalyzerChart;