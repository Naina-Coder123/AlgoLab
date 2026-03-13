module.exports = function countingSort(inputArray) {
  const arr = [...inputArray];
  const steps = [];
  if (arr.length === 0) return { steps, complexity: { time: "O(n+k)", space: "O(n+k)", stable: true } };

  const max = Math.max(...arr);
  const count = new Array(max + 1).fill(0);

  // Step 1: Count frequency
  for (let i = 0; i < arr.length; i++) {
    count[arr[i]]++;

    steps.push({
      array: [...arr],
      highlights: [{ index: i, type: "count" }],
      count: [...count],
      type: "count",
    });
  }

  // Step 2: Prefix sum
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];

    steps.push({
      array: [...arr],
      highlights: [{ index: i, type: "prefix" }],
      count: [...count],
      type: "prefix",
    });
  }

  // Step 3: Build output array
  const output = new Array(arr.length);
  for (let i = arr.length - 1; i >= 0; i--) {
    const val = arr[i];
    const pos = count[val] - 1;
    output[pos] = val;
    count[val]--;

    steps.push({
      array: [...output],
      highlights: [{ index: pos, type: "overwrite" }],
      count: [...count],
      type: "overwrite",
    });
  }

  return {
    steps,
    complexity: {
      time: "O(n + k)",
      space: "O(n + k)",
      stable: true,
    },
  };
};