module.exports=function insertionSort(inputArray){
    const array=[...inputArray];
    const steps=[];

    for(let i=1;i<array.length;i++){
        let key=array[i];
        let j=i-1;

        while(j>=0 && array[j]>key){
            steps.push({
                type:"compare",
                indices:[j,j+1],
                array:[...array],
            }),

            array[j+1]=array[j];

            steps.push({
                type:"overwrite",
                indices:[j+1],
                array:[...array],


            });
            j--;
        }
        array[j+1]=key;
        steps.push({
            type:"overwrite",
            indices:[j+1],
            array:[...array],
        });
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
