var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){

    var _url = request.url;
    var queryData= url.parse(_url,true).query;
    console.log(queryData.id);
    console.log(url);
    if(_url=='/'){
        _url='/index.html';
    }
    if(_url =='/favicon.ico'){
        return response.writeHead(404);
    }
    response.writeHead(200);
    console.log(__dirname+url);
    response.end(queryData.id);
    
});

app.listen(3000);
/*
    programming 을 배우는 과정에서 각각의 data를 어떻게 처리하는가
    어떠한 data type들을 제공 하는가
        Number- 숫자 
        String- 문자
        Boolean- 논리(True Fasle)
        Array
        Object
        ...
*/ 