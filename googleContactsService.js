var google = require('googleapis');
var plus = google.plus('v1');
var OAuth2Client = google.auth.OAuth2;

var CLIENT_ID = '709847374314-ovdqsjq54bj4llbpr219rrg55dt1alop.apps.googleusercontent.com';
var CLIENT_SECRET = '06KY_8EFUBsQvg_KceLvdI4T';
var REDIRECT_URL = 'http://mccgroup27.ddns.net/api/oauth2callback';
var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

// generate a url that asks permissions for Google+ and Google Calendar scopes
var scopes = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/calendar'
];

var url = oauth2Client.generateAuthUrl({
  access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
  scope: scopes // If you only need one scope you can pass it as string
});

exports.setAuthToken = function(req, res) {	
	console.log("Set auth token");
	console.log(req.params);
	var code = req.params.code;
	oauth2Client.getToken(code, function(err, tokens) {
	  // Now tokens contains an access_token and an optional refresh_token. Save them.
	  if(!err) {
	    oauth2Client.setCredentials(tokens);	    
	  }
	});
};

exports.importContacts = function(req, res) {
	console.log("Import contacts");
	console.log(oauth2Client);
	plus.people.get({userId: 'kukkakeppi@gmail.com', auth: oauth2Client}, function (err, profile) {
	    res.send(JSON.stringify(error: err, profile: profile));
	});
};
