
class CMr {
  constructor(e) {
    this._maxBufferSize = e?.maxBufferSize ?? fFa;
  }
  append(e) {
    if ((this._buffer?.length ?? 0) + e.length > this._maxBufferSize)
      throw (this.clear(), Error(`ReadBuffer exceeded maximum size of ${this._maxBufferSize} bytes`));
    this._buffer = this._buffer ? Buffer.concat([this._buffer, e]) : e;
  }
  readMessage() {
    if (!this._buffer) return null;
    let e = this._buffer.indexOf(`
`);
    if (e === -1) return null;
    let t = this._buffer.toString("utf8", 0, e).replace(/\r$/, "");
    return ((this._buffer = this._buffer.subarray(e + 1)), pFa(t));
  }
  clear() {
    this._buffer = void 0;
  }
}