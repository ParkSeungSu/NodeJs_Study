module.exports ={
    html:function(title,list,body,control){
        return `
        <!doctype html>
        <html>
        <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="./style.css">
        </head>
        <body>
        <h1 class="title"><a href="/">WEB</a></h1>
        <div class="list">
        ${list}
        </div>
        <div class="control">
        ${control}
        </div>
        <div class="body">
        ${body}
        </div>
        </body>
        </html>
        `;
      },
      list:function(fileList){
        var list = '<ul>';
        for( var i = 0 ; i<fileList.length;i++){
          list+=`<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
        }
        list = list+'</ul>';
        return list;
      }
};