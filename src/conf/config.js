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
  url:'mongodb://localhost:27017',
  db:"azito"
};
setConstant("mongoDbConfig",mongoDbConfig);