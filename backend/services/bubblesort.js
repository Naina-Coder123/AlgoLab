// {
//     type:"compare" | "swap",
//     indices:[i,j],
//     array:[..currentArray]
// }


module.exports=function bubbleSort(inputArray){
    const array=[...inputArray];
    const steps=[];

    const n=array.length;

    for(let i=0;i<n-1;i++){
        for(let j=0;j<n-i-1;j++){
            //compare step

            steps.push({
                 type:"compare",
                 indices:[i,j+1],
                 array:[...array],
            });

            if(array[j]>array[j+1]){
                //swap
                [array[j],array[j+1]]=[array[j+1],array[j]];

                steps.push({
                    type:"swap",
                    indices:[j,j+1],
                    array:[...array],
                });
            }
        }
    }
    return {
        steps,
        complexity:{
            time:"O(n^2)",
            space:"O(1)",
            stable:true,
        },
    };
};