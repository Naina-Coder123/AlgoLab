module.exports = function mergeSort(inputArray) {
  const array = [...inputArray];
  const steps = [];

  function mergeSortHelper(start, end) {
    if (start > end) return;

    if (start === end) {
      steps.push({
        array: [...array],
        highlights: [{ index: start, type: "sorted" }],
        type: "sorted",
      });
      return;
    }

    const mid = Math.floor((start + end) / 2);

    mergeSortHelper(start, mid);
    mergeSortHelper(mid + 1, end);
    merge(start, mid, end);
  }

  function merge(start, mid, end) {
    const temp = [...array];
    let i = start;
    let j = mid + 1;
    let k = start;

    while (i <= mid && j <= end) {
      steps.push({
        array: [...array],
        highlights: [
          { index: i, type: "compare" },
          { index: j, type: "compare" },
        ],
        type: "compare",
      });

      if (temp[i] <= temp[j]) {
        array[k] = temp[i];
        i++;
      } else {
        array[k] = temp[j];
        j++;
      }

      steps.push({
        array: [...array],
        highlights: [{ index: k, type: "overwrite" }],
        type: "overwrite",
      });

      k++;
    }

    while (i <= mid) {
      array[k] = temp[i];
      steps.push({
        array: [...array],
        highlights: [{ index: k, type: "overwrite" }],
        type: "overwrite",
      });
      i++;
      k++;
    }

    while (j <= end) {
      array[k] = temp[j];
      steps.push({
        array: [...array],
        highlights: [{ index: k, type: "overwrite" }],
        type: "overwrite",
      });
      j++;
      k++;
    }

    for (let idx = start; idx <= end; idx++) {
      steps.push({
        array: [...array],
        highlights: [{ index: idx, type: "sorted" }],
        type: "sorted",
      });
    }
  }

  mergeSortHelper(0, array.length - 1);

  // final full sorted sweep
  for (let i = 0; i < array.length; i++) {
    steps.push({
      array: [...array],
      highlights: [{ index: i, type: "sorted" }],
      type: "sorted",
    });
  }

  return {
    steps,
    complexity: {
      time: "O(n log n)",
      space: "O(n)",
      stable: true,
    },
  };
};
