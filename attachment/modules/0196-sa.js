
class sa extends as {
  #t = cs.bind(this);
  onClosed = null;
  _done = !1;
  _queuedChunk = null;
  _requests = [];
  _storedError = null;
  constructor(t, e, s) {
    (super(t, e, s),
      (this._requestXhr = t._request({
        begin: e,
        end: s,
        onHeadersReceived: this.#e.bind(this),
        onDone: this.#s.bind(this),
        onError: this.#i.bind(this),
        onProgress: null,
      })));
  }
  #e() {
    const t = os(this._requestXhr?.responseURL);
    try {
      nn(t, this._stream._responseOrigin);
    } catch (e) {
      ((this._storedError = e), this.#i(0));
    }
  }
  #s(t) {
    (this._requests.length > 0
      ? this._requests.shift().resolve({ value: t, done: !1 })
      : (this._queuedChunk = t),
      (this._done = !0),
      this.#t(),
      this.onClosed?.());
  }
  #i(t) {
    this._storedError ??= ls(t, this._stream.url);
    for (const e of this._requests) e.reject(this._storedError);
    ((this._requests.length = 0), (this._queuedChunk = null));
  }
  async read() {
    if (this._storedError) throw this._storedError;
    if (this._queuedChunk !== null) {
      const e = this._queuedChunk;
      return ((this._queuedChunk = null), { value: e, done: !1 });
    }
    if (this._done) return { value: void 0, done: !0 };
    const t = Promise.withResolvers();
    return (this._requests.push(t), t.promise);
  }
  cancel(t) {
    ((this._done = !0), this.#t(), this._stream._abortRequest(this._requestXhr), this.onClosed?.());
  }
}