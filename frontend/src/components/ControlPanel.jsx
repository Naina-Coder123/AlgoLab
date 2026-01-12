const ControlPanel = ({ onPlay, onPause, onReset, onSpeedChange }) => {
  return (
    <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "16px", flexWrap: "wrap" }}>
      {["▶ Play", "⏸ Pause", "⟲ Reset"].map((label, i) => (
        <button
          key={i}
          onClick={[onPlay, onPause, onReset][i]}
          style={{ padding: "8px 16px", borderRadius: "8px", background: "linear-gradient(135deg, #6366f1, #22d3ee)", color: "#fff", fontWeight: 600, cursor: "pointer" }}
        >
          {label}
        </button>
      ))}

      <div style={{ display: "flex", gap: "8px", alignItems: "center", color: "#fff" }}>
        <label>Speed</label>
        <input type="range" min="50" max="1000" step="50" defaultValue="500" onChange={(e) => onSpeedChange(Number(e.target.value))} />
      </div>
    </div>
  );
};

export default ControlPanel;
