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
            $scope.editContainer = {};
        } else {
            $scope.address = addressById.find({id: $scope.selectedAddressId});            
        }

        $scope.showView = function() {
            return isMode('view');
        };

        $scope.showForm = function() {
            return isMode('edit') || isMode('create');
        };

        $scope.edit = function() {
            $scope.editContainer = angular.copy($scope.address);
            $scope.viewMode = 'edit';
        };

        $scope.save = function() {
            if(isMode('edit')) {
                saveEdit();
            } else {
                saveCreate();
            }
        };

        $scope.cancel = function() {
            if(isMode('edit')) {
                $scope.viewMode = 'view';
            } else {
                $scope.returnToAddressList();
            }
        };

        function saveEdit() {
            addressById.edit({id: $scope.selectedAddressId}, $scope.editContainer, function (callback) {
                $scope.viewMode = 'view';
                $scope.address = $scope.editContainer;
            });
        };

        function saveCreate() {
            addresses.create($scope.editContainer, function (address) {
                $location.path('addresses/' + address._id);
            });
        };

        $scope.returnToAddressList = function() {
            $location.path('/addresses');
        };

        function isMode(mode) {
            return $scope.viewMode === mode;
        };
    }
]);