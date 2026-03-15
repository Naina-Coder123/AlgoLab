import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import AnalyzerChart from "../components/AnalyzerChart";
import { extractMetricsFromSteps } from "../utils/analyzerMetrics";
import { updateDashboardData } from "../utils/dashboardStorage";
import { useAuth } from "../hooks/useAuth";
import { saveUserRun } from "../utils/userRuns";
import "../App.css";

function Analyzer() {
  const [algorithm, setAlgorithm] = useState("quick");
  const [inputSize, setInputSize] = useState("100");
  const [datasetType, setDatasetType] = useState("random");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [generatedArray, setGeneratedArray] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const algorithmDetails = {
    bubble: {
      name: "Bubble Sort",
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      inPlace: "Yes",
    },
    selection: {
      name: "Selection Sort",
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
      inPlace: "Yes",
    },
    insertion: {
      name: "Insertion Sort",
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      inPlace: "Yes",
    },
    merge: {
      name: "Merge Sort",
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      inPlace: "No",
    },
    quick: {
      name: "Quick Sort",
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
      inPlace: "Yes",
    },
    heap: {
      name: "Heap Sort",
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      inPlace: "Yes",
    },
    counting: {
      name: "Counting Sort",
      best: "O(n + k)",
      average: "O(n + k)",
      worst: "O(n + k)",
      inPlace: "No",
    },
    bucket: {
      name: "Bucket Sort",
      best: "O(n + k)",
      average: "O(n + k)",
      worst: "O(n²)",
      inPlace: "No",
    },
    shell: {
      name: "Shell Sort",
      best: "Depends on gap sequence",
      average: "≈ O(n^1.3 to n^1.5)",
      worst: "O(n²)",
      inPlace: "Yes",
    },
  };

  const currentAlgorithm = algorithmDetails[algorithm];

  const analysisMetrics = useMemo(() => {
    return extractMetricsFromSteps(analysisResult?.steps || []);
  }, [analysisResult]);

  const generateArray = (size, type) => {
    const n = Number(size);
    const arr = Array.from(
      { length: n },
      () => Math.floor(Math.random() * 100) + 1
    );

    if (type === "sorted") {
      return [...arr].sort((a, b) => a - b);
    }

    if (type === "reverse") {
      return [...arr].sort((a, b) => b - a);
    }

    if (type === "nearly-sorted") {
      const sorted = [...arr].sort((a, b) => a - b);
      const swaps = Math.max(1, Math.floor(n * 0.05));

      for (let i = 0; i < swaps; i += 1) {
        const first = Math.floor(Math.random() * n);
        const second = Math.floor(Math.random() * n);
        [sorted[first], sorted[second]] = [sorted[second], sorted[first]];
      }

      return sorted;
    }

    return arr;
  };

  const fetchWithTimeout = async (url, options, timeout = 12000) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      return response;
    } finally {
      clearTimeout(timer);
    }
  };

  const getInsightText = () => {
    if (!analysisResult) {
      return "Run analysis to generate insight based on the selected algorithm and dataset.";
    }

    const algoName = currentAlgorithm?.name || algorithm;
    const stableText = analysisResult.complexity?.stable ? "stable" : "not stable";

    return `${algoName} was analyzed on a ${datasetType} dataset with ${generatedArray.length} elements. The run produced ${analysisMetrics.totalSteps} backend steps, ${analysisMetrics.comparisons} comparisons, and ${analysisMetrics.writes} write operations. Its time complexity is ${analysisResult.complexity?.time || "--"} and its space complexity is ${analysisResult.complexity?.space || "--"}. This algorithm is ${stableText}.`;
  };

  const getRecommendationText = () => {
    const algoName = currentAlgorithm?.name || algorithm;

    if (!analysisResult) {
      return "Select an algorithm and run analysis to see a contextual recommendation.";
    }

    if (algorithm === "merge") {
      return `${algoName} is a strong option when you want predictable O(n log n) performance and stable output, especially for larger datasets.`;
    }

    if (algorithm === "quick") {
      return `${algoName} is a strong practical choice when average-case performance matters and stability is not required.`;
    }

    if (algorithm === "insertion") {
      return `${algoName} is most useful for small or nearly sorted datasets where simple in-place behavior is beneficial.`;
    }

    if (algorithm === "counting") {
      return `${algoName} works best when the input consists of integers in a limited range and you want non-comparison-based performance.`;
    }

    return `${algoName} should be chosen based on dataset size, stability needs, memory constraints, and practical runtime behavior.`;
  };

  const buildChartData = async () => {
    const slowAlgorithms = ["bubble", "selection", "insertion"];
    const sizes = slowAlgorithms.includes(algorithm)
      ? [10, 20, 35, 50]
      : [10, 25, 50, 100];

    try {
      const results = [];

      for (const size of sizes) {
        try {
          const arr = generateArray(size, datasetType);

          const response = await fetchWithTimeout(
            "/api/sort/run",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                algorithm,
                array: arr,
              }),
            },
            10000
          );

          const data = await response.json();

          if (!response.ok) {
            console.error(`Chart analysis failed for size ${size}:`, data);
            continue;
          }

          const metrics = extractMetricsFromSteps(data.steps || []);

          results.push({
            size,
            steps: metrics.totalSteps,
            comparisons: metrics.comparisons,
            writes: metrics.writes,
          });
        } catch (error) {
          console.error(`Chart request failed for size ${size}:`, error);
        }
      }

      setChartData(results);
    } catch (error) {
      console.error("Chart data build failed:", error);
      setChartData([]);
    }
  };

  const handleRunAnalysis = async () => {
    try {
      setLoading(true);
      setChartData([]);

      const arr = generateArray(inputSize, datasetType);
      setGeneratedArray(arr);

      const response = await fetchWithTimeout(
        "/api/sort/run",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            algorithm,
            array: arr,
          }),
        },
        12000
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Analysis failed");
        setLoading(false);
        return;
      }

      const metrics = extractMetricsFromSteps(data.steps || []);

      setAnalysisResult(data);

      updateDashboardData((current) => ({
        ...current,
        lastUsedAlgorithm: currentAlgorithm?.name || algorithm,
        lastInputSize: inputSize,
        lastDatasetType: datasetType,
        lastAnalysisAlgorithm: currentAlgorithm?.name || algorithm,
        lastAnalysisSteps: metrics.totalSteps,
        lastAnalysisComparisons: metrics.comparisons,
        lastAnalysisWrites: metrics.writes,
        totalRuns: (current.totalRuns || 0) + 1,
        recentActivity: [
          `Analysis completed: ${currentAlgorithm?.name || algorithm} on ${inputSize} ${datasetType} elements`,
          ...(current.recentActivity || []),
        ].slice(0, 5),
        lastUpdatedAt: new Date().toISOString(),
      }));

      if (user) {
        saveUserRun(user.uid, {
          type: "analyzer",
          algorithm: currentAlgorithm?.name || algorithm,
          inputSize,
          datasetType,
          steps: metrics.totalSteps,
          comparisons: metrics.comparisons,
          writes: metrics.writes,
        }).catch((error) => {
          console.error("Failed to save analyzer run:", error);
        });
      }

      setLoading(false);

      buildChartData().catch((error) => {
        console.error("Background chart build failed:", error);
      });
    } catch (error) {
      console.error("Analyzer run failed:", error);

      if (error.name === "AbortError") {
        alert("Analyzer request timed out. Please try again.");
      } else {
        alert("Unable to connect to backend.");
      }

      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="page-container">
        <Navbar />
        <header className="analyzer-page-header">
          <div>
            <p className="section-kicker">Insight Workspace</p>
            <h1 className="section-title">Algorithm Analyzer</h1>
            <p className="section-subtitle">
              Understand time complexity, performance behavior, and practical
              trade-offs through structured analysis.
            </p>
          </div>
        </header>

        <section className="analyzer-controls-card">
          <div className="analyzer-controls-header">
            <div>
              <h3>Analysis Setup</h3>
              <p>
                Select an algorithm, choose an input size, and generate
                performance insights.
              </p>
            </div>
          </div>

          <div className="analyzer-controls-grid">
            <div className="analyzer-field">
              <label htmlFor="analyzer-algo">Algorithm</label>
              <select
                id="analyzer-algo"
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
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

            <div className="analyzer-field">
              <label htmlFor="input-size">Input Size</label>
              <select
                id="input-size"
                value={inputSize}
                onChange={(e) => setInputSize(e.target.value)}
              >
                <option value="10">10 elements</option>
                <option value="50">50 elements</option>
                <option value="100">100 elements</option>
                <option value="150">150 elements</option>
                <option value="200">200 elements</option>
              </select>
            </div>

            <div className="analyzer-field">
              <label htmlFor="dataset-type">Dataset Type</label>
              <select
                id="dataset-type"
                value={datasetType}
                onChange={(e) => setDatasetType(e.target.value)}
              >
                <option value="random">Random</option>
                <option value="sorted">Already Sorted</option>
                <option value="reverse">Reverse Sorted</option>
                <option value="nearly-sorted">Nearly Sorted</option>
              </select>
            </div>

            <div className="analyzer-action-wrap">
              <button
                type="button"
                className="primary-btn analyzer-run-btn"
                onClick={handleRunAnalysis}
                disabled={loading}
              >
                {loading ? "Running..." : "Run Analysis"}
              </button>
            </div>
          </div>
        </section>

        <section className="analyzer-complexity-grid">
          <div className="analyzer-metric-card">
            <span>Best Case</span>
            <strong>{currentAlgorithm?.best || "--"}</strong>
          </div>

          <div className="analyzer-metric-card">
            <span>Average Case</span>
            <strong>{currentAlgorithm?.average || "--"}</strong>
          </div>

          <div className="analyzer-metric-card">
            <span>Worst Case</span>
            <strong>{currentAlgorithm?.worst || "--"}</strong>
          </div>

          <div className="analyzer-metric-card">
            <span>Space Complexity</span>
            <strong>{analysisResult?.complexity?.space || "--"}</strong>
          </div>
        </section>

        <section className="analyzer-complexity-grid analyzer-runtime-grid">
          <div className="analyzer-metric-card">
            <span>Total Steps</span>
            <strong>{analysisResult ? analysisMetrics.totalSteps : "--"}</strong>
          </div>

          <div className="analyzer-metric-card">
            <span>Comparisons</span>
            <strong>{analysisResult ? analysisMetrics.comparisons : "--"}</strong>
          </div>

          <div className="analyzer-metric-card">
            <span>Writes</span>
            <strong>{analysisResult ? analysisMetrics.writes : "--"}</strong>
          </div>

          <div className="analyzer-metric-card">
            <span>Pivots</span>
            <strong>{analysisResult ? analysisMetrics.pivots : "--"}</strong>
          </div>
        </section>

        <section className="analyzer-main-grid">
          <article className="panel-card analyzer-graph-card">
            <div className="analyzer-card-header">
              <div>
                <p className="section-kicker">Performance View</p>
                <h3>Execution Trend</h3>
              </div>
            </div>

            <div className="analyzer-graph-box">
              {chartData.length > 0 ? (
                <AnalyzerChart data={chartData} />
              ) : (
                <div className="graph-placeholder">
                  <div className="graph-line"></div>
                  <div className="graph-axis-x"></div>
                  <div className="graph-axis-y"></div>
                </div>
              )}
            </div>

            <p className="analyzer-card-note">
              {analysisResult
                ? `Real backend trend for ${currentAlgorithm?.name} across multiple input sizes.`
                : "Visual comparison of execution trend as input size grows."}
            </p>
          </article>

          <article className="panel-card analyzer-insight-card">
            <div className="analyzer-card-header">
              <div>
                <p className="section-kicker">AI Insight</p>
                <h3>Behavior Summary</h3>
              </div>
            </div>

            <div className="analyzer-insight-box">
              <p>{getInsightText()}</p>
            </div>

            <div className="analyzer-mini-stats">
              <div className="analyzer-mini-stat">
                <span>Stable</span>
                <strong>
                  {analysisResult
                    ? analysisResult.complexity?.stable
                      ? "Yes"
                      : "No"
                    : "--"}
                </strong>
              </div>
              <div className="analyzer-mini-stat">
                <span>In-Place</span>
                <strong>{currentAlgorithm?.inPlace || "--"}</strong>
              </div>
            </div>
          </article>
        </section>

        <section className="analyzer-bottom-grid">
          <article className="panel-card analyzer-tradeoff-card">
            <div className="analyzer-card-header">
              <div>
                <p className="section-kicker">Trade-offs</p>
                <h3>Practical Considerations</h3>
              </div>
            </div>

            <ul className="analyzer-points">
              <li>Backend step count: {analysisResult ? analysisMetrics.totalSteps : "--"}</li>
              <li>Comparisons: {analysisResult ? analysisMetrics.comparisons : "--"}</li>
              <li>Writes: {analysisResult ? analysisMetrics.writes : "--"}</li>
              <li>Dataset type: {datasetType}</li>
              <li>
                Stable sorting:{" "}
                {analysisResult
                  ? analysisResult.complexity?.stable
                    ? "Yes"
                    : "No"
                  : "--"}
              </li>
              <li>Time complexity: {analysisResult ? analysisResult.complexity?.time : "--"}</li>
            </ul>
          </article>

          <article className="panel-card analyzer-recommendation-card">
            <div className="analyzer-card-header">
              <div>
                <p className="section-kicker">Recommendation</p>
                <h3>When to Use</h3>
              </div>
            </div>

            <p className="analyzer-recommendation-text">
              {getRecommendationText()}
            </p>
          </article>
        </section>
      </div>
    </div>
  );
}

export default Analyzer;