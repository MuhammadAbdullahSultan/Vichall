/*global angular*/
var app = angular.module('virtual', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/virtualtour', {
        title: 'Virtual Tour',
        templateUrl: 'virtual/virtual.html',
        controller: 'virtualCtrl',
    });
}]);

app.controller('virtualCtrl', ['$scope', function ($scope) {
    
    
}]);