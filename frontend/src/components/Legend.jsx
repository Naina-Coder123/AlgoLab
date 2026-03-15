import "./Legend.css";

const legendItems = [
  { label: "Comparing", className: "legend-compare" },
  { label: "Swapping", className: "legend-swap" },
  { label: "Overwriting", className: "legend-overwrite" },
  { label: "Pivot", className: "legend-pivot" },
  { label: "Sorted", className: "legend-sorted" },
];

const Legend = () => {
  return (
    <div className="legend">
      {legendItems.map((item) => (
        <div key={item.label} className="legend-item">
          <span className={`legend-indicator ${item.className}`}></span>
          <span className="legend-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;