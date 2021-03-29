var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title,list,body){
  return `
  <!doctype html>
  <html>
  <head>
  <title>WEB1 - ${title}</title>
  <meta charset="utf-8">
  </head>
  <body>
  <h1><a href="/">WEB</a></h1>
  ${list}
  
  ${body}
  </body>
  </html>
  `;
}

function templateList(fileList){
  var list = '<ul>';
  for( var i = 0 ; i<fileList.length;i++){
    list+=`<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
  }
  list = list+'</ul>';
  return list;
}


var app = http.createServer(function(request,response){

    var _url = request.url;
    var pathname=url.parse(_url,true).pathname;
    var queryData= url.parse(_url,true).query;
    var title=queryData.id;

    console.log(pathname);
    
    if(pathname==='/'){
      fs.readFile(`./data/${queryData.id}`,'utf-8',function(err,description){
        if(title === undefined){
          title="Welcome";
          description="Hello Node.js";
        }
        fs.readdir('./data',function(error,fileList){
          console.log(fileList);
          var list = templateList(fileList);

          var template = templateHTML(title,list,`<h2>${title}</h2>${description}`);
          response.writeHead(200);
          response.end(template);
        });
      });

    }else{
      response.writeHead(404);
      response.end("404 Not Found");
    }


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