var fs = require('fs');
var jsonUrl = './json/books.json';

module.exports = function(request, response) {
  fs.readFile(jsonUrl, function(error, data) {
    if(error) {
      console.log('[BOOKS REMOVE READ] Error - '+error);
      response.writeHead(404, {'Content-Type': 'text/html'});
      return response.end('An inexpected error occurred.');
    }

    var booksList = JSON.parse(data);
    var newBooksList = booksList.livros.filter(function(item) {
      return item.id != request.body.bookId;
    });

    booksList.livros = newBooksList;

    fs.writeFile(jsonUrl, JSON.stringify(booksList), function(error) {
      if(error) {
        console.log('[BOOKS REMOVE WRITE] Error - '+error);
        response.writeHead(404, {'Content-Type': 'text/html'});
        return response.end('An inexpected error occurred.');
      }
      console.log('The books list has been updated');
      response.end();
    });
  })
};