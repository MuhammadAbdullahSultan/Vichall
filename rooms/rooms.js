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

app.controller('roomsCtrl', ['$scope', '$firebaseArray', '$filter', function ($scope, $firebaseArray, $filter) {
    $scope.roomsJson = [];
    var ref = firebase.database().ref();
    $scope.rooms = $firebaseArray(ref.child('rooms'));
    
    $scope.rooms.$loaded()
      .then(function(x) {
        console.log(x);
    angular.forEach (x, function(rm) {
                var roomsJson = { "tor": rm.tor, "daily": rm.daily, "f2m": rm.f2m, "three24": rm.three24, "five26": rm.five26 , "id": rm.$id};
                $scope.roomsJson.push(roomsJson);
            });
    })
      .catch(function(error) {
        console.log("Error:", error);
      });
        
        
    
    console.log($scope.roomsJson);
    
    $scope.addToTable = function () {

            $scope.rooms.$add({
                tor: $scope.tor,
                daily: $scope.daily,
                f2m: $scope.f2m,
                three24: $scope.three24,
                five26: $scope.five26
            });
            
            location.reload();
            $scope.tor = undefined;
            $scope.duration = undefined;
            $scope.aircon = undefined;
            $scope.noaircon = undefined;
        

    };
    
    $scope.delete = function () {
        var r = confirm("Are you sure you want to delete this row?");
        
        if (r == true) {
            var item = $scope.rooms[$scope.indexValue];
                    $scope.rooms.$remove(item).then(function (deletedData) {
                        
                        console.log(deletedData);
                        
                    });
            
            location.reload();
            
        } else {
           
        }
    }
    
    $scope.editTable = function () {
        $scope.rooms.$save($scope.indexValue).then(function (data) {
            console.log("Success");
        });
        location.reload();
    }
    
    
    $scope.update = function (id) {
        console.log(id);
        $scope.indexValue = $scope.rooms.findIndex(rooms => rooms.$id === id);
        console.log($scope.indexValue);
    };
    
}]);