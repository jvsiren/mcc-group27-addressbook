var dao = require('./dao');
var collectionName = 'addresses';

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

exports.findAllAddresses = function(req, res) {
  dao.findAll(collectionName, {}, function (result) { sendResponse(result, res); });
};

exports.findAddressById = function(req, res) {
  dao.findById(collectionName, req.params.id, function (result) { sendResponse(result, res); });
};

exports.findAddressesByQuery = function(req, res) {
  dao.findAll(collectionName, req.body, function (result) { sendResponse(result, res); });
};

exports.createAddress = function (req, res) {
  dao.create(collectionName, req.body, function (result) { sendResponse(result, res); });
};

exports.modifyAddress = function (req, res) {
  dao.update(collectionName, req.params.id, req.body, function (result) { sendResponse(result, res); });
};

exports.deleteAddress = function (req, res) {
  dao.delete(collectionName, req.params.id, function (result) { sendResponse(result, res); });
};