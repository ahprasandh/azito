import AzitoResponse from '../utils/azito/AzitoResponse';
import AzitoError from "../utils/errors/AzitoError";

export function errorUI(err, req, res, next) {
  if (err.errorCode === "RV_AUTH_401") {
    res.redirect("/login");
  } else {
    res.status(err.status || 500).send(err);
  }
}

export function errorAPI(err, req, res, next) {
  if(err && err.status){
    res.status(err.status).send(new AzitoResponse("error",err,req).getResponse());
  }else{
    res.status(500).send(new AzitoResponse("error",new AzitoError("AZITO_SERVER_500"),req).getResponse());
  }
  
}