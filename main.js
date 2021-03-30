var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var template = require('./template');

var app = http.createServer(function(request,response){

    var _url = request.url;
    var pathname=url.parse(_url,true).pathname;
    var queryData= url.parse(_url,true).query;
    var contorl=``;
    
    console.log(pathname);
    
    if(pathname==='/'){
      var title=queryData.id;
      contorl=`<a href="/create">CREATE</a>
      <a href="/update?id=${title}">UPDATE</a>
      <form action='/delete_process' method="post">
        <input type="hidden" name="id" value="${title}">
        <input type="submit" value="delete">
      </form>`;
      
      fs.readFile(`./data/${title}`,'utf-8',function(err,description){
        if(title === undefined){
          title="Welcome";
          description="Hello Node.js";
          contorl=`<a href="/create">CREATE</a>`
        }

        fs.readdir('./data',function(error,fileList){
          console.log(fileList);
          var list = template.list(fileList);
          var html = template.html(title,list,`<h2>${title}</h2>${description}`,contorl);
          response.writeHead(200);
          response.end(html);
        });
      });

    }else if(pathname === '/create'){
      
        fs.readdir('./data',function(error,fileList){
          console.log(fileList);
          var list = template.list(fileList);
          var title = 'Web - Create';
          var html = template.html(title,list,`
          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
              <p>
                <textarea name="description" placeholder="description"></textarea>
              </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `,'');
          response.writeHead(200);
          response.end(html);
        });
    
    }else if(pathname === '/create_process'){

      var body='';
      request.on('data',function(data){
        body+=data;
      });
      request.on('end',function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        fs.writeFile(`./data/${title}`,description,'utf-8',function(err){
          if(err){
            throw err;
          }
          
          response.writeHead(302,{Location : `/?id=${title}`});
          response.end();
          //redirection

        });
      });
    
    }else if(pathname==='/update'){
      fs.readdir('./data',function(error,fileList){
        fs.readFile(`data/${queryData.id}`,'utf-8',function(err,description){

          console.log(fileList);
          var list = template.list(fileList);
          var title = queryData.id;
          var html = template.html(title,list,`
          <form action="/update_process" method="post">
          <input type='hidden' name='id' value="${title}">
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
          <p>
          <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
          <input type="submit">
          </p>
          </form>
          `,'');
          response.writeHead(200);
          response.end(html);
        });
      });
  
    }else if(pathname==='/update_process'){
      var body = '';
      request.on('data',function(data){
        body+=data;
      });
      request.on('end',function(){
        var post=qs.parse(body);
        var id = post.id;
        var title = post.title;
        var description = post.description;

        fs.rename(`data/${id}`,`data/${title}`,function(err){

          fs.writeFile(`data/${title}`,description,'utf-8',function(err){
            response.writeHead(302,{Location:`/?id=${title}`});
            response.end();
          });
        });
        
      });
    }else if (pathname==='/delete_process'){
      var body = '';
      request.on('data',function(data){
        body+=data;
      });
      request.on('end',function(){
        var post=qs.parse(body);
        var id = post.id;
        fs.unlink(`data/${id}`,function(err){
          response.writeHead(302,{Location:`/`});
          response.end(); 
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



  pm2 start main.js --watch => 자동으로 변경사항 적용
    
  pm2를 실행할 때 --watch 옵션을 주면 파일이 변경되었을 때 앱을 리로드하게 됩니다.
  즉 data 디렉토리의 파일이 수정되었을 때 리로드가 일어나게 되는 것이죠. 
  이런 문제를 방지하기 위해서는 data 디렉토리에 대해서는 watch를 하지 않도록 설정해야 합니다. 
  아래의 방법이 도움이 될 것입니다. 

  pm2 delete main
  pm2 start main.js --watch --ignore-watch="data/*"


*/ 