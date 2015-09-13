awesome.factory('commentService', function ($http, $q) {

    function setLink(link){
        return $http.get('/api/page/set?link=' + link);
    }

    function getLink(key){
        return $http.get('/api/page/get?key=' + key);
    }

    function GetComments(key){
        return $http.get('/api/comment/get?key=' + key);
    }

    function AddComment(key, coord, text){
        return $http.post('/api/comment/post', {
            key: key,
            coord: coord,
            text: text
        });
    }

    return {
        setLink: setLink,
        getLink: getLink,
        get: GetComments,
        add: AddComment
    }
});