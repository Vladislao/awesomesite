var connectRoute = require('connect-route');
var redis = require('../storage/redis');

var webRoute = connectRoute(function (router) {
    router.get('/comment/get', function get(req, res, next) {
        var comments = redis.get('comments', req.query.key);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(comments));
    });

    router.post('/comment/post', function post(req, res, next) {

        var key = req.body.key;
        var comment = req.body.comment;

        redis.push('comments', key, comment);
        res.end();
    });
});

module.exports = webRoute;