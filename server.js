var http = require('http');
var testingData = require('./testingData.js');
var url = require('url');
var fs = require('fs');

http.createServer(function(request, response) {
  // response.writeHead(200, {'Content-Type': 'text/html'});

  // response.write('<h1>Hello World!</h1>');
  // response.write('<br>'+'Data: '+testingData.myDateTime());
  // response.write('<br>'+request.url);

  // var q = url.parse('http://localhost:8080/default.htm?year=2017&month=february', true);
  // var txt = q.query.year + " " + q.query.month;
  // response.write('<br>'+txt);

  /** Writing NodeJS url.parse info **/
  // var nodeKeys = Object.keys(q);
  // var nodeValues = Object.values(q);

  // console.log('Node length: '+nodeKeys.length);
  // for(var i = 0; i < nodeKeys.length; i++) {
  //   var keyValue = nodeKeys[i];
  //   console.log(nodeKeys[i],':',nodeValues[i]);
  // }
  /****/

  // fs.readFile('test.html', function(err, data) {
  //   response.write(data);
  //   response.end();
  // });

  // fs.rename('test.html', 'testing2.html', function(error) {
  //   if(error) throw error;
  //   console.log('File Renamed!');
  // })

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