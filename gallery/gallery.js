/*global angular*/
var app = angular.module('gallery', ['ngRoute', 'firebase']);

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/gallery', {
        title: "Gallery",
        templateUrl: 'gallery/gallery.html',
        controller: 'galleryCtrl',
    });
}]);

// UNIQUE VALUES FROM ARRAY
    
    app.filter('unique', function() {
   // we will return a function which will take in a collection
   // and a keyname
   return function(collection, keyname) {
      // we define our output and keys array;
      var output = [], 
          keys = [];
      
      // we utilize angular's foreach function
      // this takes in our original collection and an iterator function
      angular.forEach(collection, function(item) {
          // we check to see whether our object exists
          var key = item[keyname];
          // if it's not already part of our keys array
          if(keys.indexOf(key) === -1) {
              // add it to our keys array
              keys.push(key); 
              // push this item to our final output array
              output.push(item);
          }
      });
      // return our array which should be devoid of
      // any duplicates
      return output;
   };
});

app.controller('galleryCtrl', ['$scope', 'firebase', '$firebaseArray', 'toaster', '$filter', function ($scope, firebase, $firebaseArray, toaster, $filter) {
    // GALLERY CODE -----------------------------------------------------------------------------------------------------------------
      jQuery(document).ready(function($) {
 
        $('#myCarousel').carousel({
                interval: 5000
        });
 
        //Handles the carousel thumbnails
        $('[id^=carousel-selector-]').click(function () {
        var id_selector = $(this).attr("id");
        try {
            var id = /-(\d+)$/.exec(id_selector)[1];
            jQuery('#myCarousel').carousel(parseInt(id));
        } catch (e) {
        }
    });
        // When the carousel slides, auto update the text
        $('#myCarousel').on('slid.bs.carousel', function (e) {
                 var id = $('.item.active').data('slide-number');
                $('#carousel-text').html($('#slide-content-'+id).html());
        });
});
    
    
    
    
    // FIREBASE STORAGE CODE -----------------------------------------------------------------------------------------------------------------
    
    var storageRef = firebase.storage().ref();
    var ref = firebase.database().ref();

    // VIC HALL IMAGES -----------------------------------------------------------------------------------------------------------------
    
    $scope.vicHallImages = $firebaseArray(ref.child('images/vichall/'));
    
    var progressbar = document.getElementById('upload');
        var fileButton = document.getElementById("fileButton");
        
        fileButton.addEventListener('change', function (e) {
            var file = e.target.files[0];
            var pathReference = storageRef.child('images/vichall' + file.name);

            var imagesRef = storageRef.child('images/vichall/' + file.name);
            
            imagesRef.put(file).then(function(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                
                $scope.vicHallImages.$add({
                    url: snapshot.downloadURL,
                    filename: file.name,
                    title: $scope.VicHallImageTitle,
                    description: $scope.VicHallImageDescription
                });
                
                upload.value = percentage;
                toaster.pop({type: 'success', title: "Image uploaded Successfully"});
                uploadEvents.value = 0;
                

            });
        });
    
    $scope.deleteImageVicHalls = function () {
        var desertRef = storageRef.child("images/vichall/" + $scope.vicHallImages[$scope.indexValue].filename);
        // Delete the file
        desertRef.delete().then(function() {
            
            var item = $scope.vicHallImages[$scope.indexValue];
            $scope.vicHallImages.$remove(item).then(function (deletedData) {
            });
            toaster.pop({type: 'success', title: "OK", body: $scope.vicHallImages[$scope.indexValue].filename + " has been deleted"});

          // File deleted successfully
        }).catch(function(error) {
            toaster.pop({type: 'danger', title: "Error", body: error});
        });
    }
    
    $scope.saveChangesVicHall = function () {
        $scope.vicHallImages.$save($scope.indexValue).then(function (data) {
            console.log($scope.vicHallImages[$scope.indexValue]);
            toaster.pop({type: 'success', title: "Ok",  body: $scope.vicHallImages[$scope.indexValue].filename + " has been edited" });
        });
    }
    
    $scope.update = function (id) {
        $scope.indexValue = $scope.vicHallImages.findIndex(vicHallImages => vicHallImages.$id === id);
    };
    
    // RESIDENTS -----------------------------------------------------------------------------------------------------------------
    
    $scope.residentsImages = $firebaseArray(ref.child('images/residents/'));
    
    var progressbarResidents = document.getElementById('uploadResidents');
        var fileButtonResidents = document.getElementById("fileButtonResidents");
        
        fileButtonResidents.addEventListener('change', function (e) {
            var file = e.target.files[0];
            var pathReference = storageRef.child('images/residents' + file.name);

            var imagesRef = storageRef.child('images/residents/' + file.name);
            
            imagesRef.put(file).then(function(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                
                $scope.residentsImages.$add({
                    url: snapshot.downloadURL,
                    filename: file.name,
                    title: $scope.residentsImageTitle,
                    description: $scope.residentsImageDescription
                });
                
                uploadResidents.value = percentage;
                toaster.pop({type: 'success', title: "Image uploaded Successfully"});
                uploadEvents.value = 0;
                

            });
        });
    
    $scope.deleteImageResidents = function () {
        var desertRef = storageRef.child("images/residents/" + $scope.residentsImages[$scope.indexValueResidents].filename);
        // Delete the file
        desertRef.delete().then(function() {
            
            var item = $scope.residentsImages[$scope.indexValueResidents];
            $scope.residentsImages.$remove(item).then(function (deletedData) {
            });
            toaster.pop({type: 'success', title: "OK", body: $scope.residentsImages[$scope.indexValueResidents].filename + " has been deleted"});

          // File deleted successfully
        }).catch(function(error) {
            toaster.pop({type: 'danger', title: "Error", body: error});
        });
    }
    
    $scope.saveChangesResidents = function () {
        $scope.residentsImages.$save($scope.indexValueResidents).then(function (data) {
            console.log($scope.residentsImages[$scope.indexValueResidents]);
            toaster.pop({type: 'success', title: "Ok",  body: $scope.residentsImages[$scope.indexValueResidents].filename + " has been edited" });
        });
    }
    
    $scope.updateResidents = function (id) {
        $scope.indexValueResidents = $scope.residentsImages.findIndex(residentsImages => residentsImages.$id === id);
    };
    
    // EVENTS -----------------------------------------------------------------------------------------------------------------
    
    $scope.eventsImages = $firebaseArray(ref.child('images/events/'));
    
    var progressbarEvents = document.getElementById('uploadEvents');
        var fileButtonEvents = document.getElementById("fileButtonEvents");
        
        fileButtonEvents.addEventListener('change', function (e) {
            var file = e.target.files[0];
            var pathReference = storageRef.child('images/events' + file.name);

            var imagesRef = storageRef.child('images/events/' + file.name);
            
            imagesRef.put(file).then(function(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                
                $scope.eventsImages.$add({
                    url: snapshot.downloadURL,
                    filename: file.name,
                    title: $scope.eventsImageTitle,
                    description: $scope.eventsImageDescription
                });
                
                uploadEvents.value = percentage;
                toaster.pop({type: 'success', title: "Image uploaded Successfully"});
                uploadEvents.value = 0;
                

            });
        });
    
    $scope.deleteImageEvents = function () {
        var desertRef = storageRef.child("images/events/" + $scope.eventsImages[$scope.indexValueEvents].filename);
        // Delete the file
        desertRef.delete().then(function() {
            
            var item = $scope.eventsImages[$scope.indexValueEvents];
            $scope.eventsImages.$remove(item).then(function (deletedData) {
            });
            toaster.pop({type: 'success', title: "OK", body: $scope.eventsImages[$scope.indexValueEvents].filename + " has been deleted"});

          // File deleted successfully
        }).catch(function(error) {
            toaster.pop({type: 'danger', title: "Error", body: error});
        });
    }
    
    $scope.saveChangesEvents = function () {
        $scope.eventsImages.$save($scope.indexValueEvents).then(function (data) {
            console.log($scope.eventsImages[$scope.indexValueEvents]);
            toaster.pop({type: 'success', title: "Ok",  body: $scope.eventsImages[$scope.indexValueEvents].filename + " has been edited" });
        });
    }
    
    $scope.updateEvents = function (id) {
        $scope.indexValueEvents = $scope.eventsImages.findIndex(eventsImages => eventsImages.$id === id);
    };
    
    
    // ROOM IMAGES
    $scope.roomImages = $firebaseArray(ref.child('images/rooms/'));
    
    var progressbar = document.getElementById('uploadRoomsImage');
    var fileButtonRooms = document.getElementById("fileButtonRooms");
        
        fileButtonRooms.addEventListener('change', function (e) {
            var file = e.target.files[0];
            var pathReference = storageRef.child('images/rooms' + file.name);

            var imagesRef = storageRef.child('images/rooms/' + file.name);
            
            imagesRef.put(file).then(function(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                
                $scope.roomImages.$add({
                    url: snapshot.downloadURL,
                    filename: file.name,
                    title: $scope.roomImageTitle,
                    description: $scope.roomImageDescription
                });
                
                progressbar.value = percentage;
                toaster.pop({type: 'success', title: "Image uploaded Successfully"});
                progressbar.value = 0;
                console.log("Executed");
                return;

            });
        });
    
    $scope.deleteImageRooms = function () {
        var desertRef = storageRef.child("images/rooms/" + $scope.roomImages[$scope.indexValueRooms].filename);
        // Delete the file
        desertRef.delete().then(function() {
            
            var item = $scope.roomImages[$scope.indexValueRooms];
            $scope.roomImages.$remove(item).then(function (deletedData) {
            });
            toaster.pop({type: 'success', title: "OK", body: $scope.roomImages[$scope.indexValueRooms].filename + " has been deleted"});

          // File deleted successfully
        }).catch(function(error) {
            toaster.pop({type: 'danger', title: "Error", body: error});
        });
    }
    
    $scope.saveChangesRoom = function () {
        $scope.roomImages.$save($scope.indexValueRooms).then(function (data) {
            console.log($scope.roomImages[$scope.indexValueRooms]);
            toaster.pop({type: 'success', title: "Ok",  body: $scope.roomImages[$scope.indexValueRooms].filename + " has been edited" });
        });
    }
    
    
    
    $scope.updateImageRooms = function (id) {
        $scope.indexValueRooms = $scope.roomImages.findIndex(roomImages => roomImages.$id === id);
        console.log(id);
    };
    
    // FILTER EVENTS
    $scope.eventsImagesTitle = $firebaseArray(ref.child('images/events/'));
    $scope.currentPage = 1, $scope.numPerPage = 5, $scope.orderByField = 'title', $scope.reverseSort = false;
    $scope.$watch("titleFilter", function (newVal, oldVal) {
        if($scope.titleFilter === undefined) {
            $scope.titleFilter = "";
        }
        for (var i = 0; i < $scope.eventsImages.length; i++)
            $scope.eventsImages[i].filtered = $scope.eventsImages[i].title.indexOf(newVal) === -1
    });
    
    
    
    
    
}]);

app.filter('range', function () {
    return function (input, total) {
        total = parseInt(total);
        for (var i = 0; i < total; ++i) input.push(i);
        return input;
    };
    });