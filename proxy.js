var request = require('request');
var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
  var queryData = url.parse(req.url, true).query;
  request({ uri: queryData.uri }, function(err, r, body) {
    res.writeHead(200, {'Access-Control-Allow-Origin' : '*' });
    res.end(body);
  })

}).listen(9000);