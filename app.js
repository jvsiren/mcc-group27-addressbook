var express = require('express');
var app = express();
var contactService = require('./contactService');
var googleContactsService = require('./googleContactsService');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');

app.use(bodyParser.json());
app.use(errorHandler());

// Serve static content from WebUI folder (i.e. html and javascript files for UI)
app.use('/', express.static('WebUI'));

// REST API requests
app.get('/api/contacts', contactService.findAllContacts);
app.get('/api/contacts/:id', contactService.findContactById);
app.post('/api/contacts/query', contactService.findContactsByQuery);
app.post('/api/contacts', contactService.createContact);
app.post('/api/contacts/:id', contactService.modifyContact);
app.delete('/api/contacts/:id', contactService.deleteContact);

// Google contacts requests
app.get('/api/google/oauth2callback', googleContactsService.oauthCallback);
app.get('/api/google/import', googleContactsService.requestImportContacts);

var port = 8080;
app.listen(port);
console.log('Listening on port ' + port);
