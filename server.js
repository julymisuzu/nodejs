var http = require('http');
var testingData = require('./testingData.js');
var url = require('url');
var fs = require('fs');


http.createServer(function(request, response) {

  fs.rename('test.html', 'testing2.html', function(error) {
    if(error) throw error;
    console.log('File Renamed!');
  })

  response.end();

}).listen(8080);