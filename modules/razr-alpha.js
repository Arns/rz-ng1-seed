/**
 * @ngdoc overview
 * @name RazrAlpha
 * @description
 * Initialize the app and any basic config and dependencies here.
 * @requires none
 *
 */
var RazrAlpha = angular.module('RazrAlpha',['ui.router']);

RazrAlpha.config(function($locationProvider, $stateProvider) {
    // $stateProvider
    //     .state("browse", {
    //         url: "/browse",
    //         templateProvider: function($templateCache){  
    //             return $templateCache.get('browse.html'); 
    //         },
    //     })
});
