var http = require('http');
var testingData = require('./testingData.js');
var url = require('url');
var fs = require('fs');


http.createServer(function(request, response) {
  /** Reading a file a printing it's whole content **/
  /** To use this, comment everthing else **/
  var newUrl = url.parse(request.url, true);
  var filename = "." + newUrl.pathname;

  fs.readFile(filename, function(err, data) {
    if(err) {
      response.writeHead(404, {'Content-Type': 'text/html'});
      return response.end('404 Not Found');
    }
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(data);
    return response.end();
  });
  /****/

  // response.end();

}).listen(8080);