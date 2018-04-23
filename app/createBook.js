var mysql = require('mysql');
var connection = require('./connection.js');
var jsonUrl = './json/books.json';

module.exports = function(request, response) {
  var id = request.body.id;
  var book = request.body.book;
  var author = request.body.author;

  var querySearch = 'SELECT MAX(id) as id FROM book';
  connection.query(querySearch, function(error, rows, fields) {

    // The Id was created this way just to test nodejs
    var newBookId = rows[0].id + 1;
    var query = 'INSERT INTO book (id, name, author) VALUES ('+newBookId+', "'+ book +'", "'+ author + '")';
  
    connection.query(query, function(error, rows, fields) {
      if(error) response.end(error);
      response.end();
    });
  });
};
