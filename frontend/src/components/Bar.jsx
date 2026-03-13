const colors = {
  compare: "#14b8a6",
  swap: "#f97316",
  overwrite: "#38bdf8",
  pivot: "#16a34a",
  recursion: "#eab308",
  count: "#10b981",
  prefix: "#6366f1",
  gap: "#ec4899",
  sorted: "#22c55e",
};

const Bar = ({ value, maxValue, highlight }) => {
  const barHeight = `${Math.max((value / maxValue) * 100, 4)}%`;
  // console.log("highlight:", highlight);

  const color = colors[highlight] || "#374151"; // fallback

  return (
    <div
      style={{
        width: "28px",
        height: barHeight,
        backgroundColor: color,
        borderRadius: "6px",
        transition: "all 0.25s ease",
        boxShadow: highlight
        ? `0 0 10px ${color}, 0 0 25px ${color}55`
        : "0 0 2px rgba(55,65,81,0.3)",
        margin: "0 3px",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        fontSize: "12px",
        color: "#e5e7ebaa",
        fontWeight: 600,
      }}
    >
      {value}
    </div>
  );
};

export default Bar;