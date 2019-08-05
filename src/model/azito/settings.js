let mongo = require('../../utils/persistence/mongodb');
import AzitoError from "../../utils/errors/AzitoError";

class Settings {
  constructor(settings) {
    this.theme = settings.theme;
    this.lang = settings.lang;
  }

  getAsJSON() {
    return {
      theme: this.theme,
      lang: this.lang
    }
  }

  static getSettings(userName) {
    return new Promise((resolve, reject) => {
      mongo.getUserCollection('settings',userName).find().next((err, doc) => {
        if (err || doc == null) {
          reject(new AzitoError("AZITO_SETTINGS_4041"))
        } else {
          resolve(new Settings(doc));
        }
      });
    });
  }

  static createSettings(userName) {
    return new Promise((resolve, reject) => {
      var settings = {
        lang: "en_IN",
        theme: '0',
        currency: "$"
      }
      mongo.getUserCollection('settings',userName).insertOne(settings, (err, doc) => {
        if (err || doc == null) {
          reject(new AzitoError("AZITO_SERVER_500"))
        } else {
          resolve(new Settings(doc.ops[0]));
        }
      })
    });
  }

  static saveSettings(userName, settings) {
    return new Promise((resolve, reject) => {
      mongo.getUserCollection('settings',userName).updateOne({}, {
        $set: settings
      }, {
        returnOriginal: false,
        upsert: true
      }, (err, doc) => {
        if (err || doc == null) {
          reject(new AzitoError("AZITO_SERVER_500"))
        } else {
          resolve();
        }
      })
    });
  }
}
export default Settings