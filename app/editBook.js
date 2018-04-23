var fs = require('fs');
var jsonUrl = './json/books.json';

module.exports = function(request, response) {
  fs.readFile(jsonUrl, function(error, data) {
    if(error) {
      console.log('[BOOKS EDIT READ] Error - '+error);
      response.writeHead(404, {'Content-Type': 'text/html'});
      return response.end('An inexpected error occurred.');
    }

    var booksList = JSON.parse(data);

    booksList.livros[request.body.id].name = request.body.book;
    booksList.livros[request.body.id].author = request.body.author;

    console.log(booksList);
    fs.writeFile(jsonUrl, JSON.stringify(booksList), function(error) {
      if(error) {
        console.log('[BOOKS EDIT WRITE] Error - '+error);
        response.writeHead(404, {'Content-Type': 'text/html'});
        return response.end('An inexpected error occurred.');
      }

      console.log('The books list has been updated');
      response.end();
    });
  })
};