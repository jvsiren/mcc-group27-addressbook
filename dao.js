var mongo = require('mongoskin');
var db = mongo.db('mongodb://localhost:27017/mccgroup27');

var queryResultCallback = function(res, error, result) {
  if(error) {
    console.log(error);
    res.sendStatus(400);
  } 
  else {
    var resultString = result;
    if(typeof resultString !== "string") {
      resultString = JSON.stringify(result);
    }
    res.send(resultString);
  }
};

exports.findAll = function(collectionName, query, res) {
  db.collection(collectionName).find(query).toArray(function(error, result) {
    queryResultCallback(res, error, result);
  });
};

exports.findOne = function(collectionName, query, res) {
  db.collection(collectionName).findOne(query, function(error, result) {
    queryResultCallback(res, error, result);
  });
};

exports.findById = function(collectionName, id, res) {
  db.collection(collectionName).findById(id, function(error, result) {
    queryResultCallback(res, error, result);
  });
};

exports.create = function(collectionName, object, res) {
  db.collection(collectionName).insert(object, function(error, result) {
    // Insert returns array instead of object for some reason.
    // We want to return the id of the object only.
    var returnObject = {id: result[0]._id};
    queryResultCallback(res, error, returnObject);
  });
};

exports.update = function(collectionName, id, newObject, res) {
  newObject._id = mongo.helper.toObjectID(id);

  db.collection(collectionName).updateById(id, newObject, function(error, result) {
    queryResultCallback(res, error, result);
  });
};

exports.delete = function(collectionName, id, res) {
  db.collection(collectionName).removeById(id, function(error, result) {
    queryResultCallback(res, error, result);
  });
};
