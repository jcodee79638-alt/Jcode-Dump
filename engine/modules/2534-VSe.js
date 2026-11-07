
var VSe = Ie(function (S9o) {
  var { Minipass: y9o } = Ny(),
    M9o = cr("events").EventEmitter,
    w$ = cr("fs"),
    x9o = w$.writev,
    RSe = Symbol("_autoClose"),
    RV = Symbol("_close"),
    Q7e = Symbol("_ended"),
    C$ = Symbol("_fd"),
    gei = Symbol("_finished"),
    Noe = Symbol("_flags"),
    Zur = Symbol("_flush"),
    tlr = Symbol("_handleChunk"),
    rlr = Symbol("_makeBuf"),
    kEt = Symbol("_mode"),
    jEt = Symbol("_needDrain"),
    FSe = Symbol("_onerror"),
    WSe = Symbol("_onopen"),
    elr = Symbol("_onread"),
    USe = Symbol("_onwrite"),
    Foe = Symbol("_open"),
    iZ = Symbol("_path"),
    Zme = Symbol("_pos"),
    y5 = Symbol("_queue"),
    NSe = Symbol("_read"),
    Eei = Symbol("_readSize"),
    Uoe = Symbol("_reading"),
    PEt = Symbol("_remain"),
    Iei = Symbol("_size"),
    CEt = Symbol("_write"),
    Yme = Symbol("_writing"),
    wEt = Symbol("_defaultFlag"),
    BSe = Symbol("_errored");
  class nlr extends y9o {
    constructor(e, t) {
      t = t || {};
      super(t);
      if (((this.readable = !0), (this.writable = !1), typeof e !== "string"))
        throw TypeError("path must be a string");
      if (
        ((this[BSe] = !1),
        (this[C$] = typeof t.fd === "number" ? t.fd : null),
        (this[iZ] = e),
        (this[Eei] = t.readSize || 16777216),
        (this[Uoe] = !1),
        (this[Iei] = typeof t.size === "number" ? t.size : 1 / 0),
        (this[PEt] = this[Iei]),
        (this[RSe] = typeof t.autoClose === "boolean" ? t.autoClose : !0),
        typeof this[C$] === "number")
      )
        this[NSe]();
      else this[Foe]();
    }
    get fd() {
      return this[C$];
    }
    get path() {
      return this[iZ];
    }
    write() {
      throw TypeError("this is a readable stream");
    }
    end() {
      throw TypeError("this is a readable stream");
    }
    [Foe]() {
      w$.open(this[iZ], "r", (e, t) => this[WSe](e, t));
    }
    [WSe](e, t) {
      if (e) this[FSe](e);
      else ((this[C$] = t), this.emit("open", t), this[NSe]());
    }
    [rlr]() {
      return Buffer.allocUnsafe(Math.min(this[Eei], this[PEt]));
    }
    [NSe]() {
      if (!this[Uoe]) {
        this[Uoe] = !0;
        let e = this[rlr]();
        if (e.length === 0) return process.nextTick(() => this[elr](null, 0, e));
        w$.read(this[C$], e, 0, e.length, null, (t, r, s) => this[elr](t, r, s));
      }
    }
    [elr](e, t, r) {
      if (((this[Uoe] = !1), e)) this[FSe](e);
      else if (this[tlr](t, r)) this[NSe]();
    }
    [RV]() {
      if (this[RSe] && typeof this[C$] === "number") {
        let e = this[C$];
        ((this[C$] = null), w$.close(e, (t) => (t ? this.emit("error", t) : this.emit("close"))));
      }
    }
    [FSe](e) {
      ((this[Uoe] = !0), this[RV](), this.emit("error", e));
    }
    [tlr](e, t) {
      let r = !1;
      if (((this[PEt] -= e), e > 0)) r = super.write(e < t.length ? t.slice(0, e) : t);
      if (e === 0 || this[PEt] <= 0) ((r = !1), this[RV](), super.end());
      return r;
    }
    emit(e, t) {
      switch (e) {
        case "prefinish":
        case "finish":
          break;
        case "drain":
          if (typeof this[C$] === "number") this[NSe]();
          break;
        case "error":
          if (this[BSe]) return;
          return ((this[BSe] = !0), super.emit(e, t));
        default:
          return super.emit(e, t);
      }
    }
  }
  class Dei extends nlr {
    [Foe]() {
      let e = !0;
      try {
        (this[WSe](null, w$.openSync(this[iZ], "r")), (e = !1));
      } finally {
        if (e) this[RV]();
      }
    }
    [NSe]() {
      let e = !0;
      try {
        if (!this[Uoe]) {
          this[Uoe] = !0;
          do {
            let t = this[rlr](),
              r = t.length === 0 ? 0 : w$.readSync(this[C$], t, 0, t.length, null);
            if (!this[tlr](r, t)) break;
          } while (!0);
          this[Uoe] = !1;
        }
        e = !1;
      } finally {
        if (e) this[RV]();
      }
    }
    [RV]() {
      if (this[RSe] && typeof this[C$] === "number") {
        let e = this[C$];
        ((this[C$] = null), w$.closeSync(e), this.emit("close"));
      }
    }
  }
  class ilr extends M9o {
    constructor(e, t) {
      t = t || {};
      super(t);
      ((this.readable = !1),
        (this.writable = !0),
        (this[BSe] = !1),
        (this[Yme] = !1),
        (this[Q7e] = !1),
        (this[jEt] = !1),
        (this[y5] = []),
        (this[iZ] = e),
        (this[C$] = typeof t.fd === "number" ? t.fd : null),
        (this[kEt] = t.mode === void 0 ? 438 : t.mode),
        (this[Zme] = typeof t.start === "number" ? t.start : null),
        (this[RSe] = typeof t.autoClose === "boolean" ? t.autoClose : !0));
      let r = this[Zme] !== null ? "r+" : "w";
      if (((this[wEt] = t.flags === void 0), (this[Noe] = this[wEt] ? r : t.flags), this[C$] === null))
        this[Foe]();
    }
    emit(e, t) {
      if (e === "error") {
        if (this[BSe]) return;
        this[BSe] = !0;
      }
      return super.emit(e, t);
    }
    get fd() {
      return this[C$];
    }
    get path() {
      return this[iZ];
    }
    [FSe](e) {
      (this[RV](), (this[Yme] = !0), this.emit("error", e));
    }
    [Foe]() {
      w$.open(this[iZ], this[Noe], this[kEt], (e, t) => this[WSe](e, t));
    }
    [WSe](e, t) {
      if (this[wEt] && this[Noe] === "r+" && e && e.code === "ENOENT") ((this[Noe] = "w"), this[Foe]());
      else if (e) this[FSe](e);
      else if (((this[C$] = t), this.emit("open", t), !this[Yme])) this[Zur]();
    }
    end(e, t) {
      if (e) this.write(e, t);
      if (((this[Q7e] = !0), !this[Yme] && !this[y5].length && typeof this[C$] === "number"))
        this[USe](null, 0);
      return this;
    }
    write(e, t) {
      if (typeof e === "string") e = Buffer.from(e, t);
      if (this[Q7e]) return (this.emit("error", Error("write() after end()")), !1);
      if (this[C$] === null || this[Yme] || this[y5].length) return (this[y5].push(e), (this[jEt] = !0), !1);
      return ((this[Yme] = !0), this[CEt](e), !0);
    }
    [CEt](e) {
      w$.write(this[C$], e, 0, e.length, this[Zme], (t, r) => this[USe](t, r));
    }
    [USe](e, t) {
      if (e) this[FSe](e);
      else {
        if (this[Zme] !== null) this[Zme] += t;
        if (this[y5].length) this[Zur]();
        else if (((this[Yme] = !1), this[Q7e] && !this[gei]))
          ((this[gei] = !0), this[RV](), this.emit("finish"));
        else if (this[jEt]) ((this[jEt] = !1), this.emit("drain"));
      }
    }
    [Zur]() {
      if (this[y5].length === 0) {
        if (this[Q7e]) this[USe](null, 0);
      } else if (this[y5].length === 1) this[CEt](this[y5].pop());
      else {
        let e = this[y5];
        ((this[y5] = []), x9o(this[C$], e, this[Zme], (t, r) => this[USe](t, r)));
      }
    }
    [RV]() {
      if (this[RSe] && typeof this[C$] === "number") {
        let e = this[C$];
        ((this[C$] = null), w$.close(e, (t) => (t ? this.emit("error", t) : this.emit("close"))));
      }
    }
  }
  class yei extends ilr {
    [Foe]() {
      let e;
      if (this[wEt] && this[Noe] === "r+")
        try {
          e = w$.openSync(this[iZ], this[Noe], this[kEt]);
        } catch (t) {
          if (t.code === "ENOENT") return ((this[Noe] = "w"), this[Foe]());
          else throw t;
        }
      else e = w$.openSync(this[iZ], this[Noe], this[kEt]);
      this[WSe](null, e);
    }
    [RV]() {
      if (this[RSe] && typeof this[C$] === "number") {
        let e = this[C$];
        ((this[C$] = null), w$.closeSync(e), this.emit("close"));
      }
    }
    [CEt](e) {
      let t = !0;
      try {
        (this[USe](null, w$.writeSync(this[C$], e, 0, e.length, this[Zme])), (t = !1));
      } finally {
        if (t)
          try {
            this[RV]();
          } catch {}
      }
    }
  }
  S9o.ReadStream = nlr;
  S9o.ReadStreamSync = Dei;
  S9o.WriteStream = ilr;
  S9o.WriteStreamSync = yei;
});