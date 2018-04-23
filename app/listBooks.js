var mysql = require('mysql');
var connection = require('./connection.js');
var jsonUrl = './json/books.json';

module.exports = function(request, response) {
  connection.query('SELECT * FROM book', function(error, rows, fields) {
    if(error) response.end(error);

    var newBooksList = {livros: []};
    rows.forEach(function(item, key) {
      newBooksList.livros.push({ id: item.id, name: item.name, author: item.author });
    });

    response.send(JSON.stringify(newBooksList));
  });
};