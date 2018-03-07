/*global angular*/
var app = angular.module('residents', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/residents', {
        title: 'Our Residents',
        templateUrl: 'residents/residents.html',
        controller: 'residentsCtrl',
    });
}]);

app.controller('residentsCtrl', ['$scope', function ($scope) {
    
    
}]);