var addressBookControllers = angular.module('addressBookControllers', []);

addressBookControllers.controller('addressBookCtrl', ['$scope', '$rootScope', 
    function($scope, $rootScope) {
	
	$scope.test = 'Hi!';
	$scope.addresses = ['addr1', 'addr2', 'addr3'];	
}]);

addressBookControllers.controller('addressListCtrl', ['$scope', '$rootScope',
    function($scope, $rootScope) {

        $scope.test = 'Hi!';
        $scope.addresses = ['addr1', 'addr2', 'addr3'];
}]);

addressBookControllers.controller('addressViewCtrl', ['$scope', '$rootScope',
    function($scope, $rootScope) {

        $scope.test = 'Hi!';
        $scope.address = {name: "Juha", email: "juha.siren@aalto.fi"}
}]);
