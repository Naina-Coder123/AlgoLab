module.exports = function insertionSort(inputArray) {
  const array = [...inputArray];
  const steps = [];

  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      // Compare step
      steps.push({
        array: [...array],
        highlights: [
          { index: j, type: "compare" },
          { index: j + 1, type: "compare" },
        ],
        type: "compare",
      });

      // Shift
      array[j + 1] = array[j];

      steps.push({
        array: [...array],
        highlights: [{ index: j + 1, type: "overwrite" }],
        type: "overwrite",
      });

      j--;
    }

    // Place key
    array[j + 1] = key;

    steps.push({
      array: [...array],
      highlights: [{ index: j + 1, type: "overwrite" }],
      type: "overwrite",
    });
  }

  return {
    steps,
    complexity: { time: "O(n^2)", space: "O(1)", stable: true },
  };
};