
class ta extends ns {
  #t = new WeakMap();
  _responseOrigin = null;
  constructor(t) {
    super(t, ea, sa);
    const { httpHeaders: e, url: s } = t;
    ((this.url = s), (this.isHttp = /https?:/.test(s.protocol)), (this.headers = tn(this.isHttp, e)));
  }
  _request(t) {
    const e = new XMLHttpRequest(),
      s = {
        validateStatus: null,
        onHeadersReceived: t.onHeadersReceived,
        onDone: t.onDone,
        onError: t.onError,
        onProgress: t.onProgress,
      };
    (this.#t.set(e, s), e.open("GET", this.url), (e.withCredentials = this._source.withCredentials));
    for (const [i, n] of this.headers) e.setRequestHeader(i, n);
    return (
      this.isHttp && "begin" in t && "end" in t
        ? (e.setRequestHeader("Range", `bytes=${t.begin}-${t.end - 1}`),
          (s.validateStatus = (i) => i === Li || i === ys))
        : (s.validateStatus = (i) => i === ys),
      (e.responseType = "arraybuffer"),
      tt(t.onError, "Expected `onError` callback to be provided."),
      (e.onerror = () => t.onError(e.status)),
      (e.onreadystatechange = this.#s.bind(this, e)),
      (e.onprogress = this.#e.bind(this, e)),
      e.send(null),
      e
    );
  }
  #e(t, e) {
    this.#t.get(t)?.onProgress?.(e);
  }
  #s(t, e) {
    const s = this.#t.get(t);
    if (
      !s ||
      (t.readyState >= 2 && s.onHeadersReceived && (s.onHeadersReceived(), delete s.onHeadersReceived),
      t.readyState !== 4) ||
      !this.#t.has(t)
    )
      return;
    if ((this.#t.delete(t), t.status === 0 && this.isHttp)) {
      s.onError(t.status);
      return;
    }
    const i = t.status || ys;
    if (!s.validateStatus(i)) {
      s.onError(t.status);
      return;
    }
    const n = Zr(t.response);
    if (i === Li) {
      const r = t.getResponseHeader("Content-Range");
      /bytes \d+-\d+\/\d+/.test(r)
        ? s.onDone(n)
        : (H('Missing or invalid "Content-Range" header.'), s.onError(0));
    } else n ? s.onDone(n) : s.onError(t.status);
  }
  _abortRequest(t) {
    this.#t.has(t) && (this.#t.delete(t), t.abort());
  }
  getRangeReader(t, e) {
    const s = super.getRangeReader(t, e);
    return (s && (s.onClosed = () => this._rangeReaders.delete(s)), s);
  }
}