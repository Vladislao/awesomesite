"use strict";

//<editor-fold desc="EXTERNAL LIBS">
var connect = require('connect');
// gzip/deflate outgoing responses
var compression = require('compression');
// store session state in browser cookie
//var cookieSession = require('cookie-session');
// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser');
// query parsing
var query = require('connect-query');
// static files handling
var serveStatic = require('serve-static');
//</editor-fold>
//<editor-fold desc="INTERNAL LIBS">
// policies
//var webPolicy = require('./policies/web');
// routes
var webRoute = require('./routes/web');
//var apiRoute = require('./routes/api');
//</editor-fold>

var app = connect();
app.use(compression());
//app.use(cookieSession({
//    keys: ['secret1', 'secret2']
//}));
app.use(query());
app.use(bodyParser.json());

// iframe hack
app.use('/', function(req, res, next){
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    next();
});

// static files
app.use('/', serveStatic(__dirname + '/public'));

// controllers
app.use('/', webRoute);
//app.use('/api/', apiRoute);

//app.use(function onerror(err, req, res, next) {
//    res.end(err.message);
//});

//create node.js http server and listen on port
module.exports = app;