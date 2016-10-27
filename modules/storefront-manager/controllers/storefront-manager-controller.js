/**
 * @ngdoc controller
 * @name RazrAlpha.controller:StorefrontManagerController
 * @description StorefrontManagerController
 */
RazrAlpha.controller('StorefrontManagerController', [
                      'modules.storefrontManager.services.StorefrontManagerService', 
                      function(storefrontManagerService) {
    var self = this;
    this.id = "StorefrontManagerController";
}]);
