
class ns {
  #t = null;
  #e = null;
  _fullReader = null;
  _rangeReaders = new Set();
  _source = null;
  constructor(t, e, s) {
    ((this._source = t), (this.#t = e), (this.#e = s));
  }
  get _progressiveDataLength() {
    return this._fullReader?._loaded ?? 0;
  }
  getFullReader() {
    return (
      tt(!this._fullReader, "BasePDFStream.getFullReader can only be called once."),
      (this._fullReader = new this.#t(this))
    );
  }
  getRangeReader(t, e) {
    if (e <= this._progressiveDataLength) return null;
    const s = new this.#e(this, t, e);
    return (this._rangeReaders.add(s), s);
  }
  cancelAllRequests(t) {
    this._fullReader?.cancel(t);
    for (const e of new Set(this._rangeReaders)) e.cancel(t);
  }
}