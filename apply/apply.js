/*global angular*/
var app = angular.module('apply', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/applyonline', {
        title: 'Apply Online',
        templateUrl: 'apply/apply.html',
        controller: 'applyCtrl',
    });
}]);

app.controller('applyCtrl', ['$scope', function ($scope) {
    
    
}]);