var services = angular.module('addressBookServices', []);

services.factory('addresses', ['$resource',	function($resource) {
	return $resource('api/addresses', {}, {
	    listAll: {method: 'GET'},
	    create: {method: 'POST'}
	});
}]);

services.factory('addressById', ['$resource', function($resource) {
	return $resource('api/addresses/:id', {id: '@id'}, {
	    find: {method: 'GET'},
	    edit: {method: 'POST'},
	    delete: {method: 'DELETE'}
	});
}]);
