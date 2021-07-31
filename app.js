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
app.use(logger('dev'));
app.use(express.json());//json형식 주고받는 설정부분
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('',function(request,response){ //로그인안된 메인페이지
  response.render('index',{});
});

app.get('/join',function(request,response){ //회원가입페이지로 이동
  response.render('join',{});
});

app.get('/login',function(request,response){ //로그인페이지로 이동
  let userID = "";
  if(request.cookies.id !==undefined){
    userID = request.cookies.id;
    console.log("쿠키저장" ,userID);//전에 로그인을 했다면 아이디저장
  }
  response.render('login',{'id' : userID});
});

app.post('/join_process',function(request,response){//실질적 회원가입 기능실행
  member.createMember(request,response);
});

app.post('/login_precess',function(request,response){//실질적 로그인 기능실행
  member.loginMember(request,response);
});

app.get('/main',function(request,response){//로그인후 메인페이지로 이동
  let userID = "";
  if(request.cookies.id !==undefined){
    userID = request.cookies.id;
    console.log("쿠키저장" ,userID); //로그인후 메인에서 아이디 띄워주기 위한 쿠키저장
  }
  response.render('main',{'id':userID});
});

app.get('/logout',function(request,response){ //로그아웃시 쿠키삭제후 로그인전 메인페이지로 이동
  console.log('request.cookies.id >',request.cookies.id);
  response.clearCookie('id'); //해당하는 쿠키 삭제
  response.render('index',{});
});

//카테고리 페이지로 이동
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
