var fs = require('fs');

var file = 'logger.log';

var log = function (request) {
  var now = new Date();
  var log = now + ' | ' + request;
  fs.appendFile(file, log, function (err) {
    if (err) return console.log(err);
  });
}

module.exports.log = log;