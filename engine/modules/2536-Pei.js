
var Pei = Ie(function (Zuc, sZ) {
  var OEt = Sur(),
    { Minipass: bei } = Ny(),
    jei = jSe(),
    c8 = kSe(),
    aT = z7e(),
    tB = slr();
  async function N9o(e, t, r = {}) {
    let { integrity: s, memoize: a, size: H } = r,
      u = aT.get(e, t, r);
    if (u && a !== !1)
      return { metadata: u.entry.metadata, data: u.data, integrity: u.entry.integrity, size: u.entry.size };
    let f = await c8.find(e, t, r);
    if (!f) throw new c8.NotFoundError(e, t);
    let d = await tB(e, f.integrity, { integrity: s, size: H });
    if (a) aT.put(e, f, d, r);
    return { data: d, metadata: f.metadata, size: f.size, integrity: f.integrity };
  }
  sZ.exports = N9o;
  async function F9o(e, t, r = {}) {
    let { integrity: s, memoize: a, size: H } = r,
      u = aT.get.byDigest(e, t, r);
    if (u && a !== !1) return u;
    let f = await tB(e, t, { integrity: s, size: H });
    if (a) aT.put.byDigest(e, t, f, r);
    return f;
  }
  sZ.exports.byDigest = F9o;
  var B9o = (e) => {
    let t = new bei();
    return (
      t.on("newListener", function (r, s) {
        (r === "metadata" && s(e.entry.metadata),
          r === "integrity" && s(e.entry.integrity),
          r === "size" && s(e.entry.size));
      }),
      t.end(e.data),
      t
    );
  };
  function R9o(e, t, r = {}) {
    let { memoize: s, size: a } = r,
      H = aT.get(e, t, r);
    if (H && s !== !1) return B9o(H);
    let u = new jei();
    return (
      Promise.resolve()
        .then(async () => {
          let f = await c8.find(e, t);
          if (!f) throw new c8.NotFoundError(e, t);
          (u.emit("metadata", f.metadata),
            u.emit("integrity", f.integrity),
            u.emit("size", f.size),
            u.on("newListener", function (_, L) {
              (_ === "metadata" && L(f.metadata),
                _ === "integrity" && L(f.integrity),
                _ === "size" && L(f.size));
            }));
          let d = tB.readStream(e, f.integrity, { ...r, size: typeof a !== "number" ? f.size : a });
          if (s) {
            let _ = new OEt.PassThrough();
            (_.on("collect", (L) => aT.put(e, f, L, r)), u.unshift(_));
          }
          return (u.unshift(d), u);
        })
        .catch((f) => u.emit("error", f)),
      u
    );
  }
  sZ.exports.stream = R9o;
  function W9o(e, t, r = {}) {
    let { memoize: s } = r,
      a = aT.get.byDigest(e, t, r);
    if (a && s !== !1) {
      let H = new bei();
      return (H.end(a), H);
    } else {
      let H = tB.readStream(e, t, r);
      if (!s) return H;
      let u = new OEt.PassThrough();
      return (u.on("collect", (f) => aT.put.byDigest(e, t, f, r)), new jei(H, u));
    }
  }
  sZ.exports.stream.byDigest = W9o;
  function V9o(e, t, r = {}) {
    let { memoize: s } = r,
      a = aT.get(e, t, r);
    if (a && s !== !1) return Promise.resolve(a.entry);
    else return c8.find(e, t);
  }
  sZ.exports.info = V9o;
  async function q9o(e, t, r, s = {}) {
    let a = await c8.find(e, t, s);
    if (!a) throw new c8.NotFoundError(e, t);
    return (
      await tB.copy(e, a.integrity, r, s),
      { metadata: a.metadata, size: a.size, integrity: a.integrity }
    );
  }
  sZ.exports.copy = q9o;
  async function G9o(e, t, r, s = {}) {
    return (await tB.copy(e, t, r, s), t);
  }
  sZ.exports.copy.byDigest = G9o;
  sZ.exports.hasContent = tB.hasContent;
});