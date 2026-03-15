module.exports = function insertionSort(inputArray) {
  const array = [...inputArray];
  const steps = [];

  for (let i = 1; i < array.length; i++) {
    const key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      steps.push({
        array: [...array],
        highlights: [
          { index: j, type: "compare" },
          { index: j + 1, type: "compare" },
        ],
        type: "compare",
      });

      array[j + 1] = array[j];

      steps.push({
        array: [...array],
        highlights: [{ index: j + 1, type: "overwrite" }],
        type: "overwrite",
      });

      j--;
    }

    array[j + 1] = key;

    steps.push({
      array: [...array],
      highlights: [{ index: j + 1, type: "overwrite" }],
      type: "overwrite",
    });

    // Mark sorted prefix up to i
    for (let k = 0; k <= i; k++) {
      steps.push({
        array: [...array],
        highlights: [{ index: k, type: "sorted" }],
        type: "sorted",
      });
    }
  }

  // Handle single-element array
  if (array.length === 1) {
    steps.push({
      array: [...array],
      highlights: [{ index: 0, type: "sorted" }],
      type: "sorted",
    });
  }

  return {
    steps,
    complexity: {
      time: "O(n^2)",
      space: "O(1)",
      stable: true,
    },
  };
};