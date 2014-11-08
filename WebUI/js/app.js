var app = angular.module('mccgroup27App', [
    'addressBookControllers',
    'addressBookServices',
    'toaster',
    'ngRoute'
]).run(['$rootScope', 'toaster', function($rootScope, toaster) {

    $rootScope.showNotification = function(notificationType, title, message) {
        $rootScope.toasterOptions = (notificationType == 'error') ? {
            'position-class': 'toast-middle',
            'close-button': true
        } : {
            'position-class': 'toast-bottom-middle'
        };
        var timeout = (notificationType == 'error') ? 0 : 5000;

        toaster.pop(notificationType, title, message, timeout);
    };
}]);

app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/contacts', {
                templateUrl: 'partials/contactList.html',
                controller: 'contactListCtrl'
            })
            .when('/contacts/:id', {
                templateUrl: 'partials/contact.html',
                controller: 'contactViewCtrl'
            })
            .otherwise({
                redirectTo: '/contacts'
            });
    }
]);