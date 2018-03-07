/*global angular*/
var app = angular.module('contact', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/contactus', {
        title: 'Maps & Directions',
        templateUrl: 'contact/contact.html',
        controller: 'contactCtrl',
    });
}]);

app.controller('contactCtrl', ['$scope', function ($scope) {
    
    
}]);