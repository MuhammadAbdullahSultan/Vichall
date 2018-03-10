/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define */
/*global angular */
// DEFINING ANGULAR MODULE ngCookies
/*jshint sub:true*/
var app = angular.module('myApp', ['ngRoute', 'home', 'founder', 'rooms', 'facilities', 'rules', 'virtual', 'directions', 'apply', 'contact', 'residents', 'gallery', 'firebase']);

app.directive('headerFile', function () {
    return {
        restrict: 'E',
        templateUrl: 'header/header.html'
    };
});

app.directive('footerFile', function () {
    return {
        restrict: 'E',
        templateUrl: 'footer/footer.html'
    };
});

app.directive('slidesFile', function () {
    return {
        restrict: 'E',
        templateUrl: 'slides/slides.html'
    };
});

app.run(['$rootScope', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);
    
    
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    'use strict';
    
//    $locationProvider.html5Mode(true);
    
    $routeProvider.otherwise({
        redirectTo: '/home'
    });
    
}]);

app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);

app.controller('myCtrl', ['$scope', '$firebaseObject', 'Auth', '$firebaseArray', function ($scope, firebase, $firebaseObject, Auth, $firebaseArray) {
        console.log("CONTROLLER FIRED UP");
        $scope.signin = {};
        $scope.signin.state = false;
        $scope.signin.uid = null;
        var ref = firebase.database().ref();
        $scope.userStates = $firebaseArray(ref.child("Admin"));
    
    // CHECKING FOR AUTHORIZATION
    Auth.$onAuthStateChanged(function(user) {

            if (user) {
                $scope.signin.state = true;
                $scope.signin.uid = user.uid;
                $scope.email = user.email;
                console.log($scope.signin.uid);
                
                
            
                
            } else {
                $scope.signin.state = false
                $scope.signin.uid = null
            }
        })
    
    // signin with email
        $scope.signInWithEmailAndPassword = function(email, password) {
            
            
            Auth.$signInWithEmailAndPassword(email, password).then (function(firebaseuser) {
                
                
                var ref = firebase.database().ref();
                var data = ref.child("Admin").child(firebaseuser.uid);
                var list = $firebaseObject(data);
                
                
                list.$loaded().then(function(data) {
                }).catch (function(error) {
                    console.log(error);
//                toaster.pop({type: 'error', title: "Error", body: error});
                });
            }).catch(function(error) {
                                    console.log(error);

//                toaster.pop({type: 'error', title: "Error", body: error.message});
            });
            
            
            
            
        };
}]);

