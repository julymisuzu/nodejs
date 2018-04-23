var mysql = require('mysql');
var connection = require('./connection.js');
var jsonUrl = './json/books.json';

module.exports = function(request, response) {
  connection.query('DELETE FROM book WHERE id = '+request.body.bookId, function(error, rows, fields) {
    if(error) response.end(error);
    response.end();
  });
};