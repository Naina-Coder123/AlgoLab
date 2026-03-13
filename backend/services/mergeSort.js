module.exports = function mergeSort(inputArray) {
  const array = [...inputArray];
  const steps = [];
  const aux = [...array];

  function mergeHelper(start, end, depth) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    mergeHelper(start, mid, depth + 1);
    mergeHelper(mid + 1, end, depth + 1);
    merge(start, mid, end);
  }

  function merge(start, mid, end) {
    let i = start, j = mid + 1, k = start;

    while (i <= mid && j <= end) {
      steps.push({
        array: [...array],
        highlights: [{ index: i, type: "compare" }, { index: j, type: "compare" }],
        type: "compare",
      });

      if (aux[i] <= aux[j]) {
        array[k] = aux[i++];
      } else {
        array[k] = aux[j++];
      }

      steps.push({
        array: [...array],
        highlights: [{ index: k, type: "overwrite" }],
        type: "overwrite",
      });

      k++;
    }

    while (i <= mid) {
      array[k] = aux[i++];
      steps.push({
        array: [...array],
        highlights: [{ index: k, type: "overwrite" }],
        type: "overwrite",
      });
      k++;
    }

    while (j <= end) {
      array[k] = aux[j++];
      steps.push({
        array: [...array],
        highlights: [{ index: k, type: "overwrite" }],
        type: "overwrite",
      });
      k++;
    }
  }

  mergeHelper(0, array.length - 1, 0);

  return {
    steps,
    complexity: { time: "O(n log n)", space: "O(n)", stable: true },
  };
};