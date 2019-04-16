let mongo = require('../utils/persistence/mongodb');
var bcrypt = require('bcrypt');
import IAMError from "../utils/errors/IAMError";

class User {

  constructor(userName, displayName, password) {
    this.userName = userName;
    this.displayName = displayName;
    this.password = password;
  }

  static checkUserLogin(userName, password) {
    return new Promise((resolve, reject) => {
      this.getUser(userName).then(user => {
        return this.validatePassword(user, password);
      }).then(user => resolve(user)).catch(err => reject(err))
    });
  }



  static validatePassword(user, password) {
    if (bcrypt.compareSync(password, user.getPassword())) {
      return Promise.resolve(user);
    } else {
      return Promise.reject(new IAMError("IAM_USER_1"));
    }
  }

  updateProfile() {
    return new Promise((resolve, reject) => {
      mongo.getIAMDb().collection('users').findOneAndUpdate({
        userName: this.getUserName()
      }, {
        $set: {
          displayName: this.getDisplayName()
        }
      }, {
        returnOriginal: false,
        upsert: true
      }, (err, doc) => {
        if (!err && doc) {
          resolve(this.getAsJSON("v1"))
        } else {
          reject(new IAMError("IAM_SERVER_1"));
        }
      });
    });
  }

  static getUser(userName) {
    return new Promise((resolve, reject) => {
      mongo.getIAMDb().collection('users').find({
        userName: userName
      }).next((err, doc) => {
        if (err || doc == null) {
          reject(new IAMError("IAM_USER_1"))
        } else {
          resolve(new User(doc.userName, doc.displayName, doc.password));
        }
      });
    });
  }

  static signUpUser(user) {
    return new Promise((resolve, reject) => {
      mongo.getIAMDb().collection('users').find({
        userName: user.getUserName()
      }).next((err, doc) => {
        if (!err && doc == null) {
          const salt = bcrypt.genSaltSync();
          mongo.getIAMDb().collection('users').insertOne({
            userName: user.getUserName(),
            password: bcrypt.hashSync(user.getPassword(), salt),
            displayName: user.getDisplayName()
          }, function (err, docs) {
            if (docs) {
              resolve();
            } else {
              reject(new IAMError("IAM_SERVER_1"))
            }
          });
        } else {
          reject(new IAMError("IAM_USER_2"))
        }
      });
    });
  }

  closeAccount(password) {
    return new Promise((resolve, reject) => {
      if(bcrypt.compareSync(password, this.getPassword())){
        mongo.getIAMDb().collection('users').deleteOne({
          userName: this.getUserName()
        }, (err, doc) => {
          // console.log(err,doc)
          if (!err && doc) {
            resolve()
          } else {
            reject(new IAMError("IAM_SERVER_1"));
          }
        });
      }else{
        reject(new IAMError("IAM_USER_3"));
      }
      
    });
  }

  getUserName() {
    return this.userName;
  }
  getPassword() {
    return this.password;
  }

  getDisplayName() {
    return this.displayName;
  }

  setDisplayName(displayName) {
    this.displayName = displayName;
  }

  getAsJSON() {
    return {
      userName: this.userName,
      displayName: this.displayName
    }
  }
}

export default User