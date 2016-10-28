/**
 * @ngdoc overview
 * @name RazrAlpha
 * @description
 * Initialize the app and any basic config and dependencies here.
 * @requires none
 *
 */
var RazrAlpha = angular.module('RazrAlpha',['ui.router']);

//Note this could be configured to toggle on and off with a query param.
RazrAlpha.logError = true;
RazrAlpha.logDebug = true;
RazrAlpha.logConsole = true;

RazrAlpha.config(function($locationProvider, $stateProvider) {
    // $stateProvider
    //     .state("browse", {
    //         url: "/browse",
    //         templateProvider: function($templateCache){  
    //             return $templateCache.get('browse.html'); 
    //         },
    //     })
});
