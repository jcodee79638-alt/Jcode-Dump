
var aL = ne(() => {
  R0();
  Jg();
  kpe();
  BH();
  lD();
  ew();
  KH();
  KHn();
  Oie();
  Yu();
  fD();
  ((Hd = JHn),
    ($1 = Hd(THn)),
    (xE = Wr(2, (e, t) =>
      JBe(() => {
        let r = 0;
        return Hd(
          c1e(
            e.channel,
            jv((s) => t(s, r++)),
          ),
        );
      }),
    )),
    (f1e = Wr(
      (e) => lg(e[0]),
      (e, t, r) => e.channel.pipe(oft, yYt(t, r), c1e(vS), Hd),
    )),
    (_cn = Wr(2, (e, t) => Hd(yYt(e.channel, t)))),
    (VYt = Wr(
      (e) => lg(e[0]),
      (e, t, r) => f1e(e, (s) => eu(t(s), s), r),
    )),
    (lft = Wr(
      (e) => lg(e[0]),
      (e, t, r) =>
        e.channel.pipe(
          oft,
          wHn((s) => t(s).channel, r),
          Hd,
        ),
    )),
    (dFs = Wr(
      (e) => lg(e[0]),
      (e, t) => lft(e, Za, t),
    )),
    (Fpe = Wr(2, (e, t) => dFs(WYt([e, t])))),
    (oG = Wr(
      (e) => lg(e[0]) && lg(e[1]),
      (e, t, r) => Hd(SYt(GBe(e), GBe(t), r)),
    )),
    (aG = Wr(2, (e, t) => Hd(kHn(GBe(e), t)))),
    (zBe = Wr(2, (e, t) =>
      e.channel.pipe(
        xYt((r) => t(r).channel),
        Hd,
      ),
    )),
    (_Fs = Wr(2, (e, t) => Hd(NBe(e.channel, (r) => t(r).channel)))),
    (hcn = Wr(
      (e) => lg(e[0]),
      (e, t, r, s) => Hd(UHn(GBe(e), t, (a) => r(a).channel, s && ((a) => s(a).channel))),
    )),
    (hFs = Wr(
      (e) => lg(e[0]),
      (e, t, r, s) => {
        let a = Array.isArray(t) ? (H) => Ma(H, "_tag") && t.includes(H._tag) : pQ(t);
        return hcn(e, a, r, s);
      },
    )),
    (fft = Wr(2, (e, t) => Hd(NHn(e.channel, t)))),
    (LFs = Wr(2, (e, t) => (t < 1 ? $1 : p1e(e, (r, s) => s === t - 1)))),
    (p1e = Wr(
      (e) => lg(e[0]),
      (e, t, r) =>
        RYt(e, (s, a) =>
          jn(() => {
            let H = 0,
              u = !1;
            return Hi(
              yH(() => (u ? Xp() : s)),
              (d) => {
                let _ = d.findIndex((L) => t(L, H++));
                if (_ >= 0) {
                  u = !0;
                  let L = d.slice(0, r?.excludeLast ? _ : _ + 1);
                  return bv(L) ? Jt(L) : Xp();
                }
                return Jt(d);
              },
            );
          }),
        ),
    )),
    (pft = Wr(2, (e, t) =>
      RYt(e, (r, s) =>
        jn(() => {
          let a = 0,
            H = r.pipe(
              Hi((u) => {
                if (a >= t) return Jt(u);
                if (((a += u.length), a <= t)) return H;
                return Jt(u.slice(t - a));
              }),
            );
          return H;
        }),
      ),
    )),
    ($Fs = Wr(
      (e) => lg(e[0]),
      (e, t, r, s) =>
        Hd(
          MYt(
            e.channel,
            t,
            (a, H) => {
              let u = ZF();
              for (let f = 0; f < H.length; f++) {
                let [d, _] = r(a, H[f]);
                ((a = d), u.push(..._));
              }
              return [a, TS(u) ? vS(u) : FYt];
            },
            s?.onHalt
              ? {
                  onHalt(a) {
                    let H = s.onHalt(a);
                    return bv(H) ? vS(H) : FYt;
                  },
                }
              : void 0,
          ),
        ),
    )),
    (FYt = ZF()),
    (gFs = Wr(
      (e) => lg(e[0]),
      (e, t, r, s) =>
        e.channel.pipe(
          oft,
          MYt(
            t,
            (a, H) => Vn(r(a, H), ([u, f]) => [u, bv(f) ? vS(f) : ZF()]),
            s?.onHalt
              ? {
                  onHalt(a) {
                    let H = s.onHalt(a);
                    return bv(H) ? vS(H) : FYt;
                  },
                }
              : void 0,
          ),
          Hd,
        ),
    )),
    (Rie = Wr(2, (e, t) =>
      RYt(e, (r, s) =>
        jn(() => {
          let a,
            H,
            u = yH(() => {
              if (H !== void 0) {
                let d = H;
                return ((H = void 0), Jt(d));
              }
              return r;
            }).pipe($s((d) => ((a = WC(d)), Xp()))),
            f = Vn(
              yH(() => t.transform(u, s)),
              ([d, _]) => ((H = _), vS(d)),
            );
          return yH(() => (a ? a : f));
        }),
      ),
    )),
    (Wie = Wr(2, (e, t) => Hd(aft(e.channel, t)))),
    (C6 = Wr(
      (e) => lg(e[0]),
      (e, t) =>
        JBe(() => {
          let r = new TextDecoder(t?.encoding);
          return xE(e, (s) => r.decode(s, { stream: !0 }));
        }),
    )),
    (EFs = Wr(2, (e, t) => Hd(VHn(e.channel, t)))),
    (Lcn = Wr(2, (e, t) => Hd(TYt(e.channel, t)))),
    (m1e = Wr(2, (e, t) => Hd(qHn(e.channel, t)))),
    (QBe = Wr(2, (e, t) => Hd(GHn(e.channel, t)))),
    (Vie = Wr(2, (e, t) =>
      llt((r) =>
        jYt(e.channel, r).pipe(
          Hi((s) => t.transform(s, r)),
          Vn(([s]) => s),
        ),
      ),
    )),
    ($cn = Wr(3, (e, t, r) =>
      A1e(e.channel, t, (s, a) => {
        for (let H = 0; H < a.length; H++) s = r(s, a[H]);
        return s;
      }),
    )),
    (FW = Wr(2, (e, t) =>
      bYt(e.channel, (r) => {
        let s = 0;
        return Kq({ while: () => s < r.length, body: () => t(r[s++]), step: m6 });
      }),
    )),
    (dft = Wr(2, (e, t) => bYt(e.channel, t))),
    (mft = Wr(
      (e) => lg(e[0]),
      (e, t, r) => {
        let s = void 0,
          a = void 0,
          H = CW(!1);
        return new ReadableStream(
          {
            start(u) {
              ((a = KC(
                m1(
                  dft(e, (f) =>
                    H.whenOpen(
                      jn(() => {
                        H.closeUnsafe();
                        for (let d = 0; d < f.length; d++) u.enqueue(f[d]);
                        (s(), (s = void 0));
                      }),
                    ),
                  ),
                  t,
                ),
              )),
                a.addObserver((f) => {
                  if (f._tag === "Failure") u.error(hI(f.cause));
                  else u.close();
                }));
            },
            pull() {
              return new Promise((u) => {
                ((s = u), H.openUnsafe());
              });
            },
            cancel() {
              if (!a) return;
              return oL(Qf(s2(a)));
            },
          },
          r?.strategy,
        );
      },
    )),
    (Ecn = Wr(
      (e) => lg(e[0]),
      (e, t) => Vn(Qg(), (r) => mft(e, r, t)),
    )));
});