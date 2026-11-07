
class cn {
  #t = Promise.withResolvers();
  #e = null;
  constructor(t, e, s = !1, i = null) {
    ((this.length = t),
      (this.initialData = e),
      (this.progressiveDone = s),
      (this.contentDispositionFilename = i));
  }
  onDataRange(t, e) {
    this.#e({ type: "range", begin: t, chunk: e });
  }
  onDataProgressiveRead(t) {
    this.#t.promise.then(() => {
      this.#e({ type: "progressiveRead", chunk: t });
    });
  }
  onDataProgressiveDone() {
    this.#t.promise.then(() => {
      this.#e({ type: "progressiveDone" });
    });
  }
  transportReady(t) {
    ((this.#e = t), this.#t.resolve());
  }
  requestDataRange(t, e) {
    $("Abstract method PDFDataRangeTransport.requestDataRange");
  }
  abort() {}
}