/* Core */
var http = require('http');
var url = require('url');
var fs = require('fs');
var events = require('events');
var eventEmitter = new events.EventEmitter();

/* Imports */
var gettingTheSecret = require('./gettingTheSecret.js');


http.createServer(function(request, response) {
  // Show the secret key
  gettingTheSecret.show(request, response);

  eventEmitter.once('removeSecretKey', function() {
    response.write('<p style="color: red;">This secret key is not valid anymore.</p>');
    response.end();
  });

  // Remove the file with the secret key
  setTimeout(() => {
    eventEmitter.emit('removeSecretKey');
  }, 2000);

  // response.end();
}).listen(8080);