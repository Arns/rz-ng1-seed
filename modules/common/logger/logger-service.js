/**
 * @ngdoc service
 * @name RazrAlpha.controller:logger
 * @description logger
 */
RazrAlpha.service('modules.common.logger', [ function() {
    'use strict';
    var self = this;
    self.name = "Logger Service";
    self.message = "has been registered";
    self.types = {
        error : "error",
        debug : "debug",
        log : "log"
    };
    
    self.log = function(type, func, message) {
        if (RazrAlpha.logError) {
            if(type === self.types.error) {
                console.error(func + ": " + message);
            }
        }
        if (RazrAlpha.logDebug) {
            if(type === self.types.debug) {
                console.debug(func + ": " + message);
            }
        }
        if (RazrAlpha.logConsole) {
            if(type === self.types.log) {
                console.log(func + ": " + message);
            }
        }
    };
    
    return {
        log : function(type, func, message) {
            self.log(type, func, message);
        }
    };
}]);