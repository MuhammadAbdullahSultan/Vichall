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



app.controller('galleryCtrl', ['$scope', 'firebase', '$firebaseArray', function ($scope, firebase, $firebaseArray) {
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

    console.log($scope.vicHallImages);
    
    var progressbar = document.getElementById('upload');
        var fileButton = document.getElementById("fileButton");
        
        fileButton.addEventListener('change', function (e) {
            var file = e.target.files[0];
            var pathReference = storageRef.child('images/vichall' + file.name);

            var imagesRef = storageRef.child('images/vichall/' + file.name);
            
            imagesRef.put(file).then(function(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                
                $scope.vicHallImages.$add({
                    url: snapshot.downloadURL
                });
                
                upload.value = percentage;
                
                
              console.log(snapshot.downloadURL);

            });
        });
    
    
    $scope.update = function (id) {
        console.log(id);
        $scope.indexValue = $scope.vicHallImages.findIndex(vicHallImages => vicHallImages.$id === id);
        console.log($scope.indexValue);
    };
    
    
    
    
    
}]);