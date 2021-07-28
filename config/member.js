const conn = require('../config/db.js');
const readfile = require('../config/readfile');
const qs = require('querystring');

var body = "";

exports.showMembers = function(request,response){
  conn.query('select * from member',function(err,members,feild){
  let member = readfile.readfile(members)
    //response.writeHead(302, {Location: `/`});홈으로 이동
    response.writeHead(200,{"Content-Type" : "text/html;charset=utf-8"})
    //데이터베이스에서 불러올때 인코딩방법
    response.end(member);
})
}
exports.createMember = function(request,response){
  console.log("createmember로 들어옴");
  var body = '';
  request.on('data', function(data){ //폼으로 읽어온 데이터 합치기
      body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
      console.log(post.email);
      console.log(post.password);
      console.log(post.name);
      console.log(post.number);
      console.log(post.job);
      console.log(post.pay);
      console.log(post.childbirth);
      console.log(post.car);
      console.log(post.fuel);
      console.log(post.birth);
      console.log(post.address);
      console.log(post.pet);
      console.log(post.careerbreak);
//불값은 백틱으로 값을 넣어야 함(안그러면 String으로 들어가서 값이 안들어감)
     conn.query(`insert into member values(?,?,?,?,?,?,?,?,${post.childbirth},?,?,${post.pet},${post.careerbreak});`,
     [post.email,post.password,post.name,post.birth,post.number,post.address,post.job,post.pay,post.car,post.fuel],// ?값
      function(err,resolve){
        if(err){
          throw err;
        }
        response.writeHead(302, {Location: `/login`});//로그인페이지으로 이동
        response.end();

      })
    }) 
  };
