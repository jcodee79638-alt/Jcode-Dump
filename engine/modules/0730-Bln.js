
class Bln {
  constructor(...e) {
    (R1e.set(this, new Map()), NRe.set(this, new Map()), ide.set(this, new Map()));
    for (let t of e) this.define(t);
  }
  define(e, t = !1) {
    for (let [r, s] of Object.entries(e)) {
      if (((r = r.toLowerCase()), (s = s.map((u) => u.toLowerCase())), !_2(this, ide, "f").has(r)))
        _2(this, ide, "f").set(r, new Set());
      let a = _2(this, ide, "f").get(r),
        H = !0;
      for (let u of s) {
        let f = u.startsWith("*");
        if (((u = f ? u.slice(1) : u), a?.add(u), H)) _2(this, NRe, "f").set(r, u);
        if (((H = !1), f)) continue;
        let d = _2(this, R1e, "f").get(u);
        if (d && d != r && !t)
          throw Error(
            `"${r} -> ${u}" conflicts with "${d} -> ${u}". Pass \`force=true\` to override this definition.`,
          );
        _2(this, R1e, "f").set(u, r);
      }
    }
    return this;
  }
  getType(e) {
    if (typeof e !== "string") return null;
    let t = e.replace(/^.*[/\\]/s, "").toLowerCase(),
      r = t.replace(/^.*\./s, "").toLowerCase(),
      s = t.length < e.length;
    if (!(r.length < t.length - 1) && s) return null;
    return _2(this, R1e, "f").get(r) ?? null;
  }
  getExtension(e) {
    if (typeof e !== "string") return null;
    return ((e = e?.split?.(";")[0]), (e && _2(this, NRe, "f").get(e.trim().toLowerCase())) ?? null);
  }
  getAllExtensions(e) {
    if (typeof e !== "string") return null;
    return _2(this, ide, "f").get(e.toLowerCase()) ?? null;
  }
  _freeze() {
    ((this.define = () => {
      throw Error(
        "define() not allowed for built-in Mime objects. See https://github.com/broofa/mime/blob/main/README.md#custom-mime-instances",
      );
    }),
      Object.freeze(this));
    for (let e of _2(this, ide, "f").values()) Object.freeze(e);
    return this;
  }
  _getTestState() {
    return { types: _2(this, R1e, "f"), extensions: _2(this, NRe, "f") };
  }
}