module.exports=function countingSort(inputArray){
    const arr=[...inputArray];
    const steps=[];
    if(arr.length==0){
        return {steps };
    }

    const max=Math.max(...arr);
    const count=new Array(max+1).fill(0);

    //count frequency
    for(let i=0;i<arr.length;i++){
        count[arr[i]]++;

        steps.push({
            type:"count",
            value:arr[i],
            count:[...count],
            array:[...arr],
        });
    }
    //prefix sum

    for(let i=1;i<count.length;i++){
        count[i]+=count[i-1];

        steps.push({
            type:"prefix",
            index:i,
            count:[...count],
            array:[...arr],
        });
    }

    //output array
    const output= new Array(arr.length);
    for(let i=arr.elngth-1;i>=0;i--){
        const val=arr[i];
        const pos=count[val]-1;
        output[pos]=val;
        count[val]--;

        steps.push({
            type:"overwrite",
            index:pos,
            value:val,
            output:[...output],
            count:[...count],
        });
    }

    return {
        steps,
        complexity:{
            time:"O(n+k)",
            space:"O(n+k)",
            stable:true,
        },
    };

};