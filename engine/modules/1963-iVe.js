
var iVe = ne(() => {
  Gt();
  Ew();
  U2();
  xxe = class xxe extends ki()("Session.MessageDecodeError", { sessionID: Jj, messageID: wf }) {
    get message() {
      return `Failed to decode message ${this.messageID} in session ${this.sessionID}`;
    }
  };
  zLt = class zLt extends ki()("Session.ContextSnapshotDecodeError", { sessionID: Jj, details: re }) {
    get message() {
      return `Failed to decode context snapshot for session ${this.sessionID}: ${this.details}`;
    }
  };
});