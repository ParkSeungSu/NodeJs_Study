
var o = {
    v1:'v1',
    v2:'v2',
    f1:function(){
        console.log(this.v1);
    },
    f2:function(){
        console.log(this.v2);
    }
};
console.log(o);
o.f1();
o.f2();
o.dog="puppy"; // 추가
console.log(o);