var fs = require('fs');

exports.show = function(request, response) {
  fs.readFile('secretFile.html', function(error, data) {
    if(error) throw error;
    response.write(data);
  });
};