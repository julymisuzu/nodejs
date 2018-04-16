var http = require('http');
var testingData = require('./testingData.js');
var url = require('url');
var fs = require('fs');
var manipulatingEvents = require('./manipulatingEvents.js');


http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end();
}).listen(8080);