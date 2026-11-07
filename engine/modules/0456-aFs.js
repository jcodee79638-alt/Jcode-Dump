
var aFs = "~effect/RcRef",
  UYt,
  HFs,
  cFs,
  ocn,
  acn = (e) =>
    hl((t) => {
      let r = t.context,
        s = Pp(r, $f),
        a = new ocn(e.acquire, r, s, e.idleTimeToLive ? Ag(e.idleTimeToLive) : void 0);
      return eu(
        TW(s, () => {
          let H = a.state._tag === "Acquired" ? cl(a.state.scope, M$) : ti;
          return ((a.state = HFs), H);
        }),
        a,
      );
    }),
  AFs = (e) =>
    q0((t) => {
      switch (e.state._tag) {
        case "Closed":
          return PS;
        case "Acquired":
          return (e.state.refCount++, e.state.fiber ? eu(s2(e.state.fiber), e.state) : Jt(e.state));
        case "Empty": {
          let r = VM();
          return e.semaphore.withPermits(1)(
            t(m1(e.acquire, Oh(e.context, $f, r))).pipe(
              Vn((s) => {
                let a = { _tag: "Acquired", value: s, scope: r, fiber: void 0, refCount: 1, invalidated: !1 };
                return ((e.state = a), a);
              }),
            ),
          );
        }
      }
    }),
  Hcn;