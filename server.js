/*** Core ***/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

/*** Imports ***/
var listBooks = require('./app/listBooks');
var createBook = require('./app/createBook');
var editBook = require('./app/editBook');
var removeBook = require('./app/removeBook');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

/*** Server ***/
app.listen(8080, function() {
  console.log('App listening on port 8080!');
});


// use the static javascript files and create a fake url
app.use('/javascript', express.static('javascript'));
app.use('/foundation', express.static('node_modules/foundation-sites/dist'));
// define the template files
app.set('views', './views');
// define the type of the template files
app.set('view engine', 'pug');


app.get('/', function(request, response) {
  response.render('index');
});

app.get('/books', listBooks);

app.post('/books/create', createBook);

app.post('/books/edit', editBook);

app.post('/books/remove', removeBook);
