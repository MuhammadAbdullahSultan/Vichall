/*global angular*/
var app = angular.module('rules', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/rules', {
        templateUrl: 'rules/rules.html',
        controller: 'rulesCtrl',
    });
}]);

app.controller('rulesCtrl', ['$scope', function ($scope) {
    
    
}]);