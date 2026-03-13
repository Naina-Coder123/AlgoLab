module.exports = function bubbleSort(inputArray) {
  const array = [...inputArray];
  const steps = [];
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Compare step: highlight both bars
      steps.push({
        highlights: [
          { index: j, type: "compare" },
          { index: j + 1, type: "compare" },
        ],
        array: [...array],
        type: "compare",
      });

      if (array[j] > array[j + 1]) {
        // Swap
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        steps.push({
          highlights: [
            { index: j, type: "swap" },
            { index: j + 1, type: "swap" },
          ],
          array: [...array],
          type:"swap"
        });
      }
    }
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