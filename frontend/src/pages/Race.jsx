import { useState, useEffect, useMemo, useRef } from "react";
import Navbar from "../components/Navbar";
import { useAnimator } from "../hooks/useAnimator";
import { updateDashboardData } from "../utils/dashboardStorage";
import { useAuth } from "../hooks/useAuth";
import { saveUserRun } from "../utils/userRuns";
import "../App.css";

function Race() {
  const [inputArray, setInputArray] = useState("9,4,2,7,1,5");
  const [leftAlgorithm, setLeftAlgorithm] = useState("quick");
  const [rightAlgorithm, setRightAlgorithm] = useState("merge");
  const [leftResult, setLeftResult] = useState(null);
  const [rightResult, setRightResult] = useState(null);
  const [winner, setWinner] = useState("");
  const [loading, setLoading] = useState(false);

  const hasSavedRaceRef = useRef(false);
  const { user } = useAuth();

  const parsedArray = useMemo(() => {
    return inputArray
      .split(",")
      .map((num) => parseInt(num.trim(), 10))
      .filter((num) => !Number.isNaN(num));
  }, [inputArray]);

  const formatAlgorithmName = (algo) => {
    const map = {
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

    return map[algo] || algo;
  };

  const {
    array: leftArray,
    highlights: leftHighlights,
    status: leftStatus,
    play: playLeft,
    reset: resetLeft,
  } = useAnimator(leftResult?.steps || [], parsedArray);

  const {
    array: rightArray,
    highlights: rightHighlights,
    status: rightStatus,
    play: playRight,
    reset: resetRight,
  } = useAnimator(rightResult?.steps || [], parsedArray);

  useEffect(() => {
    resetLeft();
    resetRight();
    setWinner("");
    hasSavedRaceRef.current = false;
  }, [parsedArray, resetLeft, resetRight]);

  useEffect(() => {
    if (leftResult?.steps?.length) {
      resetLeft();
      playLeft();
    }
  }, [leftResult, resetLeft, playLeft]);

  useEffect(() => {
    if (rightResult?.steps?.length) {
      resetRight();
      playRight();
    }
  }, [rightResult, resetRight, playRight]);

  useEffect(() => {
    if (!leftResult || !rightResult) return;
    if (leftStatus !== "finished" || rightStatus !== "finished") return;

    const leftSteps = leftResult.steps?.length || Number.MAX_SAFE_INTEGER;
    const rightSteps = rightResult.steps?.length || Number.MAX_SAFE_INTEGER;

    if (leftSteps < rightSteps) {
      setWinner(leftAlgorithm);
    } else if (rightSteps < leftSteps) {
      setWinner(rightAlgorithm);
    } else {
      setWinner("tie");
    }
  }, [
    leftStatus,
    rightStatus,
    leftResult,
    rightResult,
    leftAlgorithm,
    rightAlgorithm,
  ]);

  useEffect(() => {
    const persistRace = async () => {
      if (!winner || !leftResult || !rightResult) return;
      if (hasSavedRaceRef.current) return;

      const formattedLeft = formatAlgorithmName(leftAlgorithm);
      const formattedRight = formatAlgorithmName(rightAlgorithm);
      const formattedWinner =
        winner === "tie" ? "Tie" : formatAlgorithmName(winner);

      updateDashboardData((current) => ({
        ...current,
        lastUsedAlgorithm: winner === "tie" ? formattedLeft : formattedWinner,
        lastRaceWinner: formattedWinner,
        lastRaceAlgorithms: [formattedLeft, formattedRight],
        totalRuns: (current.totalRuns || 0) + 1,
        recentActivity: [
          winner === "tie"
            ? `Race completed: ${formattedLeft} vs ${formattedRight} ended in a tie`
            : `Race completed: ${formattedLeft} vs ${formattedRight}, winner: ${formattedWinner}`,
          ...(current.recentActivity || []),
        ].slice(0, 5),
        lastUpdatedAt: new Date().toISOString(),
      }));

      if (user) {
        await saveUserRun(user.uid, {
          type: "race",
          leftAlgorithm: formattedLeft,
          rightAlgorithm: formattedRight,
          winner: formattedWinner,
          leftSteps: leftResult?.steps?.length || 0,
          rightSteps: rightResult?.steps?.length || 0,
        });
      }

      hasSavedRaceRef.current = true;
    };

    persistRace();
  }, [winner, leftResult, rightResult, leftAlgorithm, rightAlgorithm, user]);

  const getHighlightType = (highlights, index) => {
    const found = highlights.find((item) => item.index === index);
    return found ? found.type : "";
  };

  const handleRace = async () => {
    const arr = [...parsedArray];

    if (!arr.length) {
      alert("Please enter a valid array.");
      return;
    }

    if (leftAlgorithm === rightAlgorithm) {
      alert("Please choose two different algorithms.");
      return;
    }

    try {
      setLoading(true);
      setWinner("");
      setLeftResult(null);
      setRightResult(null);
      hasSavedRaceRef.current = false;
      resetLeft();
      resetRight();

      const [leftRes, rightRes] = await Promise.all([
        fetch("/api/sort/run", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ algorithm: leftAlgorithm, array: arr }),
        }),
        fetch("/api/sort/run", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ algorithm: rightAlgorithm, array: arr }),
        }),
      ]);

      const leftData = await leftRes.json();
      const rightData = await rightRes.json();

      if (!leftRes.ok || !rightRes.ok) {
        alert(leftData.error || rightData.error || "Race failed");
        return;
      }

      setLeftResult(leftData);
      setRightResult(rightData);
    } catch (error) {
      console.error(error);
      alert("Unable to connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  const getRaceBadge = (side) => {
    const currentStatus = side === leftAlgorithm ? leftStatus : rightStatus;

    if (loading) return "Loading";
    if (!leftResult || !rightResult) return "Ready";
    if (currentStatus === "playing") return "Animating";
    if (currentStatus === "finished" && !winner) return "Finished";
    if (winner === "tie") return "Tie";
    return winner === side ? "Winner" : "Completed";
  };

  const getSummaryTitle = () => {
    const animating = leftStatus === "playing" || rightStatus === "playing";

    if (loading) return "Race in progress...";
    if (animating && !winner) return "Algorithms are racing live";
    if (!winner) return "Run a race to compare algorithms";
    if (winner === "tie") return "Both algorithms performed equally in this run";
    return `${formatAlgorithmName(winner)} wins this run`;
  };

  const getSummaryText = () => {
    const animating = leftStatus === "playing" || rightStatus === "playing";

    if (loading) {
      return "Both algorithms are being executed on the same input array.";
    }

    if (animating && !winner) {
      return "Both lanes are animating backend-generated sorting steps. The winner will be declared after both runs finish.";
    }

    if (!leftResult || !rightResult) {
      return "Choose two algorithms, provide an input array, and compare their real backend output.";
    }

    if (winner === "tie") {
      return "Both algorithms produced the same number of steps for this input, so this run is marked as a tie.";
    }

    return `${formatAlgorithmName(winner)} produced fewer execution steps on this dataset, so it is marked as the winner for this comparison.`;
  };

  return (
    <div className="page-shell">
      <div className="page-container">
        <Navbar />

        <header className="race-page-header">
          <div>
            <p className="section-kicker">Comparison Workspace</p>
            <h1 className="section-title">Algorithm Race Mode</h1>
            <p className="section-subtitle">
              Compare two sorting algorithms on the same input and study their
              execution side by side.
            </p>
          </div>
        </header>

        <section className="race-controls-card">
          <div className="race-controls-header">
            <div>
              <h3>Race Setup</h3>
              <p>
                Choose two algorithms, provide the same input, and start the
                race.
              </p>
            </div>
          </div>

          <div className="race-controls-grid">
            <div className="race-field">
              <label htmlFor="race-array">Input Array</label>
              <input
                id="race-array"
                type="text"
                placeholder="Enter array, e.g., 9,4,2,7,1,5"
                value={inputArray}
                onChange={(e) => setInputArray(e.target.value)}
              />
            </div>

            <div className="race-field">
              <label htmlFor="left-algo">Algorithm One</label>
              <select
                id="left-algo"
                value={leftAlgorithm}
                onChange={(e) => setLeftAlgorithm(e.target.value)}
              >
                <option value="bubble">Bubble Sort</option>
                <option value="selection">Selection Sort</option>
                <option value="insertion">Insertion Sort</option>
                <option value="merge">Merge Sort</option>
                <option value="quick">Quick Sort</option>
                <option value="heap">Heap Sort</option>
                <option value="counting">Counting Sort</option>
                <option value="bucket">Bucket Sort</option>
                <option value="shell">Shell Sort</option>
              </select>
            </div>

            <div className="race-field">
              <label htmlFor="right-algo">Algorithm Two</label>
              <select
                id="right-algo"
                value={rightAlgorithm}
                onChange={(e) => setRightAlgorithm(e.target.value)}
              >
                <option value="bubble">Bubble Sort</option>
                <option value="selection">Selection Sort</option>
                <option value="insertion">Insertion Sort</option>
                <option value="merge">Merge Sort</option>
                <option value="quick">Quick Sort</option>
                <option value="heap">Heap Sort</option>
                <option value="counting">Counting Sort</option>
                <option value="bucket">Bucket Sort</option>
                <option value="shell">Shell Sort</option>
              </select>
            </div>

            <div className="race-action-wrap">
              <button
                type="button"
                className="primary-btn race-start-btn"
                onClick={handleRace}
                disabled={loading}
              >
                {loading ? "Running..." : "Start Race"}
              </button>
            </div>
          </div>
        </section>

        <section className="race-arena-grid">
          <article className="panel-card race-panel">
            <div className="race-panel-header">
              <div>
                <p className="race-panel-kicker">Lane One</p>
                <h3>{formatAlgorithmName(leftAlgorithm)}</h3>
              </div>
              <span className={`race-badge ${winner === leftAlgorithm ? "winner" : ""}`}>
                {getRaceBadge(leftAlgorithm)}
              </span>
            </div>

            <div className="race-visual-box">
              {leftResult ? (
                <div className="race-mini-bars">
                  {leftArray.map((value, index, arr) => {
                    const maxValue = Math.max(...arr, 1);
                    const barHeight = `${Math.max((value / maxValue) * 100, 12)}%`;
                    const highlightType = getHighlightType(leftHighlights, index);

                    return (
                      <div
                        key={`${leftAlgorithm}-${index}`}
                        className={`race-mini-bar ${highlightType ? `bar-${highlightType}` : ""}`}
                        style={{ height: barHeight }}
                        title={`Value: ${value}`}
                      >
                        <span>{value}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="race-placeholder-content">
                  <p className="race-placeholder-text">
                    Run the race to compare both algorithms on the same input.
                  </p>
                </div>
              )}
            </div>

            <div className="race-stats-grid">
              <div className="race-stat-card">
                <span>Steps</span>
                <strong>{leftResult ? leftResult.steps.length : "--"}</strong>
              </div>
              <div className="race-stat-card">
                <span>Time Complexity</span>
                <strong>{leftResult ? leftResult.complexity?.time : "--"}</strong>
              </div>
              <div className="race-stat-card">
                <span>Space Complexity</span>
                <strong>{leftResult ? leftResult.complexity?.space : "--"}</strong>
              </div>
            </div>
          </article>

          <article className="panel-card race-panel">
            <div className="race-panel-header">
              <div>
                <p className="race-panel-kicker">Lane Two</p>
                <h3>{formatAlgorithmName(rightAlgorithm)}</h3>
              </div>
              <span className={`race-badge ${winner === rightAlgorithm ? "winner" : ""}`}>
                {getRaceBadge(rightAlgorithm)}
              </span>
            </div>

            <div className="race-visual-box">
              {rightResult ? (
                <div className="race-mini-bars">
                  {rightArray.map((value, index, arr) => {
                    const maxValue = Math.max(...arr, 1);
                    const barHeight = `${Math.max((value / maxValue) * 100, 12)}%`;
                    const highlightType = getHighlightType(rightHighlights, index);

                    return (
                      <div
                        key={`${rightAlgorithm}-${index}`}
                        className={`race-mini-bar ${highlightType ? `bar-${highlightType}` : ""}`}
                        style={{ height: barHeight }}
                        title={`Value: ${value}`}
                      >
                        <span>{value}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="race-placeholder-content">
                  <p className="race-placeholder-text">
                    Run the race to compare both algorithms on the same input.
                  </p>
                </div>
              )}
            </div>

            <div className="race-stats-grid">
              <div className="race-stat-card">
                <span>Steps</span>
                <strong>{rightResult ? rightResult.steps.length : "--"}</strong>
              </div>
              <div className="race-stat-card">
                <span>Time Complexity</span>
                <strong>{rightResult ? rightResult.complexity?.time : "--"}</strong>
              </div>
              <div className="race-stat-card">
                <span>Space Complexity</span>
                <strong>{rightResult ? rightResult.complexity?.space : "--"}</strong>
              </div>
            </div>
          </article>
        </section>

        <section className="race-summary-card">
          <div className="race-summary-left">
            <p className="section-kicker">Race Result</p>
            <h2 className="race-summary-title">{getSummaryTitle()}</h2>
            <p className="race-summary-text">{getSummaryText()}</p>
          </div>

          <div className="race-summary-right">
            <div className="race-summary-metric">
              <span>Winner</span>
              <strong>
                {winner ? (winner === "tie" ? "Tie" : formatAlgorithmName(winner)) : "--"}
              </strong>
            </div>
            <div className="race-summary-metric">
              <span>Lane One Steps</span>
              <strong>{leftResult ? leftResult.steps.length : "--"}</strong>
            </div>
            <div className="race-summary-metric">
              <span>Lane Two Steps</span>
              <strong>{rightResult ? rightResult.steps.length : "--"}</strong>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Race;