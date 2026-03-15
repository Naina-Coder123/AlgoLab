import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getDashboardData } from "../utils/dashboardStorage";
import { useAuth } from "../hooks/useAuth";
import { getRecentUserRuns } from "../utils/userRuns";
import "../App.css";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(getDashboardData());
  const [recentRuns, setRecentRuns] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const refreshDashboard = () => {
      setDashboardData(getDashboardData());
    };

    window.addEventListener("focus", refreshDashboard);
    window.addEventListener("storage", refreshDashboard);

    return () => {
      window.removeEventListener("focus", refreshDashboard);
      window.removeEventListener("storage", refreshDashboard);
    };
  }, []);

  useEffect(() => {
    const loadRuns = async () => {
      if (!user) {
        setRecentRuns([]);
        return;
      }

      try {
        const runs = await getRecentUserRuns(user.uid, 5);
        setRecentRuns(runs);
      } catch (error) {
        console.error("Failed to load user runs:", error);
      }
    };

    loadRuns();
  }, [user]);

  const {
    totalAlgorithms,
    lastUsedAlgorithm,
    lastInputSize,
    lastDatasetType,
    lastRaceWinner,
    lastAnalysisAlgorithm,
    totalRuns,
    recentActivity,
  } = dashboardData;

  const favoriteAlgorithm =
    lastAnalysisAlgorithm !== "--"
      ? lastAnalysisAlgorithm
      : lastUsedAlgorithm !== "--"
      ? lastUsedAlgorithm
      : "--";

  const getUserName = () => {
    if (!user) return "Learner";
    if (user.displayName) return user.displayName;
    if (user.email) return user.email.split("@")[0];
    return "Learner";
  };

  return (
    <div className="page-shell">
      <div className="page-container">
        <Navbar />

        <section className="dashboard-hero">
          <div>
            <h1 className="section-title">Welcome back, {getUserName()} 👋</h1>
            <p className="section-subtitle">
              Explore algorithm tools, compare sorting strategies, and keep building strong problem-solving intuition.
            </p>
          </div>
        </section>

        <section className="featured-card dashboard-featured-spacing">
          <div className="featured-content">
            <div>
              <p className="featured-label">Continue Learning</p>
              <h2>Launch the Sorting Visualizer</h2>
              <p>
                Run step-by-step sorting animations, inspect comparisons and swaps,
                and understand how each algorithm behaves on real input arrays.
              </p>

              <div className="featured-actions">
                <Link to="/visualizer" className="primary-btn">
                  Open Visualizer
                </Link>
                <Link to="/analyzer" className="secondary-btn">
                  View Analyzer
                </Link>
              </div>
            </div>

            <div className="featured-preview">
              <div className="mini-bars">
                <span className="dashboard-mini-bar dashboard-mini-bar-1"></span>
                <span className="dashboard-mini-bar dashboard-mini-bar-2"></span>
                <span className="dashboard-mini-bar dashboard-mini-bar-3"></span>
                <span className="dashboard-mini-bar dashboard-mini-bar-4"></span>
                <span className="dashboard-mini-bar dashboard-mini-bar-5"></span>
                <span className="dashboard-mini-bar dashboard-mini-bar-6"></span>
                <span className="dashboard-mini-bar dashboard-mini-bar-7"></span>
                <span className="dashboard-mini-bar dashboard-mini-bar-8"></span>
              </div>
            </div>
          </div>
        </section>

        <section className="dashboard-grid dashboard-grid-spacing">
          <div className="dashboard-card">
            <div className="card-icon">📊</div>
            <h3>Sorting Visualizer</h3>
            <p>Run and observe algorithms step by step with interactive controls.</p>
            <div className="dashboard-btn-spacing">
              <Link to="/visualizer" className="primary-btn">Open</Link>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">⚡</div>
            <h3>Algorithm Race Mode</h3>
            <p>
              {lastRaceWinner !== "--"
                ? `Last winner: ${lastRaceWinner}`
                : "Compare two algorithms on the same array and track performance live."}
            </p>
            <div className="dashboard-btn-spacing">
              <Link to="/race" className="primary-btn">Start Race</Link>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🧠</div>
            <h3>AI Analyzer</h3>
            <p>
              {lastAnalysisAlgorithm !== "--"
                ? `Last analysis: ${lastAnalysisAlgorithm} on ${lastInputSize} ${lastDatasetType}`
                : "Study complexity, performance trade-offs, and generated insights."}
            </p>
            <div className="dashboard-btn-spacing">
              <Link to="/analyzer" className="primary-btn">Analyze</Link>
            </div>
          </div>
        </section>

        <section className="two-column-layout">
          <div className="info-card">
            <h3>Recent Activity</h3>
            <ul className="activity-list">
              {recentRuns.length > 0 ? (
                recentRuns.map((run) => (
                  <li key={run.id}>
                    {run.type === "analyzer"
                      ? `${run.algorithm} analyzed on ${run.inputSize} ${run.datasetType} elements`
                      : `${run.leftAlgorithm} vs ${run.rightAlgorithm} — winner: ${run.winner}`}
                  </li>
                ))
              ) : recentActivity && recentActivity.length > 0 ? (
                recentActivity.map((item, index) => (
                  <li key={`${item}-${index}`}>{item}</li>
                ))
              ) : (
                <>
                  <li>No activity yet</li>
                  <li>Run Analyzer or Race to populate this panel</li>
                </>
              )}
            </ul>
          </div>

          <div className="info-card">
            <h3>Quick Stats</h3>
            <ul className="stats-list">
              <li>Algorithms tested: {totalAlgorithms}</li>
              <li>Total runs: {totalRuns}</li>
              <li>Favorite algorithm: {favoriteAlgorithm}</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;