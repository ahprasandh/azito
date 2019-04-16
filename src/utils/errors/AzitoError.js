import AzitoErrorCode from "./AzitoErrorCode"
class AzitoError extends Error {
  constructor(errorCode, ...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AzitoError);
    }
    if(!AzitoErrorCode[errorCode]){
      errorCode="AZITO_SERVER_5001";
    }
    this.errorCode=errorCode;
    this.status=AzitoErrorCode[errorCode][0];
    this.message = AzitoErrorCode[errorCode][1];
    this.date = new Date();
  }
}
export default AzitoError;