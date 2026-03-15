module.exports = function bubbleSort(inputArray) {
  const array = [...inputArray];
  const steps = [];
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        highlights: [
          { index: j, type: "compare" },
          { index: j + 1, type: "compare" },
        ],
        array: [...array],
        type: "compare",
      });

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        steps.push({
          highlights: [
            { index: j, type: "swap" },
            { index: j + 1, type: "swap" },
          ],
          array: [...array],
          type: "swap",
        });
      }
    }

    // Last element of this pass is in correct position
    steps.push({
      highlights: [{ index: n - i - 1, type: "sorted" }],
      array: [...array],
      type: "sorted",
    });
  }

  // First element also becomes sorted at the end
  if (n > 0) {
    steps.push({
      highlights: [{ index: 0, type: "sorted" }],
      array: [...array],
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