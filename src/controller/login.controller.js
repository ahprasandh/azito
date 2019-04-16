import {
  sessionConfig,
  appHome
} from "../conf/config";
import * as jwt from "../utils/jwt/jwtHandler";
import User from "../model/user";
import WebMessage from '../utils/websocket/WebMessage'

exports.loadLoginForm = (req, res) => {
  if (!req.session[sessionConfig.var]) {
    res.sendFile(appHome + '/client/login.html');
  } else {
    res.redirect('/app');
  }
};

let createUserSession = (req,res,next)=>{
  var userName = req.body.userName;
  var password = req.body.password;
  var serurl = req.body.serurl;
  if (!serurl) {
    serurl = "/accounts";
  }
  User.checkUserLogin(userName, password).then((user) => {
    req.session.user = user;
    require('../utils/websocket/webSocketUtil').broadcast(new WebMessage("IAM", "IAM_1", "login").getMessage());
    res.status(200).send({
      status: true,
      redirect: serurl
    });
  }).catch((err) => {
    res.status(400).send({
      status: false,
      message: err
    });
  });
}

exports.loginUser = (req, res) => {
  createUserSession(req,res)
};


exports.logoutUser = (req, res) => {
  var serurl = req.body.serurl;
  if (!serurl) {
    serurl = "/accounts";
  }
  if (req.cookies[sessionConfig.key] && req.session[sessionConfig.var]) {
    req.session.destroy(function (err) {
      res.clearCookie(sessionConfig.key);
      require('../utils/websocket/webSocketUtil').broadcast(new WebMessage("IAM", "IAM_2", "logout").getMessage());
      res.status(200).send({
        status: true,
        redirect: serurl
      });
    });
  } else {
    res.status(200).send({
      status: true,
      redirect: serurl
    });
  }
};

exports.signupUser = (req, res,next) => {
  var userName = req.body.userName;
  var password = req.body.password;
  var displayName = req.body.displayName;
  var serurl = req.body.serurl;
  if (!serurl) {
    serurl = "/accounts";
  }
  let user=new User(userName, displayName, password);
  User.signUpUser(user).then(()=>{
    createUserSession(req,res)
  }).catch(err=>next(err));
};

