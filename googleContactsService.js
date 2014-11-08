var googleapis = require('googleapis');
var OAuth2Client = googleapis.auth.OAuth2;
var CLIENT_ID = '709847374314-ovdqsjq54bj4llbpr219rrg55dt1alop.apps.googleusercontent.com';
var CLIENT_SECRET = '06KY_8EFUBsQvg_KceLvdI4T';
var REDIRECT_URL = 'http://mccgroup27.ddns.net:8080/api/google/oauth2callback';
var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
var GoogleContacts = require('google-contacts').GoogleContacts;
var contacts;
var dao = require('./dao');
var collectionName = 'addresses';

var url = oauth2Client.generateAuthUrl({
  access_type: 'offline', 
  scope: 'https://www.googleapis.com/auth/contacts'
});

exports.requestImportContacts = function(req, res) {
	if(contacts) {
		importContacts(res);
	} else {
		console.log(url);
		res.redirect(url);		
	}
};

exports.oauthCallback = function(req, res) {
	setAccessToken(req.query.code, function() { 
		importContacts(res); 
	});
};

function setAccessToken(authorizationCode, callback) {
    oauth2Client.getToken(authorizationCode, function (err, tokens) {
      // Now tokens contains an access_token and an optional refresh_token. Save them.
      if(!err) {
        oauth2Client.setCredentials(tokens);
		contacts = new GoogleContacts({token: tokens.access_token});
		callback();
      }
    });
}

function importContacts(res) {
    contacts.getContacts(function (error, contacts) {
    	for(var i = 0; i < contacts.length; i++) {
    		var contact = contacts[i];
    		var existingContact = findAddressByEmail(contact.email);
    		if(existingContact) {
    			replaceExistingContact(existingContact, contact);
    		} else {
    			createNewContact(contact);
    		}
    	}
    	redirectToContactList(res);
    });
};

function findAddressByEmail(email) {
	return dao.findOne(collectionName, {email: email});
};

function replaceExistingContact(existingContact, newContact) {
	dao.update(collectionName, existingContact._id, newContact);
};

function createNewContact(newContact) {
	dao.create(collectionName, newContact);
};

function redirectToContactList(res) {
	res.redirect('http://mccgroup27.ddns.net:8080');
};

