import "./ControlPanel.css";

const ControlPanel = ({ onPlay, onPause, onReset, onSpeedChange }) => {
  return (
    <div className="control-panel">
      <div className="control-actions">
        <button className="control-btn control-btn-play" onClick={onPlay}>
          ▶ Play
        </button>

        <button className="control-btn control-btn-pause" onClick={onPause}>
          ⏸ Pause
        </button>

        <button className="control-btn control-btn-reset" onClick={onReset}>
          ⟲ Reset
        </button>
      </div>

      <div className="speed-control">
        <label htmlFor="speed-range" className="speed-label">
          Speed
        </label>

        <input
          id="speed-range"
          className="speed-range"
          type="range"
          min="50"
          max="1000"
          step="50"
          defaultValue="500"
          onChange={(e) => onSpeedChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default ControlPanel;