var express = require('express');
var app = express();
var addressService = require('./addressService');
var googleContactsService = require('./googleContactsService');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');

app.use(bodyParser.json());
app.use(errorHandler());

// Serve static content from WebUI folder (i.e. html and javascript files for UI)
app.use('/', express.static('WebUI'));

// REST API requests
app.get('/api/addresses', addressService.findAllAddresses);
app.get('/api/addresses/:id', addressService.findAddressById);
app.post('/api/addresses/query', addressService.findAddressesByQuery);
app.post('/api/addresses', addressService.createAddress);
app.post('/api/addresses/:id', addressService.modifyAddress);
app.delete('/api/addresses/:id', addressService.deleteAddress);

// Google contacts requests
app.get('/api/google/importConfirmed', googleContactsService.importContacts);
app.get('/api/google/import', googleContactsService.requestImportContacts);

var port = 8080;
app.listen(port);
console.log('Listening on port ' + port);
