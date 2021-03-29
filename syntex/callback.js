
function a(){
    console.log('A');
}

var b = function(){ //익명함수
    console.log('B');
    //js 에서는 함수가 값이다.
}


function slowfunc(callback){
    
    callback();
}

slowfunc(b);

// callback function = parameter 가 반드시 함수인 함수
// 왜 이런 형태인가? => 어플리케이션의 비동기 처리를 위해 필요하다.
// 비동기 처리는 왜 필요한가? => 주어진 요청ㅇ르 동기적으로 처리하면 들어가는 리소스가 많아지기 떄문이다.
