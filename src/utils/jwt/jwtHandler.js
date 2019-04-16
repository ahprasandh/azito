import {
  sign,
  verify
} from 'jsonwebtoken';
import {
  readFileSync
} from 'fs';

// PAYLOAD
var payload = {
  data1: "Data 1",
  data2: "Data 2",
  data3: "Data 3",
  data4: "Data 4",
};
// PRIVATE and PUBLIC key
var privateKEY = readFileSync('./src/conf/private.key', 'utf8');
var publicKEY = readFileSync('./src/conf/public.key', 'utf8');
var i = 'Mysoft corp'; // Issuer 
var s = 'some@user.com'; // Subject 
var a = 'http://mysoftcorp.in'; // Audience
// SIGNING OPTIONS
var signOptions = {
  issuer: i,
  subject: s,
  audience: a,
  expiresIn: "12h",
  algorithm: "RS256"
};

var verifyOptions = {
  issuer: i,
  subject: s,
  audience: a,
  expiresIn: "12h",
  algorithm: ["RS256"]
};

export function getToken() {
  var token = null;
  try {
    token = sign(payload, privateKEY, signOptions);
  } catch (err) {
    console.log(err);
  }
  return token;
}

export function verifyToken(token) {
  var result = false;
  try {
    result = verify(token, publicKEY, verifyOptions);
  } catch (err) {
    console.log(err);
  }
  return result;
}