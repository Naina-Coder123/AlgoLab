module.exports=function mergeSort(inputArray){
    const array=[...inputArray];
    const steps=[];
    const aux=[...array];

    //for merge sort i used an auxiliary array and generated overwrite steps instead of swaps ,because merge sort reconstructs the array rather than swapping elements

    mergeSortHelper(array,0,array.length-1,aux,steps);

    return{
        steps,
        complexity:{
            time:"O(n logn)",
            space:"O(n)",
            stable:true,
        },
    };
};

function mergeSortHelper(mainArray,start,end,auxArray,steps){
    if(start>=end)return;

      const mid=Math.floor((start+end)/2);

      mergeSortHelper(auxArray,start,mid,mainArray,steps);
      mergeSortHelper(auxArray,mid+1,end,mainArray,steps);
      merge(mainArray,start,mid,end,auxArray,steps);
}


function merge(mainArray,start,mid,end,auxArray,steps){
    let i=start;
    let j=mid+1;
    let k=start;

    while(i<=mid && j<=end){
        //compare

        steps.push({
            type:"compare",
            indices:[i,j],
            array:[...mainArray],
        });

        if(auxArray[i]<=auxArray[j]){
            mainArray[k]=auxArray[i];
            steps.push({
                type:"overwrite",
                indices:[k],
                array:[...mainArray],
            });
            i++;
        }else{
            mainArray[k]=auxArray[j];
            steps.push({
                type:"overwrite",
                indices:[k],
                array:[...mainArray],
            });
            j++;
        }
        k++;
    }

    while(i<=mid){
        mainArray[k]=auxArray[i];
        steps.push({
            type:"overwrite",
            indices:[k],
            array:[...mainArray],

        });
        i++;
        k++;
    }

    while(j<=end){
        mainArray[k]=auxArray[j];
        steps.push({
            type:"overwrite",
            indices:[k],
            array:[...mainArray],
        });
        j++;
        k++;
    }
}