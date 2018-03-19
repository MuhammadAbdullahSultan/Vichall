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
    $scope.readNotifications = $firebaseArray(ref.child("readNotifications"));
    
    
    $scope.update = function (id) {
        console.log(id);
        $scope.indexValue = $scope.notifications.findIndex(notifications => notifications.$id === id);
        console.log($scope.indexValue);
    };
    
    $scope.updateRead = function (id) {
        console.log(id);
        $scope.readindexValue = $scope.readNotifications.findIndex(readNotifications => readNotifications.$id === id);
        console.log($scope.readindexValue);
    };
    
    $scope.markAsRead = function () {
        $scope.readNotifications.$add({
            email: $scope.notifications[$scope.indexValue].email,
            message: $scope.notifications[$scope.indexValue].message
        });
        
        var item = $scope.notifications[$scope.indexValue];
        
        $scope.notifications.$remove(item).then(function (deletedData) {});
        toaster.pop({type: 'success', title: "OK", body: "Message Marked as read"});
        $scope.tosendEmail = undefined;
        $scope.message = undefined;
    }
    
    $scope.deleteRead = function () {
        var item = $scope.readNotifications[$scope.readindexValue];
        $scope.readNotifications.$remove(item).then(function (deletedData) {
        toaster.pop({type: 'success', title: "OK", body: "Message Deleted"});
        });
    }
}]);