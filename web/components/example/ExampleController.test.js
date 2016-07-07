describe('ExampleControllerTest', function() {

	beforeEach(module('application'));

	var $controller;
	var $httpBackend;
	var $scope;
	var $q;

	var deferred;
	var vm;

	var $rootScope;

	beforeEach(inject(function(_$rootScope_, _$q_, _$httpBackend_, _$controller_) {

		$q = _$q_;
		deferred = _$q_.defer();
		$scope = _$rootScope_.$new();
		$httpBackend = _$httpBackend_;
		$controller = _$controller_;
		$rootScope = _$rootScope_.$new();

		/*
		$httpBackend.when('GET', 'http://192.168.99.100/groupReadylift/catalog-modals/please-wait.php').respond({});
		spyOn(ToolsService, 'resetForm').and.returnValue(deferred.promise);
		*/

		vm = $controller('ExampleController', { $scope: $scope, $rootScope: $rootScope });
	}));

	it ('should have true equal to true', function() {
		/*
		$scope.reset();
		deferred.resolve(true);
		$scope.$apply();
		*/
		expect(true).toEqual(true);
	});

});