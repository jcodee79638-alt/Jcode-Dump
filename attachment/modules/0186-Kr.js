
class Kr extends as {
  _abortController = new AbortController();
  _readCapability = Promise.withResolvers();
  _reader = null;
  constructor(t, e, s) {
    super(t, e, s);
    const { url: i, withCredentials: n } = t._source,
      r = new Headers(t.headers);
    (r.append("Range", `bytes=${e}-${s - 1}`),
      rn(i, r, n, this._abortController)
        .then((a) => {
          const o = os(a.url);
          (nn(o, t._responseOrigin),
            an(a.status, i),
            (this._reader = a.body.getReader()),
            this._readCapability.resolve());
        })
        .catch(this._readCapability.reject));
  }
  async read() {
    await this._readCapability.promise;
    const { value: t, done: e } = await this._reader.read();
    return e ? { value: t, done: e } : { value: hs(t), done: !1 };
  }
  cancel(t) {
    (this._reader?.cancel(t), this._abortController.abort());
  }
}