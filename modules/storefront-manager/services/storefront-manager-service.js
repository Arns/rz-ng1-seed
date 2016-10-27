/**
 * @ngdoc service
 * @name RazrAlpha.controller:StorefrontManagerService
 * @description StorefrontManagerService
 */
RazrAlpha.service('modules.storefrontManager.services.StorefrontManagerService', [ function(ShoppingCartService, $sce) {
    var self = this;
    self.id = "StorefrontManagerService";
    return {
        getId : function() {
            return self.id;
        }
    };
}]);