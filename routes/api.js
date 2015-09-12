var connectRoute = require('connect-route');

var webRoute = connectRoute(function (router) {
    router.get('/', function index(req, res, next) {
        res.end('Hello from api!\n');
    });
});

module.exports = webRoute;