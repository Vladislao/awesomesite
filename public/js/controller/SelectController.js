'use strict';

awesome.controller('SelectController',
    function SelectController($scope, $location) {

        var self = this;

        self.submit = submit;

        function submit(){
            $location.path("/watch/" + $scope.text);
        }

    });