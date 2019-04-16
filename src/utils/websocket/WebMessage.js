
class WebMessage{
  constructor(from,code,action){
    this.from=from;
    this.code=code;
    this.action=action;
  }

  getMessage(){
    return JSON.stringify({
      from:this.from,
      code:this.code,
      action:this.action
    })
  }
}
export default WebMessage