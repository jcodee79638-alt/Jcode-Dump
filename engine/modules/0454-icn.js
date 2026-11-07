
var icn = "~effect/RcMap",
  sFs = (e) => ({
    [icn]: icn,
    lookup: e.lookup,
    context: e.context,
    scope: e.scope,
    idleTimeToLive: e.idleTimeToLive,
    capacity: e.capacity,
    state: { _tag: "Open", map: Ope() },
    pipe() {
      return vA(this, arguments);
    },
  }),
  wYt = (e) =>
    hl((t) => {
      let r = t.context,
        s = Pp(r, $f),
        a = sFs({
          lookup: e.lookup,
          context: r,
          scope: s,
          idleTimeToLive:
            typeof e.idleTimeToLive === "function"
              ? mW(e.idleTimeToLive, Ag)
              : ph(Ag(e.idleTimeToLive ?? xU)),
          capacity: Math.max(e.capacity ?? Number.POSITIVE_INFINITY, 0),
        });
      return eu(
        TW(s, () => {
          if (a.state._tag === "Closed") return ti;
          let H = a.state.map;
          return (
            (a.state = { _tag: "Closed" }),
            ja(H, ([, u]) => _h(cl(u.scope, M$))).pipe(
              DE(() =>
                jn(() => {
                  VBe(H);
                }),
              ),
            )
          );
        }),
        a,
      );
    }),
  uft,
  oFs = (e, t, r) =>
    hl((s) => {
      if ((r.refCount--, r.refCount > 0)) return ti;
      else if (e.state._tag === "Closed" || !WBe(e.state.map, t) || I2e(r.idleTimeToLive)) {
        if (e.state._tag === "Open") L1(e.state.map, t);
        return cl(r.scope, M$);
      } else if (!Wq(r.idleTimeToLive)) return ti;
      let a = s.getRef(y6);
      if (((r.expiresAt = a.currentTimeMillisUnsafe() + $E(r.idleTimeToLive)), r.fiber)) return ti;
      return (
        (r.fiber = qsn(function H(u) {
          let f = a.currentTimeMillisUnsafe(),
            d = r.expiresAt - f;
          if (d <= 0) {
            if (e.state._tag === "Closed" || r.refCount > 0) return ti;
            return (L1(e.state.map, t), u(cl(r.scope, M$)));
          }
          return Hi(a.sleep(UC(d)), () => H(u));
        }).pipe(
          up(
            jn(() => {
              r.fiber = void 0;
            }),
          ),
          G0(s.context),
          Pj(e.scope),
        )),
        ti
      );
    }),
  scn;