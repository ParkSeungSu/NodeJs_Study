/*
 
    Object Oriented programming
    OOP
*/

var f = function(){
    console.log(1+1);
    console.log(1+2);
};
console.log(f);

f();

var a = [f];

a[0]();

var o = {
    function:f
};

o.function();
//var i = if(true){console.log(1)};
//var i = while(true){console.log(1)};
//값이 안됨