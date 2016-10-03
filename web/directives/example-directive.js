/**
 * @ngdoc directive
 * @name application.directive:exampleDirective
 * @description
 * This is a sample directive.
 * @restrict 'A'
 * @element ANY
 *
 * @example
<example module="application">
    <file name="example.html">
        <div example-directive></div>
    </file>
    <file name="script.js">
        var application = angular.module("application", []);
        application.directive('exampleDirective', [function() {
            return {
                restrict: 'A',
                template: '<div>Example Directive</div>'
            }
        }]);
    </file>
</example>
 *
 */
application.directive('exampleDirective', [function() {
    return {
        restrict: 'A',
        template: '<div>Example Directive</div>'
    }
}]);
