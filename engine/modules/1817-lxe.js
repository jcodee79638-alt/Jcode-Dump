
class lxe {
  handle;
  constructor(e) {
    this.handle = e;
  }
  static create(e) {
    let t = GMn(
      e.basePath,
      e.frecencyDbPath ?? "",
      e.historyDbPath ?? "",
      e.useUnsafeNoLock ?? !1,
      !(e.disableMmapCache ?? !1),
      !(e.disableContentIndexing ?? e.disableMmapCache ?? !1),
      !(e.disableWatch ?? !1),
      e.aiMode ?? !1,
      e.logFilePath ?? "",
      e.logLevel ?? "",
      BigInt(e.cacheBudgetMaxFiles ?? 0),
      BigInt(e.cacheBudgetMaxBytes ?? 0),
      BigInt(e.cacheBudgetMaxFileSize ?? 0),
      e.enableFsRootScanning ?? !1,
      e.enableHomeDirScanning ?? !1,
    );
    if (!t.ok) return t;
    return { ok: !0, value: new lxe(t.value) };
  }
  destroy() {
    if (this.handle !== null) (XMn(this.handle), (this.handle = null));
  }
  get isDestroyed() {
    return this.handle === null;
  }
  ensureAlive() {
    if (this.handle === null) return zv("FileFinder instance has been destroyed.");
    return { ok: !0, value: this.handle };
  }
  fileSearch(e, t) {
    let r = this.ensureAlive();
    if (!r.ok) return r;
    return zMn(
      r.value,
      e,
      t?.currentFile ?? "",
      t?.maxThreads ?? 0,
      t?.pageIndex ?? 0,
      t?.pageSize ?? 0,
      t?.comboBoostMultiplier ?? 0,
      t?.minComboCount ?? 0,
    );
  }
  glob(e, t) {
    let r = this.ensureAlive();
    if (!r.ok) return r;
    return QMn(r.value, e, t?.currentFile ?? "", t?.maxThreads ?? 0, t?.pageIndex ?? 0, t?.pageSize ?? 0);
  }
  directorySearch(e, t) {
    let r = this.ensureAlive();
    if (!r.ok) return r;
    return YMn(r.value, e, t?.currentFile ?? null, t?.maxThreads ?? 0, t?.pageIndex ?? 0, t?.pageSize ?? 0);
  }
  mixedSearch(e, t) {
    let r = this.ensureAlive();
    if (!r.ok) return r;
    return ZMn(
      r.value,
      e,
      t?.currentFile ?? "",
      t?.maxThreads ?? 0,
      t?.pageIndex ?? 0,
      t?.pageSize ?? 0,
      t?.comboBoostMultiplier ?? 0,
      t?.minComboCount ?? 0,
    );
  }
  grep(e, t) {
    let r = this.ensureAlive();
    if (!r.ok) return r;
    return exn(
      r.value,
      e,
      t?.mode ?? "plain",
      t?.maxFileSize ?? 0,
      t?.maxMatchesPerFile ?? 0,
      t?.smartCase ?? !0,
      t?.cursor?._offset ?? 0,
      t?.pageSize ?? 0,
      t?.timeBudgetMs ?? 0,
      t?.beforeContext ?? 0,
      t?.afterContext ?? 0,
      t?.classifyDefinitions ?? !1,
    );
  }
  multiGrep(e) {
    let t = this.ensureAlive();
    if (!t.ok) return t;
    if (!e.patterns || e.patterns.length === 0) return zv("patterns array must have at least 1 element");
    return txn(
      t.value,
      e.patterns.join(`
`),
      e.constraints ?? "",
      e.maxFileSize ?? 0,
      e.maxMatchesPerFile ?? 0,
      e.smartCase ?? !0,
      e.cursor?._offset ?? 0,
      e.pageSize ?? 0,
      e.timeBudgetMs ?? 0,
      e.beforeContext ?? 0,
      e.afterContext ?? 0,
      e.classifyDefinitions ?? !1,
    );
  }
  scanFiles() {
    let e = this.ensureAlive();
    if (!e.ok) return e;
    return rxn(e.value);
  }
  isScanning() {
    if (this.handle === null) return !1;
    return nxn(this.handle);
  }
  getBasePath() {
    let e = this.ensureAlive();
    if (!e.ok) return e;
    return ixn(e.value);
  }
  getScanProgress() {
    let e = this.ensureAlive();
    if (!e.ok) return e;
    return sxn(e.value);
  }
  async waitForScan(e = 5000) {
    let t = this.ensureAlive();
    if (!t.ok) return t;
    let r = Date.now() + e;
    while (this.isScanning()) {
      if (Date.now() >= r) return { ok: !0, value: !1 };
      await new Promise((s) => setTimeout(s, 50));
    }
    return { ok: !0, value: !0 };
  }
  waitForScanBlocking(e = 5000) {
    let t = this.ensureAlive();
    if (!t.ok) return t;
    return oxn(t.value, e);
  }
  async waitForIndexReady(e = 5000) {
    let t = this.ensureAlive();
    if (!t.ok) return t;
    let r = Date.now() + e;
    while (!0) {
      let s = this.getScanProgress();
      if (!s.ok) return s;
      if (!s.value.isScanning && s.value.isWarmupComplete) return { ok: !0, value: !0 };
      if (Date.now() >= r) return { ok: !0, value: !1 };
      await new Promise((a) => setTimeout(a, 50));
    }
  }
  reindex(e) {
    let t = this.ensureAlive();
    if (!t.ok) return t;
    return axn(t.value, e);
  }
  refreshGitStatus() {
    let e = this.ensureAlive();
    if (!e.ok) return e;
    return Hxn(e.value);
  }
  trackQuery(e, t) {
    let r = this.ensureAlive();
    if (!r.ok) return r;
    return cxn(r.value, e, t);
  }
  getHistoricalQuery(e) {
    let t = this.ensureAlive();
    if (!t.ok) return t;
    return Axn(t.value, e);
  }
  healthCheck(e) {
    return Bsr(this.handle, e || "");
  }
  static isAvailable() {
    return lxn();
  }
  static ensureLoaded() {
    uxn();
  }
  static healthCheckStatic(e) {
    return Bsr(null, e || "");
  }
}