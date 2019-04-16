class AzitoResponse {
  constructor(model, data, req) {
    this.model = model;
    this.data = data;
    this.dataType = Array.isArray(data) ? "collection" : "object";
    this.req = req;
  }

  getResponse() {
    let response = {
      model: this.model,
      dataType: this.dataType,
      data:this.data,
      uri:this.req.originalUrl
    }
    // response[this.model]=this.data;
    // response.uri=this.req.originalUrl
    return response;
  }
}
export default AzitoResponse