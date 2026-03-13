import React from "react";
import Bar from "./Bar";

const Visualizer = ({ array, highlights = [], complexity, status }) => {
  const maxValue = Math.max(...array, 1);

  // Ensure highlights is always an array
  const safeHighlights = Array.isArray(highlights) ? highlights : [];

  return (
    <div
      style={{
        marginTop: "32px",
        background: "#1e293b",
        padding: "24px",
        borderRadius: "14px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        overflowX: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: "6px",
          height: "350px",
        }}
      >
        {array.map((value, index) => {
          const highlightTypes = safeHighlights
            .filter((h) => h.index === index)
            .map((h) => h.type);

          const colorType = highlightTypes[0] || null;

          return (
            <Bar
              key={index}
              value={value}
              maxValue={maxValue}
              highlight={colorType}
            />
          );
        })}
      </div>

      {/* Complexity display */}
      {status === "finished" && complexity && (
        <p
          style={{
            textAlign: "center",
            marginTop: "16px",
            color: "#14b8a6",
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          ✅ Array Sorted | Time: {complexity.time}, Space: {complexity.space} | Stable:{" "}
          {complexity.stable ? "Yes" : "No"}
        </p>
      )}
    </div>
  );
};

export default Visualizer;