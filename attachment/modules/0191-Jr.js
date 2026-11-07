
class Jr extends as {
  #t = cs.bind(this);
  onDone = null;
  _begin = -1;
  _done = !1;
  _queuedChunk = null;
  _requests = [];
  constructor(t, e, s) {
    (super(t, e, s), (this._begin = e));
  }
  _enqueue(t) {
    this._done ||
      (this._requests.length === 0
        ? (this._queuedChunk = t)
        : (this._requests.shift().resolve({ value: t, done: !1 }), this.#t()),
      (this._done = !0),
      this.onDone?.());
  }
  async read() {
    if (this._queuedChunk) {
      const e = this._queuedChunk;
      return ((this._queuedChunk = null), { value: e, done: !1 });
    }
    if (this._done) return { value: void 0, done: !0 };
    const t = Promise.withResolvers();
    return (this._requests.push(t), t.promise);
  }
  cancel(t) {
    ((this._done = !0), this.#t(), this.onDone?.());
  }
}