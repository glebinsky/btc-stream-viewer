const wsUri = "wss://ws.blockchain.info/inv";
let websocket;
let subscribedTrx;
let gettingTrx;

export const Connect = () => {
  console.log('Connect');
  (!websocket || isClosed()) && resetFlags() && (websocket = new WebSocket(wsUri));
}

export const Disconnect = () => {
  console.log('Disconnect');
  websocket && !isClosed() && resetFlags() && websocket.close();
}

export const SubscribeTrx = () => {
  console.log('SubscribeTrx');
  !subscribedTrx && sendWhenOpen(() => {
    subscribedTrx = true;
    sendMessage("unconfirmed_sub");
    sendMessage("block_sub");
  })
}

export const UnsubscribeTrx = () => {
  console.log('UnsubscribeTrx');
  subscribedTrx && sendWhenOpen(() => {
    subscribedTrx = false;
    sendMessage("unconfirmed_unsub");
    sendMessage("block_unsub");
  })
}

export const GetTrx = (fn) => {
  console.log('GetTrx');
  !gettingTrx && sendWhenOpen(() => {
    gettingTrx = true;
    websocket.addEventListener("message", (evt) => { fn(JSON.parse(evt.data)) });
    sendMessage("ping_unconfirmed");
  })
}

export const GetError = (fn) => {
  console.log('GetError');
  websocket && (websocket.onerror = function(evt) { fn(evt.data) });
}

const sendWhenOpen = (fn) => {
  const interval = setInterval(() => {
    if (isOpen()) {
      console.log('interval', fn.toString())
      fn();
      clearInterval(interval);
    }
  }, 300)
}

const sendMessage = message => websocket.send(JSON.stringify({ "op": message }));

const isConnecting = () => websocket.readyState === WebSocket.CONNECTING
const isOpen = () => websocket.readyState === WebSocket.OPEN
const isClosing = () => websocket.readyState === WebSocket.CLOSING
const isClosed = () => websocket.readyState === WebSocket.CLOSED

const resetFlags = () => {
  subscribedTrx = false;
  gettingTrx = false
  return true;
}
