import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";

function Landing() {
  return (
    <div className="page-shell">
      <div className="page-container">
        <Navbar />

        <section className="landing-hero">
          <div className="landing-hero-content">
            <span className="landing-badge">Interactive Algorithm Learning Platform</span>
            <h1>Learn Sorting Through Visual Thinking</h1>
            <p>
              AlgoLab helps you visualize, compare, and analyze sorting algorithms
              through interactive animations, race mode, and intelligent insights.
              Built for learners, developers, and interview preparation.
            </p>

            <div className="landing-hero-actions">
              <Link to="/visualizer" className="primary-btn">
                Open Visualizer
              </Link>
              <Link to="/dashboard" className="secondary-btn">
                Explore Dashboard
              </Link>
            </div>

            <div className="landing-hero-stats">
              <div className="hero-stat-card">
                <strong>7+</strong>
                <span>Algorithms</span>
              </div>
              <div className="hero-stat-card">
                <strong>3 Core Tools</strong>
                <span>Visualizer, Race, Analyzer</span>
              </div>
              <div className="hero-stat-card">
                <strong>Built for Learning</strong>
                <span>Concept + intuition + comparison</span>
              </div>
            </div>
          </div>

          <div className="landing-hero-visual">
            <div className="hero-preview-card">
              <div className="preview-topbar">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>

              <div className="preview-toolbar">
                <div className="preview-pill">Quick Sort</div>
                <div className="preview-pill muted">Input: 5,3,8,1,2</div>
                <div className="preview-run">Run</div>
              </div>

              <div className="preview-bars">
                <span style={{ height: "42px" }}></span>
                <span style={{ height: "86px" }}></span>
                <span style={{ height: "58px" }}></span>
                <span style={{ height: "110px" }} className="active"></span>
                <span style={{ height: "76px" }}></span>
                <span style={{ height: "95px" }}></span>
                <span style={{ height: "48px" }}></span>
                <span style={{ height: "68px" }}></span>
              </div>

              <div className="preview-footer-row">
                <div className="preview-status">Status: Sorting in progress</div>
                <div className="preview-ai">AI Insight Ready</div>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-trust-strip">
          <div className="trust-item">Visual Learning</div>
          <div className="trust-item">Algorithm Intuition</div>
          <div className="trust-item">Interview Practice</div>
          <div className="trust-item">Performance Analysis</div>
        </section>

        <section className="landing-section">
          <div className="section-heading-block">
            <p className="section-kicker">Product Overview</p>
            <h2 className="landing-section-title">Everything you need to understand sorting deeply</h2>
            <p className="landing-section-text">
              AlgoLab is not just a visualizer. It is a structured learning product
              where you can experiment with inputs, compare algorithms, and analyze
              behavior with clarity.
            </p>
          </div>

          <div className="landing-feature-grid">
            <div className="landing-feature-card">
              <div className="card-icon">📊</div>
              <h3>Sorting Visualizer</h3>
              <p>
                Watch step-by-step transformations of arrays and understand how each
                comparison and swap changes the final result.
              </p>
            </div>

            <div className="landing-feature-card">
              <div className="card-icon">⚔️</div>
              <h3>Race Mode</h3>
              <p>
                Compare two algorithms side by side on the same input and see how
                performance differs in real time.
              </p>
            </div>

            <div className="landing-feature-card">
              <div className="card-icon">🧠</div>
              <h3>AI Analyzer</h3>
              <p>
                Generate explanations, understand complexity trade-offs, and study
                algorithm behavior beyond the animation.
              </p>
            </div>

            <div className="landing-feature-card">
              <div className="card-icon">🎯</div>
              <h3>Focused Learning</h3>
              <p>
                Designed to help students and interview aspirants build intuition,
                not just memorize algorithm names.
              </p>
            </div>

            <div className="landing-feature-card">
              <div className="card-icon">📈</div>
              <h3>Performance Insight</h3>
              <p>
                Move from theory to practical understanding through comparison,
                timing, behavior, and structure.
              </p>
            </div>

            <div className="landing-feature-card">
              <div className="card-icon">🧩</div>
              <h3>Interactive Workflow</h3>
              <p>
                Input custom arrays, control speed, pause execution, and explore
                the algorithm from multiple angles.
              </p>
            </div>
          </div>
        </section>

        <section className="landing-showcase">
          <div className="showcase-text">
            <p className="section-kicker">Core Experience</p>
            <h2 className="landing-section-title">Visualize the logic, not just the result</h2>
            <p className="landing-section-text">
              The visualizer is the heart of AlgoLab. Choose an algorithm, enter a
              custom array, and observe the exact sequence of operations that lead
              to a sorted output.
            </p>

            <ul className="landing-points">
              <li>Custom array input for controlled experimentation</li>
              <li>Step-by-step algorithm animation</li>
              <li>Play, pause, reset, and speed controls</li>
              <li>Clear state feedback for each run</li>
            </ul>

            <Link to="/visualizer" className="primary-btn">
              Try Visualizer
            </Link>
          </div>

          <div className="showcase-card">
            <div className="mini-window">
              <div className="preview-topbar">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>

              <div className="showcase-panel">
                <div className="showcase-row">
                  <span className="mini-label">Algorithm</span>
                  <span className="mini-chip">Merge Sort</span>
                </div>

                <div className="mini-bars wide">
                  <span style={{ height: "52px" }}></span>
                  <span style={{ height: "84px" }}></span>
                  <span style={{ height: "96px" }} className="active"></span>
                  <span style={{ height: "64px" }}></span>
                  <span style={{ height: "114px" }}></span>
                  <span style={{ height: "76px" }}></span>
                  <span style={{ height: "46px" }}></span>
                </div>

                <div className="showcase-footer">
                  <span>Ready</span>
                  <span>Comparisons tracked</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-showcase reverse">
          <div className="showcase-card">
            <div className="dual-preview">
              <div className="dual-box">
                <h4>Quick Sort</h4>
                <div className="mini-bars compact">
                  <span style={{ height: "34px" }}></span>
                  <span style={{ height: "52px" }}></span>
                  <span style={{ height: "78px" }}></span>
                  <span style={{ height: "60px" }} className="active"></span>
                  <span style={{ height: "40px" }}></span>
                </div>
                <p>Time: 0.21s</p>
              </div>

              <div className="dual-box">
                <h4>Merge Sort</h4>
                <div className="mini-bars compact">
                  <span style={{ height: "30px" }}></span>
                  <span style={{ height: "48px" }}></span>
                  <span style={{ height: "72px" }} className="active"></span>
                  <span style={{ height: "56px" }}></span>
                  <span style={{ height: "38px" }}></span>
                </div>
                <p>Time: 0.16s</p>
              </div>
            </div>
          </div>

          <div className="showcase-text">
            <p className="section-kicker">Comparison Mode</p>
            <h2 className="landing-section-title">Compare algorithms side by side</h2>
            <p className="landing-section-text">
              Race Mode adds a competitive and analytical layer to learning.
              Instead of studying one algorithm in isolation, you can compare two
              approaches on the same data and observe the difference visually.
            </p>

            <ul className="landing-points">
              <li>Run two algorithms on identical input</li>
              <li>Observe different execution behavior</li>
              <li>Compare timing and efficiency</li>
              <li>Make learning more intuitive and memorable</li>
            </ul>

            <Link to="/race" className="primary-btn">
              Explore Race Mode
            </Link>
          </div>
        </section>

        <section className="landing-showcase">
          <div className="showcase-text">
            <p className="section-kicker">Insight Layer</p>
            <h2 className="landing-section-title">Move beyond animation with algorithm analysis</h2>
            <p className="landing-section-text">
              The analyzer helps you understand why an algorithm behaves the way it
              does. Combine complexity awareness with AI explanations and performance
              reasoning to build deeper problem-solving clarity.
            </p>

            <ul className="landing-points">
              <li>Understand time and space complexity</li>
              <li>Study practical trade-offs</li>
              <li>Use AI to explain behavior in plain language</li>
              <li>Connect theory with what you observe visually</li>
            </ul>

            <Link to="/analyzer" className="primary-btn">
              Open Analyzer
            </Link>
          </div>

          <div className="showcase-card">
            <div className="analysis-preview">
              <div className="analysis-card small">
                <span>Average Case</span>
                <strong>O(n log n)</strong>
              </div>
              <div className="analysis-card small">
                <span>Worst Case</span>
                <strong>O(n²)</strong>
              </div>
              <div className="analysis-card large">
                <h4>AI Insight</h4>
                <p>
                  Quick Sort is efficient in practice for many datasets, but pivot
                  choice strongly affects worst-case behavior.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-steps-section">
          <div className="section-heading-block center">
            <p className="section-kicker">How It Works</p>
            <h2 className="landing-section-title">A simple workflow designed for deep understanding</h2>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <h3>Select an algorithm</h3>
              <p>Choose from multiple sorting methods based on what you want to study.</p>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <h3>Enter your input</h3>
              <p>Use custom arrays to test best-case, average-case, or tricky scenarios.</p>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <h3>Watch the execution</h3>
              <p>Track each phase of the sorting process visually and understand the flow.</p>
            </div>

            <div className="step-card">
              <div className="step-number">04</div>
              <h3>Analyze the behavior</h3>
              <p>Use AI explanations and comparison tools to strengthen your intuition.</p>
            </div>
          </div>
        </section>

        <section className="landing-value-section">
          <div className="value-panel">
            <p className="section-kicker">Why AlgoLab</p>
            <h2 className="landing-section-title">Built for visual learners, interview prep, and real understanding</h2>
            <p className="landing-section-text">
              Many students memorize algorithm complexity without truly understanding
              how algorithms behave. AlgoLab focuses on visual intuition, comparison,
              and explanation so learning becomes active and practical.
            </p>
          </div>

          <div className="value-grid">
            <div className="value-card">
              <h3>Understand faster</h3>
              <p>Animations help you see patterns that static notes cannot show clearly.</p>
            </div>
            <div className="value-card">
              <h3>Practice smarter</h3>
              <p>Experiment with custom data and compare approaches instead of reading theory alone.</p>
            </div>
            <div className="value-card">
              <h3>Prepare better</h3>
              <p>Useful for interviews, coursework, and building stronger algorithmic reasoning.</p>
            </div>
          </div>
        </section>

        <section className="landing-cta-section">
          <div className="landing-cta-card">
            <p className="section-kicker">Start Exploring</p>
            <h2>Turn sorting concepts into visual intuition</h2>
            <p>
              Launch AlgoLab and explore algorithms through visualization, comparison,
              and analysis in one unified learning platform.
            </p>

            <div className="landing-hero-actions">
              <Link to="/visualizer" className="primary-btn">
                Launch AlgoLab
              </Link>
              <Link to="/dashboard" className="secondary-btn">
                View Dashboard
              </Link>
            </div>
          </div>
        </section>

        <footer className="landing-footer">
          <div>
            <h3>AlgoLab</h3>
            <p>Interactive platform for learning sorting algorithms visually.</p>
          </div>

          <div className="landing-footer-links">
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/visualizer">Visualizer</Link>
            <Link to="/race">Race</Link>
            <Link to="/analyzer">Analyzer</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Landing;