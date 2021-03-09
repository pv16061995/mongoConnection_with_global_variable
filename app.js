let globalString = require("./test/mongoDb");
global.con = globalString();
let abc = require("./test/abc");
abc()
var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello World!');
}).listen(8080);