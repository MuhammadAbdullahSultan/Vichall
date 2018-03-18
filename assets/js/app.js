/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define */
/*global angular */
// DEFINING ANGULAR MODULE ngCookies
/*jshint sub:true*/
var app = angular.module('myApp', ['ngRoute', 'firebase' , 'home', 'founder', 'rooms', 'facilities', 'rules', 'directions', 'apply', 'contact', 'residents', 'gallery', 'toaster']);

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

app.controller('myCtrl', ['$scope', 'firebase' ,'$firebaseObject', 'Auth', '$firebaseArray', '$location','toaster', function ($scope, firebase, $firebaseObject, Auth, $firebaseArray, $location, toaster) {
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
                $scope.signin.email = user.email;
                console.log($scope.signin.uid);
                
                var ref = firebase.database().ref();
        var data = ref.child("Admin").child(user.uid);
        var list = $firebaseObject(data);
        
//        $scope.information;
        list.$loaded().then(function(data) {
            
            $scope.information = data.name;
        }).catch (function(error) {
                    
                });                
                
            
                
            } else {
                $scope.signin.state = false;
                $scope.signin.uid = null;
            }
        })
    
    
    
    $scope.signout = function() {
        Auth.$signOut(); 
        toaster.pop({type: 'success', title: "Logged out"});

    };
    
    // signin with email
        $scope.signInWithEmailAndPassword = function(email, password) {
            
            
            Auth.$signInWithEmailAndPassword(email, password).then (function(firebaseuser) {
                
                
                var ref = firebase.database().ref();
                var data = ref.child("Admin").child(firebaseuser.uid);
                var list = $firebaseObject(data);
                
                
                list.$loaded().then(function(data) {
                    console.log(data.name);
                    $scope.loggedInName = data.name;
                        $('#loginModal').modal('hide');
                    toaster.pop({type: 'success', title: "Logged In"});
                }).catch (function(error) {
                    if(error === "auth/user-not-found") {
                        toaster.pop({type: 'danger', title: "User Not Found"});
                    }
                    toaster.pop({type: 'danger', title: "Error", body: error});
                    console.log(error);
                });
            }).catch(function(error) {
                console.log(error);
            });
            
            
            
            
        };
}]);

