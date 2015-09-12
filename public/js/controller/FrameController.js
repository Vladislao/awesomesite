'use strict';

awesome.controller('FrameController',
    function FrameController($scope, $routeParams, commentService) {

        var self = this;

        self.add = add;
        self.comments = [];

        function init(){
            var link = $routeParams.link;
            commentService.get(link).then(function(data){
                self.comments = data.data;
                console.log(data.data);
            });
        }
        init();

        function add(){
            console.log('add');
        }

    });