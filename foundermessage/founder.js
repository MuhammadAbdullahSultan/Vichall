/*global angular*/
var app = angular.module('founder', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/message', {
        title: "Founder's Message",
        templateUrl: 'foundermessage/founder.html',
        controller: 'founderCtrl',
    });
}]);

app.controller('founderCtrl', ['$scope', function ($scope) {
    
    
}]);