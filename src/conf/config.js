function setConstant(name, value) {
  Object.defineProperty(exports, name, {
      value:      value,
      enumerable: true
  });
}
const appHome=require('path').dirname(require.main.filename);
setConstant("appHome",appHome);

const sessionConfig={
  key: 'IAM_SID',
  secret: 'somerandomstuffs',
  var:"user"
};
setConstant("sessionConfig",sessionConfig);

const mongoDbConfig={
  url:'mongodb://'+(process.env.NODE_ENV==="production"? process.env.DB_USERNAME+':'+process.env.DB_PASSWORD+'@':'')+process.env.DB_URL,
  db:process.env.DB_NAME
};
setConstant("mongoDbConfig",mongoDbConfig);