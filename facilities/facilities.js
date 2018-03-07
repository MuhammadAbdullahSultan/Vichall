/*global angular*/
var app = angular.module('facilities', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/facilities', {
        title: 'Facilities',
        templateUrl: 'facilities/facilities.html',
        controller: 'facilitiesCtrl',
    });
}]);

app.controller('facilitiesCtrl', ['$scope', function ($scope) {
    
    
}]);