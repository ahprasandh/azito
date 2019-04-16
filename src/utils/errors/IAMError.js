import IAMErrorCode from "./IAMErrorCode"
class IAMError extends Error {
  constructor(errorCode, ...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, IAMError);
    }
    if(!IAMErrorCode[errorCode]){
      errorCode="IAM_SERVER_1";
    }
    this.errorCode=errorCode;
    this.status=IAMErrorCode[errorCode][0];
    this.message = IAMErrorCode[errorCode][1];
    this.date = new Date();
  }
}
export default IAMError;