var addressBookControllers = angular.module('addressBookControllers', []);

addressBookControllers.controller('addressListCtrl', ['$scope', '$rootScope', '$location', 'addresses', 'addressById',
    function($scope, $rootScope, $location, addresses, addressById) { 

        $scope.loadAddresses = function() {
            $scope.addresses = addresses.listAll();
        };

        $scope.openAddress = function(address) {
            $location.path('/addresses/' + address._id);
        };

        $scope.createAddress = function() {
            $location.path('/addresses/create')
        };

        $scope.deleteAddress = function(address) {
            addressById.delete({id: address._id}, function (callback) {
                $scope.loadAddresses();
            });
        };

        $scope.loadAddresses();
    }
]);

addressBookControllers.controller('addressViewCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'addresses', 'addressById',
    function($scope, $rootScope, $routeParams, $location, addresses, addressById) {

        $scope.selectedAddressId = $routeParams.id;

        if($scope.selectedAddressId === 'create') {
            $scope.viewMode = 'create';
            $scope.address = {};
        } else {
            $scope.address = addressById.find({id: $scope.selectedAddressId});            
        }


        $scope.edit = function() {
            $scope.editContainer = angular.copy($scope.address);
            $scope.viewMode = 'edit';
        };

        $scope.saveEdit = function() {
            addressById.edit({id: $scope.selectedAddressId}, $scope.editContainer, function (callback) {
                $scope.viewMode = 'view';
                $scope.address = $scope.editContainer;
            });
        };

        $scope.saveCreate = function() {
            addresses.create($scope.address, function (address) {
                $location.path('addresses/' + address._id);
            });
        };

        $scope.returnToAddressList = function() {
            $location.path('/addresses');
        };
    }
]);