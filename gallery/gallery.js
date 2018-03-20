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



app.controller('galleryCtrl', ['$scope', 'firebase', '$firebaseArray', 'toaster', function ($scope, firebase, $firebaseArray, toaster) {
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
                    filename: file.name
                });
                
                upload.value = percentage;
                toaster.pop({type: 'success', title: "Image uploaded Successfully"});

                

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
                    filename: file.name
                });
                
                uploadResidents.value = percentage;
                toaster.pop({type: 'success', title: "Image uploaded Successfully"});

                

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
                    filename: file.name
                });
                
                uploadEvents.value = percentage;
                toaster.pop({type: 'success', title: "Image uploaded Successfully"});

                

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
    
    
    
    $scope.updateEvents = function (id) {
        $scope.indexValueEvents = $scope.eventsImages.findIndex(eventsImages => eventsImages.$id === id);
    };
    
    
}]);