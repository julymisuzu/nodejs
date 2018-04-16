var http = require('http');
var testingData = require('./testingData.js');
var url = require('url');
var fs = require('fs');


http.createServer(function(request, response) {

  fs.readFile('test.html', function(err, data) {
    response.write(data);
    response.end();
  });

}).listen(8080);