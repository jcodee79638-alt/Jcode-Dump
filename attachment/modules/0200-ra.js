
class ra extends as {
  _readCapability = Promise.withResolvers();
  _reader = null;
  constructor(t, e, s) {
    super(t, e, s);
    const { url: i } = t._source;
    try {
      const n = on(i, { start: e, end: s - 1 });
      ((this._reader = n.getReader()), this._readCapability.resolve());
    } catch (n) {
      this._readCapability.reject(n);
    }
  }
  async read() {
    await this._readCapability.promise;
    const { value: t, done: e } = await this._reader.read();
    return e ? { value: t, done: e } : { value: hs(t), done: !1 };
  }
  cancel(t) {
    this._reader?.cancel(t);
  }
}