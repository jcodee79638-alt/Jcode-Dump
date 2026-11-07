
class qr extends ns {
  _progressiveDone = !1;
  _queuedChunks = [];
  constructor(t) {
    super(t, Qr, Jr);
    const { pdfDataRangeTransport: e } = t,
      { initialData: s, progressiveDone: i } = e;
    if (s?.length > 0) {
      const r = Ri(s);
      this._queuedChunks.push(r);
    }
    this._progressiveDone = i;
    const n = (r) => {
      switch (r.type) {
        case "range":
        case "progressiveRead":
          this.#t(r.begin, r.chunk);
          break;
        case "progressiveDone":
          (this._fullReader?.progressiveDone(), (this._progressiveDone = !0));
          break;
      }
    };
    e.transportReady(n);
  }
  #t(t, e) {
    const s = Ri(e);
    if (t === void 0) this._fullReader ? this._fullReader._enqueue(s) : this._queuedChunks.push(s);
    else {
      const i = this._rangeReaders.keys().find((n) => n._begin === t);
      (tt(i, "#onReceiveData - no `PDFDataTransportStreamRangeReader` instance found."), i._enqueue(s));
    }
  }
  getFullReader() {
    const t = super.getFullReader();
    return ((this._queuedChunks = null), t);
  }
  getRangeReader(t, e) {
    const s = super.getRangeReader(t, e);
    return (
      s &&
        ((s.onDone = () => this._rangeReaders.delete(s)),
        this._source.pdfDataRangeTransport.requestDataRange(t, e)),
      s
    );
  }
  cancelAllRequests(t) {
    (super.cancelAllRequests(t), this._source.pdfDataRangeTransport.abort());
  }
}