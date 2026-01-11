module.exports=function quickSort(inputArray){
    const array=[...inputArray];
    const steps=[];

    quickSortHelper(array,0,array.length-1,steps,0);

    return {
        steps,
        complexity:{
            time:"O(n log n ) average ,O(n^2) worst",
            space:"O(log n)",
            stable:false,
        },
    };
};

function quickSortHelper(arr,low,high,steps,depth){
    if(low<high){
         steps.push({
      type: "recursion",
      range: [low, high],
      depth,
      array: [...arr],
    });
        const pivotIndex=partition(arr,low,high,steps);

 if (low < pivotIndex - 1) {
      steps.push({
        type: "recursion",
        range: [low, pivotIndex - 1],
        side: "left",
        depth: depth + 1,
        array: [...arr],
      });
        quickSortHelper(arr,low,pivotIndex-1,steps);
    }
 if (pivotIndex + 1 < high) {
      steps.push({
        type: "recursion",
        range: [pivotIndex + 1, high],
        side: "right",
        depth: depth + 1,
        array: [...arr],
      });
        quickSortHelper(arr,pivotIndex+1,high,steps);
    }
}
    }


function partition(arr,low,high,steps){
    const pivot =arr[low];
    steps.push({
        type:"pivot",
        index:low,
        array:[...arr],
    });
    let i=low+1;
    let j=high;
    while(i<j){
        while(i<=high && arr[i]<=pivot ){
              steps.push({
          type: "compare",
        indices: [i, low],
        array: [...arr],
      });
            i++;
        }
        while(arr[j]>pivot && j>low){
        steps.push({
        type: "compare",
        indices: [j, low],
        array: [...arr],
      });
            j--;
        }
        if(i<j){
            [arr[i],arr[j]]=[arr[j],arr[i]];

            steps.push({
                type:"swap",
                indices:[i,j],
                array:[...arr],
            });
        }
    }
  if (j !== low) {
  [arr[low], arr[j]] = [arr[j], arr[low]];

  steps.push({
    type: "swap",
    indices: [low, j],
    array: [...arr],
  });
}
    return j;
}