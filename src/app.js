var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var https = require('https');
var http = require('http');
var fs = require('fs');
import {
  sessionConfig,
  appHome
} from "./conf/config";
const MongoStore = require('connect-mongo')(session);
import {
  initSessionVariables
} from "./utils/security/routeValidator";

import {
  initDb
} from "./utils/persistence/mongodb";


let startApp = (err, db) => {
  require('./utils/websocket/webSocketUtil').startWebSocket();

  var app = express();
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.set('x-powered-by', false);
  app.set('view engine', 'pug')
  let sessionOptions = {
    key: sessionConfig.key,
    secret: sessionConfig.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: (1 * 60 * 60 * 1000)
    },
    store: new MongoStore({
      db: db
    })
  };
  app.use(session(sessionOptions));
  initSessionVariables({
    sessionKey: sessionConfig.key,
    sessionVariable: sessionConfig.var
  });


  app.use('/api', require('./routes/apiRouter'));
  app.use('/', require('./routes/homeRouter'));

  app.use(express.static(appHome + '/client'));
  
  if(process.env.NODE_ENV === 'production'){
    http.createServer(app).listen(process.env.PORT || 8080, () => console.log(`IAM started on http port`));
  }else{
    var options = {
      key: fs.readFileSync('./src/conf/client-key.pem'),
      cert: fs.readFileSync('./src/conf/client-cert.pem')
    };
    http.createServer(app).listen(process.env.PORT || 8080, () => console.log(`IAM started on http port`));
    https.createServer(options, app).listen(8443, () => console.log(`IAM started on https port 8443`));
  }
  
  

  process.on('unhandledRejection', function (reason, p) {
    console.log('Unhandled Reject' + reason + p)
  });

  process.on('uncaughtException', function (error,req,res,next) {
    console.log('UnhandledException')
    console.log(error,req,res,next)
    // process.exit(1)
  });


};

initDb(startApp);