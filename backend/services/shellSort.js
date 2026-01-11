module.exports=function shellSort(inputArray){
    const arr=[...inputArray];
    const steps=[];
    const n=arr.length;

    for(let gap=Math.floor(n/2);gap>0;gap=Math.floor(gap/2)){
        steps.push({
            type:"gap",
            gap,
            array:[...arr],
        });

        for(let i=gap;i<n;i++){
            let temp=arr[i];
            let j=i;
            while(j>=gap && arr[j-gap]<temp){
                steps.push({
                    type:"compare",
                    indices:[j-gap,j],
                    array:[...arr],
                });
                arr[j]=arr[j-gap];
                steps.push({
                    type:"overwrite",
                    index:j,
                    value:arr[j],
                    array:[...arr],
                });

                j-=gap;
            }

            arr[j]=temp;
            steps.push({
                type:"overwrite",
                index:j,
                value:temp,
                array:[...arr],
            });
        }
    }

    return {
        steps,
        complexity:{
            time:"O(log n ) to O(n^2)",
            space:"O(1)",
            stable:false,
        },
    };
};