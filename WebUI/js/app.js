var app = angular.module('mccgroup27App', [
	'addressBookControllers',
	'addressBookServices',
  	'toaster',
	'ngRoute'
]).run(['$rootScope', 'toaster', function($rootScope, toaster) {

	$rootScope.showNotification = function(notificationType, title, message) {
            	$rootScope.toasterOptions = (notificationType == 'error') ? {'position-class': 'toast-middle', 'close-button': true} : {'position-class': 'toast-bottom-middle'};
        	var timeout = (notificationType == 'error') ? 0 : 5000;
	
	        toaster.pop(notificationType, title, message, timeout);
       };
}]);

app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
	$routeProvider
	    .when('/addresses', {
		templateUrl: 'partials/addressList.html',
		controller: 'addressListCtrl'
	    })
	    .when('/addresses/:id', {
		templateUrl: 'partials/addressView.html',
		controller: 'addressViewCtrl'
	    })
	    .otherwise({
		redirectTo: '/addresses'
	    });	
}]);

app.config(['$httpProvider', function($httpProvider) {
      var interceptor = ['$rootScope', function($rootScope) {
          function r(response) {

              function notify(type, title, msg) {
                  $rootScope.showNotification(type, title, msg)
              }

              function getResponse() {
                  if (angular.isObject(response.data)) {
                      return response.data.response || (response.data.responseObject?response.data.responseObject.toString():response.data.responseObject) || response.data.error || '';
                  } else if(typeof response.data === "string") {
                      return response.data
                  }
                  return '';
              }
              switch(response.status) {
                  case 400:
                      notify("warning", "Bad Request", getResponse());
                      break;

                  case 500:
                      var str = getResponse();
                      notify("warning", "Server Error", "Something bad happened on the server" + (str ? ", a message was sent: <br>" + str:''));
                      break;

                  default:
                      break;
              }

              // Always pass response unchanged
              return response;
          }
          return {
              response: function(a) {
                  return r(a)
              },
              responseError: function(a) {
                  return r(a)
              }
          };
      }];
      $httpProvider.interceptors.push(interceptor);

  }]);
