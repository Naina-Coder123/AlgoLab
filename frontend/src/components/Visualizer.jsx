import Bar from "./Bar";

const Visualizer = ({ array, highlights }) => {
  const maxValue = Math.max(...array);
  return (
    <div style={{ marginTop: "32px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "6px", height: "350px", padding: "24px", background: "linear-gradient(135deg, #0f172a, #020617)", borderRadius: "14px", marginTop: "16px", boxShadow: "0 0 16px rgba(0,240,255,0.2)", overflowX: "auto" }}>
        {array.map((value, index) => (
          <Bar key={index} value={value} maxValue={maxValue} highlight={highlights[index]} />
        ))}
      </div>
    </div>
  );
};

export default Visualizer;
