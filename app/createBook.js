var fs = require('fs');
var jsonUrl = './json/books.json';

module.exports = function(request, response) {
  fs.readFile(jsonUrl, function(error, data) {
    if(error) {
      console.log('[BOOKS CREATE READ] Error - '+error);
      response.writeHead(404, {'Content-Type': 'text/html'});
      return response.end('An inexpected error occurred.');
    }

    var booksList = JSON.parse(data);
    var newBookId = booksList.livros[booksList.livros.length - 1].id + 1;

    booksList.livros.push({ id: newBookId, name: request.body.book, author: request.body.author });

    fs.writeFile(jsonUrl, JSON.stringify(booksList), function(error) {
      if(error) {
        console.log('[BOOKS CREATE WRITE] Error - '+error);
        response.writeHead(404, {'Content-Type': 'text/html'});
        return response.end('An inexpected error occurred.');
      }
      console.log('The books list has been updated');
      response.end();
    });
  });
}