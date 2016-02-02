var fs = require('fs');

var file = 'logger.log';

var log = function (command) {
  var now = new Date();
  var log = now + ' | ' + command + '\n';
  fs.appendFile(file, log, function (err) {
    if (err) return console.log(err);
  });
}

module.exports.log = log;