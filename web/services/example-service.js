/**
 * @ngdoc service
 * @name application.service:ExampleService
 * @description
 * Example service
 *
 * See usage example in:
 * {@link application.controller:ExampleController ExampleService in action.}
 * Calling alertMeWithService from the example controller invokes the ExampleService.alert function
 *
 *
 */
application.service('ExampleService', [function() {
    var self = this;
    self.serviceName = "ExampleService";
    /**
     * @ngdoc function
     * @name application.service:ExampleService#alertMessage
     * @methodOf application.service:ExampleService
     *
     * @description
     * Alerts the service name and a message that it has been called. <div class="alert">This is
     * an example and has no production purpose</div>
     *
     * @param {string} message is the message to passed from the service
     */
    self.alertMessage = function(message) {
        Alert(self.serviceName + message);
    };
}]);
