/*global angular*/
var app = angular.module('notifications', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/notifications', {
        title: 'Admin Notifications',
        templateUrl: 'notifications/notifications.html',
        controller: 'notificationsCtrl',
    });
}]);

app.controller('notificationsCtrl', ['$scope', 'firebase' ,'$firebaseObject', '$firebaseArray', '$location','toaster', function ($scope, firebase, $firebaseObject, $firebaseArray, $location, toaster) {
    
    var ref = firebase.database().ref();
    $scope.notifications = $firebaseArray(ref.child("Notifications"));
    
    
    $scope.update = function (id) {
        $scope.indexValue = $scope.notifications.findIndex(notifications => rooms.$id === id);    
    };
}]);