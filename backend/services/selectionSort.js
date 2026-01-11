module.exports=function selectionSort(inputArray){
    const array=[...inputArray];
    const steps=[];

    for(let i=0;i<array.length;i++){
        let minIdx=i;
        for(let j=i+1;j<array.length;j++){
            steps.push({
                type:"compare",
                indices:[minIdx,j],
                array:[...array],
            });

            if(array[j]<array[minIdx]){
                minIdx=j;
            }
        }
        if(minIdx!=i){
            [array[i],array[minIdx]]=[array[minIdx],array[i]];

            steps.push({
                type:"swap",
                indices:[i,minIdx],
                array:[...array],
            });
        }
    }
    return {
        steps,
        complexity:{
            time:"O(N^2)",
            space:"O(1)",
            stable:false,
        },
    };
};