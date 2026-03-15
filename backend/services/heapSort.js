module.exports = function heapSort(inputArray) {
  const arr = [...inputArray];
  const steps = [];
  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, steps);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];

    steps.push({
      array: [...arr],
      highlights: [
        { index: 0, type: "swap" },
        { index: i, type: "swap" },
      ],
      type: "swap",
    });

    // Mark extracted element as sorted
    steps.push({
      array: [...arr],
      highlights: [{ index: i, type: "sorted" }],
      type: "sorted",
    });

    heapify(arr, i, 0, steps);
  }

  // First element also becomes sorted at the end
  if (n > 0) {
    steps.push({
      array: [...arr],
      highlights: [{ index: 0, type: "sorted" }],
      type: "sorted",
    });
  }

  // Final full sorted sweep
  for (let i = 0; i < arr.length; i++) {
    steps.push({
      array: [...arr],
      highlights: [{ index: i, type: "sorted" }],
      type: "sorted",
    });
  }

  return {
    steps,
    complexity: {
      time: "O(n log n)",
      space: "O(1)",
      stable: false,
    },
  };
};

function heapify(arr, n, i, steps) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n) {
    steps.push({
      array: [...arr],
      highlights: [
        { index: left, type: "compare" },
        { index: largest, type: "compare" },
      ],
      type: "compare",
    });

    if (arr[left] > arr[largest]) {
      largest = left;
    }
  }

  if (right < n) {
    steps.push({
      array: [...arr],
      highlights: [
        { index: right, type: "compare" },
        { index: largest, type: "compare" },
      ],
      type: "compare",
    });

    if (arr[right] > arr[largest]) {
      largest = right;
    }
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];

    steps.push({
      array: [...arr],
      highlights: [
        { index: i, type: "swap" },
        { index: largest, type: "swap" },
      ],
      type: "swap",
    });

    heapify(arr, n, largest, steps);
  }
}