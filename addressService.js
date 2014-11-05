var dao = require('./dao');
var collectionName = 'addresses';

exports.findAllAddresses = function(req, res) {
  dao.findAll(collectionName, {}, res);
};

exports.findAddressById = function(req, res) {
  dao.findById(collectionName, req.params.id, res);
};

exports.findAddressesByQuery = function(req, res) {
  dao.findAll(collectionName, req.body, res);
};

exports.createAddress = function (req, res) {
  dao.create(collectionName, req.body, res);
};

exports.modifyAddress = function (req, res) {
  dao.update(collectionName, req.params.id, req.body, res);
};

exports.deleteAddress = function (req, res) {
  dao.delete(collectionName, req.params.id, res);
};
