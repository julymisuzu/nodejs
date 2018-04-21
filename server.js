/*** Core ***/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

/*** Imports ***/
var birds = require('./birds');
var myMiddleware = require('./myMiddleware');

/*** Server ***/
  app.listen(8080, function() {
    console.log('App listening on port 8080!');
  });
/**************/

/*** Using template ***/
  app.set('view engine', 'pug');
  app.set('views', './views');

  app.get('/pugView', function(request, response) {
    response.render('index', { title: 'Hey Pug', message: 'Hello there!' });
  });

  /*** Creating my own template engine ***/
  app.engine('ntl', function(filePath, options, callback) {
    fs.readFile(filePath, function(error, content) {
      if(error)
        return callback(error);
      var rendered = content.toString().replace('#title#', '<title>'+options.title+'</title>')
                    .replace('#message#', '<h1>'+options.message+'</h1>');
      return callback(null, rendered);
    });
  });

  app.set('view engine', 'ntl');

  app.get('/myTemplateEngine', function(request, response) {
    response.render('myEngine', { title: 'Testing Engine', message: 'Hello My Engine!' });
  });
/**********************/


/*** Middlware Requests ***/
  var requestTime = function(request, response, next) {
    console.log('Middleware requestTime');
    request.requestTime = Date.now();
    next();
  }
  app.use(requestTime);

  app.use(myMiddleware({option1: "firstOption", option2: "secondOption"}));
/**************************/

/*** Requests ***/
  app.get('/', function(request, response) {
    console.log('app.get(/)');
    response.send('Hello World! '+request.requestTime);
  });

  app.use('/user/create', function(request, response) {
    console.log('app.use(/user/create)');
    response.send('You are creating a user');
  });

  app.put('/user', function(request, response) {
    console.log('app.put(/user)');
    response.send('You are in the user page');
  });

  app.get('/user/:userId/book/:bookId', function(request, response) {
    console.log('app.get(/user/:userId/book/:bookId)');
    response.send(request.params);
  });

  app.get('/flights/:fromId-:toId', function(request, response) {
    console.log('app.get(/flights/:fromId-:toId)');
    response.send('Your are going from: '+request.params.fromId+' to '+request.params.toId);
  });

  app.use('/birds', birds);
  app.use('/birds/about', birds);
/****************/

// This MUST be the last command
/*** Handling Errors ***/
  app.use(function(request, response, next) {
    response.status(404).send('Not found!');
  });
/***********************/