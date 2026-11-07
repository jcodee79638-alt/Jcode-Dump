
class Yr extends rs {
  _abortController = new AbortController();
  _reader = null;
  constructor(t) {
    super(t);
    const { disableRange: e, disableStream: s, rangeChunkSize: i, url: n, withCredentials: r } = t._source;
    this._isStreamingSupported = !s;
    const a = new Headers(t.headers);
    rn(n, a, r, this._abortController)
      .then((o) => {
        ((t._responseOrigin = os(o.url)), an(o.status, n), (this._reader = o.body.getReader()));
        const l = o.headers,
          { contentLength: h, isRangeSupported: d } = en({
            responseHeaders: l,
            isHttp: !0,
            rangeChunkSize: i,
            disableRange: e,
          });
        ((this._contentLength = h),
          (this._isRangeSupported = d),
          (this._filename = sn(l)),
          !this._isStreamingSupported &&
            this._isRangeSupported &&
            this.cancel(new zt("Streaming is disabled.")),
          this._headersCapability.resolve());
      })
      .catch(this._headersCapability.reject);
  }
  async read() {
    await this._headersCapability.promise;
    const { value: t, done: e } = await this._reader.read();
    return e
      ? { value: t, done: e }
      : ((this._loaded += t.byteLength), this._callOnProgress(), { value: hs(t), done: !1 });
  }
  cancel(t) {
    (this._reader?.cancel(t), this._abortController.abort());
  }
}