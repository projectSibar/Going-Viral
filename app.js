const express = require('express');
const app = express();
const path = require('path');
const { showMembers } = require('./config/member');
const member = require('./config/member');
` `
//파일 연결하기
app.use(express.static('assets'));
console.log(__dirname);
app.use('/css',express.static(__dirname + 'assets/css'));
app.use('/font',express.static(__dirname + 'assets/font'));
app.use('/ico',express.static(__dirname + 'assets/ico'));
app.use('/img',express.static(__dirname + 'assets/img'));
app.use('/js',express.static(__dirname + 'assets/js'));
app.use('/slick',express.static('./slick'));

app.set('views','views'); // 경로지정
app.set('view engine','ejs');

app.get('',function(request,response){
  response.render('index',{});
});

app.get('/join',function(request,response){
  response.render('join',{});
});
app.get('/login',function(request,response){
  response.render('login',{});
});
//회원가입시 
app.post('/join_process',function(request,response){
  console.log("메인페이지");
  member.showMembers(request,response);
});

app.listen(3000);