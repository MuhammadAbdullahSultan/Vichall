/*global angular*/
var app = angular.module('rooms', ['ngRoute', 'firebase']);

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/rooms', {
        title: 'Rooms',
        templateUrl: 'rooms/rooms.html',
        controller: 'roomsCtrl',
    });
}]);

app.controller('roomsCtrl', ['$scope', '$firebaseArray', '$filter', 'toaster', function ($scope, $firebaseArray, $filter, toaster) {
    var ref = firebase.database().ref();
    $scope.rooms = $firebaseArray(ref.child('rooms'));
    $scope.roomsVR = $firebaseArray(ref.child('roomsVR'));
    
    // FOR VH
    $scope.addToTable = function () {

            $scope.rooms.$add({
                tor: $scope.tor,
                daily: $scope.daily,
                f2m: $scope.f2m,
                three24: $scope.three24,
                five26: $scope.five26
            });
            toaster.pop({type: 'success', title: "Room Added"});

            $scope.tor = undefined;
            $scope.daily = undefined;
            $scope.f2m = undefined;
            $scope.three24 = undefined;
            $scope.five26 = undefined;
        
            $('#addRoomModal').modal('hide');
    };
    
    $scope.delete = function () {
        var r = confirm("Are you sure you want to delete this row?");
        
        if (r == true) {
            var item = $scope.rooms[$scope.indexValue];
                    $scope.rooms.$remove(item).then(function (deletedData) {
                        var item = $scope.rooms[$scope.indexValue];
                        $scope.rooms.$remove(item).then(function (deletedData) {


                        });
                        
                    });            
        } else {
           
        }
    }
    
    $scope.editTable = function () {
        $scope.rooms.$save($scope.indexValue).then(function (data) {
            toaster.pop({type: 'success', title: "Room Edited Successfully"});
        });
    }
    
    
    $scope.update = function (id) {
        $scope.indexValue = $scope.rooms.findIndex(rooms => rooms.$id === id);
    };
    
    //FOR VR
    
    $scope.addToTableVR = function () {
        $scope.roomsVR.$add({
            tor: $scope.torVR,
            daily: $scope.dailyVR,
            f2m: $scope.f2mVR,
            three24: $scope.three24VR,
            five26: $scope.five26VR
        });
        toaster.pop({type: 'success', title: "Room Added"});
        
            $scope.torVR = undefined;
            $scope.dailyVR = undefined;
            $scope.f2mVR = undefined;
            $scope.three24VR = undefined;
            $scope.five26VR = undefined;
        
            $('#addRoomVRModal').modal('hide');
    };
    
    $scope.deleteVR = function () {
        var r = confirm("Are you sure you want to delete this row?");
        
        if (r == true) {
            var item = $scope.roomsVR[$scope.indexValueVR];
                    $scope.roomsVR.$remove(item).then(function (deletedData) {
                        var item = $scope.roomsVR[$scope.indexValueVR];
                        $scope.roomsVR.$remove(item).then(function (deletedData) {


                        });
                        
                    });            
        } else {
           
        }
    }
    
    $scope.editTableVR = function () {
        $scope.roomsVR.$save($scope.indexValueVR).then(function (data) {
            toaster.pop({type: 'success', title: "Room Edited Successfully"});
        });
    }
    
    
    $scope.updateVR = function (id) {
        $scope.indexValueVR = $scope.roomsVR.findIndex(roomsVR => roomsVR.$id === id);
    };
    
    
    
}]);