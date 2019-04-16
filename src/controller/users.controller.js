import User from "../model/user";


export function getMyinfo(req, res, next) {
  User.getUser(req.session.user.userName).then(user => {
    res.status(200).send(user.getAsJSON("v1"));
  }).catch(err =>next(err));
}

export function updateMyinfo(req, res, next) {
  User.getUser(req.session.user.userName).then(user => {
    user.setDisplayName(req.body.displayName);
    user.updateProfile().then((response) => res.status(200).send(response)).catch(err => next(err));
  }).catch(err =>next(err));
}

exports.closeAccount=(req,res,next)=>{
  var password = req.body.password;
  User.getUser(req.session.user.userName).then(user => {
    user.closeAccount(password).then(() => res.status(204).send()).catch(err => next(err));
  }).catch(err =>next(err));
}