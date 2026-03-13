import { useState } from "react";

const AIExplanation = ({ explanation, loading, onGenerate }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [prompt, setPrompt] = useState("");

  return (
     <div className={`ai-panel ${collapsed ? "collapsed" : ""}`}>      {/* Header */}
      <div className="ai-header">
        <h2>AI Assistant</h2>
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "⮜" : "⮞"}
        </button>
      </div>

      {!collapsed && (
        <>
          {/* Prompt Input */}
          <textarea
            className="ai-prompt"
            placeholder="Ask about this algorithm..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          {/* Generate Button */}
          <button
            className="ai-generate-btn"
            onClick={() => onGenerate(prompt)}
            disabled={!prompt.trim() || loading}
          >
            {loading ? "Generating..." : "Generate"}
          </button>

          {/* Output */}
          <div className="ai-output">
            <pre className="ai-text">
              {explanation || "AI explanation will appear here"}
            </pre>
          </div>
        </>
      )}
    </div>
  );
};

export default AIExplanation;