let appHome=require('../../conf/config').appHome;
const MongoClient = require('mongodb').MongoClient;
const assert = require("assert");
const mongoDbConfig=require(appHome+'/conf/config').mongoDbConfig;

let _azitodb;
let mongoClient;

function initDb(callback) {
  if (_azitodb) {
    console.warn("Trying to init DB again!");
    return callback(null, _azitodb);
  }
  MongoClient.connect(mongoDbConfig.url, { useNewUrlParser: true }, function(err, mongoClientvar) {
    if (err) {
      return callback(err);
    }
    mongoClient=mongoClientvar;
    _azitodb = mongoClient.db(mongoDbConfig.db);
    return callback(null, _azitodb);
  });
}
function getIAMDb() {
  assert.ok(_azitodb, "Db has not been initialized. Please called init first.");
  return _azitodb;
}
function getIAMCollection(collection){
  assert.ok(_azitodb, "Db has not been initialized. Please called init first.");
  return _azitodb.collection(collection);
}
function getUserCollection(collection,user){
  return _azitodb.collection(collection+"_"+user);
}
module.exports = {
  getIAMDb,
  getIAMCollection,
  getUserCollection,
  initDb
};