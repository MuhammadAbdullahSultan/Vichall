/*global angular*/
var app = angular.module('rooms', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/rooms', {
        title: 'Rooms',
        templateUrl: 'rooms/rooms.html',
        controller: 'roomsCtrl',
    });
}]);

app.controller('roomsCtrl', ['$scope', function ($scope) {
    
    
}]);