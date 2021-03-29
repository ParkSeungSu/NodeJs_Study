var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){

    var _url = request.url;
    var queryData= url.parse(_url,true).query;
    console.log(queryData.id);

    var title=queryData.id;
    console.log(url);
    if(_url=='/'){
        title='Welcome';
    }
    if(_url =='/favicon.ico'){
        return response.writeHead(404);
    }
    response.writeHead(200);
    fs.readFile(`./data/${queryData.id}`,'utf-8',function(err,description){
    
      var template = `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ul>
          <li><a href="/?id=HTML">HTML</a></li>
          <li><a href="/?id=CSS">CSS</a></li>
          <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ul>
        <h2>${title}</h2>
        <p>${description}</p>
      </body>
      </html>
      
      `;
      console.log(__dirname+url);
      response.end(template);
    });
    
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

  CRUD 연산

    Create
    Read
    Update
    Delete
    
*/ 