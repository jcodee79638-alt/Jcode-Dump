
var kSe = Ie(function (s9o, _N) {
  var Aei = cr("crypto"),
    { appendFile: VNo, mkdir: Qur, readFile: qNo, readdir: GNo, rm: uei, writeFile: XNo } = cr("fs/promises"),
    { Minipass: JNo } = Ny(),
    rb = cr("path"),
    lei = BV(),
    { tmpName: KNo } = DEt(),
    zNo = wSe(),
    QNo = Jur(),
    YNo = Xur()["cache-version"].index,
    { moveFile: ZNo } = Qme();
  s9o.NotFoundError = class extends Error {
    constructor(t, r) {
      super(`No cache entry for ${r} found in ${t}`);
      ((this.code = "ENOENT"), (this.cache = t), (this.key = r));
    }
  };
  s9o.compact = e9o;
  async function e9o(e, t, r, s = {}) {
    let a = K7e(e, t),
      H = await xEt(a),
      u = [];
    for (let D = H.length - 1; D >= 0; --D) {
      let S = H[D];
      if (S.integrity === null && !s.validateEntry) break;
      if ((!s.validateEntry || s.validateEntry(S) === !0) && (u.length === 0 || !u.find((T) => r(T, S))))
        u.unshift(S);
    }
    let f =
        `
` +
        u.map((D) => {
          let S = JSON.stringify(D);
          return `${SEt(S)}	${S}`;
        }).join(`
`),
      d = async () => {
        let D = KNo(e, s.tmpPrefix);
        return (await Qur(rb.dirname(D), { recursive: !0 }), { target: D, moved: !1 });
      },
      _ = async (D) => {
        if (!D.moved) return uei(D.target, { recursive: !0, force: !0 });
      },
      L = async (D) => {
        (await XNo(D.target, f, { flag: "wx" }),
          await Qur(rb.dirname(a), { recursive: !0 }),
          await ZNo(D.target, a),
          (D.moved = !0));
      },
      I = await d();
    try {
      await L(I);
    } finally {
      await _(I);
    }
    return u.reverse().map((D) => TEt(e, D, !0));
  }
  s9o.insert = fei;
  async function fei(e, t, r, s = {}) {
    let { metadata: a, size: H, time: u } = s,
      f = K7e(e, t),
      d = { key: t, integrity: r && lei.stringify(r), time: u || Date.now(), size: H, metadata: a };
    try {
      await Qur(rb.dirname(f), { recursive: !0 });
      let _ = JSON.stringify(d);
      await VNo(
        f,
        `
${SEt(_)}	${_}`,
      );
    } catch (_) {
      if (_.code === "ENOENT") return;
      throw _;
    }
    return TEt(e, d);
  }
  s9o.find = t9o;
  async function t9o(e, t) {
    let r = K7e(e, t);
    try {
      return (await xEt(r)).reduce((a, H) => {
        if (H && H.key === t) return TEt(e, H);
        else return a;
      }, null);
    } catch (s) {
      if (s.code === "ENOENT") return null;
      else throw s;
    }
  }
  s9o.delete = r9o;
  function r9o(e, t, r = {}) {
    if (!r.removeFully) return fei(e, t, null, r);
    let s = K7e(e, t);
    return uei(s, { recursive: !0, force: !0 });
  }
  s9o.lsStream = pei;
  function pei(e) {
    let t = Yur(e),
      r = new JNo({ objectMode: !0 });
    return (
      Promise.resolve()
        .then(async () => {
          await Promise.resolve().then(() => MEt());
          let a = await zur(t);
          return (
            await nZ(
              a,
              async (H) => {
                let u = rb.join(t, H),
                  f = await zur(u);
                await nZ(
                  f,
                  async (d) => {
                    let _ = rb.join(u, d),
                      L = await zur(_);
                    await nZ(
                      L,
                      async (I) => {
                        let D = rb.join(_, I);
                        try {
                          let T = (await xEt(D)).reduce((C, O) => (C.set(O.key, O), C), new Map());
                          for (let C of T.values()) {
                            let O = TEt(e, C);
                            if (O) r.write(O);
                          }
                        } catch (S) {
                          if (S.code === "ENOENT") return;
                          throw S;
                        }
                      },
                      { concurrency: 5 },
                    );
                  },
                  { concurrency: 5 },
                );
              },
              { concurrency: 5 },
            ),
            r.end(),
            r
          );
        })
        .catch((s) => r.emit("error", s)),
      r
    );
  }
  s9o.ls = n9o;
  async function n9o(e) {
    return (await pei(e).collect()).reduce((r, s) => ((r[s.key] = s), r), {});
  }
  s9o.bucketEntries = xEt;
  async function xEt(e, t) {
    let r = await qNo(e, "utf8");
    return i9o(r, t);
  }
  function i9o(e) {
    let t = [];
    return (
      e
        .split(
          `
`,
        )
        .forEach((r) => {
          if (!r) return;
          let s = r.split("\t");
          if (!s[1] || SEt(s[1]) !== s[0]) return;
          let a;
          try {
            a = JSON.parse(s[1]);
          } catch (H) {}
          if (a) t.push(a);
        }),
      t
    );
  }
  s9o.bucketDir = Yur;
  function Yur(e) {
    return rb.join(e, `index-v${YNo}`);
  }
  s9o.bucketPath = K7e;
  function K7e(e, t) {
    let r = dei(t);
    return rb.join.apply(rb, [Yur(e)].concat(QNo(r)));
  }
  s9o.hashKey = dei;
  function dei(e) {
    return mei(e, "sha256");
  }
  s9o.hashEntry = SEt;
  function SEt(e) {
    return mei(e, "sha1");
  }
  function mei(e, t) {
    return Aei.createHash(t).update(e).digest("hex");
  }
  function TEt(e, t, r) {
    if (!t.integrity && !r) return null;
    return {
      key: t.key,
      integrity: t.integrity,
      path: t.integrity ? zNo(e, t.integrity) : void 0,
      size: t.size,
      time: t.time,
      metadata: t.metadata,
    };
  }
  function zur(e) {
    return GNo(e).catch((t) => {
      if (t.code === "ENOENT" || t.code === "ENOTDIR") return [];
      throw t;
    });
  }
});