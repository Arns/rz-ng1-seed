/**
 * @ngdoc directive
 * @name RazrAlpha.directive:storefrontManagerMaster
 * 
 * 
 * 
 */
RazrAlpha.component('storefrontManagerMaster', {
    bindings : {},
    template: ['$templateCache', function ($templateCache) {
        return $templateCache.get('storefront-manager-master.html');
    }],
    controller : function() {
        this.message =  "Hello";
    }
});