var googleapis = require('googleapis');
var OAuth2Client = googleapis.auth.OAuth2;
var CLIENT_ID = '709847374314-ovdqsjq54bj4llbpr219rrg55dt1alop.apps.googleusercontent.com';
var CLIENT_SECRET = '06KY_8EFUBsQvg_KceLvdI4T';
var REDIRECT_URL = 'http://mccgroup27.ddns.net:8080/api/google/oauth2callback';
var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
var GoogleContacts = require('googlecontacts').GoogleContacts;
var contacts;

var url = oauth2Client.generateAuthUrl({
  access_type: 'offline', 
  scope: 'https://www.googleapis.com/auth/contacts'
});

exports.requestImportContacts = function(req, res) {
	console.log("Request import contacts");
	console.log(oauth2Client.credentials);
	res.redirect(url);
};

exports.oauthCallback = function(req, res) {
	console.log(req);
	setAccessToken(req.params.code);
	importContacts(res);
};

function setAccessToken(authorizationCode) {
	console.log(authorizationCode);
    oauth2Client.getToken(authorizationCode, function (err, tokens) {
      // Now tokens contains an access_token and an optional refresh_token. Save them.
      if(!err) {
        oauth2Client.setCredentials(tokens);
        console.log(tokens);
		contacts = new GoogleContacts({token: tokens});
        console.log(contacts);
        return tokens;
      }
    });
}

function importContacts(res) {
	console.log("importContacts");
    contacts.on('contactsReceived', function (contacts) {
    	res.send(JSON.stringify(contacts));
    })
    contacts.getContacts();
};

