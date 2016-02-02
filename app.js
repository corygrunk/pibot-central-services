var sys = require('sys');
var exec = require('child_process').exec;
var child;
var fs = require('fs');
var http = require('http');
var request = require('request');

var ip = require('./lib/ip');
var logger = require('./lib/logger');
var config = {}

config.server = {
  "port": 5000,
  "host": "127.0.0.1",
}

ip.get(function (ip) {
  config.server.host = ip;
});
console.log(config.server.host);

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
port = config.server.port;
host = config.server.host;
server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);

var sendPost = function (uri, notifyHeader, notifyBody) {
  request({
      url: 'http://' + host + ':' + port,
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