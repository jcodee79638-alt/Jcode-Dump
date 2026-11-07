
class ir {
  #t = [[1, 0, 0, 1, 0, 0]];
  #e = [-1 / 0, -1 / 0, 1 / 0, 1 / 0];
  #s = new Float64Array(Lt);
  _pendingBBoxIdx = -1;
  #i;
  #n;
  #a;
  #r;
  _savesStack = [];
  _markedContentStack = [];
  constructor(t, e) {
    ((this.#i = t.width), (this.#n = t.height), this.#o(e));
  }
  growOperationsCount(t) {
    t >= this.#r.length && this.#o(t, this.#r);
  }
  #o(t, e) {
    const s = new ArrayBuffer(t * 4);
    ((this.#a = new Uint8ClampedArray(s)),
      (this.#r = new Uint32Array(s)),
      e && e.length > 0 ? (this.#r.set(e), this.#r.fill(Fs, e.length)) : this.#r.fill(Fs));
  }
  get clipBox() {
    return this.#e;
  }
  save(t) {
    return ((this.#e = { __proto__: this.#e }), this._savesStack.push(t), this);
  }
  restore(t, e) {
    const s = Object.getPrototypeOf(this.#e);
    if (s === null) return this;
    this.#e = s;
    const i = this._savesStack.pop();
    return (i !== void 0 && (e?.(i, t), (this.#r[t] = this.#r[i])), this);
  }
  recordOpenMarker(t) {
    return (this._savesStack.push(t), this);
  }
  getOpenMarker() {
    return this._savesStack.length === 0 ? null : this._savesStack.at(-1);
  }
  recordCloseMarker(t, e) {
    const s = this._savesStack.pop();
    return (s !== void 0 && (e?.(s, t), (this.#r[t] = this.#r[s])), this);
  }
  beginMarkedContent(t) {
    return (this._markedContentStack.push(t), this);
  }
  endMarkedContent(t, e) {
    const s = this._markedContentStack.pop();
    return (s !== void 0 && (e?.(s, t), (this.#r[t] = this.#r[s])), this);
  }
  pushBaseTransform(t) {
    return (this.#t.push(T.multiplyByDOMMatrix(this.#t.at(-1), t.getTransform())), this);
  }
  popBaseTransform() {
    return (this.#t.length > 1 && this.#t.pop(), this);
  }
  resetBBox(t) {
    return (this._pendingBBoxIdx !== t && ((this._pendingBBoxIdx = t), this.#s.set(Lt, 0)), this);
  }
  recordClipBox(t, e, s, i, n, r) {
    const a = T.multiplyByDOMMatrix(this.#t.at(-1), e.getTransform()),
      o = Lt.slice();
    T.axialAlignedBoundingBox([s, n, i, r], a, o);
    const l = T.intersect(this.#e, o);
    return (
      l
        ? ((this.#e[0] = l[0]), (this.#e[1] = l[1]), (this.#e[2] = l[2]), (this.#e[3] = l[3]))
        : ((this.#e[0] = this.#e[1] = 1 / 0), (this.#e[2] = this.#e[3] = -1 / 0)),
      this
    );
  }
  recordBBox(t, e, s, i, n, r) {
    const a = this.#e;
    if (a[0] === 1 / 0) return this;
    const o = T.multiplyByDOMMatrix(this.#t.at(-1), e.getTransform());
    if (a[0] === -1 / 0) return (T.axialAlignedBoundingBox([s, n, i, r], o, this.#s), this);
    const l = Lt.slice();
    return (
      T.axialAlignedBoundingBox([s, n, i, r], o, l),
      (this.#s[0] = Y(l[0], a[0], this.#s[0])),
      (this.#s[1] = Y(l[1], a[1], this.#s[1])),
      (this.#s[2] = Y(l[2], this.#s[2], a[2])),
      (this.#s[3] = Y(l[3], this.#s[3], a[3])),
      this
    );
  }
  recordFullPageBBox(t) {
    return (
      (this.#s[0] = Math.max(0, this.#e[0])),
      (this.#s[1] = Math.max(0, this.#e[1])),
      (this.#s[2] = Math.min(this.#i, this.#e[2])),
      (this.#s[3] = Math.min(this.#n, this.#e[3])),
      this
    );
  }
  recordOperation(t, e = !1, s) {
    if (this._pendingBBoxIdx !== t) return this;
    const i = Ai((this.#s[0] * 256) / this.#i),
      n = Ai((this.#s[1] * 256) / this.#n),
      r = vi((this.#s[2] * 256) / this.#i),
      a = vi((this.#s[3] * 256) / this.#n);
    if ((wi(this.#a, t, i, n, r, a), s))
      for (const o of s) for (const l of o) l !== t && wi(this.#a, l, i, n, r, a);
    return (e || (this._pendingBBoxIdx = -1), this);
  }
  bboxToClipBoxDropOperation(t) {
    return (
      this._pendingBBoxIdx === t &&
        ((this._pendingBBoxIdx = -1),
        (this.#e[0] = Math.max(this.#e[0], this.#s[0])),
        (this.#e[1] = Math.max(this.#e[1], this.#s[1])),
        (this.#e[2] = Math.min(this.#e[2], this.#s[2])),
        (this.#e[3] = Math.min(this.#e[3], this.#s[3]))),
      this
    );
  }
  take() {
    return new sr(this.#r, this.#a);
  }
  takeDebugMetadata() {
    throw new Error("Unreachable");
  }
  recordSimpleData(t, e) {
    return this;
  }
  recordIncrementalData(t, e) {
    return this;
  }
  resetIncrementalData(t, e) {
    return this;
  }
  recordNamedData(t, e) {
    return this;
  }
  recordSimpleDataFromNamed(t, e, s) {
    return this;
  }
  recordFutureForcedDependency(t, e) {
    return this;
  }
  inheritSimpleDataAsFutureForcedDependencies(t) {
    return this;
  }
  inheritPendingDependenciesAsFutureForcedDependencies() {
    return this;
  }
  recordCharacterBBox(t, e, s, i = 1, n = 0, r = 0, a) {
    return this;
  }
  getSimpleIndex(t) {}
  recordDependencies(t, e) {
    return this;
  }
  recordNamedDependency(t, e) {
    return this;
  }
  recordShowTextOperation(t, e = !1) {
    return this;
  }
}