describe('HomeControllerTest', function() {

	beforeEach(module('application'));

	var $controller;
	var $scope;
	var vm;
	var $rootScope;

	beforeEach(inject(function(_$rootScope_, _$controller_) {

		$scope = _$rootScope_.$new(); // scope spoof
		$controller = _$controller_; // for instantiating controllers

		ctrl = $controller('HomeController', { $scope: $scope, $rootScope: $rootScope });
		console.log(ctrl);
	}));


	it ('should not have testVar defined', function() {
		expect(ctrl.testVar).not.toBeDefined();
	});

});