module.exports = function bucketSort(inputArray) {
  const arr = [...inputArray];
  const steps = [];

  if (arr.length === 0) return { steps };

  const max = Math.max(...arr);
  const bucketCount = Math.floor(Math.sqrt(arr.length)) || 1;
  const buckets = Array.from({ length: bucketCount }, () => []);

  // Insert elements into buckets
  for (let val of arr) {
    const idx = Math.floor((val / (max + 1)) * bucketCount);
    buckets[idx].push(val);

    steps.push({
      highlights: [], // optionally could highlight bucket insertion differently
      array: [...arr],
      buckets: buckets.map(b => [...b]),
      type: "bucket-insert",
      valueInserted: val,
      bucketIndex: idx,
    });
  }

  // Sort buckets (using insertion sort)
  let index = 0;
  for (let b = 0; b < buckets.length; b++) {
    buckets[b].sort((a, b) => a - b);

    for (let val of buckets[b]) {
      arr[index] = val;

      steps.push({
        highlights: [{ index, type: "overwrite" }], // highlight bar being overwritten
        array: [...arr],
        type: "overwrite",
      });

      index++;
    }
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