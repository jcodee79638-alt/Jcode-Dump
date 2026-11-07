
var mIn = () =>
    T$((e, t) =>
      jn(() => {
        let r = [],
          s,
          a = GKs((u) => {
            if (u._tag === "Retry") s = u;
            else r.push(u);
          }),
          H = Hi(e, (u) => {
            for (let f = 0; f < u.length; f++) a.feed(u[f]);
            return ti;
          });
        return yH(function u() {
          if (TS(r)) {
            let f = r;
            return ((r = []), Jt(f));
          } else if (s) return bn(s);
          return Hi(H, u);
        });
      }),
    ),
  _In,
  jMe = () =>
    T$((e, t) =>
      jn(() => {
        let r = !1,
          s = e.pipe(
            Vn(jv(y_t.write)),
            Alt(M_t.filter, (a) => ((r = !0), Jt(vS(y_t.write(a))))),
            jS(() => Xp()),
          );
        return yH(() => (r ? Xp() : s));
      }),
    ),
  Rnr = "~effect/encoding/Sse/Retry",
  M_t,
  y_t;