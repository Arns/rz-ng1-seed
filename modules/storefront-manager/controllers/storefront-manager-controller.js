/**
 * @ngdoc controller
 * @name RazrAlpha.controller:StorefrontManagerController
 * @description StorefrontManagerController
 */
RazrAlpha.controller('StorefrontManagerController', [
                      'modules.storefrontManager.services.StorefrontManagerService', 
                      'modules.common.logger',
                      function(storefrontManagerService, logger) {
    var self = this;
    self.id = "StorefrontManagerController";
    self.name = "Storefront Manager Master";
}]);
