var fs = require('fs');
var jsonUrl = './json/books.json';

module.exports = function(request, response) {
  fs.readFile(jsonUrl, function(error, data) {
    if(error) {
      console.log('[BOOKS] Error - '+error);
      response.writeHead(404, {'Content-Type': 'text/html'});
      return response.end('An inexpected error occurred.');
    }
    response.send(data);
  });
};