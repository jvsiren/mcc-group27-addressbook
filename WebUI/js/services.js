var services = angular.module('addressBookServices', ['ngResource']);

services.factory('contacts', ['$resource', function($resource) {
    return $resource('api/contacts', {}, {
        listAll: {
            method: 'GET',
	    	isArray: true
        },
        create: {
            method: 'POST'
        }
    });
}]);

services.factory('contactById', ['$resource', function($resource) {
    return $resource('api/contacts/:id', {
        id: '@id'
    }, {
        find: {
            method: 'GET'
        },
        edit: {
            method: 'POST'
        },
        delete: {
            method: 'DELETE'
        }
    });
}]);