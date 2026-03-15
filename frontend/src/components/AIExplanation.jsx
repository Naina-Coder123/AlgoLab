import { useState } from "react";
import "./AIExplanation.css";

const AIExplanation = ({ explanation, loading, onGenerate }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [prompt, setPrompt] = useState("");

  const handleGenerate = () => {
    if (!prompt.trim() || loading) return;
    onGenerate(prompt);
  };

  return (
    <div className={`ai-panel ${collapsed ? "collapsed" : ""}`}>
      <div className="ai-header">
        <div className="ai-header-text">
          <p className="ai-eyebrow">AI Assistant</p>
          <h2>Explain this algorithm</h2>
        </div>

        <button
          type="button"
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand AI panel" : "Collapse AI panel"}
        >
          {collapsed ? "→" : "−"}
        </button>
      </div>

      {!collapsed && (
        <div className="ai-body">
          <div className="ai-input-block">
            <label htmlFor="ai-prompt" className="ai-label">
              Ask a question
            </label>

            <textarea
              id="ai-prompt"
              className="ai-prompt"
              placeholder="Example: Explain why quick sort is fast in practice."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <button
              type="button"
              className="ai-generate-btn"
              onClick={handleGenerate}
              disabled={!prompt.trim() || loading}
            >
              {loading ? "Generating..." : "Generate Explanation"}
            </button>
          </div>

          <div className="ai-output-block">
            <div className="ai-output-header">
              <h3>Response</h3>
              <span className="ai-output-badge">
                {loading ? "Thinking..." : "Ready"}
              </span>
            </div>

            <div className={`ai-output ${!explanation ? "empty" : ""}`}>
              {explanation ? (
                <p className="ai-text">{explanation}</p>
              ) : (
                <div className="ai-empty-state">
                  <p className="ai-empty-title">No explanation generated yet</p>
                  <p className="ai-empty-text">
                    Ask about complexity, behavior, use cases, or why a sorting
                    algorithm performs a certain way.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIExplanation;