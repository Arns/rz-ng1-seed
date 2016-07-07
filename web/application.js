/** 
 * The application module is the standard module for ALL angular single page applications.
 */

var application = angular.module('application', ['ngRoute','ngResource','ngSanitize', 'ngMessages'], ['$httpProvider', function($httpProvider) {

}]);


application.config(['$routeProvider', 'TEMPLATES', function($routeProvider, TEMPLATES) {
    $routeProvider
        .when('/example', { 
            templateUrl: TEMPLATES + 'example.html',
            title: 'Example',
            controller: 'ExampleController',
            controllerAs: 'ExampleCtrl'
        })
        .otherwise({
            redirectTo: '/',
        });
}]);

application.constant('TEMPLATES', '/web/templates/');