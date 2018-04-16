var http = require('http');
var testingData = require('./testingData.js');
var url = require('url');


http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});

  response.write('<h1>Hello World!</h1>');
  response.write('<br>'+'Data: '+testingData.myDateTime());
  response.write('<br>'+request.url);

  var q = url.parse('http://localhost:8080/default.htm?year=2017&month=february', true);
  var txt = q.query.year + " " + q.query.month;
  response.write('<br>'+txt);

  /** Writing NodeJS url.parse info **/
  var nodeKeys = Object.keys(q);
  var nodeValues = Object.values(q);

  console.log('Node length: '+nodeKeys.length);
  for(var i = 0; i < nodeKeys.length; i++) {
    var keyValue = nodeKeys[i];
    console.log(nodeKeys[i],':',nodeValues[i]);
  }
  /****/

  response.end();

}).listen(8080);