
class na extends rs {
  _reader = null;
  constructor(t) {
    super(t);
    const { disableRange: e, disableStream: s, rangeChunkSize: i, url: n } = t._source;
    ((this._isStreamingSupported = !s),
      process
        .getBuiltinModule("fs/promises")
        .lstat(n)
        .then((a) => {
          const o = on(n);
          this._reader = o.getReader();
          const { size: l } = a;
          ((this._contentLength = l),
            (this._isRangeSupported = !e && l > 2 * i),
            !this._isStreamingSupported &&
              this._isRangeSupported &&
              this.cancel(new zt("Streaming is disabled.")),
            this._headersCapability.resolve());
        })
        .catch((a) => {
          (a.code === "ENOENT" && (a = ls(0, n)), this._headersCapability.reject(a));
        }));
  }
  async read() {
    await this._headersCapability.promise;
    const { value: t, done: e } = await this._reader.read();
    return e
      ? { value: t, done: e }
      : ((this._loaded += t.byteLength), this._callOnProgress(), { value: hs(t), done: !1 });
  }
  cancel(t) {
    this._reader?.cancel(t);
  }
}