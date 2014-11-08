var mongo = require('mongoskin');
var db = mongo.db('mongodb://localhost:27017/mccgroup27');


exports.findAll = function(collectionName, query) {
  db.collection(collectionName).find(query).toArray(function (error, result) {
    return result;
  });
};

exports.findOne = function(collectionName, query) {
  db.collection(collectionName).findOne(query, function (error, result) {
    return result;
  });
};

exports.findById = function(collectionName, id) {
  db.collection(collectionName).findById(id, function (error, result) {
    return result;
  });
};

exports.create = function(collectionName, object) {
  db.collection(collectionName).insert(object, function (error, result) {
    // Insert returns array instead of object for some reason.
    // We want to return the id of the object only.
    return {id: result[0]._id};
  });
};

exports.update = function(collectionName, id, newObject) {
  newObject._id = mongo.helper.toObjectID(id);

  db.collection(collectionName).updateById(id, newObject, function (error, result) {
    return result;
  });
};

exports.delete = function(collectionName, id) {
  db.collection(collectionName).removeById(id, function (error, result) {
    return result;
  });
};
