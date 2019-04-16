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
function getUserDb(user){
  return mongoClient.db('db'+user+'db');
}
module.exports = {
  getIAMDb,
  getUserDb,
  initDb
};