/*
    코드를 정리 정돈해서 재활용성을 높여주는 도구인 함수의 기본 문법
*/

function f1(){
    console.log('this is f1');
    console.log('call f2');
    f2();
}

function f2(){
    console.log('this is f2');
    console.log('call f3');
    f3();
}

function f3(){
    console.log('this is f3');
}

var i = 0 ;
while(i<3){
    console.log(`${i} start`);
    f1();
    i+=1;
}