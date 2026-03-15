import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import VisualizerCanvas from "../components/Visualizer";
import ControlPanel from "../components/ControlPanel";
import AlgorithmSelector from "../components/AlgorithmSelector";
import Legend from "../components/Legend";
import Footer from "../components/Footer";
import AIExplanation from "../components/AIExplanation";
import { useAnimator } from "../hooks/useAnimator";
import "../App.css";

const algorithmNameMap = {
  bubble: "Bubble Sort",
  selection: "Selection Sort",
  insertion: "Insertion Sort",
  merge: "Merge Sort",
  quick: "Quick Sort",
  heap: "Heap Sort",
  counting: "Counting Sort",
  bucket: "Bucket Sort",
  shell: "Shell Sort",
};

const VisualizerPage = () => {
  const [algorithm, setAlgorithm] = useState("bubble");
  const [inputArray, setInputArray] = useState(
    "5,3,8,4,2,7,9,1,6,10,12,11,14,13,15"
  );
  const [steps, setSteps] = useState([]);
  const [initialArray, setInitialArray] = useState([]);
  const [complexity, setComplexity] = useState(null);
  const [explanation, setExplanation] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const visualizerCardRef = useRef(null);

  const { array, highlights, play, pause, reset, setSpeed, status } = useAnimator(
    steps,
    initialArray
  );

  const parseInput = () => {
    const arr = inputArray
      .split(",")
      .map((num) => parseInt(num.trim(), 10))
      .filter((num) => !Number.isNaN(num));

    setInitialArray(arr);
    return arr;
  };

  const runAlgorithm = async () => {
    const arr = parseInput();
    if (!arr.length) {
      alert("Please enter a valid array.");
      return;
    }

    try {
      const res = await fetch("/api/sort/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ algorithm, array: arr }),
      });

      const data = await res.json();

      if (res.ok && Array.isArray(data.steps)) {
        setSteps(data.steps);
        setComplexity(data.complexity);
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

  const handleFullscreenToggle = async () => {
    const element = visualizerCardRef.current;
    if (!element) return;

    try {
      if (!document.fullscreenElement) {
        await element.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  

  return (
    <div className="page-shell">
      <div className="page-container">
        {!isFullscreen && <Navbar />}

        {!isFullscreen && (
          <header className="visualizer-page-header">
            <div>
              <p className="section-kicker">Interactive Workspace</p>
              <h1 className="section-title">Sorting Visualizer</h1>
              <p className="section-subtitle">
                Step-by-step visual representation of sorting algorithms with controls,
                playback, and AI-assisted explanations.
              </p>
            </div>
          </header>
        )}

        {!isFullscreen && (
          <div className="visualizer-meta-row">
            <div className="meta-chip">
              <span className="meta-label">Algorithm</span>
              <strong>{algorithmNameMap[algorithm] || algorithm}</strong>
            </div>

            <div className="meta-chip">
              <span className="meta-label">Status</span>
              <strong>
                {status === "idle" && "Ready"}
                {status === "running" && "Running"}
                {status === "finished" && "Finished"}
              </strong>
            </div>

            <div className="meta-chip">
              <span className="meta-label">Mode</span>
              <strong>Interactive Learning</strong>
            </div>
          </div>
        )}

        <div className="two-column-layout visualizer-layout">
          <div
            ref={visualizerCardRef}
            className={`panel-card visualizer-main-card ${isFullscreen ? "fullscreen-card" : ""}`}
          >
            <div className="panel-section">
              {!isFullscreen && (
                <>
                  <div className="panel-section-header">
                    <h3>Choose Algorithm</h3>
                    <p>Select a sorting technique and run it on your custom input.</p>
                  </div>

                  <div className="toolbar-row">
                    <AlgorithmSelector active={algorithm} onChange={setAlgorithm} />
                  </div>
                </>
              )}

              <div className={`input-row ${isFullscreen ? "fullscreen-input-row" : ""}`}>
                {isFullscreen && (
                  <div className="fullscreen-algorithm-chip">
                    <span className="fullscreen-algorithm-label">Algorithm</span>
                    <strong>{algorithmNameMap[algorithm] || algorithm}</strong>
                  </div>
                )}

                <input
                  type="text"
                  placeholder="Enter array, e.g., 5,3,8,4,2,7,9,1,6,10,12,11,14,13,15"
                  value={inputArray}
                  onChange={(e) => setInputArray(e.target.value)}
                />

                <button className="primary-btn" onClick={runAlgorithm}>
                  Run
                </button>
              </div>
            </div>

            <div className="panel-section">
              <div className="panel-section-header panel-section-header-row">
                <div>
                  <h3>Visualization</h3>
                  <p>Observe comparisons, transitions, and final sorted output.</p>
                </div>

                <button
                  type="button"
                  className="fullscreen-btn"
                  onClick={handleFullscreenToggle}
                >
                  {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                </button>
              </div>

              <div className="visualizer-box">
                <VisualizerCanvas
                  array={array}
                  highlights={highlights}
                  complexity={complexity}
                  status={status}
                />
              </div>
            </div>

          

            <div className="panel-section">
              <div className="status-strip">
                <p className={`status-text ${status}`}>
                  {status === "idle" && "⏯ Ready to start"}
                  {status === "running" && "⚡ Sorting in progress..."}
                  {status === "finished" && "✅ Array Sorted"}
                </p>
                <Legend />
              </div>
            </div>

            <div className="panel-section">
              <div className="panel-section-header">
                <h3>Playback</h3>
                <p>Control animation speed and step through the sorting process.</p>
              </div>

              <ControlPanel
                onPlay={play}
                onPause={pause}
                onReset={reset}
                onSpeedChange={setSpeed}
              />
            </div>
          </div>

          {!isFullscreen && (
            <div className="panel-card ai-side-card">
              <AIExplanation
                explanation={explanation}
                loading={loadingAI}
                onGenerate={generateAIExplanation}
              />
            </div>
          )}
        </div>

        {!isFullscreen && <Footer />}
      </div>
    </div>
  );
};

export default VisualizerPage;