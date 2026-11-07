
var Gei = Ie(function (rlc, Hlr) {
  var BEt = kSe(),
    REt = z7e(),
    alr = Vei(),
    sFo = UEt(),
    { PassThrough: oFo } = Sur(),
    aFo = jSe(),
    qei = (e) => ({ algorithms: ["sha512"], ...e });
  Hlr.exports = HFo;
  async function HFo(e, t, r, s = {}) {
    let { memoize: a } = s;
    s = qei(s);
    let H = await alr(e, r, s),
      u = await BEt.insert(e, t, H.integrity, { ...s, size: H.size });
    if (a) REt.put(e, u, r, s);
    return H.integrity;
  }
  Hlr.exports.stream = cFo;
  function cFo(e, t, r = {}) {
    let { memoize: s } = r;
    r = qei(r);
    let a,
      H,
      u,
      f,
      d = new aFo();
    if (s) {
      let L = new oFo().on("collect", (I) => {
        f = I;
      });
      d.push(L);
    }
    let _ = alr
      .stream(e, r)
      .on("integrity", (L) => {
        a = L;
      })
      .on("size", (L) => {
        H = L;
      })
      .on("error", (L) => {
        u = L;
      });
    return (
      d.push(_),
      d.push(
        new sFo({
          async flush() {
            if (!u) {
              let L = await BEt.insert(e, t, a, { ...r, size: H });
              if (s && f) REt.put(e, L, f, r);
              (d.emit("integrity", a), d.emit("size", H));
            }
          },
        }),
      ),
      d
    );
  }
});