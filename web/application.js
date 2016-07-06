/** 
 * The application module is the standard module for ALL angular single page applications.
 */

var application = angular.module('application', ['ngRoute','ngResource','ngSanitize', 'ngMessages', 'angularMoment', 'angular.filter'], ['$httpProvider', function($httpProvider) {

}]);