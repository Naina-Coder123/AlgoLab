module.exports = function selectionSort(inputArray) {
  const array = [...inputArray];
  const steps = [];

  for (let i = 0; i < array.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < array.length; j++) {
      steps.push({
        array: [...array],
        highlights: [
          { index: minIdx, type: "compare" },
          { index: j, type: "compare" }
        ],
        type: "compare",
      });

      if (array[j] < array[minIdx]) minIdx = j;
    }

    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];

      steps.push({
        array: [...array],
        highlights: [
          { index: i, type: "swap" },
          { index: minIdx, type: "swap" }
        ],
        type: "swap",
      });
    }
  }

  return {
    steps,
    complexity: { time: "O(n^2)", space: "O(1)", stable: false },
  };
};