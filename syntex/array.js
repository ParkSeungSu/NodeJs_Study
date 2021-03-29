/*
    Array [data1, data2, data3, data4, data5]
             0      1      2      3      4
    
*/

var arr = ['A','B','C','D'];

console.log(arr[0]);
console.log(arr[3]);
console.log(arr);

arr[2]='F';
console.log(arr);

arr.push('E');

console.log("arr.push \n",arr);
console.log("arr length:",arr.length);

arr.map((e)=>{
    console.log(e);
});

arr.reverse();
console.log('arr.reverse',arr);