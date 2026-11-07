
class wr extends Qi {
  constructor({ ownerDocument: t = globalThis.document, enableHWA: e = !1 }) {
    (super({ enableHWA: e }), (this._document = t));
  }
  _createCanvas(t, e) {
    const s = this._document.createElement("canvas");
    return ((s.width = t), (s.height = e), s);
  }
}