const Legend = () => {
  const items = [
    { label: "Compare", color: "#facc15" },
    { label: "Swap", color: "#f472b6" },
    { label: "Overwrite", color: "#60a5fa" },
    { label: "Pivot", color: "#22c55e" },
    { label: "Recursion", color: "#a78bfa" },
    { label: "Count", color: "#f97316" },
    { label: "Prefix", color: "#10b981" },
    { label: "Gap", color: "#8b5cf6" },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "18px", flexWrap: "wrap", marginTop: "18px" }}>
      {items.map((item) => (
        <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", color: "#fff", textShadow: `0 0 4px ${item.color}` }}>
          <span style={{ width: "12px", height: "12px", backgroundColor: item.color, borderRadius: "50%", boxShadow: `0 0 6px ${item.color},0 0 12px ${item.color}55` }} />
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default Legend;
