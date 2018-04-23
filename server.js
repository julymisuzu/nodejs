/*** Core ***/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

var jsonUrl = './json/books.json';

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

/*** Server ***/
  app.listen(8080, function() {
    console.log('App listening on port 8080!');
  });
/**************/

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

app.get('/books', function(request, response) {
  fs.readFile(jsonUrl, function(error, data) {
    if(error) {
      console.log('[BOOKS] Error - '+error);
      response.writeHead(404, {'Content-Type': 'text/html'});
      return response.end('An inexpected error occurred.');
    }
    response.send(data);
  });
});

app.post('/books/create', function(request, response) {
  fs.readFile(jsonUrl, function(error, data) {
    if(error) {
      console.log('[BOOKS CREATE READ] Error - '+error);
      response.writeHead(404, {'Content-Type': 'text/html'});
      return response.end('An inexpected error occurred.');
    }

    var booksList = JSON.parse(data);
    var newBookId = booksList.livros[booksList.livros.length - 1].id + 1;

    booksList.livros.push({ id: newBookId, name: request.body.book, author: request.body.author });

    fs.writeFile(jsonUrl, JSON.stringify(booksList), function(error) {
      if(error) {
        console.log('[BOOKS CREATE WRITE] Error - '+error);
        response.writeHead(404, {'Content-Type': 'text/html'});
        return response.end('An inexpected error occurred.');
      }
      console.log('The books list has been updated');
      response.end();
    });
  });
});

app.post('/books/edit', function(request, response) {
  fs.readFile(jsonUrl, function(error, data) {
    if(error) {
      console.log('[BOOKS EDIT READ] Error - '+error);
      response.writeHead(404, {'Content-Type': 'text/html'});
      return response.end('An inexpected error occurred.');
    }

    var booksList = JSON.parse(data);

    booksList.livros[request.body.id].name = request.body.book;
    booksList.livros[request.body.id].author = request.body.author;

    console.log(booksList);
    fs.writeFile(jsonUrl, JSON.stringify(booksList), function(error) {
      if(error) {
        console.log('[BOOKS EDIT WRITE] Error - '+error);
        response.writeHead(404, {'Content-Type': 'text/html'});
        return response.end('An inexpected error occurred.');
      }

      console.log('The books list has been updated');
      response.end();
    });
  })
});

app.post('/books/remove', function(request, response) {
  fs.readFile(jsonUrl, function(error, data) {
    if(error) {
      console.log('[BOOKS REMOVE READ] Error - '+error);
      response.writeHead(404, {'Content-Type': 'text/html'});
      return response.end('An inexpected error occurred.');
    }

    var booksList = JSON.parse(data);
    var newBooksList = booksList.livros.filter(function(item) {
      return item.id != request.body.bookId;
    });

    booksList.livros = newBooksList;

    fs.writeFile(jsonUrl, JSON.stringify(booksList), function(error) {
      if(error) {
        console.log('[BOOKS REMOVE WRITE] Error - '+error);
        response.writeHead(404, {'Content-Type': 'text/html'});
        return response.end('An inexpected error occurred.');
      }
      console.log('The books list has been updated');
      response.end();
    });
  })
});
