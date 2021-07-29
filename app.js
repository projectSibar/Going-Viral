const express = require('express');
const app = express();
const path = require('path');
const { showMembers } = require('./config/member');
const member = require('./config/member');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const bodyParser = require("body-parser");

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
//json형식 주고받는 설정부분
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  console.log("조인시 조인프로세스 들어옴");
  member.createMember(request,response);
});
module.exports = app; //도로명주소 데이터 전달로 인한 모듈로 빼기
app.listen(3000);
