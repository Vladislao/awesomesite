'use strict';

awesome.controller('SelectController',
    function SelectController($scope, $location, commentService) {

        var self = this;

        self.submit = submit;

        function submit(){
            commentService.setLink($scope.text).then(function(data){
                $location.path("/watch/" + data.data);
            });
        }

    });