module.exports = function(options) {
  return function(request, response, next) {
    console.log(options);
    next();
  }
};