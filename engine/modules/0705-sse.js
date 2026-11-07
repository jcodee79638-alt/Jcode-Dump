
var sse = "~effect/http/Multipart",
  Hln = "~effect/http/Multipart/MultipartError",
  cln,
  Ey,
  _er = (e) =>
    hl((t) => {
      let r = Pp(t.context, _ln);
      return Jt({
        headers: e,
        maxParts: t.getRef(pln),
        maxFieldSize: Number(t.getRef(dln)),
        maxPartSize: qQ(t.getRef(mln), Number),
        maxTotalSize: qQ(t.getRef(C1e), Number),
        isFile: r.length === 0 ? void 0 : (s) => !r.some((a) => s.contentType.includes(a)) && oln(s),
      });
    }),
  Aln = (e) =>
    T$((t) =>
      Vn(_er(e), (r) => {
        let s = [],
          a = eH(),
          H = xpt({
            ...r,
            onField(f, d) {
              s.push(new uln(f.name, f.contentType, CRe(f, d)));
            },
            onFile(f) {
              let d = [],
                _ = !1,
                L = UU(
                  Jt(
                    yH(function I() {
                      if (!bv(d)) return _ ? Xp() : Hi(u, I);
                      let D = d;
                      return ((d = []), Jt(D));
                    }),
                  ),
                );
              return (
                s.push(new lln(f, L)),
                function (I) {
                  if (I === null) _ = !0;
                  else d.push(I);
                }
              );
            },
            onError(f) {
              a = Lo(WC(t3s(f)));
            },
            onDone() {
              a = Lo(WC(W2e()));
            },
          }),
          u = t.pipe(
            Hi((f) => {
              for (let d = 0; d < f.length; d++) H.write(f[d]);
              return ti;
            }),
            jf((f) => {
              if (Eie(f)) H.end();
              else a = Lo(SW(f));
              return ti;
            }),
          );
        return u.pipe(
          Hi(function f() {
            if (!bv(s)) {
              if (Nu(a)) return a.value;
              return Hi(u, f);
            }
            let d = s;
            return ((s = []), Jt(d));
          }),
        );
      }),
    ),
  Tpt,
  uln,
  lln,
  r3s = (e, t) => Hi(g1, (r) => Zo(Vie(t.content, r.sink(e)), (s) => Ey.fromReason("InternalError", s))),
  n3s = (e) =>
    A1e(e, ph(new Uint8Array(0)), (t, r) => {
      let s = r.reduce((u, f) => u + f.length, t.length),
        a = new Uint8Array(s);
      a.set(t, 0);
      let H = t.length;
      for (let u of r) (a.set(u, H), (H += u.length));
      return a;
    }),
  vpt = (e, t = r3s) =>
    ft(function* () {
      let r = yield* g1,
        s = yield* rw,
        a = yield* r.makeTempDirectoryScoped(),
        H = Object.create(null);
      return (
        yield* FW(e, (u) => {
          if (u._tag === "Field") {
            if (!(u.key in H)) H[u.key] = u.value;
            else if (typeof H[u.key] === "string") H[u.key] = [H[u.key], u.value];
            else H[u.key].push(u.value);
            return ti;
          } else if (u.name === "") return ti;
          let f = u,
            d = s.join(a, s.basename(f.name).slice(-128)),
            _ = new fln(f.key, f.name, f.contentType, d);
          if (Array.isArray(H[u.key])) H[u.key].push(_);
          else H[u.key] = [_];
          return t(d, f);
        }),
        H
      );
    }).pipe(EA("PlatformError", (r) => bn(Ey.fromReason("InternalError", r)))),
  fln,
  her = (e) => {
    let t = new Map();
    if (e.maxParts !== void 0) t.set(pln.key, e.maxParts);
    if (e.maxFieldSize !== void 0) t.set(dln.key, NU(e.maxFieldSize));
    if (e.maxFileSize !== void 0) t.set(mln.key, qQ(e.maxFileSize, NU));
    if (e.maxTotalSize !== void 0) t.set(C1e.key, qQ(e.maxTotalSize, NU));
    if (e.fieldMimeTypes !== void 0) t.set(_ln.key, e.fieldMimeTypes);
    return B0(t);
  },
  pln,
  dln,
  mln,
  _ln;