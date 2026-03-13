module.exports = function shellSort(inputArray) {
  const array = [...inputArray];
  const steps = [];
  const n = array.length;

  // Start with a big gap, then reduce
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    steps.push({
      array: [...array],
      highlights: [],
      type: "gap",
      gap,
    });

    for (let i = gap; i < n; i++) {
      let temp = array[i];
      let j = i;

      while (j >= gap && array[j - gap] > temp) {
        steps.push({
          array: [...array],
          highlights: [
            { index: j - gap, type: "compare" },
            { index: j, type: "compare" },
          ],
          type: "compare",
        });

        array[j] = array[j - gap];

        steps.push({
          array: [...array],
          highlights: [{ index: j, type: "overwrite" }],
          type: "overwrite",
        });

        j -= gap;
      }

      array[j] = temp;

      steps.push({
        array: [...array],
        highlights: [{ index: j, type: "overwrite" }],
        type: "overwrite",
      });
    }
  }

  return {
    steps,
    complexity: { time: "O(n log n) to O(n^2)", space: "O(1)", stable: false },
  };
};