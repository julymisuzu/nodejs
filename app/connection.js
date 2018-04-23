var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'books'
});

connection.connect(function() {
  console.log('connected');
});

module.exports = connection;