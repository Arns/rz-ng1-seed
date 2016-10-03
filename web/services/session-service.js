/**
 * @ngdoc service
 * @name application.service:SessionService
 * @description
 * Session Management service

 * @requires $rootScope
 * @requires $location
 * @requires $http
 * @requires $q
 * @requires $timeout
 * @requires $window
 * @requires ToolsService
 * @requires ModalService
 *
 */
application.service('SessionService',
	['$rootScope', '$location', '$http', '$q', '$timeout', '$window', 'ToolsService', 'ModalService',
	function($rootScope, $location, $http, $q, $timeout, $window, ToolsService, ModalService) {

	var self = this;
    var timer;

    /**
     * @ngdoc property
     * @name application.service:SessionService#isloggedIn
     * @propertyOf application.service:SessionService
     * @typeof boolean
     * @description Boolean property representing the users logged in state.
     */
    self.isLoggedIn = false;
	self.loginException = {};
	self.loginData = {};

    /**
     * @ngdoc function
     * @name application.service:SessionService#clearLoginData
     * @methodOf application.service:SessionService
     * @description clears the login data object
     */
	self.clearLoginData = function(){
		self.loginData = {};
	}


	self.sessionData = {};

    /**
     * @ngdoc function
     * @name application.service:SessionService#clearSessionData
     * @methodOf application.service:SessionService
     * @description
     * Clears the session data object.
     */
	self.clearSessionData = function(){
		self.sessionData = {};
	}

	self.loginException = {};

    /**
     * @ngdoc function
     * @name application.service:SessionService#clearLoginException
     * @methodOf application.service:SessionService
     * @description
     * Clears the login exception
     */
	self.clearLoginException = function(){
		self.loginException = {};
	}


    $rootScope.user = typeof(USER) !== 'undefined'? JSON.parse(USER) : undefined;
	$rootScope.logout = typeof(LOGOUT) !== 'undefined'? JSON.parse(LOGOUT) : undefined;

	self.login = function(){
		var deferred = $q.defer();
		self.clearLoginException();
		if(!self.isLoggedIn){
	    	$http.post(SERVICES + "login.php",self.loginData).success(function(data){
	    		if(typeof(data.exception) === "undefined"){
	    			self.sessionData = data;
	    			self.clearLoginData();
	    			self.updateTimeout();
	    			self.isLoggedIn = true;

	    			$rootScope.user = data;

	    			deferred.resolve();
	    		} else {
	    			self.loginException = data.exception;
	    			deferred.reject();
	    		}

	    		if(angular.isDefined($rootScope.logout)){
	    			delete $location.$$search.originalPath;
	    		}
	    	})
		} else {
			$rootScope.user = typeof(USER) !== 'undefined'? JSON.parse(USER) : undefined;
			deferred.resolve();
		}
		return deferred.promise;
    }

	self.getFBUrl = function(){
		var deferred = $q.defer();
		if(!self.isLoggedIn){
	    	$http.post(SERVICES + "facebook/get-login-url.php").success(function(data){
	    		if(angular.isUndefined(data.exception)){
	    			//exposed to root level of service Object
	    			self.fbUrl = data.fbUrl;
	    			isSuccess = true;
	    			deferred.resolve()
	    		} else {
	    			self.loginException = data.exception;
	    			deferred.reject();
	    		}
	    	})
		} else {
			deferred.resolve();
		}
        return deferred.promise;
    }

	self.logout = function(){
		var deferred = $q.defer();
		if(self.isLoggedIn){
	    	$http.post(SERVICES + "logout.php").success(function(data){

	    		if(typeof(data.exception) === "undefined"){
		    		self.clearSessionData();
					$timeout.cancel(timer);
					$window.location.reload();
	    		} else {
	    			switch(data.exception.code) {
	                default:
	                    $rootScope.errorMessage = "We are sorry! Unexpected Service Error.";
	                    break;
	    			}
	    		}
	    	})
	    	["finally"](function() {
	    		deferred.resolve();
	        });
		} else {
			deferred.resolve();
		}
        return deferred.promise;
	}

    self.updateTimeout = function() {
        $timeout.cancel(timer);
        var timestamp = { "delta" : Date.now() - self.lastActivity };
        $http.post(SERVICES + "user.php", timestamp).success(function(data){
            if (typeof(data.exception) === "undefined") {
                if (data.timeRemaining > 0) {
                    timer = $timeout(function() {
                            self.updateTimeout();
                    }, data.timeRemaining);

                } else {
                	self.logout();
                }
            } else {
                self.logout();
            }
        });
    };

	self.lastActivity = Date.now();
	$(document).on('click keypress scroll', function(e) {
      self.lastActivity = Date.now();
    });


  if ($rootScope.user) {
    self.isLoggedIn = true;
    self.sessionData = $rootScope.user;

    // default image
    if (ToolsService.isEmpty(self.sessionData.avatar)) {
      self.sessionData.avatar = "web/assets/images/user-default-avatar.png";
    }

    // If the user is logged in, listen for user activity.
    self.updateTimeout();

  } else if($rootScope.logout){
    // console.log("Show " + $rootScope.logout.expireMethod + " modal")
    if ($rootScope.logout.expireMethod === "SOFT_TIMEOUT") {
      ModalService.openModal("web/components/modals/logged-out.php");
    }
  };

    self.loginMethods = {
    	"ADMINISTRATIVE": "ADMINISTRATIVE",
    	"FACEBOOK": "FACEBOOK",
    	"INTERACTIVE": "INTERACTIVE",
    	"MEMBER_EMULATION": "MEMBER_EMULATION",
    	"PROMO_EMAIL": "PROMO_EMAIL"
    }

}]);
