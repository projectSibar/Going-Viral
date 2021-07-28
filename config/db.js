var mysql = require('mysql');

var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'project'
});

conn.connect(); //실제접속

module.exports = conn;

