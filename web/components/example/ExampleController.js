/**
 * @ngdoc controller
 *
 * @name application.controller:ExampleController
 *
 * @example

    <example module="example">
        <file name="example.html">
        <div ng-controller="ExampleController">
           <textarea ng-model="text" class="input-block-level"></textarea>
        <pre>{{text}}</pre>
           </div>
        </file>
        <file name="script.js">
            angular.module("example", [])
                .controller("ExampleController",["$scope",
                    function($scope){
                         $scope.value1="sample";
                    }]);
        </file>
    </example>

 * @requires $rootScope
 */
application.controller('ExampleController', ['$rootScope', function ($rootScope) {

	var self = this;
	self.message = "Hi from the Example Controller! :)";

}]);
