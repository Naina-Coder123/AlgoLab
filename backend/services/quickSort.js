module.exports = function quickSort(inputArray) {
  const array = [...inputArray];
  const steps = [];

  function helper(low, high) {
    if (low > high) return;

    if (low === high) {
      steps.push({
        array: [...array],
        highlights: [{ index: low, type: "sorted" }],
        type: "sorted",
      });
      return;
    }

    steps.push({
      array: [...array],
      highlights: [{ index: low, type: "pivot" }],
      type: "pivot",
    });

    const pivotIndex = partition(low, high);

    steps.push({
      array: [...array],
      highlights: [{ index: pivotIndex, type: "sorted" }],
      type: "sorted",
    });

    helper(low, pivotIndex - 1);
    helper(pivotIndex + 1, high);
  }

  function partition(low, high) {
    const pivot = array[low];
    let i = low + 1;
    let j = high;

    while (i <= j) {
      while (i <= high && array[i] <= pivot) {
        steps.push({
          array: [...array],
          highlights: [
            { index: i, type: "compare" },
            { index: low, type: "pivot" },
          ],
          type: "compare",
        });
        i++;
      }

      while (j > low && array[j] > pivot) {
        steps.push({
          array: [...array],
          highlights: [
            { index: j, type: "compare" },
            { index: low, type: "pivot" },
          ],
          type: "compare",
        });
        j--;
      }

      if (i < j) {
        [array[i], array[j]] = [array[j], array[i]];

        steps.push({
          array: [...array],
          highlights: [
            { index: i, type: "swap" },
            { index: j, type: "swap" },
          ],
          type: "swap",
        });
      }
    }

    if (j !== low) {
      [array[low], array[j]] = [array[j], array[low]];

      steps.push({
        array: [...array],
        highlights: [
          { index: low, type: "swap" },
          { index: j, type: "swap" },
        ],
        type: "swap",
      });
    }

    return j;
  }

  helper(0, array.length - 1);

  // Final pass to ensure fully sorted visualization
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
      time: "O(n log n) avg, O(n^2) worst",
      space: "O(log n)",
      stable: false,
    },
  };
};