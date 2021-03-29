var fs =require('fs');
/*
//readFileSync
    동기식 
console.log("A");
var result = fs.readFileSync('./syntex/sample.txt','utf8');
console.log(result);
console.log('C');
*/



console.log("A");
fs.readFile('./syntex/sample.txt','utf-8', function (err, result) {
    console.log(result);
}); //비동기식 

console.log('C');

