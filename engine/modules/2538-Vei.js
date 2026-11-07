
var Vei = Ie(function (tlc, olr) {
  var NEt = cr("events"),
    J9o = wSe(),
    x5 = cr("fs/promises"),
    { moveFile: K9o } = Qme(),
    { Minipass: z9o } = Ny(),
    Nei = jSe(),
    Q9o = UEt(),
    FEt = cr("path"),
    XSe = BV(),
    { tmpName: Y9o } = DEt(),
    Fei = VSe();
  olr.exports = Z9o;
  var Z7e = new Map();
  async function Z9o(e, t, r = {}) {
    let { algorithms: s, size: a, integrity: H } = r;
    if (typeof a === "number" && t.length !== a) throw nFo(a, t.length);
    let u = XSe.fromData(t, s ? { algorithms: s } : {});
    if (H && !XSe.checkData(t, H, r)) throw iFo(H, u);
    for (let f in u) {
      let d = await Rei(e, r),
        _ = u[f].toString();
      try {
        (await x5.writeFile(d.target, t, { flag: "wx" }), await Wei(d, e, _, r));
      } finally {
        if (!d.moved) await x5.rm(d.target, { recursive: !0, force: !0 });
      }
    }
    return { integrity: u, size: t.length };
  }
  olr.exports.stream = eFo;
  class Bei extends Q9o {
    constructor(e, t) {
      super();
      ((this.opts = t),
        (this.cache = e),
        (this.inputStream = new z9o()),
        this.inputStream.on("error", (r) => this.emit("error", r)),
        this.inputStream.on("drain", () => this.emit("drain")),
        (this.handleContentP = null));
    }
    write(e, t, r) {
      if (!this.handleContentP)
        ((this.handleContentP = tFo(this.inputStream, this.cache, this.opts)),
          this.handleContentP.catch((s) => this.emit("error", s)));
      return this.inputStream.write(e, t, r);
    }
    flush(e) {
      this.inputStream.end(() => {
        if (!this.handleContentP) {
          let t = Error("Cache input stream was empty");
          return ((t.code = "ENODATA"), Promise.reject(t).catch(e));
        }
        this.handleContentP.then(
          (t) => {
            (t.integrity && this.emit("integrity", t.integrity),
              t.size !== null && this.emit("size", t.size),
              e());
          },
          (t) => e(t),
        );
      });
    }
  }
  function eFo(e, t = {}) {
    return new Bei(e, t);
  }
  async function tFo(e, t, r) {
    let s = await Rei(t, r);
    try {
      let a = await rFo(e, t, s.target, r);
      return (await Wei(s, t, a.integrity, r), a);
    } finally {
      if (!s.moved) await x5.rm(s.target, { recursive: !0, force: !0 });
    }
  }
  async function rFo(e, t, r, s) {
    let a = new Fei.WriteStream(r, { flags: "wx" });
    if (s.integrityEmitter) {
      let [_, L] = await Promise.all([
        NEt.once(s.integrityEmitter, "integrity").then((I) => I[0]),
        NEt.once(s.integrityEmitter, "size").then((I) => I[0]),
        new Nei(e, a).promise(),
      ]);
      return { integrity: _, size: L };
    }
    let H,
      u,
      f = XSe.integrityStream({ integrity: s.integrity, algorithms: s.algorithms, size: s.size });
    return (
      f.on("integrity", (_) => {
        H = _;
      }),
      f.on("size", (_) => {
        u = _;
      }),
      await new Nei(e, f, a).promise(),
      { integrity: H, size: u }
    );
  }
  async function Rei(e, t) {
    let r = Y9o(e, t.tmpPrefix);
    return (await x5.mkdir(FEt.dirname(r), { recursive: !0 }), { target: r, moved: !1 });
  }
  async function Wei(e, t, r) {
    let s = J9o(t, r),
      a = FEt.dirname(s);
    if (Z7e.has(s)) return Z7e.get(s);
    return (
      Z7e.set(
        s,
        x5
          .mkdir(a, { recursive: !0 })
          .then(async () => (await K9o(e.target, s, { overwrite: !1 }), (e.moved = !0), e.moved))
          .catch((H) => {
            if (!H.message.startsWith("The destination file exists"))
              throw Object.assign(H, { code: "EEXIST" });
          })
          .finally(() => {
            Z7e.delete(s);
          }),
      ),
      Z7e.get(s)
    );
  }
  function nFo(e, t) {
    let r = Error(`Bad data size: expected inserted data to be ${e} bytes, but got ${t} instead`);
    return ((r.expected = e), (r.found = t), (r.code = "EBADSIZE"), r);
  }
  function iFo(e, t) {
    let r = Error(`Integrity check failed:
  Wanted: ${e}
   Found: ${t}`);
    return ((r.code = "EINTEGRITY"), (r.expected = e), (r.found = t), r);
  }
});