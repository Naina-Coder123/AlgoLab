import React, { useState } from "react";
import Visualizer from "./components/Visualizer";
import ControlPanel from "./components/ControlPanel";
import AlgorithmSelector from "./components/AlgorithmSelector";
import Legend from "./components/Legend";
import Footer from "./components/Footer";
import { useAnimator } from "./hooks/useAnimator";
import "./App.css";

const App = () => {
  const [algorithm, setAlgorithm] = useState("bubble");
  const [inputArray, setInputArray] = useState("5,3,8,4,2");
  const [steps, setSteps] = useState([]);
  const [initialArray, setInitialArray] = useState([]);

  const { array, highlights, play, pause, reset, setSpeed, status } = useAnimator(
    steps,
    initialArray
  );

  const parseInput = () => {
    const arr = inputArray
      .split(",")
      .map((num) => parseInt(num.trim()))
      .filter((num) => !isNaN(num));
    setInitialArray(arr);
    return arr;
  };

  const runAlgorithm = async () => {
    const arr = parseInput();
    if (!arr.length) return alert("Please enter a valid array!");

    try {
      const res = await fetch("/api/sort/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ algorithm, array: arr }),
      });
      const data = await res.json();

      if (res.ok) {
        setSteps(data.steps);
        reset(); // reset animator
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      alert("Cannot reach backend. Make sure server is running!");
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      {/* Title */}
      <h1 className="app-title">Sorting Algorithm Visualizer</h1>
      <p className="app-subtitle">Visual representation of how sorting algorithms work step by step</p>

      {/* Algorithm Picker */}
      <AlgorithmSelector active={algorithm} onChange={setAlgorithm} />

      {/* Input array */}
      <div style={{ marginBottom: "24px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Enter array, e.g., 5,3,8,4,2"
          value={inputArray}
          onChange={(e) => setInputArray(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "2px solid #6366f1",
            background: "#020617",
            color: "#ffffff",
            fontFamily: "Roboto Mono, monospace",
            width: "300px",
            textAlign: "center",
          }}
        />
        <button
          onClick={runAlgorithm}
          style={{
            marginLeft: "12px",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            fontWeight: "600",
            cursor: "pointer",
            background: "linear-gradient(135deg, #6366f1, #22d3ee)",
            color: "#ffffff",
            boxShadow: "0 0 8px rgba(99,102,241,0.6)",
          }}
        >
          Run
        </button>
      </div>

      {/* Visualizer */}
      <Visualizer array={array} highlights={highlights} />

      {/* Status */}
      <p className={`status-text ${status}`}>
        {status === "idle" && "▶ Ready to start"}
        {status === "running" && "🔄 Sorting in progress..."}
        {status === "finished" && "✅ Array Sorted"}
      </p>

      {/* Legend */}
      <Legend />

      {/* Controls */}
      <ControlPanel onPlay={play} onPause={pause} onReset={reset} onSpeedChange={setSpeed} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
