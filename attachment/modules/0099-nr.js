
class nr {
  #t = { __proto__: null };
  #e = { __proto__: null, transform: [], moveText: [], sameLineText: [], [ie]: [] };
  #s = new Map();
  #i = new Set();
  #n = new Map();
  #a;
  #r;
  #o;
  constructor(t, e = !1) {
    ((this.#o = t),
      e &&
        ((this.#a = new Map()),
        (this.#r = (s, i) => {
          Si(this.#a, i).dependencies.add(s);
        })));
  }
  get clipBox() {
    return this.#o.clipBox;
  }
  growOperationsCount(t) {
    this.#o.growOperationsCount(t);
  }
  save(t) {
    return (
      (this.#t = { __proto__: this.#t }),
      (this.#e = {
        __proto__: this.#e,
        transform: { __proto__: this.#e.transform },
        moveText: { __proto__: this.#e.moveText },
        sameLineText: { __proto__: this.#e.sameLineText },
        [ie]: { __proto__: this.#e[ie] },
      }),
      this.#o.save(t),
      this
    );
  }
  restore(t) {
    this.#o.restore(t, this.#r);
    const e = Object.getPrototypeOf(this.#t);
    return e === null ? this : ((this.#t = e), (this.#e = Object.getPrototypeOf(this.#e)), this);
  }
  recordOpenMarker(t) {
    return (this.#o.recordOpenMarker(t, this.#r), this);
  }
  getOpenMarker() {
    return this.#o.getOpenMarker();
  }
  recordCloseMarker(t) {
    return (this.#o.recordCloseMarker(t, this.#r), this);
  }
  beginMarkedContent(t) {
    return (this.#o.beginMarkedContent(t), this);
  }
  endMarkedContent(t) {
    return (this.#o.endMarkedContent(t, this.#r), this);
  }
  pushBaseTransform(t) {
    return (this.#o.pushBaseTransform(t), this);
  }
  popBaseTransform() {
    return (this.#o.popBaseTransform(), this);
  }
  recordSimpleData(t, e) {
    return ((this.#t[t] = e), this);
  }
  recordIncrementalData(t, e) {
    return (this.#e[t].push(e), this);
  }
  resetIncrementalData(t, e) {
    return ((this.#e[t].length = 0), this);
  }
  recordNamedData(t, e) {
    return (this.#s.set(t, e), this);
  }
  recordSimpleDataFromNamed(t, e, s) {
    this.#t[t] = this.#s.get(e) ?? s;
  }
  recordFutureForcedDependency(t, e) {
    return (this.recordIncrementalData(ie, e), this);
  }
  inheritSimpleDataAsFutureForcedDependencies(t) {
    for (const e of t) e in this.#t && this.recordFutureForcedDependency(e, this.#t[e]);
    return this;
  }
  inheritPendingDependenciesAsFutureForcedDependencies() {
    for (const t of this.#i) this.recordFutureForcedDependency(ie, t);
    return this;
  }
  resetBBox(t) {
    return (this.#o.resetBBox(t), this);
  }
  recordClipBox(t, e, s, i, n, r) {
    return (this.#o.recordClipBox(t, e, s, i, n, r), this);
  }
  recordBBox(t, e, s, i, n, r) {
    return (this.#o.recordBBox(t, e, s, i, n, r), this);
  }
  recordCharacterBBox(t, e, s, i = 1, n = 0, r = 0, a) {
    const o = s.bbox;
    let l, h;
    if (
      o &&
      ((l = o[2] !== o[0] && o[3] !== o[1] && this.#n.get(s)),
      l !== !1 &&
        ((h = [0, 0, 0, 0]),
        T.axialAlignedBoundingBox(o, s.fontMatrix, h),
        (i !== 1 || n !== 0 || r !== 0) && er(i, -i, n, r, h),
        l))
    )
      return this.recordBBox(t, e, h[0], h[2], h[1], h[3]);
    if (!a) return this.recordFullPageBBox(t);
    const d = a();
    return o &&
      h &&
      l === void 0 &&
      ((l =
        h[0] <= n - d.actualBoundingBoxLeft &&
        h[2] >= n + d.actualBoundingBoxRight &&
        h[1] <= r - d.actualBoundingBoxAscent &&
        h[3] >= r + d.actualBoundingBoxDescent),
      this.#n.set(s, l),
      l)
      ? this.recordBBox(t, e, h[0], h[2], h[1], h[3])
      : this.recordBBox(
          t,
          e,
          n - d.actualBoundingBoxLeft,
          n + d.actualBoundingBoxRight,
          r - d.actualBoundingBoxAscent,
          r + d.actualBoundingBoxDescent,
        );
  }
  recordFullPageBBox(t) {
    return (this.#o.recordFullPageBBox(t), this);
  }
  getSimpleIndex(t) {
    return this.#t[t];
  }
  recordDependencies(t, e) {
    const s = this.#i,
      i = this.#t,
      n = this.#e;
    for (const r of e) r in this.#t ? s.add(i[r]) : r in n && n[r].forEach(s.add, s);
    return this;
  }
  recordNamedDependency(t, e) {
    return (this.#s.has(e) && this.#i.add(this.#s.get(e)), this);
  }
  recordOperation(t, e = !1) {
    if ((this.recordDependencies(t, [ie]), this.#a)) {
      const i = Si(this.#a, t),
        { dependencies: n } = i;
      (this.#i.forEach(n.add, n),
        this.#o._savesStack.forEach(n.add, n),
        this.#o._markedContentStack.forEach(n.add, n),
        n.delete(t),
        (i.isRenderingOperation = !0));
    }
    const s = !e && t === this.#o._pendingBBoxIdx;
    return (
      this.#o.recordOperation(t, e, [this.#i, this.#o._savesStack, this.#o._markedContentStack]),
      s && this.#i.clear(),
      this
    );
  }
  recordShowTextOperation(t, e = !1) {
    const s = Array.from(this.#i);
    (this.recordOperation(t, e), this.recordIncrementalData("sameLineText", t));
    for (const i of s) this.recordIncrementalData("sameLineText", i);
    return this;
  }
  bboxToClipBoxDropOperation(t, e = !1) {
    const s = !e && t === this.#o._pendingBBoxIdx;
    return (this.#o.bboxToClipBoxDropOperation(t), s && this.#i.clear(), this);
  }
  take() {
    return (this.#n.clear(), this.#o.take());
  }
  takeDebugMetadata() {
    return this.#a;
  }
}