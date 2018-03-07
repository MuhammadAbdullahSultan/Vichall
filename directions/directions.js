/*global angular*/
var app = angular.module('directions', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/directions', {
        templateUrl: 'directions/directions.html',
        controller: 'directionsCtrl',
    });
}]);

app.controller('directionsCtrl', ['$scope', function ($scope) {
    
    
}]);