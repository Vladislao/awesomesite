awesome.factory('commentService', function ($http, $q) {

    // basic functions
    function GetComments(link){
        return $http.get('/api/comment/get?key=' + link);
    }

    function AddComment(link, item){
        return $http.post('/api/comment/post', {
            key: link,
            comment: item
        });
    }

    return {
        get: GetComments,
        add: AddComment
    }
});