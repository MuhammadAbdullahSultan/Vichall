/*global angular*/
var app = angular.module('contact', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/contactus', {
        title: 'Contact Us',
        templateUrl: 'contact/contact.html',
        controller: 'contactCtrl',
    });
}]);

app.controller('contactCtrl', ['$scope', function ($scope) {
    
    
}]);