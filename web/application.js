/** 
 * The application module is the standard module for ALL angular single page applications.
 */

var application = angular.module('application', ['ngRoute','ngResource','ngSanitize', 'ngMessages'], ['$httpProvider', function($httpProvider) {

}]);

application.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/example', { 
            templateUrl: 'assets/templates/example.html',
            title: 'Example',
            controller: 'ExampleController',
            controllerAs: 'ExampleCtrl'
        })
        .otherwise({
            redirectTo: '/',
        });
}]);