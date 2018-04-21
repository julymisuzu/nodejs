/*** Core ***/
var express = require('express');
var app = express();
var router = express.Router();

/*** Server ***/
app.listen(8080, function() {
  console.log('App listening on port 8080!');
});


/*** Middleware with Router ***/
router.use(function(request, response, next) {
  console.log('Middleware Router Time: ', Date.now());
  next();
});
app.use('/cat', function(request, response, next) {
  console.log('app.use(/cat)');
  next('route');
});
router.get('/createCat', function(request, response) {
  console.log('router.get(/createCat)');
});

// This set the url to load the router
app.use('/cat', router);