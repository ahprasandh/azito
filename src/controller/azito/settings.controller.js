import Settings from "../../model/azito/settings";
import AzitoResponse from '../../utils/azito/AzitoResponse'

export function getSettings(req, res, next) {
  Settings.getSettings(req.session.user.userName).then(settings => {
    res.status(200).send(new AzitoResponse("settings",settings.getAsJSON('v1'),req).getResponse());
  }).catch(err => {
    if (err.errorCode === "AZITO_SETTINGS_4041") {
      Settings.createSettings(req.session.user.userName).then(settings => {
        res.status(200).send(settings.getAsJSON('v1'));
      }).catch(err=>{
        next(err);
      })
    } else {
      next(err);
    }
  });
}

export function saveSettings(req,res,next){
  Settings.saveSettings(req.session.user.userName,req.body).then(settings => {
    res.status(204).send();
  }).catch(err => {
    next(err);
  });
}