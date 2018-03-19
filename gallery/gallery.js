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
    // GALLERY CODE
      jQuery(document).ready(function($) {
 
        $('#myCarousel').carousel({
                interval: 5000
        });
 
        //Handles the carousel thumbnails
        $('[id^=carousel-selector-]').click(function () {
        var id_selector = $(this).attr("id");
        try {
            var id = /-(\d+)$/.exec(id_selector)[1];
            console.log(id_selector, id);
            jQuery('#myCarousel').carousel(parseInt(id));
        } catch (e) {
            console.log('Regex failed!', e);
        }
    });
        // When the carousel slides, auto update the text
        $('#myCarousel').on('slid.bs.carousel', function (e) {
                 var id = $('.item.active').data('slide-number');
                $('#carousel-text').html($('#slide-content-'+id).html());
        });
});
    
    
    // FIREBASE STORAGE CODE
    
    var storageRef = firebase.storage().ref();
    var ref = firebase.database().ref();

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
    
    
    
    
    
}]);