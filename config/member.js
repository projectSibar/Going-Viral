const conn = require('../config/db.js');
const readfile = require('../config/readfile');
const qs = require('querystring');

exports.showMembers = function(request,response){
  conn.query('select * from member',function(err,members,feild){
  let member = readfile.readfile(members)
    //response.writeHead(302, {Location: `/`});홈으로 이동
    response.writeHead(200,{"Content-Type" : "text/html;charset=utf-8"})
    //데이터베이스에서 불러올때 인코딩방법
    response.end(member);
})
};
exports.createMember = function(request,response){
  let name = request.body.name;
  let email = request.body.email;
  let password = request.body.password;
  let number = request.body.number;
  let birth = request.body.birth;
  let job = request.body.job;
  let pay = request.body.pay;
  let pregnancy = Boolean(request.body.pregnancy);
  let pet = Boolean(request.body.pet);
  let careerbreak = Boolean(request.body.careerbreak);
  let car = request.body.car;
  let fuel = request.body.fuel;
  let check1 = Boolean(request.body.check1);
  let check2 = Boolean(request.body.check2);

  conn.query(`insert into member values(?,?,?,?,?,?,?,?,${pregnancy},?,?,${pet},${careerbreak});`,
     [email,password,name,birth,number,"주소",job,pay,car,fuel],// ?값
      function(err,resolve){
        if(err){
          throw err;
        }
        response.writeHead(302, {Location: `/login`});//로그인페이지으로 이동
        response.end();
  })
    
};
