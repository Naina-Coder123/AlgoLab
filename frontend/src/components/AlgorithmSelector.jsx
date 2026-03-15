import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./AlgorithmSelector.css";

const algorithms = [
  {
    id: "bubble",
    label: "Bubble Sort",
    description: "Simple adjacent swap-based sorting.",
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    stable: "Yes",
    useCase: "Good for learning and understanding basic comparisons and swaps.",
  },
  {
    id: "selection",
    label: "Selection Sort",
    description: "Repeatedly selects the minimum element.",
    best: "O(n²)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    stable: "No",
    useCase: "Useful for small datasets and understanding in-place selection.",
  },
  {
    id: "insertion",
    label: "Insertion Sort",
    description: "Builds the sorted array one item at a time.",
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    stable: "Yes",
    useCase: "Works well for nearly sorted arrays and small inputs.",
  },
  {
    id: "merge",
    label: "Merge Sort",
    description: "Divide-and-conquer with stable merging.",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    space: "O(n)",
    stable: "Yes",
    useCase: "Great when stable sorting is needed and predictable performance matters.",
  },
  {
    id: "quick",
    label: "Quick Sort",
    description: "Fast average-case partition-based sorting.",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n²)",
    space: "O(log n)",
    stable: "No",
    useCase: "Excellent practical performance for many real-world datasets.",
  },
  {
    id: "heap",
    label: "Heap Sort",
    description: "Uses a heap structure for ordering.",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    space: "O(1)",
    stable: "No",
    useCase: "Useful when you want guaranteed O(n log n) and in-place sorting.",
  },
  {
    id: "counting",
    label: "Counting Sort",
    description: "Efficient for bounded integer ranges.",
    best: "O(n + k)",
    average: "O(n + k)",
    worst: "O(n + k)",
    space: "O(k)",
    stable: "Yes",
    useCase: "Best for integers within a limited known range.",
  },
  {
    id: "bucket",
    label: "Bucket Sort",
    description: "Distributes values into buckets first.",
    best: "O(n + k)",
    average: "O(n + k)",
    worst: "O(n²)",
    space: "O(n + k)",
    stable: "Depends",
    useCase: "Useful when input is uniformly distributed across a range.",
  },
  {
    id: "shell",
    label: "Shell Sort",
    description: "Gap-based improvement over insertion sort.",
    best: "Depends on gap sequence",
    average: "≈ O(n^1.3 to n^1.5)",
    worst: "O(n²)",
    space: "O(1)",
    stable: "No",
    useCase: "A practical improvement over insertion sort for medium-sized data.",
  },
];

const AlgorithmDetailsModal = ({ algo, onClose, onSelect }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.classList.add("modal-open");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className="algorithm-modal-overlay" onClick={onClose}>
      <div className="algorithm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="algorithm-modal-header">
          <div>
            <p className="algorithm-modal-kicker">Algorithm Details</p>
            <h3>{algo.label}</h3>
          </div>

          <button
            type="button"
            className="algorithm-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <p className="algorithm-modal-description">{algo.description}</p>

        <div className="algorithm-modal-grid">
          <div className="algorithm-modal-item">
            <span>Best Case</span>
            <strong>{algo.best}</strong>
          </div>
          <div className="algorithm-modal-item">
            <span>Average Case</span>
            <strong>{algo.average}</strong>
          </div>
          <div className="algorithm-modal-item">
            <span>Worst Case</span>
            <strong>{algo.worst}</strong>
          </div>
          <div className="algorithm-modal-item">
            <span>Space</span>
            <strong>{algo.space}</strong>
          </div>
          <div className="algorithm-modal-item">
            <span>Stable</span>
            <strong>{algo.stable}</strong>
          </div>
        </div>

        <div className="algorithm-modal-usecase">
          <h4>Use case</h4>
          <p>{algo.useCase}</p>
        </div>

        <div className="algorithm-modal-actions">
          <button type="button" className="secondary-btn" onClick={onClose}>
            Close
          </button>

          <button
            type="button"
            className="primary-btn"
            onClick={() => {
              onSelect(algo.id);
              onClose();
            }}
          >
            Select Algorithm
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

const AlgorithmSelector = ({ active, onChange }) => {
  const [selectedAlgo, setSelectedAlgo] = useState(null);

  return (
    <>
      <div className="algorithm-grid">
        {algorithms.map((algo) => (
          <div
            key={algo.id}
            className={`algorithm-card ${active === algo.id ? "active" : ""}`}
          >
            <button
              type="button"
              className="algorithm-card-main"
              onClick={() => onChange(algo.id)}
            >
              <span className="algorithm-card-title">{algo.label}</span>
              <span className="algorithm-card-text">{algo.description}</span>
            </button>

            <button
              type="button"
              className="algorithm-details-btn"
              onClick={() => setSelectedAlgo(algo)}
            >
              Details
            </button>
          </div>
        ))}
      </div>

      {selectedAlgo && (
        <AlgorithmDetailsModal
          algo={selectedAlgo}
          onClose={() => setSelectedAlgo(null)}
          onSelect={onChange}
        />
      )}
    </>
  );
};

export default AlgorithmSelector;