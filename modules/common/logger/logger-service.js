/**
 * @ngdoc service
 * @name RazrAlpha.controller:logger
 * @description logger
 */
RazrAlpha.service('modules.common.logger', [ function() {
    var self = this;
    self.id = "modules.common.logger";
    return {
        getId : function() {
            return self.id;
        }
    };
}]);