const colors = {
  compare: "#facc15",
  swap: "#f472b6",
  overwrite: "#60a5fa",
  pivot: "#22c55e",
  recursion: "#a78bfa",
  count: "#f97316",
  prefix: "#10b981",
  gap: "#8b5cf6",
};

const Bar = ({ value, maxValue, highlight }) => {
  const barHeight = `${(value / maxValue) * 100}%`;
  const color = highlight ? colors[highlight] : "#4f46e5";

  return (
    <div
      style={{
        width: "32px",
        height: barHeight,
        backgroundColor: color,
        borderRadius: "6px",
        transition: "all 0.3s ease",
        boxShadow: highlight ? `0 0 12px ${color},0 0 24px ${color}55` : "0 0 4px rgba(79,70,229,0.3)",
        margin: "0 4px",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        fontSize: "12px",
        color: "#ffffffaa",
        fontWeight: "600",
      }}
    >
      {value}
    </div>
  );
};

export default Bar;
