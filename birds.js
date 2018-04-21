var express = require('express');
var router = express.Router();

router.use(function timeLog(request, response, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', function(request, response) {
  console.log('router.get(/birds)');
  response.send('Birds home page');
});

router.get('/about', function(request, response) {
  console.log('router.get(/birds/about)');
  response.send('About birds');
});

module.exports = router;