module.exports = function bucketSort(inputArray) {
  const arr = [...inputArray];
  const steps = [];

  if (arr.length === 0) {
    return {
      steps,
      complexity: {
        time: "O(n + k)",
        space: "O(n)",
        stable: true,
      },
    };
  }

  const max = Math.max(...arr);
  const bucketCount = Math.floor(Math.sqrt(arr.length)) || 1;
  const buckets = Array.from({ length: bucketCount }, () => []);

  // Step 1: Distribute values into buckets
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    const bucketIndex = Math.floor((val / (max + 1)) * bucketCount);
    buckets[bucketIndex].push(val);

    steps.push({
      array: [...arr],
      highlights: [{ index: i, type: "compare" }],
      type: "bucket-insert",
    });
  }

  // Step 2: Sort each bucket manually and rebuild the main array
  let outputIndex = 0;

  for (let b = 0; b < buckets.length; b++) {
    // insertion sort inside each bucket so we can create more steps
    for (let i = 1; i < buckets[b].length; i++) {
      let key = buckets[b][i];
      let j = i - 1;

      while (j >= 0 && buckets[b][j] > key) {
        buckets[b][j + 1] = buckets[b][j];
        j--;
      }

      buckets[b][j + 1] = key;
    }

    // overwrite back into main array step by step
    for (let i = 0; i < buckets[b].length; i++) {
      arr[outputIndex] = buckets[b][i];

      steps.push({
        array: [...arr],
        highlights: [{ index: outputIndex, type: "overwrite" }],
        type: "overwrite",
      });

      outputIndex++;
    }
  }

  // Step 3: Mark sorted
  for (let i = 0; i < arr.length; i++) {
    steps.push({
      array: [...arr],
      highlights: [{ index: i, type: "sorted" }],
      type: "sorted",
    });
  }

  return {
    steps,
    complexity: {
      time: "O(n + k)",
      space: "O(n)",
      stable: true,
    },
  };
};