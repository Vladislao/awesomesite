var connectRoute = require('connect-route');

var apiRoute = connectRoute(function (router) {
    //router.get('/download', function download(req, res, next) {
    //    res.setHeader('Content-disposition', 'attachment; filename=' + req.query.name);
    //    res.setHeader('Content-type', 'audio/mpeg');
    //    fileService.download(req.query.url).pipe(res);
    //});
    //router.get('/listen', function download(req, res, next) {
    //    res.setHeader('Content-type', 'audio/mpeg');
    //    fileService.download(req.query.url).pipe(res);
    //});
});

module.exports = apiRoute;