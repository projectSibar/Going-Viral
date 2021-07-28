const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const path = require('path');

const app = http.createServer(function(request,response){

  const _url = request.url;
  const queryData = url.parse(_url. true).query;
  console.log(queryData);
  const pathname = url.parse(_url, true);
  if(pathname ==='/'){
    if(queryData.id === undefined){
      response.writeHead(200);
      response.end('여기까지 들어왔습니다.')
    }else{
      response.writeHead(404);
      response.end('Not Found')
    }
  }
})

app.listen(4500);