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

		$q = _$q_; // promises
		deferred = _$q_.defer();
		$scope = _$rootScope_.$new(); // scope spoof
		$httpBackend = _$httpBackend_; // for spoofing http requests
		$controller = _$controller_; // for instantiating controllers
		$rootScope = _$rootScope_.$new(); // rootScope spoof

		/* used for spoofing any http requests
		$httpBackend.when('GET', 'http://192.168.99.100/groupReadylift/catalog-modals/please-wait.php').respond({});
		spyOn(ToolsService, 'resetForm').and.returnValue(deferred.promise);
		*/

		// initialize a controller
		ctrl = $controller('ExampleController', { $scope: $scope, $rootScope: $rootScope });
	}));

	it ('should have message set', function() {
		/*
		$scope.reset();
		deferred.resolve(true);
		$scope.$apply();
		*/
		expect(ctrl.message).toEqual('Hi from the Example Controller! :)');
	});

});