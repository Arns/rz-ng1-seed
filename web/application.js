 /**
  * @ngdoc object
  * @name application 
  *
  * @description
  * The application module is the standard module for ALL angular single page applications. This module is extended with an $httpProvider that allows $http.post operations to communicate with PHP
    in the native format expected by PHP and consistent with jQuery.
  *
  *
  * This module is extended with an $httpProvider that allows $http.post operations to communicate with PHP
  * in the native format expected by PHP and consistent with jQuery.
  *
  * Each single page application is responsible for implementing its own router.
  */

var application = angular.module('application', ['ui.router','ngResource','ngSanitize', 'ngMessages'], ['$httpProvider', function($httpProvider) {

}]);


application.config(['$stateProvider', '$urlRouterProvider', 'TEMPLATES', function($stateProvider, $urlRouterProvider, TEMPLATES) {

    // any unmatched URLs will go back to the root of the site (home page)
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('example', {
          url: "/example",
          templateUrl:TEMPLATES + "example.html"
        })
        .state('home', {
          url: "/",
          templateUrl: TEMPLATES + "home.html"
        });

}]);

/**
  * Constants: define any app constants via angular constant provider - increases testability
  */

// the path to the templates from index.html (root of the project)
application.constant('TEMPLATES', '/web/templates/');
