export function loadApp(req, res) {
  res.sendFile(require("../conf/config").appHome + '/client/app.html');
}
export function loadIAM_UI(req, res) {
  res.sendFile(require("../conf/config").appHome + '/client/iam.html');
  // res.render(require("../conf/config").appHome + '/client/iam.html');
}

export function rootRedirect(req,res){
  res.redirect('/login?serurl=/app');
}