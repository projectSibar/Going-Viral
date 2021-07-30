const express = require('express');
const path = require('path');
const { showMembers } = require('./config/member');
const member = require('./config/member');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const bodyParser = require("body-parser");

var router = express.Router();

const app = express();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());

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
  let userID = "";
  if(request.cookies.id !==undefined){
    console.log("로그인 정보있음");
    userID = request.cookies.id;
  }
  response.render('index',{userID:userID});
});

app.get('/join',function(request,response){
  response.render('join',{});
});
app.get('/login',function(request,response){
  let userID = "";
  if(request.cookies.id !==undefined){
    console.log("로그인 정보있음");
    userID = request.cookies.id;
  }
  response.render('login',{userId : userID});
});
//회원가입시
app.post('/join_process',function(request,response){
  member.createMember(request,response);
});

app.post('/login_precess',function(request,response){
  member.loginMember(request,response);
});
app.get('/main',function(request,response){
  let userID = "";
  if(request.cookies.id !==undefined){
    console.log("로그인 정보있음");
  }
  response.render('main',{userID:userID});
});
app.get('/welfare',function(request,response){
  response.render('welfare',{});//복지
});
app.get('/employee',function(request,response){
  response.render('employee',{});//고용
});
app.get('/education',function(request,response){
  response.render('education',{});//교육
});
app.get('/house',function(request,response){
  response.render('house',{});//주거
});
app.get('/culture',function(request,response){
  response.render('culture',{});//문화
});
app.get('/financial',function(request,response){
  response.render('financial',{});//서민금융
});
module.exports = app; //도로명주소 데이터 전달로 인한 모듈로 빼기
app.listen(3000);
