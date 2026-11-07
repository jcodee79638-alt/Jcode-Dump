
class lt {
  #t = Promise.withResolvers();
  #e = null;
  #s = null;
  #i = null;
  static #n = 0;
  static #a = !1;
  static #r = new WeakMap();
  static {
    (mt && ((this.#a = !0), (de.workerSrc ||= "./pdf.worker.mjs")),
      (this._isSameOrigin = (t, e) => {
        const s = URL.parse(t);
        if (!s?.origin || s.origin === "null") return !1;
        const i = new URL(e, s);
        return s.origin === i.origin;
      }),
      (this._createCDNWrapper = (t) => {
        const e = `await import("${t}");`;
        return URL.createObjectURL(new Blob([e], { type: "text/javascript" }));
      }));
  }
  constructor({ name: t = null, port: e = null, verbosity: s = Fn() } = {}) {
    if (((this.name = t), (this.destroyed = !1), (this.verbosity = s), e)) {
      if (lt.#r.has(e)) throw new Error("Cannot use more than one PDFWorker per port.");
      (lt.#r.set(e, this), this.#l(e));
    } else this.#h();
  }
  get promise() {
    return this.#t.promise;
  }
  #o() {
    (this.#t.resolve(), this.#e.send("configure", { verbosity: this.verbosity }));
  }
  get port() {
    return this.#s;
  }
  get messageHandler() {
    return this.#e;
  }
  #l(t) {
    ((this.#s = t), (this.#e = new ve("main", "worker", t)), this.#e.on("ready", () => {}), this.#o());
  }
  #h() {
    if (lt.#a || lt.#d) {
      this.#u();
      return;
    }
    let { workerSrc: t } = lt;
    try {
      lt._isSameOrigin(window.location, t) || (t = lt._createCDNWrapper(new URL(t, window.location).href));
      const e = new Worker(t, { type: "module" }),
        s = new ve("main", "worker", e),
        i = () => {
          (n.abort(),
            s.destroy(),
            e.terminate(),
            this.destroyed ? this.#t.reject(new Error("Worker was destroyed")) : this.#u());
        },
        n = new AbortController();
      (e.addEventListener(
        "error",
        () => {
          this.#i || i();
        },
        { signal: n.signal },
      ),
        s.on("ready", (r) => {
          if ((n.abort(), this.destroyed || !(r instanceof Uint8Array))) {
            i();
            return;
          }
          ((this.#e = s), (this.#s = e), (this.#i = e), this.#o());
        }));
    } catch {
      (ts("The worker has been disabled."), this.#u());
    }
  }
  #u() {
    (lt.#a || (H("Setting up fake worker."), (lt.#a = !0)),
      lt._setupFakeWorkerGlobal
        .then((t) => {
          if (this.destroyed) {
            this.#t.reject(new Error("Worker was destroyed"));
            return;
          }
          const e = new vr();
          this.#s = e;
          const s = `fake${lt.#n++}`,
            i = new ve(s + "_worker", s, e);
          (t.setup(i, e), (this.#e = new ve(s, s + "_worker", e)), this.#o());
        })
        .catch((t) => {
          this.#t.reject(new Error(`Setting up fake worker failed: "${t.message}".`));
        }));
  }
  destroy() {
    ((this.destroyed = !0),
      this.#i?.terminate(),
      (this.#i = null),
      lt.#r.delete(this.#s),
      (this.#s = null),
      this.#e?.destroy(),
      (this.#e = null));
  }
  static create(t) {
    const e = this.#r.get(t?.port);
    if (e) {
      if (e._pendingDestroy)
        throw new Error(
          "PDFWorker.create - the worker is being destroyed.\nPlease remember to await `PDFDocumentLoadingTask.destroy()`-calls.",
        );
      return e;
    }
    return new lt(t);
  }
  static get workerSrc() {
    if (de.workerSrc) return de.workerSrc;
    throw new Error('No "GlobalWorkerOptions.workerSrc" specified.');
  }
  static get #d() {
    try {
      return globalThis.pdfjsWorker?.WorkerMessageHandler || null;
    } catch {
      return null;
    }
  }
  static get _setupFakeWorkerGlobal() {
    return k(
      this,
      "_setupFakeWorkerGlobal",
      (async () => (this.#d ? this.#d : (await import(this.workerSrc)).WorkerMessageHandler))(),
    );
  }
}