
class Qr extends rs {
  #t = cs.bind(this);
  _done = !1;
  _queuedChunks = null;
  _requests = [];
  constructor(t) {
    super(t);
    const { pdfDataRangeTransport: e, disableRange: s, disableStream: i } = t._source,
      { length: n, contentDispositionFilename: r } = e;
    this._queuedChunks = t._queuedChunks || [];
    for (const o of this._queuedChunks) this._loaded += o.byteLength;
    ((this._done = t._progressiveDone),
      (this._contentLength = n),
      (this._isStreamingSupported = !i),
      (this._isRangeSupported = !s),
      js(r) && (this._filename = r),
      this._headersCapability.resolve());
    const a = this._loaded;
    Promise.resolve().then(() => {
      a > 0 && this._loaded === a && this._callOnProgress();
    });
  }
  _enqueue(t) {
    this._done ||
      (this._requests.length > 0
        ? this._requests.shift().resolve({ value: t, done: !1 })
        : this._queuedChunks.push(t),
      (this._loaded += t.byteLength),
      this._callOnProgress());
  }
  async read() {
    if (this._queuedChunks.length > 0) return { value: this._queuedChunks.shift(), done: !1 };
    if (this._done) return { value: void 0, done: !0 };
    const t = Promise.withResolvers();
    return (this._requests.push(t), t.promise);
  }
  cancel(t) {
    ((this._done = !0), this.#t());
  }
  progressiveDone() {
    ((this._done ||= !0), this._queuedChunks.length === 0 && this.#t());
  }
}