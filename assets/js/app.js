/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define */
/*global angular */
// DEFINING ANGULAR MODULE ngCookies
/*jshint sub:true*/
var app = angular.module('myApp', ['ngRoute', 'home', 'founder', 'rooms', 'facilities', 'rules', 'virtual', 'directions', 'apply', 'contact', 'residents', 'gallery']);
;

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
    
    $(document).ready(function(){
     
        // ===== Scroll to Top ==== 
$(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {
        $('#return-to-top').fadeIn(200);
    } else {
        $('#return-to-top').fadeOut(200);
    }
});
$('#return-to-top').click(function() {
    $('body,html').animate({
        scrollTop : 0
    }, 500);
});
})
}]);

app.controller('myCtrl', ['$scope', function ($scope) {
        
}]);

