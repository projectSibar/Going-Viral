const conn = require('../config/db.js');
const qs = require('querystring');

var body = "";

exports.showMembers = function(request,response){
  conn.query('select * from member',function(err,members,feild){
    console.log(members[0].name);
  request.on('data', function(data){
    body = body + data;
  });

})
}