import "./Bar.css";

const Bar = ({ value, maxValue, highlight }) => {
  const barHeight = `${Math.max((value / maxValue) * 100, 12)}%`;
  const highlightClass = highlight ? `bar-${highlight}` : "bar-default";

  return (
    <div
      className={`bar-item ${highlightClass}`}
      style={{ height: barHeight }}
      title={`Value: ${value}`}
    >
      <span className="bar-value">{value}</span>
    </div>
  );
};

export default Bar;