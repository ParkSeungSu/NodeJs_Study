var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var path = require('path');
var template = require('./template');
var sanitizeHtml = require('sanitize-html');
var express = require('express');

var app = http.createServer(function(request,response){

    var _url = request.url;
    var pathname=url.parse(_url,true).pathname;
    var queryData= url.parse(_url,true).query;
    var contorl=``;
    
    console.log(pathname);
    
    if(pathname==='/'){
      
      fs.readdir('./data',function(error,fileList){
        if(queryData.id === undefined){
          var filteredId = '';
        }else{
          var filteredId = path.parse(queryData.id).base;
        }
        fs.readFile(`./data/${filteredId}`,'utf-8',function(err,description){
          var title=queryData.id;
          if(title === undefined){
            title="Welcome";
            description="Hello Node.js";
            contorl=`<a href="/create">CREATE</a>`
            var list = template.list(fileList);
            var html = template.html(title,list,`<h2>${title}</h2>${description}`,contorl);
            response.writeHead(200);
            response.end(html);
          }else{
            var sanitizedTitle = sanitizeHtml(title);
            var sanitizeDescription = sanitizeHtml(description);
            contorl=`<a href="/create">CREATE</a>
            <a href="/update?id=${sanitizedTitle}">UPDATE</a>
            <form action='/delete_process' method="post">
            <input type="hidden" name="id" value="${sanitizedTitle}">
            <input type="submit" value="delete">
            </form>`;
            console.log(fileList);
            console.log(description);
            var list = template.list(fileList);
            var html = template.html(sanitizedTitle,list,`<h2>${sanitizedTitle}</h2>${sanitizeDescription}`,contorl);
            response.writeHead(200);
            response.end(html);
          }
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
          // if(err){
          //   throw err;
          // }
          
          response.writeHead(302,{Location : `/?id=${title}`});
          response.end();
          //redirection

        });
      });
    
    }else if(pathname==='/update'){
      fs.readdir('./data',function(error,fileList){
        var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`,'utf-8',function(err,description){

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
        var filteredId=path.parse(id).base;
        fs.unlink(`data/${filteredId}`,function(err){
          response.writeHead(302,{Location:`/`});
          response.end(); 
        });       
      }); 
    }else{
      
      response.writeHead(404);
      response.end("404 Not Found");
    
    }


});
app.use
app.listen(3000);
/*
    programming ??? ????????? ???????????? ????????? data??? ????????? ???????????????
    ????????? data type?????? ?????? ?????????
        Number- ?????? 
        String- ??????
        Boolean- ??????(True Fasle)
        Array
        Object
        ...

  CRUD ??????

    Create
    Read
    Update
    Delete



  pm2 start main.js --watch => ???????????? ???????????? ??????
    
  pm2??? ????????? ??? --watch ????????? ?????? ????????? ??????????????? ??? ?????? ??????????????? ?????????.
  ??? data ??????????????? ????????? ??????????????? ??? ???????????? ???????????? ?????? ?????????. 
  ?????? ????????? ???????????? ???????????? data ??????????????? ???????????? watch??? ?????? ????????? ???????????? ?????????. 
  ????????? ????????? ????????? ??? ????????????. 

  pm2 delete main
  pm2 start main.js --watch --ignore-watch="data/*"


  API (Application Programming Interface)
*/ 