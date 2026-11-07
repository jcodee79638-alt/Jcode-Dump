
class ea extends rs {
  #t = cs.bind(this);
  _cachedChunks = [];
  _done = !1;
  _requests = [];
  _storedError = null;
  constructor(t) {
    (super(t),
      (this._fullRequestXhr = t._request({
        onHeadersReceived: this.#e.bind(this),
        onDone: this.#s.bind(this),
        onError: this.#i.bind(this),
        onProgress: this.#n.bind(this),
      })));
  }
  #e() {
    const t = this._stream,
      { disableRange: e, rangeChunkSize: s } = t._source,
      i = this._fullRequestXhr;
    t._responseOrigin = os(i.responseURL);
    const n = i.getAllResponseHeaders(),
      r = new Headers(
        n
          ? Wr(n.trimStart())
              .split(/[\r\n]+/)
              .map((l) => {
                const [h, ...d] = l.split(": ");
                return [h, d.join(": ")];
              })
          : [],
      ),
      { contentLength: a, isRangeSupported: o } = en({
        responseHeaders: r,
        isHttp: t.isHttp,
        rangeChunkSize: s,
        disableRange: e,
      });
    ((this._contentLength = a),
      (this._isRangeSupported = o),
      (this._filename = sn(r)),
      this._isRangeSupported && t._abortRequest(i),
      this._headersCapability.resolve());
  }
  #s(t) {
    (this._requests.length > 0
      ? this._requests.shift().resolve({ value: t, done: !1 })
      : this._cachedChunks.push(t),
      (this._done = !0),
      this._cachedChunks.length === 0 && this.#t());
  }
  #i(t) {
    ((this._storedError = ls(t, this._stream.url)), this._headersCapability.reject(this._storedError));
    for (const e of this._requests) e.reject(this._storedError);
    ((this._requests.length = 0), (this._cachedChunks.length = 0));
  }
  #n(t) {
    this.onProgress?.({ loaded: t.loaded, total: t.lengthComputable ? t.total : this._contentLength });
  }
  async read() {
    if ((await this._headersCapability.promise, this._storedError)) throw this._storedError;
    if (this._cachedChunks.length > 0) return { value: this._cachedChunks.shift(), done: !1 };
    if (this._done) return { value: void 0, done: !0 };
    const t = Promise.withResolvers();
    return (this._requests.push(t), t.promise);
  }
  cancel(t) {
    ((this._done = !0),
      this._headersCapability.reject(t),
      this.#t(),
      this._stream._abortRequest(this._fullRequestXhr),
      (this._fullRequestXhr = null));
  }
}