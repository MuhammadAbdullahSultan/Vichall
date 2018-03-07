/*global angular*/
var app = angular.module('virtual', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/virtualtour', {
        templateUrl: 'virtual/virtual.html',
        controller: 'virtualCtrl',
    });
}]);

app.controller('virtualCtrl', ['$scope', function ($scope) {
    
    
}]);