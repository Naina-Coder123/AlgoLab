module.exports=function bucketSort(inputArray){
    const arr=[...inputArray];
    const steps=[];

    if(arr.length===0)return {steps};

    const max=Math.max(...arr);
    const bucketCount=Math.floor(Math.sqrt(arr.length))||1;
    const buckets=Array.from({length:bucketCount},()=>[]);

for (let val of arr) {
    const idx = Math.floor((val / (max + 1)) * bucketCount);
    buckets[idx].push(val);

    steps.push({
      type: "bucket-insert",
      bucket: idx,
      value: val,
      buckets: buckets.map(b => [...b]),
    });
  }

  // Sort buckets (using insertion sort)
  let index = 0;
  for (let b = 0; b < buckets.length; b++) {
    buckets[b].sort((a, b) => a - b);

    for (let val of buckets[b]) {
      arr[index++] = val;

      steps.push({
        type: "overwrite",
        index: index - 1,
        value: val,
        array: [...arr],
      });
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