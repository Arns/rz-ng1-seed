/**
 * @ngdoc directive
 * @name application.directive:exampleDirective
 * @description
 * This is a sample directive.
 *
 * @example
<example>
    <file name="example.html">
        <div example-directive></div>
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
