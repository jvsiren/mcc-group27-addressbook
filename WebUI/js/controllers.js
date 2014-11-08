var addressBookControllers = angular.module('addressBookControllers', ['ngTable']);

addressBookControllers.controller('contactListCtrl', ['$scope', '$rootScope', '$location', 'contacts', 'contactById', 'ngTableParams',
    function ($scope, $rootScope, $location, contacts, contactById, ngTableParams) { 

        $scope.loadContacts = function() {
            contacts.listAll(function (contacts) {
                $scope.contacts = contacts;
                $scope.tableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 100           // count per page
                }, {
                    total: contacts.length, // length of data
                    getData: function($defer, params) {
                        $defer.resolve(contacts.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
            });            
        };

        $scope.openContact = function(contact) {
            $location.path('/contacts/' + contact._id);
        };

        $scope.createContact = function() {
            $location.path('/contacts/create')
        };

        $scope.deleteContact = function(contact) {
            var indexOfContact = _.indexOf($scope.contacts, contact);
            contactById.delete({id: contact._id}, function (callback) {
                $scope.contacts.splice(indexOfContact, 1);
                $scope.tableParams.reload();
            });
        };

        $scope.importGoogleContacts = '/api/google/import';
        $scope.importGoogleContacts = '/api/google/export';

        $scope.loadContacts();
    }
]);

addressBookControllers.controller('contactViewCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'contacts', 'contactById',
    function($scope, $rootScope, $routeParams, $location, contacts, contactById) {

        $scope.selectedContactId = $routeParams.id;

        if($scope.selectedContactId === 'create') {
            $scope.viewMode = 'create';
            $scope.editContainer = {};
        } else {
            $scope.viewMode = 'view';
            $scope.contact = contactById.find({id: $scope.selectedContactId});            
        }

        $scope.showView = function() {
            return isMode('view');
        };

        $scope.showForm = function() {
            return isMode('edit') || isMode('create');
        };

        $scope.edit = function() {
            $scope.editContainer = angular.copy($scope.contact);
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
                $scope.returnToContactList();
            }
        };

        function saveEdit() {
            contactById.edit({id: $scope.selectedContactId}, $scope.editContainer, function (callback) {
                $scope.viewMode = 'view';
                $scope.contact = $scope.editContainer;
            });
        };

        function saveCreate() {
            contacts.create($scope.editContainer, function (contact) {
                $location.path('contacts/' + contact.id);
            });
        };

        $scope.returnToContactList = function() {
            $location.path('/contacts');
        };

        function isMode(mode) {
            return $scope.viewMode === mode;
        };
    }
]);
