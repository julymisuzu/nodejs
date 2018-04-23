var mysql = require('mysql');
var connection = require('./connection.js');
var jsonUrl = './json/books.json';

module.exports = function(request, response) {
  var id = request.body.id;
  var book = request.body.book;
  var author = request.body.author;
  var query = 'UPDATE book SET name = "'+ book +'", author = "'+ author + '" WHERE id = '+id;

  connection.query(query, function(error, rows, fields) {
    if(error) response.end(error);
    response.end();
  });
};