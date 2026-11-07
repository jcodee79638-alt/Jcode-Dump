
class ke {
  #t;
  #e;
  #s;
  #i = 0;
  #n = 0;
  constructor(t, e, s) {
    if (t instanceof ke && t.#s === !!s) return t;
    ((this.#t = t), (this.#e = e), (this.#s = !!s));
  }
  get clipBox() {
    return this.#t.clipBox;
  }
  growOperationsCount() {
    throw new Error("Unreachable");
  }
  save(t) {
    return (this.#n++, this.#t.save(this.#e), this);
  }
  restore(t) {
    return (this.#n > 0 && (this.#t.restore(this.#e), this.#n--), this);
  }
  recordOpenMarker(t) {
    return (this.#i++, this);
  }
  getOpenMarker() {
    return this.#i > 0 ? this.#e : this.#t.getOpenMarker();
  }
  recordCloseMarker(t) {
    return (this.#i--, this);
  }
  beginMarkedContent(t) {
    return this;
  }
  endMarkedContent(t) {
    return this;
  }
  pushBaseTransform(t) {
    return (this.#t.pushBaseTransform(t), this);
  }
  popBaseTransform() {
    return (this.#t.popBaseTransform(), this);
  }
  recordSimpleData(t, e) {
    return (this.#t.recordSimpleData(t, this.#e), this);
  }
  recordIncrementalData(t, e) {
    return (this.#t.recordIncrementalData(t, this.#e), this);
  }
  resetIncrementalData(t, e) {
    return (this.#t.resetIncrementalData(t, this.#e), this);
  }
  recordNamedData(t, e) {
    return this;
  }
  recordSimpleDataFromNamed(t, e, s) {
    return (this.#t.recordSimpleDataFromNamed(t, e, this.#e), this);
  }
  recordFutureForcedDependency(t, e) {
    return (this.#t.recordFutureForcedDependency(t, this.#e), this);
  }
  inheritSimpleDataAsFutureForcedDependencies(t) {
    return (this.#t.inheritSimpleDataAsFutureForcedDependencies(t), this);
  }
  inheritPendingDependenciesAsFutureForcedDependencies() {
    return (this.#t.inheritPendingDependenciesAsFutureForcedDependencies(), this);
  }
  resetBBox(t) {
    return (this.#s || this.#t.resetBBox(this.#e), this);
  }
  recordClipBox(t, e, s, i, n, r) {
    return (this.#s || this.#t.recordClipBox(this.#e, e, s, i, n, r), this);
  }
  recordBBox(t, e, s, i, n, r) {
    return (this.#s || this.#t.recordBBox(this.#e, e, s, i, n, r), this);
  }
  recordCharacterBBox(t, e, s, i, n, r, a) {
    return (this.#s || this.#t.recordCharacterBBox(this.#e, e, s, i, n, r, a), this);
  }
  recordFullPageBBox(t) {
    return (this.#s || this.#t.recordFullPageBBox(this.#e), this);
  }
  getSimpleIndex(t) {
    return this.#t.getSimpleIndex(t);
  }
  recordDependencies(t, e) {
    return (this.#t.recordDependencies(this.#e, e), this);
  }
  recordNamedDependency(t, e) {
    return (this.#t.recordNamedDependency(this.#e, e), this);
  }
  recordOperation(t) {
    return (this.#t.recordOperation(this.#e, !0), this);
  }
  recordShowTextOperation(t) {
    return (this.#t.recordShowTextOperation(this.#e, !0), this);
  }
  bboxToClipBoxDropOperation(t) {
    return (this.#s || this.#t.bboxToClipBoxDropOperation(this.#e, !0), this);
  }
  take() {
    throw new Error("Unreachable");
  }
  takeDebugMetadata() {
    throw new Error("Unreachable");
  }
}