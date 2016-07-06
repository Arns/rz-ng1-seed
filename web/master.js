application.constant('SECURE',true);

application.config(['$routeProvider', 'SECURE', function($routeProvider, SECURE) {
    $routeProvider
        .when('/styleguide', { 
            templateUrl: COMPONENTS + 'styleguide/styleguide.php',
            title: 'Style Guide'
        })
        .when('/upload', { 
            templateUrl: COMPONENTS + 'uploadTest3.php',
            controller: 'ImageUploadController2',
            controllerAs: 'imgUploadCtrl',
            interactiveLoginRequired: SECURE,
            title: 'Upload'
        })
        .when('/login', { 
            templateUrl: COMPONENTS + 'login/login.php',
            controller: 'LoginController',
            controllerAs: 'loginCtrl',
            transparentHeader: true,
            loginPage: true,
            title: 'Login'
        })
        .when('/interstitial', {
            templateUrl: COMPONENTS + 'interstitial/interstitial.php',
            controller: 'interstitialController',
            controllerAs: 'intCtrl',
            interactiveLoginRequired: SECURE,
            hideFromAnalytics: true
        })
        .when('/promos', { 
            templateUrl: COMPONENTS + 'promotions/promotions-list.php',
            controller: 'PromotionsListController',
            controllerAs: 'promoListCtrl',
            interactiveLoginRequired: SECURE,
            transparentHeader: false,
            title: 'Promotions'
        })
        .when('/promos/:id', {
            templateUrl: COMPONENTS + 'promotions-details/promotion-detail.php',
            controller: 'PromotionDetailController',
            controllerAs: 'promoDetailCtrl',
            type: 'promotion',
            interactiveLoginRequired: SECURE,
            title: 'Promotion Detail',
            reloadOnSearch: false
        })
        .when('/benefits', {
            templateUrl: COMPONENTS + 'promotions/promotions-list.php',
            controller: 'PromotionsListController',
            controllerAs: 'promoListCtrl',
            interactiveLoginRequired: SECURE,
            transparentHeader: false,
            title: 'Benefits'
        })
        .when('/benefits/:id', {
            templateUrl: COMPONENTS + 'promotions-details/promotion-detail.php',
            controller: 'PromotionDetailController',
            controllerAs: 'promoDetailCtrl',
            type: 'benefit',
            interactiveLoginRequired: SECURE,
            title: 'Benefit Detail'
        })
        .when('/photo-contest', { 
            title: 'Photo Contest',
            templateUrl: COMPONENTS + 'photo-contest/contest-landing.php',
            controller: 'ContestLandingController',
            controllerAs: 'contestLandingCtrl',
            transparentHeader: false,
            previousPhotosRequestFileName: "photo-get-approved-previous.php",
            previousPhotosCacheName: "previousPhotos",
            title: 'Photo Contest'
        })
        .when('/photo-contest/popularity', { 
            templateUrl: COMPONENTS + 'photo-contest-popularity/contest-popularity.php',
            controller: 'ContestPopularityController',
            controllerAs: 'contestPopularityCtrl',
            transparentHeader: true,
            previousPhotosRequestFileName: "photo-get-popularity-previous.php",
            previousPhotosCacheName: "previousPhotosPopularity",
            title: 'Photo Contest by Popularity'
        })
        .when('/photo-contest/destination', {
            templateUrl: COMPONENTS + 'photo-contest-destination/contest-destination.php',
            controller: 'ContestDestinationController',
            controllerAs: 'contestDestinationCtrl',
            transparentHeader: true,
            title: 'Photo Contest by Destination'
        })
        .when('/photo-contest/destination/:country', {
            templateUrl: COMPONENTS + 'photo-contest-destination/contest-destination.php',
            controller: 'ContestDestinationController',
            controllerAs: 'contestDestinationCtrl',
            transparentHeader: true,
            title: 'Photo Contest - Specific Country'
        })
        .when('/photo-contest/destination/:country/:state', {
            templateUrl: COMPONENTS + 'photo-contest-destination/contest-destination.php',
            controller: 'ContestDestinationController',
            controllerAs: 'contestDestinationCtrl',
            transparentHeader: true,
            title: 'Photo Contest - Specific State'
        })
        .when('/photo-contest/map', {
            templateUrl: COMPONENTS + 'photo-contest-map/contest-map.php',
            controller: 'ContestMapController',
            controllerAs: 'contestMapCtrl',
            transparentHeader: true,
            title: 'Photo Contest Map'
        })
        .when('/photo-contest/my-submissions', {
            templateUrl: COMPONENTS + 'photo-contest-submissions/contest-my-submissions.php',
            controller: 'ContestMySubmissionsController',
            controllerAs: 'contestMySubmissionsCtrl',
            interactiveLoginRequired: SECURE,
            transparentHeader: true,
            title: 'My Submissions'
        })
        .when('/photo-contest/winners', {
            templateUrl: COMPONENTS + 'photo-contest-winners/contest-winners.php',
            controller: 'ContestWinnersController',
            controllerAs: 'contestWinnersCtrl',
            transparentHeader: true,
            title: 'Winners'
        })
        .when('/photo-contest/winners/:year', {
            templateUrl: COMPONENTS + 'photo-contest-winners/contest-winners.php',
            controller: 'ContestWinnersController',
            controllerAs: 'contestWinnersCtrl',
            transparentHeader: true,
            title: 'Winners Specific Year'
        })
        .when('/photo-contest/upload', {
            templateUrl: COMPONENTS + 'photo-contest-upload/photo-upload.php',
            controller: 'PhotoUploadController',
            controllerAs: 'photoUploadCtrl',
            interactiveLoginRequired: SECURE,
            title: 'Photo Upload'
        })
        .when('/photo-contest/rules', {
            templateUrl: COMPONENTS + 'photo-contest-rules/photo-rules.php',
            title: 'Photo Contest Rules'
        })
        .when('/photo-contest/photo/:id', {
            templateUrl: COMPONENTS + 'photo-contest-single-photo/photo-detail.php',
            controller: 'PhotoDetailController',
            controllerAs: 'photoDetailCtrl',
            title: 'Photo Detail'
        })
        .when('/terms-and-conditions', {
            templateUrl: COMPONENTS + 'terms-and-conditions/terms-and-conditions.php',
            controller: 'TermsAndConditionsController',
            controllerAs: 'TACCtrl',
            title: 'Terms and Conditions'
        })
        .when('/admin/login', {
            templateUrl: COMPONENTS + 'admin/admin-login.php',
            controller: 'LoginControllerAdmin',
            controllerAs: 'loginCtrlAdmin',
            administrativeLoginRequired: SECURE,
            loginPage: true,
            title: 'Admin Login'
        })
        .when('/admin/dashboard', {
            templateUrl: COMPONENTS + 'admin-dashboard/admin-dashboard.php',
            controller: 'adminDashboard',
            controllerAs: 'adminDashCtrl',
            administrativeLoginRequired: SECURE,
            title: 'Admin Dashboard'
        })
        .when('/admin/submissions/:yearMonth', {
            templateUrl: COMPONENTS + 'admin-dashboard/admin-dashboard.php',
            controller: 'adminSubmissions',
            controllerAs: 'adminSearchCtrl',
            administrativeLoginRequired: SECURE,
            title: 'Admin Submissions'
        })
        .when('/admin/submissions/:yearMonth/:filter', {
            templateUrl: COMPONENTS + 'admin-submissions/admin-submissions.php',
            controller: 'adminSubmissions',
            controllerAs: 'adminSearchCtrl',
            administrativeLoginRequired: SECURE,
            title: 'Admin Submissions'
        })
        .when('/admin/search/:type/:query', {
            templateUrl: COMPONENTS + 'admin-search/admin-search.php',
            controller: 'adminSearch',
            controllerAs: 'adminSearchCtrl',
            administrativeLoginRequired: SECURE,
            title: 'Admin Search'
        })
        .when('/admin/search/:type/:query/:filter', {
            templateUrl: COMPONENTS + 'admin-search/admin-search.php',
            controller: 'adminSearch',
            controllerAs: 'adminSearchCtrl',
            administrativeLoginRequired: SECURE,
            title: 'Admin Search'
        })
        .when('/admin/photo/:id', {
            templateUrl: COMPONENTS + 'admin-photo-detail/admin-photo-detail.php',
            controller: 'adminPhotoDetailController',
            controllerAs: 'adminPhotoCtrl',
            administrativeLoginRequired: SECURE,
            title: 'Admin Photo Detail'
        })
        .when('/admin/view-winners/:year/:month', {
            templateUrl: COMPONENTS + 'admin-winners-view/admin-view-winners.php',
            controller: 'ViewWinnersController',
            controllerAs: 'ctrl',
            administrativeLoginRequired: SECURE,
            title: 'Admin Winners'
        })
        .when('/admin/select-winners/:year/:month', {
            templateUrl: COMPONENTS + 'admin-winners-select/admin-select-winners.php',
            controller: 'AdminWinnersController',
            controllerAs: 'adminWinnersCtrl',
            administrativeLoginRequired: SECURE,
            title: 'Admin Select Winners'
        })
        .otherwise({
            redirectTo: '/promos'
        });
}]);
application.run(
    ['$rootScope', '$templateCache', '$http', '$route', '$location', '$timeout', 'SessionService', 'ModalService', 'ToolsService', 'PhotoManagementService','CodeSetsService','ExternalLinkService', 'LmpDataManagerFactory',  
    function ($rootScope, $templateCache, $http, $route, $location, $timeout, SessionService, ModalService, ToolsService, PhotoManagementService, CodeSetsService, ExternalLinkService, LmpDataManagerFactory) {

	$rootScope.genericErrorMessage = "There was an error. Please try again later.";
    $rootScope.autoscroll = false;
    $rootScope.sessionService = SessionService;
	$rootScope.modalService = ModalService;
	$rootScope.toolsService = ToolsService;
    $rootScope.externalLinkService = ExternalLinkService;
	$rootScope.photoManagementService = PhotoManagementService;
	$rootScope.codeSetsService = CodeSetsService;

//    var speedBumpUrl = 'web/components/modals/speedbump.php';
//
//    $templateCache.put(speedBumpUrl,
//        '<div ng-include src="'+speedBumpUrl+'"></div>'
//    );

    if($location.$$host === 'flexperkstraveler.usbank.com'){
    	window.location = 'https://flexperkspromos.usbank.com/#/photo-contest';
    }
    
  $rootScope.$on('$routeChangeStart', function(angularEvent, next, current){
    $rootScope.showUserAccessPanel = false;
    $rootScope.transparentHeader = next && next.$$route && next.$$route.transparentHeader ? next.$$route.transparentHeader : false;
    $rootScope.isAdmin = next && next.$$route && next.$$route.administrativeLoginRequired ? next.$$route.administrativeLoginRequired : false;
    $rootScope.hideLoginLink = next && next.$$route && next.$$route.originalPath === '/login' ? true : false;

    var YTsrc = document.getElementById('ytapi-src');
    if(YTsrc) YTsrc.remove();


    if(!$rootScope.cardType && SessionService.sessionData.flexPerksCardType){
        // we need to get the card type here, this is not optimal but currently needs to be done
        $http.post(SERVICES + "get-card-type.php", { type: SessionService.sessionData.flexPerksCardType }).success(function(data){
            $rootScope.cardType = data.records[0].WebName.en;
            SessionService.sessionData.cardTypeName = data.records[0].WebName.en;
        });
    }
    

    if(next && next.$$route && !SessionService.isLoggedIn){
	    if (next.$$route.interactiveLoginRequired) {
	    	$rootScope.hideLoginLink = true;
	    	$location.path('/login');
	    	$location.$$search ={originalPath:next.$$route.originalPath};
	    }
	    else if (next.$$route.administrativeLoginRequired) {
	    	$location.path('/admin/login');
	    	$location.$$search ={originalPath:next.$$route.originalPath};
	    }
	    
    } else if(next && next.$$route && SessionService.isLoggedIn){
    	if(SessionService.sessionData.method == SessionService.loginMethods['INTERACTIVE']){
    		if (next.$$route.administrativeLoginRequired || next.$$route.loginPage) {
    			$location.path('/promos');
    		} 
    	} else if(SessionService.sessionData.method == SessionService.loginMethods['ADMINISTRATIVE']){
    		if (next.$$route.interactiveLoginRequired || next.$$route.loginPage) {
    			$location.path('/admin/dashboard');
    		}
    	} else if(SessionService.sessionData.method == SessionService.loginMethods['FACEBOOK']){
    		if (next.$$route.interactiveLoginRequired || next.$$route.administrativeLoginRequired) {
    			$location.path('/photo-contest');
    		}
    	}
    }
  });

  $rootScope.$on('$routeChangeSuccess', function(event, current, previous){
    if (current.$$route && !current.$$route.hideFromAnalytics) {
      $rootScope.title = current.$$route.title || 'USBank FlexPerks';

      if (dataLayer) {
        dataLayer.push({
          'event': 'updatevirtualpath',
          'virtualDocumentPath': location.hash,
          'virtualDocumentTitle': $rootScope.title
        });
      }
    }
  });
    
  $rootScope.openLoginModal = function(keepError){
    
    if(typeof(keepError) !== 'boolean' || !keepError){
    	ModalService.openModal('web/components/modals/login.php', 'LoginModalController', 'loginCtrl');
        SessionService.clearLoginException();
      } else {
    	  ModalService.openModal('web/components/modals/login.php', 'LoginModalController', 'loginCtrl').then(function(){
    		  $timeout(function(){
    			  $("#loyaltyNumber").focus();
    		  });
    	  });
      }
  }
  
  $rootScope.reloadView = function(){
      $route.reload();
  }
}]);

application.controller('ModalController', ['$scope', 'close', 'ModalService', function($scope, close, ModalService) {
    $scope.close = function(optionalResult) {
        return close(optionalResult);
     };
}]);
