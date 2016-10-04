 /**
  * @ngdoc overview
  * @name application
  *
  * @description
  * The application module is the standard module for ALL angular single page applications. This module is extended with an $httpProvider that allows $http.post operations to communicate with PHP
  * in the native format expected by PHP and consistent with jQuery.
  *
  *
  * This module is extended with an $httpProvider that allows $http.post operations to communicate with PHP
  * in the native format expected by PHP and consistent with jQuery.
  *
  * Each single page application is responsible for implementing its own router.
  *
  *
  * @requires ui.router
  * @requires ngResource
  * @requires ngSanitize
  * @requires ngMessages
  * @requires $httpProvider
  */

var application = angular.module('application', ['ui.router','ngResource','ngSanitize', 'ngMessages'], ['$httpProvider', function($httpProvider) {

}]);

/**
 * @ngdoc overview
 * @name config
 * @description
 * Application config object
 *
 * @requires $stateProvider
 * @requires $urlRouterProvider
 * @requires TEMPLATES
 *
 */
application.config(['$stateProvider', '$urlRouterProvider', 'TEMPLATES', function($stateProvider, $urlRouterProvider, TEMPLATES) {
    /**
     * @ngdoc object
     * @name config.object:$urlRouterProvider
     * @description
     * Configure application routing.
     * See {@link https://github.com/angular-ui/ui-router ui-router} documentation.
     * @property {{object}} otherwise
     * Define where to route un-caught urls
     *
     * @example
     * <example module="application">
       <pre>
       $urlRouterProvider.otherwise("/");
       </pre>
     * <example>
     *
     */
    // any unmatched URLs will go back to the root of the site (home page)
    $urlRouterProvider.otherwise("/");
    /**
     * @ngdoc object
     * @name config.object:$stateProvider
     * @description
     * Configure application states.
     * See {@link https://github.com/angular-ui/ui-router ui-router} documentation.
     * @property {{object}} state
     * Define a routing state
     *
     * @example
     * <example module="application">
       <pre>
           .state('example', {
               url: "/example",
               templateUrl:TEMPLATES + "example.html"
           })
       </pre>
     * <example>
     *
     */
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

/*---- Constants: define any app constants
       via angular constant provider.
       increases testability  ---*/
/**
 * @ngdoc overview
 * @name constants
 * @description
 * Constants: define any app constants
        via angular constant provider.
        increases testability
 *
 * @ngdoc object
 * @name constants.object:Templates
 * @description
 * The path to the templates from index.html (root osf the project)
 *
 * @example
 * <example module="application">
<pre>
    application.constant('TEMPLATES', '/web/templates/');
</pre>
 * <example>
 *
 */
application.constant('TEMPLATES', '/web/templates/');
