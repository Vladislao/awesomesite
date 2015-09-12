var app = require('./app.js');
var http = require('http');

http.createServer(app).listen(process.env.PORT || 3000);