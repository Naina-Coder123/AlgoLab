import React from "react";
import Bar from "./Bar";
import "./Visualizer.css";

const Visualizer = ({ array, highlights = [], complexity, status }) => {
  const maxValue = Math.max(...array, 1);
  const safeHighlights = Array.isArray(highlights) ? highlights : [];

  return (
    <div className="visualizer-canvas">
      <div className="visualizer-bars">
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

      {status === "finished" && complexity && (
        <p className="visualizer-complexity">
          Array Sorted | Time: {complexity.time}, Space: {complexity.space} | Stable:{" "}
          {complexity.stable ? "Yes" : "No"}
        </p>
      )}
    </div>
  );
};

export default Visualizer;