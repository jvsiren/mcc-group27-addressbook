var dao = require('./dao');
var collectionName = 'contacts';

function sendResponse(result, res) {
  if(result) {
  	var resultString = result;
    if(typeof resultString !== "string") {
      resultString = JSON.stringify(result);
    }
    res.send(resultString);    
  } 
  else {
    res.sendStatus(400);    
  }
};

exports.findAllContacts = function(req, res) {
  dao.findAll(collectionName, {}, function (result) { sendResponse(result, res); });
};

exports.findContactById = function(req, res) {
  dao.findById(collectionName, req.params.id, function (result) { sendResponse(result, res); });
};

exports.findContactsByQuery = function(req, res) {
  dao.findAll(collectionName, req.body, function (result) { sendResponse(result, res); });
};

exports.createContact = function (req, res) {
  dao.create(collectionName, req.body, function (result) { sendResponse(result, res); });
};

exports.modifyContact = function (req, res) {
  dao.update(collectionName, req.params.id, req.body, function (result) { sendResponse(result, res); });
};

exports.deleteContact = function (req, res) {
  dao.delete(collectionName, req.params.id, function (result) { sendResponse(result, res); });
};