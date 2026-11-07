
var slr = Ie(function (Yuc, GSe) {
  var M5 = cr("fs/promises"),
    Mei = VSe(),
    qSe = BV(),
    P9o = wSe(),
    xei = jSe();
  GSe.exports = C9o;
  var Sei = 67108864;
  async function C9o(e, t, r = {}) {
    let { size: s } = r,
      {
        stat: a,
        cpath: H,
        sri: u,
      } = await Y7e(e, t, async (d, _) => ({ stat: s ? { size: s } : await M5.stat(d), cpath: d, sri: _ }));
    if (a.size > Sei) return Tei(H, a.size, u, new xei()).concat();
    let f = await M5.readFile(H, { encoding: null });
    if (a.size !== f.length) throw O9o(a.size, f.length);
    if (!qSe.checkData(f, u)) throw U9o(u, H);
    return f;
  }
  var Tei = (e, t, r, s) => (
    s.push(new Mei.ReadStream(e, { size: t, readSize: Sei }), qSe.integrityStream({ integrity: r, size: t })),
    s
  );
  GSe.exports.stream = vei;
  GSe.exports.readStream = vei;
  function vei(e, t, r = {}) {
    let { size: s } = r,
      a = new xei();
    return (
      Promise.resolve()
        .then(async () => {
          let {
            stat: H,
            cpath: u,
            sri: f,
          } = await Y7e(e, t, async (d, _) => ({
            stat: s ? { size: s } : await M5.stat(d),
            cpath: d,
            sri: _,
          }));
          return Tei(u, H.size, f, a);
        })
        .catch((H) => a.emit("error", H)),
      a
    );
  }
  GSe.exports.copy = w9o;
  function w9o(e, t, r) {
    return Y7e(e, t, (s) => M5.copyFile(s, r));
  }
  GSe.exports.hasContent = k9o;
  async function k9o(e, t) {
    if (!t) return !1;
    try {
      return await Y7e(e, t, async (r, s) => {
        let a = await M5.stat(r);
        return { size: a.size, sri: s, stat: a };
      });
    } catch (r) {
      if (r.code === "ENOENT") return !1;
      if (r.code === "EPERM") return !1;
    }
  }
  async function Y7e(e, t, r) {
    let s = qSe.parse(t),
      a = s.pickAlgorithm(),
      H = s[a];
    if (H.length <= 1) {
      let u = P9o(e, H[0]);
      return r(u, H[0]);
    } else {
      let u = await Promise.all(
          H.map(async (_) => {
            try {
              return await Y7e(e, _, r);
            } catch (L) {
              if (L.code === "ENOENT")
                return Object.assign(Error("No matching content found for " + s.toString()), {
                  code: "ENOENT",
                });
              return L;
            }
          }),
        ),
        f = u.find((_) => !(_ instanceof Error));
      if (f) return f;
      let d = u.find((_) => _.code === "ENOENT");
      if (d) throw d;
      throw u.find((_) => _ instanceof Error);
    }
  }
  function O9o(e, t) {
    let r = Error(`Bad data size: expected inserted data to be ${e} bytes, but got ${t} instead`);
    return ((r.expected = e), (r.found = t), (r.code = "EBADSIZE"), r);
  }
  function U9o(e, t) {
    let r = Error(`Integrity verification failed for ${e} (${t})`);
    return ((r.code = "EINTEGRITY"), (r.sri = e), (r.path = t), r);
  }
});