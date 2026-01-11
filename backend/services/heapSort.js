module.exports=function heapSort(inputArray){
    const arr=[...inputArray];
    const steps=[];
    const n=arr.length;

    for(let i=Math.floor(n/2)-1;i>=0;i--){
        heapify(arr,n,i,steps);
    }

    for(let i=n-1;i>0;i--){
        [arr[0],arr[i]]=[arr[i],arr[0]];
        steps.push({
            type:"swap",
            indices:[0,i],
            array:[...arr],
        });
        heapify(arr,i,0,steps);
    }

    return{
        steps,
        complexity:{
            time:"O(n log n)",
            space:"O(1)",
            stable:false,
        },
    };
};

function heapify(arr,n,i,steps){
    let largest=i;
    const left=2*i+1;
    const right=2*i+2;

    if(left<n){
        steps.push({
            type:"compare",
            indices:[left,largest],
            array:[...arr],
        });
        if(arr[left]>arr[largest])largest=left;
    }
    if(right<n){
        steps.push({
            type:"compare",
            indices:[right,largest],
            array:[...arr],
        });
        if(arr[right]>arr[largest])largest=right;
    }

    if(largest!=i){
        [arr[i],arr[largest]]=[arr[largest],arr[i]];
        steps.push({
            type:"swap",
            indices:[i,largest],
            array:[...arr],

        });
        heapify(arr,n,largest,steps);
    }
}