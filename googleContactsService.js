var googleapis = require('googleapis');
var OAuth2Client = googleapis.auth.OAuth2;
var CLIENT_ID = '709847374314-ovdqsjq54bj4llbpr219rrg55dt1alop.apps.googleusercontent.com';
var CLIENT_SECRET = '06KY_8EFUBsQvg_KceLvdI4T';
var REDIRECT_URL = 'http://mccgroup27.ddns.net:8080/api/google/oauth2callback';
var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
var GoogleContacts = require('google-contacts').GoogleContacts;
var contacts, currentRequest, accessToken;
var dao = require('./dao');
var collectionName = 'contacts';
var request = require('request');
var contactXml = require('./contactXML');
var _ = require('underscore');

var url = oauth2Client.generateAuthUrl({
    access_type: 'offline', 
    scope: 'https://www.googleapis.com/auth/contacts'
});

exports.requestImportContacts = function(req, res) {
  currentRequest = 'import';
	res.redirect(url);	
};

exports.requestExportContacts = function(req, res) {
  currentRequest = 'export';
  res.redirect(url);
}

exports.oauthCallback = function(req, res) {
	setAccessToken(req.query.code, function() { 
    if(currentRequest === 'export') {
      exportContacts(res);
    }
    if(currentRequest === 'import') {
      importContacts(res); 
    }		
	});
};

function setAccessToken(authorizationCode, callback) {
    oauth2Client.getToken(authorizationCode, function (err, tokens) {
      // Now tokens contains an access_token and an optional refresh_token. Save them.
      if(!err) {
        oauth2Client.setCredentials(tokens);
        accessToken = tokens.access_token;
        console.log(accessToken);
    		contacts = new GoogleContacts({token: accessToken});
    		callback();
      }
    });
}

function importContacts(res) {
    contacts.getContacts(function (error, contacts) {
      if(contacts) {
        for(var i = 0; i < contacts.length; i++) {
          var contact = contacts[i];
          updateOrCreateContact(contact);       
        }      
      } else {
        console.log("ERROR: " + error);
      }
      redirectToContactList(res);  
    });
};

function updateOrCreateContact(contact) {
	dao.findOne(collectionName, {email: contact.email}, function (existingContact) {    
    if(existingContact) {
      replaceExistingContact(existingContact, contact);
    } else {
      createNewContact(contact);
    }
  });
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

function exportContacts(res) {
  contacts.getContacts(function (error, allGoogleContacts) {
    dao.findAll(collectionName, {}, function (allContacts) {
      var contacts = getContactsThatDontExistInGoogle(allContacts, allGoogleContacts);
      console.log(JSON.stringify(contacts));
      for(var i = 0; i < contacts.length; i++) {
        createContactInGoogleContacts(contacts[i]);
      }
    });
    redirectToContactList(res);
  });
};

function getContactsThatDontExistInGoogle(contacts, googleContacts) {
  return _.filter(contacts, function (contact) {
      var existingGoogleContact = _.find(googleContacts, function (googleContact) {
        googleContact.email === contact.email;
      });
      return existingGoogleContact == undefined;
  });
}

function createContactInGoogleContacts(contact) {
  var postBody = contactXml.generateXML(contact);
  var requestOptions = {
    url: 'https://www.google.com/m8/feeds/contacts/default/full',
    body: postBody,
    headers: {
      'Authorization': 'OAuth ' + accessToken,
      'GData-Version': '3.0',
      'Content-Type': 'application/atom+xml'
    }
  };
  request.post(requestOptions, function (error, response, body) {
    console.log(JSON.stringify(response));
  });
};
