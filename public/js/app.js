'use strict';

var awesome = angular.module('awesome', ['ngRoute']);

awesome.config(function ($routeProvider) {
    $routeProvider.
        when('/', {
            controller: 'SelectController as selectCtrl',
            templateUrl: '/template/select.html'
        }).
        when('/watch/:link', {
            controller: 'FrameController as frameCtrl',
            templateUrl: '/template/frame.html'
        });
});