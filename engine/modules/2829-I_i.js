
var I_i = Ie(function (Ymr) {
  var t1t;
  Object.defineProperty(Ymr, "__esModule", { value: !0 });
  Ymr.unload = Ymr.load = Ymr.onExit = Ymr.signals = void 0;
  var vae = h_i();
  Object.defineProperty(Ymr, "signals", {
    enumerable: !0,
    get: function () {
      return vae.signals;
    },
  });
  var r1t = (e) =>
      !!e &&
      typeof e === "object" &&
      typeof e.removeListener === "function" &&
      typeof e.emit === "function" &&
      typeof e.reallyExit === "function" &&
      typeof e.listeners === "function" &&
      typeof e.kill === "function" &&
      typeof e.pid === "number" &&
      typeof e.on === "function",
    Jmr = Symbol.for("signal-exit emitter"),
    Kmr = globalThis,
    Bta = Object.defineProperty.bind(Object);
  class L_i {
    emitted = { afterExit: !1, exit: !1 };
    listeners = { afterExit: [], exit: [] };
    count = 0;
    id = Math.random();
    constructor() {
      if (Kmr[Jmr]) return Kmr[Jmr];
      Bta(Kmr, Jmr, { value: this, writable: !1, enumerable: !1, configurable: !1 });
    }
    on(e, t) {
      this.listeners[e].push(t);
    }
    removeListener(e, t) {
      let r = this.listeners[e],
        s = r.indexOf(t);
      if (s === -1) return;
      if (s === 0 && r.length === 1) r.length = 0;
      else r.splice(s, 1);
    }
    emit(e, t, r) {
      if (this.emitted[e]) return !1;
      this.emitted[e] = !0;
      let s = !1;
      for (let a of this.listeners[e]) s = a(t, r) === !0 || s;
      if (e === "exit") s = this.emit("afterExit", t, r) || s;
      return s;
    }
  }
  class Qmr {}
  var Rta = (e) => ({
    onExit(t, r) {
      return e.onExit(t, r);
    },
    load() {
      return e.load();
    },
    unload() {
      return e.unload();
    },
  });
  class $_i extends Qmr {
    onExit() {
      return () => {};
    }
    load() {}
    unload() {}
  }
  class g_i extends Qmr {
    #e = zmr.platform === "win32" ? "SIGINT" : "SIGHUP";
    #r = new L_i();
    #t;
    #n;
    #i;
    #s = {};
    #a = !1;
    constructor(e) {
      super();
      ((this.#t = e), (this.#s = {}));
      for (let t of vae.signals)
        this.#s[t] = () => {
          let r = this.#t.listeners(t),
            { count: s } = this.#r,
            a = e;
          if (
            typeof a.__signal_exit_emitter__ === "object" &&
            typeof a.__signal_exit_emitter__.count === "number"
          )
            s += a.__signal_exit_emitter__.count;
          if (r.length === s) {
            this.unload();
            let H = this.#r.emit("exit", null, t),
              u = t === "SIGHUP" ? this.#e : t;
            if (!H) e.kill(e.pid, u);
          }
        };
      ((this.#i = e.reallyExit), (this.#n = e.emit));
    }
    onExit(e, t) {
      if (!r1t(this.#t)) return () => {};
      if (this.#a === !1) this.load();
      let r = t?.alwaysLast ? "afterExit" : "exit";
      return (
        this.#r.on(r, e),
        () => {
          if (
            (this.#r.removeListener(r, e),
            this.#r.listeners.exit.length === 0 && this.#r.listeners.afterExit.length === 0)
          )
            this.unload();
        }
      );
    }
    load() {
      if (this.#a) return;
      ((this.#a = !0), (this.#r.count += 1));
      for (let e of vae.signals)
        try {
          let t = this.#s[e];
          if (t) this.#t.on(e, t);
        } catch (t) {}
      ((this.#t.emit = (e, ...t) => this.#H(e, ...t)), (this.#t.reallyExit = (e) => this.#c(e)));
    }
    unload() {
      if (!this.#a) return;
      ((this.#a = !1),
        vae.signals.forEach((e) => {
          let t = this.#s[e];
          if (!t) throw Error("Listener not defined for signal: " + e);
          try {
            this.#t.removeListener(e, t);
          } catch (r) {}
        }),
        (this.#t.emit = this.#n),
        (this.#t.reallyExit = this.#i),
        (this.#r.count -= 1));
    }
    #c(e) {
      if (!r1t(this.#t)) return 0;
      return (
        (this.#t.exitCode = e || 0),
        this.#r.emit("exit", this.#t.exitCode, null),
        this.#i.call(this.#t, this.#t.exitCode)
      );
    }
    #H(e, ...t) {
      let r = this.#n;
      if (e === "exit" && r1t(this.#t)) {
        if (typeof t[0] === "number") this.#t.exitCode = t[0];
        let s = r.call(this.#t, e, ...t);
        return (this.#r.emit("exit", this.#t.exitCode, null), s);
      } else return r.call(this.#t, e, ...t);
    }
  }
  var zmr = globalThis.process;
  ((t1t = Rta(r1t(zmr) ? new g_i(zmr) : new $_i())),
    (Ymr.onExit = t1t.onExit),
    (Ymr.load = t1t.load),
    (Ymr.unload = t1t.unload));
});