import React from "react";

const algorithms = [
  { id: "bubble", label: "Bubble" },
  { id: "selection", label: "Selection" },
  { id: "insertion", label: "Insertion" },
  { id: "merge", label: "Merge" },
  { id: "quick", label: "Quick" },
  { id: "heap", label: "Heap" },
  { id: "count", label: "Counting" },
  { id: "bucket", label: "Bucket" },
  { id: "shell", label: "Shell" },
];

const AlgorithmSelector = ({ active, onChange }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "12px",
        marginBottom: "24px",
      }}
    >
      {algorithms.map((algo) => (
        <button
          key={algo.id}
          onClick={() => onChange(algo.id)}
          style={{
            padding: "8px 18px",
            borderRadius: "999px",
            border: "2px solid #6366f1",
            cursor: "pointer",
            fontWeight: 600,
            fontFamily: "Roboto Mono, monospace",
            background: active === algo.id ? "linear-gradient(135deg, #6366f1, #22d3ee)" : "#020617",
            color: active === algo.id ? "#ffffff" : "#c7d2fe",
            boxShadow: active === algo.id ? "0 0 16px rgba(99,102,241,0.8)" : "0 0 4px rgba(99,102,241,0.3)",
            transform: active === algo.id ? "scale(1.05)" : "scale(1)",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = active === algo.id ? "scale(1.05)" : "scale(1)")}
        >
          {algo.label}
        </button>
      ))}
    </div>
  );
};

export default AlgorithmSelector;
