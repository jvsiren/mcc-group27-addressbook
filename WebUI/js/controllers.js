var addressBookControllers = angular.module('addressBookControllers', ['ngTable']);

addressBookControllers.controller('addressListCtrl', ['$scope', '$rootScope', '$location', 'addresses', 'addressById', 'ngTableParams',
    function ($scope, $rootScope, $location, addresses, addressById, ngTableParams) { 

        $scope.loadAddresses = function() {
            addresses.listAll(function (addresses) {
                $scope.addresses = addresses;
                $scope.tableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 100           // count per page
                }, {
                    total: addresses.length, // length of data
                    getData: function($defer, params) {
                        $defer.resolve(addresses.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
            });            
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