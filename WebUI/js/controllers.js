var addressBookControllers = angular.module('addressBookControllers', []);

addressBookControllers.controller('addressListCtrl', ['$scope', '$rootScope', 'addresses',
    function($scope, $rootScope, addresses) {        
        $scope.addresses = addresses.listAll();
    }
]);

addressBookControllers.controller('addressViewCtrl', ['$scope', '$rootScope', '$routeParams', 'addressById',
    function($scope, $rootScope, $routeParams, addressById) {

        $scope.selectedAddressId = $routeParams.id;
        $scope.address = addressById.find({id: $scope.selectedAddressId});
    }
]);