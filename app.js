var fs = require('fs');
var http = require('http');
var request = require('request');
var logger = require('./lib/logger');
var PORT = process.env.PORT || 3000;
var APITOKEN = process.env.TOKEN || null;

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
      if (req.headers.token === APITOKEN) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(body);
        logger.log('200: ' + body);
      } else {
        res.writeHead(401, { 'Content-Type': 'text/html' });
        res.end('Forbidden');
        logger.log('401: Forbidden');
      }
    });
  }
});

server.listen(PORT, function () {
  console.log('Listening on port:' + PORT);
});