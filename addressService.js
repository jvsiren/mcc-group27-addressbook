var dao = require('./dao');
var collectionName = 'addresses';

var sendResponse = function(result, res) {
  if(result) {
  	var resultString = result;
    if(typeof resultString !== "string") {
      resultString = JSON.stringify(result);
    }
    res.send(resultString);    
  } 
  else {
  	console.log(error);
    res.sendStatus(400);    
  }
};

exports.findAllAddresses = function(req, res) {
  sendResponse(dao.findAll(collectionName, {}), res);
};

exports.findAddressById = function(req, res) {
  sendResponse(dao.findById(collectionName, req.params.id), res);
};

exports.findAddressesByQuery = function(req, res) {
  sendResponse(dao.findAll(collectionName, req.body), res);
};

exports.createAddress = function (req, res) {
  sendResponse(dao.create(collectionName, req.body), res);
};

exports.modifyAddress = function (req, res) {
  sendResponse(dao.update(collectionName, req.params.id, req.body), res);
};

exports.deleteAddress = function (req, res) {
  sendResponse(dao.delete(collectionName, req.params.id), res);
};