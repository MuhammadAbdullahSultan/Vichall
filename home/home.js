/*global angular*/
var app = angular.module('home', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'homeCtrl',
    });
}]);

app.controller('homeCtrl', ['$scope', function ($scope) {
    
    
}]);