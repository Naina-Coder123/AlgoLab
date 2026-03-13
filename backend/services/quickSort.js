module.exports = function quickSort(inputArray) {
  const array = [...inputArray];
  const steps = [];

  function helper(low, high, depth) {
    if (low >= high) return;

    steps.push({
      array: [...array],
      highlights: [{ index: low, type: "pivot" }],
      type: "recursion",
      range: [low, high],
      depth,
    });

    const pivotIndex = partition(low, high);

    helper(low, pivotIndex - 1, depth + 1);
    helper(pivotIndex + 1, high, depth + 1);
  }

  function partition(low, high) {
    const pivot = array[low];
    let i = low + 1, j = high;

    while (i <= j) {
      while (i <= high && array[i] <= pivot) {
        steps.push({
          array: [...array],
          highlights: [{ index: i, type: "compare" }, { index: low, type: "compare" }],
          type: "compare",
        });
        i++;
      }

      while (array[j] > pivot) {
        steps.push({
          array: [...array],
          highlights: [{ index: j, type: "compare" }, { index: low, type: "compare" }],
          type: "compare",
        });
        j--;
      }

      if (i < j) {
        [array[i], array[j]] = [array[j], array[i]];
        steps.push({
          array: [...array],
          highlights: [{ index: i, type: "swap" }, { index: j, type: "swap" }],
          type: "swap",
        });
      }
    }

    if (j !== low) {
      [array[low], array[j]] = [array[j], array[low]];
      steps.push({
        array: [...array],
        highlights: [{ index: low, type: "swap" }, { index: j, type: "swap" }],
        type: "swap",
      });
    }

    return j;
  }

  helper(0, array.length - 1, 0);

  return {
    steps,
    complexity: { time: "O(n log n) avg, O(n^2) worst", space: "O(log n)", stable: false },
  };
};