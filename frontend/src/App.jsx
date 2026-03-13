import React, { useState } from "react";
import Visualizer from "./components/Visualizer";
import ControlPanel from "./components/ControlPanel";
import AlgorithmSelector from "./components/AlgorithmSelector";
import Legend from "./components/Legend";
import Footer from "./components/Footer";
import AIExplanation from "./components/AIExplanation";
import { useAnimator } from "./hooks/useAnimator";
import "./App.css";

const App = () => {
  const [algorithm, setAlgorithm] = useState("bubble");
  const [inputArray, setInputArray] = useState("5,3,8,4,2");
  const [steps, setSteps] = useState([]);
  const [initialArray, setInitialArray] = useState([]);
  const [complexity, setComplexity] = useState(null);
  const [explanation, setExplanation] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

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

      if (res.ok && Array.isArray(data.steps)) {
        setSteps(data.steps);
        setComplexity(data.complexity); // store complexity
        reset();
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      alert("Cannot reach backend. Make sure the server is running!");
      console.error(err);
    }
  };

  const generateAIExplanation = async (userPrompt) => {
    try {
      setLoadingAI(true);
      const res = await fetch("/api/ai/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ algorithm, prompt: userPrompt }),
      });
      const data = await res.json();
      setExplanation(res.ok ? data.explanation : data.error || "AI failed to respond");
    } catch (err) {
      console.error("AI request failed", err);
      setExplanation("Cannot reach AI backend");
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="app-layout">
      <header className="app-header">
        <h1>Sorting Algorithm Visualizer</h1>
        <p>Step-by-step visual representation of sorting algorithms</p>
      </header>

      <div className="main-content">
        {/* Left Column */}
        <div className="left-column">
          <AlgorithmSelector active={algorithm} onChange={setAlgorithm} />

          <div className="input-section">
            <input
              type="text"
              placeholder="Enter array, e.g., 5,3,8,4,2"
              value={inputArray}
              onChange={(e) => setInputArray(e.target.value)}
            />
            <button onClick={runAlgorithm}>Run</button>
          </div>

          <Visualizer
            array={array}
            highlights={highlights}
            complexity={complexity}
            status={status}
          />

          <div className="status-legend">
            <p className={`status-text ${status}`}>
              {status === "idle" && "⏯ Ready to start"}
              {status === "running" && "⚡ Sorting in progress..."}
              {status === "finished" && "✅ Array Sorted"}
            </p>
            <Legend />
          </div>

          <ControlPanel
            onPlay={play}
            onPause={pause}
            onReset={reset}
            onSpeedChange={setSpeed}
          />
        </div>

        {/* Right Column: AI Panel */}
        <div className="right-column">
          <AIExplanation
            explanation={explanation}
            loading={loadingAI}
            onGenerate={generateAIExplanation}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;