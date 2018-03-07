/*global angular*/
var app = angular.module('directions', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/directions', {
        title: 'Maps & Directions',
        templateUrl: 'directions/directions.html',
        controller: 'directionsCtrl',
    });
}]);

app.controller('directionsCtrl', ['$scope', function ($scope) {
    
    
}]);