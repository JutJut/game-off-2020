
/// jutnet deals with websocket connection
export class JutNet {
  private _endpoint = "wss://2bw330tgzk.execute-api.eu-central-1.amazonaws.com/dev"
  static _conn: WebSocket;

  constructor() {
    
    if (!JutNet._conn) {
      this.letsInitializeConnection()
    }
  }

  letsInitializeConnection() {
    console.log("JutNet connection initialized.")
    JutNet._conn = _letsConnect(this._endpoint)
    JutNet._conn.onopen = _letsActOnOpen
    JutNet._conn.onclose = _letsActOnClose
    JutNet._conn.onmessage = JutNet.letsActOnRecv
  }

  static letsPing() {
    console.log("Sending NOOP")
    JutNet._conn.send("NOOP")
  }

  static letsActOnRecv = (msg) => console.log(`WS-RECV: ${msg.data}`)

}

/// retrieve websocket endpoint
const _letsConnect = endPoint =>
  new WebSocket(endPoint)

const _letsActOnOpen = _ =>
  console.log("JutNet Connection Established")

const _letsActOnClose = _ =>
  console.log("JutNet Connection Disconnected")

const _letsActOnRecv = msg =>
  console.log(`ws: ${msg}`)