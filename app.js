var fs = require('fs');
var http = require('http');
var request = require('request');
var logger = require('./lib/logger');
var PORT = process.env.PORT || 3000;

var server = http.createServer( function(req, res) {
  var body = '';
  if (req.method == 'GET') {
    res.end('<body><h1 style="padding: 100px 10px; font-family: Helvetica; font-size: 24px; color: #999; font-weight: 100; text-align: center;">piBot Central Services</h1>');
  }
  if (req.method == 'POST') {
    req.on('data', function (data) {
      body += data;
    });
    req.on('end', function () {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(body);
      logger.log('200: ' + body);
    });
  }
});

server.listen(PORT, function () {
  console.log('Listening on port:' + PORT);
})

var sendPost = function (uri, notifyHeader, notifyBody) {
  request({
      url: uri,
      method: 'POST',
      headers: {
          'type': notifyHeader
      },
      body: notifyBody
  }, function(error, response, body){
      if(error) { console.log(error); } else {
        console.log(response.statusCode, body);
      }
  });
}