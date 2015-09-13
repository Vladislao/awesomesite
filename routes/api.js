var connectRoute = require('connect-route');
var redis = require('../storage/redis');
var shortid = require('shortid');

var webRoute = connectRoute(function (router) {

    // returns shortcut for link
    router.get('/page/set', function get(req, res, next) {
        var link = req.query.link;
        // try to get shortcut
        var id = redis.get('pages', link);

        if(id.length === 0){
            // generate if not found
            id = shortid.generate();
            redis.set('pages', link, id);
            redis.set('shortcuts', id, link);
        }else{
            // or just take old one
           id = id[0];
        }
        res.end(id);
    });

    // returns link for shortcut
    router.get('/page/get', function get(req, res, next) {
        var id = req.query.key;
        var link = redis.get('shortcuts', id);
        res.end(link[0]);
    });

    // returns comments list for key
    router.get('/comment/get', function get(req, res, next) {
        var comments = redis.get('comments', req.query.key);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(comments));
    });

    // adds comment to key
    router.post('/comment/post', function post(req, res, next) {

        var key = req.body.key;
        var comment = {
            Id: shortid.generate(),
            Coord: req.body.coord,
            Text: req.body.text,
            Date: new Date().getTime()
        };

        redis.push('comments', key, comment);
        res.setHeader('Content-Type', 'application/json');
        res.end(comment.Id);
    });
});

module.exports = webRoute;