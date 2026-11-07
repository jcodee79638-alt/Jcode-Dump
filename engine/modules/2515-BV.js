
var BV = Ie(function (_Uo, D5) {
  var I5 = cr("crypto"),
    { Minipass: sUo } = Ny(),
    Fur = ["sha512", "sha384", "sha256"],
    Bur = ["sha512"],
    dZn = I5.getHashes(),
    oUo = /^[a-z0-9+/]+(?:=?=?)$/i,
    aUo = /^([a-z0-9]+)-([^?]+)(\?[?\S*]*)?$/,
    HUo = /^([a-z0-9]+)-([A-Za-z0-9+/=]{44,88})(\?[\x21-\x7E]*)?$/,
    cUo = /^[\x21-\x7E]+$/,
    fZn = [
      "md5",
      "whirlpool",
      "sha1",
      "sha224",
      "sha256",
      "sha384",
      "sha512",
      "sha3",
      "sha3-256",
      "sha3-384",
      "sha3-512",
      "sha3_256",
      "sha3_384",
      "sha3_512",
    ].filter((e) => dZn.includes(e)),
    G7e = (e) => (e?.length ? `?${e.join("?")}` : "");
  class mZn extends sUo {
    #e;
    #r;
    #t;
    constructor(e) {
      super();
      if (((this.size = 0), (this.opts = e), this.#n(), e?.algorithms)) this.algorithms = [...e.algorithms];
      else this.algorithms = [...Bur];
      if (this.algorithm !== null && !this.algorithms.includes(this.algorithm))
        this.algorithms.push(this.algorithm);
      this.hashes = this.algorithms.map(I5.createHash);
    }
    #n() {
      if (
        ((this.sri = this.opts?.integrity ? mN(this.opts?.integrity, this.opts) : null),
        (this.expectedSize = this.opts?.size),
        !this.sri)
      )
        this.algorithm = null;
      else if (this.sri.isHash) ((this.goodSri = !0), (this.algorithm = this.sri.algorithm));
      else ((this.goodSri = !this.sri.isEmpty()), (this.algorithm = this.sri.pickAlgorithm(this.opts)));
      ((this.digests = this.goodSri ? this.sri[this.algorithm] : null),
        (this.optString = G7e(this.opts?.options)));
    }
    on(e, t) {
      if (e === "size" && this.#r) return t(this.#r);
      if (e === "integrity" && this.#e) return t(this.#e);
      if (e === "verified" && this.#t) return t(this.#t);
      return super.on(e, t);
    }
    emit(e, t) {
      if (e === "end") this.#i();
      return super.emit(e, t);
    }
    write(e) {
      return ((this.size += e.length), this.hashes.forEach((t) => t.update(e)), super.write(e));
    }
    #i() {
      if (!this.goodSri) this.#n();
      let e = mN(
          this.hashes.map((r, s) => `${this.algorithms[s]}-${r.digest("base64")}${this.optString}`).join(" "),
          this.opts,
        ),
        t = this.goodSri && e.match(this.sri, this.opts);
      if (typeof this.expectedSize === "number" && this.size !== this.expectedSize) {
        let r = Error(`stream size mismatch when checking ${this.sri}.
  Wanted: ${this.expectedSize}
  Found: ${this.size}`);
        ((r.code = "EBADSIZE"),
          (r.found = this.size),
          (r.expected = this.expectedSize),
          (r.sri = this.sri),
          this.emit("error", r));
      } else if (this.sri && !t) {
        let r = Error(
          `${this.sri} integrity checksum failed when using ${this.algorithm}: wanted ${this.digests} but got ${e}. (${this.size} bytes)`,
        );
        ((r.code = "EINTEGRITY"),
          (r.found = e),
          (r.expected = this.digests),
          (r.algorithm = this.algorithm),
          (r.sri = this.sri),
          this.emit("error", r));
      } else if (
        ((this.#r = this.size), this.emit("size", this.size), (this.#e = e), this.emit("integrity", e), t)
      )
        ((this.#t = t), this.emit("verified", t));
    }
  }
  class koe {
    get isHash() {
      return !0;
    }
    constructor(e, t) {
      let r = t?.strict;
      ((this.source = e.trim()), (this.digest = ""), (this.algorithm = ""), (this.options = []));
      let s = this.source.match(r ? HUo : aUo);
      if (!s) return;
      if (r && !Fur.includes(s[1])) return;
      if (!dZn.includes(s[1])) return;
      ((this.algorithm = s[1]), (this.digest = s[2]));
      let a = s[3];
      if (a) this.options = a.slice(1).split("?");
    }
    hexDigest() {
      return this.digest && Buffer.from(this.digest, "base64").toString("hex");
    }
    toJSON() {
      return this.toString();
    }
    match(e, t) {
      let r = mN(e, t);
      if (!r) return !1;
      if (r.isIntegrity) {
        let s = r.pickAlgorithm(t, [this.algorithm]);
        if (!s) return !1;
        let a = r[s].find((H) => H.digest === this.digest);
        if (a) return a;
        return !1;
      }
      return r.digest === this.digest ? r : !1;
    }
    toString(e) {
      if (e?.strict) {
        if (!(
          Fur.includes(this.algorithm) &&
          this.digest.match(oUo) &&
          this.options.every((t) => t.match(cUo))
        ))
          return "";
      }
      return `${this.algorithm}-${this.digest}${G7e(this.options)}`;
    }
  }
  function pZn(e, t, r, s) {
    let a = e !== "",
      H = !1,
      u = "",
      f = s.length - 1;
    for (let _ = 0; _ < f; _++) {
      let L = koe.prototype.toString.call(s[_], r);
      if (L) ((H = !0), (u += L), (u += t));
    }
    let d = koe.prototype.toString.call(s[f], r);
    if (d) ((H = !0), (u += d));
    if (a && H) return e + t + u;
    return e + u;
  }
  class PSe {
    get isIntegrity() {
      return !0;
    }
    toJSON() {
      return this.toString();
    }
    isEmpty() {
      return Object.keys(this).length === 0;
    }
    toString(e) {
      let t = e?.sep || " ",
        r = "";
      if (e?.strict) {
        t = t.replace(/\S+/g, " ");
        for (let s of Fur) if (this[s]) r = pZn(r, t, e, this[s]);
      } else for (let s of Object.keys(this)) r = pZn(r, t, e, this[s]);
      return r;
    }
    concat(e, t) {
      let r = typeof e === "string" ? e : q7e(e, t);
      return mN(`${this.toString(t)} ${r}`, t);
    }
    hexDigest() {
      return mN(this, { single: !0 }).hexDigest();
    }
    merge(e, t) {
      let r = mN(e, t);
      for (let s in r)
        if (this[s]) {
          if (!this[s].find((a) => r[s].find((H) => a.digest === H.digest)))
            throw Error("hashes do not match, cannot update integrity");
        } else this[s] = r[s];
    }
    match(e, t) {
      let r = mN(e, t);
      if (!r) return !1;
      let s = r.pickAlgorithm(t, Object.keys(this));
      return (!!s && this[s].find((a) => r[s].find((H) => a.digest === H.digest))) || !1;
    }
    pickAlgorithm(e, t) {
      let r = e?.pickAlgorithm || mUo,
        s = Object.keys(this);
      if (t?.length) s = s.filter((a) => t.includes(a));
      if (s.length) return s.reduce((a, H) => r(a, H) || a);
      return null;
    }
  }
  _Uo.parse = mN;
  function mN(e, t) {
    if (!e) return null;
    if (typeof e === "string") return Nur(e, t);
    else if (e.algorithm && e.digest) {
      let r = new PSe();
      return ((r[e.algorithm] = [e]), Nur(q7e(r, t), t));
    } else return Nur(q7e(e, t), t);
  }
  function Nur(e, t) {
    if (t?.single) return new koe(e, t);
    let r = e
      .trim()
      .split(/\s+/)
      .reduce((s, a) => {
        let H = new koe(a, t);
        if (H.algorithm && H.digest) {
          let u = H.algorithm;
          if (!Object.keys(s).includes(u)) s[u] = [];
          s[u].push(H);
        }
        return s;
      }, new PSe());
    return r.isEmpty() ? null : r;
  }
  _Uo.stringify = q7e;
  function q7e(e, t) {
    if (e.algorithm && e.digest) return koe.prototype.toString.call(e, t);
    else if (typeof e === "string") return q7e(mN(e, t), t);
    else return PSe.prototype.toString.call(e, t);
  }
  _Uo.fromHex = AUo;
  function AUo(e, t, r) {
    let s = G7e(r?.options);
    return mN(`${t}-${Buffer.from(e, "hex").toString("base64")}${s}`, r);
  }
  _Uo.fromData = uUo;
  function uUo(e, t) {
    let r = t?.algorithms || [...Bur],
      s = G7e(t?.options);
    return r.reduce((a, H) => {
      let u = I5.createHash(H).update(e).digest("base64"),
        f = new koe(`${H}-${u}${s}`, t);
      if (f.algorithm && f.digest) {
        let d = f.algorithm;
        if (!a[d]) a[d] = [];
        a[d].push(f);
      }
      return a;
    }, new PSe());
  }
  _Uo.fromStream = lUo;
  function lUo(e, t) {
    let r = Rur(t);
    return new Promise((s, a) => {
      (e.pipe(r), e.on("error", a), r.on("error", a));
      let H;
      (r.on("integrity", (u) => {
        H = u;
      }),
        r.on("end", () => s(H)),
        r.resume());
    });
  }
  _Uo.checkData = fUo;
  function fUo(e, t, r) {
    if (((t = mN(t, r)), !t || !Object.keys(t).length))
      if (r?.error)
        throw Object.assign(Error("No valid integrity hashes to check against"), { code: "EINTEGRITY" });
      else return !1;
    let s = t.pickAlgorithm(r),
      a = I5.createHash(s).update(e).digest("base64"),
      H = mN({ algorithm: s, digest: a }),
      u = H.match(t, r);
    if (((r = r || {}), u || !r.error)) return u;
    else if (typeof r.size === "number" && e.length !== r.size) {
      let f = Error(`data size mismatch when checking ${t}.
  Wanted: ${r.size}
  Found: ${e.length}`);
      throw ((f.code = "EBADSIZE"), (f.found = e.length), (f.expected = r.size), (f.sri = t), f);
    } else {
      let f = Error(
        `Integrity checksum failed when using ${s}: Wanted ${t}, but got ${H}. (${e.length} bytes)`,
      );
      throw ((f.code = "EINTEGRITY"), (f.found = H), (f.expected = t), (f.algorithm = s), (f.sri = t), f);
    }
  }
  _Uo.checkStream = pUo;
  function pUo(e, t, r) {
    if (((r = r || Object.create(null)), (r.integrity = t), (t = mN(t, r)), !t || !Object.keys(t).length))
      return Promise.reject(
        Object.assign(Error("No valid integrity hashes to check against"), { code: "EINTEGRITY" }),
      );
    let s = Rur(r);
    return new Promise((a, H) => {
      (e.pipe(s), e.on("error", H), s.on("error", H));
      let u;
      (s.on("verified", (f) => {
        u = f;
      }),
        s.on("end", () => a(u)),
        s.resume());
    });
  }
  _Uo.integrityStream = Rur;
  function Rur(e = Object.create(null)) {
    return new mZn(e);
  }
  _Uo.create = dUo;
  function dUo(e) {
    let t = e?.algorithms || [...Bur],
      r = G7e(e?.options),
      s = t.map(I5.createHash);
    return {
      update: function (a, H) {
        return (s.forEach((u) => u.update(a, H)), this);
      },
      digest: function () {
        return t.reduce((H, u) => {
          let f = s.shift().digest("base64"),
            d = new koe(`${u}-${f}${r}`, e);
          if (!H[d.algorithm]) H[d.algorithm] = [];
          return (H[d.algorithm].push(d), H);
        }, new PSe());
      },
    };
  }
  function mUo(e, t) {
    return fZn.indexOf(e.toLowerCase()) >= fZn.indexOf(t.toLowerCase()) ? e : t;
  }
});