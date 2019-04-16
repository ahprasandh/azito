const WebSocket = require('ws');
import WebMessage from './WebMessage'
import WMSConstants from './WMSConstants';

var wss;

const startWebSocket = () => {
  wss = new WebSocket.Server({
      port: 3000
    }, () =>
    console.log("SocketServer started at 3000")
  )

  wss.on('connection', ws => {
    console.log(`Client Connected`)
    ws.on('message', message => {
      console.log(`Received message => ${message}`)
    });
    ws.send(new WebMessage("WMS", "WMS_1", WMSConstants["WMS_1"]).getMessage());
    broadcast(new WebMessage("WMS", "WMS_2", WMSConstants["WMS_2"]).getMessage())
  })
}

const broadcast = (webMessage) => {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(webMessage);
    }
  });
};

module.exports = {
  startWebSocket,
  broadcast,
  // send,
}