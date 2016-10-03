/**
 * @ngdoc controller
 *
 * @name application.controller:ExampleController
 *
 * @example

    <example module="application">
        <file name="example.html">
            <div ng-controller="ExampleController as exampleCtrl">
                <button ng-click="exampleCtrl.alertMe()">Alert Me</button>
                <button ng-click="exampleCtrl.alertMeWithService('.alert() : The alert has been fired from the service')">Alert Me With Service</button>
                <textarea ng-model="exampleCtrl.message" class="input-block-level"></textarea>
                <pre>{{exampleCtrl.message}}</pre>
            </div>
        </file>
        <file name="example-module.js">
            var application = angular.module("application", []);
        </file>
        <file name="example-controller.js">
            application.controller("ExampleController", ['$rootScope', 'ExampleService', function ($rootScope, ExampleService) {
                var self = this;
            	self.message = "Hi from the Example Controller! :)";
                self.ctrlName = "ExampleController";

                self.alertMe = function() {
                    alert(self.ctrlName + " says : You have been alerted.");
                    self.message = "Alert has been shown.";
                };

                self.alertMeWithService = function(message) {
                    ExampleService.alert(message);
                }
            }]);
        </file>
        <file name="example-service.js">
            application.service('ExampleService', [function() {
                var self = this;
                self.serviceName = "ExampleService";
                self.alert = function() {
                    alert(self.serviceName + ".alert has been fired");
                };
            }]);
        </file>
    </example>

 * @requires $rootScope
 * @requires application.service:ExampleService
 *
 */
application.controller('ExampleController', ['$rootScope', 'ExampleService', function ($rootScope, ExampleService) {
	var self = this;
	self.message = "Hi from the Example Controller! :)";
    self.ctrlName = "ExampleController";

    /**
     * @ngdoc function
     * @name application.controller:ExampleController#alertMe
     * @methodOf application.controller:ExampleController
     */
    self.alertMe = function() {
        alert(self.ctrlName + " says : You have been alerted.");
        self.message = "Alert has been shown.";
    }

    /**
     * @ngdoc function
     * @name application.controller:ExampleController#alertMeWithService
     * @methodOf application.controller:ExampleController
     * @param {string} message is the message to pass to the service
     */
    self.alertMeWithService = function(message) {
        ExampleService.alertMessage(message);
    }

}]);
