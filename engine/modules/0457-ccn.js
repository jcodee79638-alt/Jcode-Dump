
var ccn = ne(() => {
  YA();
  $6();
  BH();
  lD();
  ew();
  KH();
  R_();
  fD();
  o1e();
  ((UYt = { _tag: "Empty" }), (HFs = { _tag: "Closed" }), (cFs = { _A: Za, _E: Za }));
  ocn = class ocn {
    [aFs] = cFs;
    pipe() {
      return vA(this, arguments);
    }
    state = UYt;
    semaphore = j6(1);
    acquire;
    context;
    scope;
    idleTimeToLive;
    constructor(e, t, r, s) {
      ((this.acquire = e), (this.context = t), (this.scope = r), (this.idleTimeToLive = s));
    }
  };
  Hcn = ni(function* (e) {
    let t = e,
      r = yield* AFs(t),
      s = yield* Epe,
      a = t.idleTimeToLive !== void 0 && Wq(t.idleTimeToLive);
    return (
      yield* TW(s, () => {
        if ((r.refCount--, r.refCount > 0)) return ti;
        if (t.idleTimeToLive === void 0) return ((t.state = UYt), cl(r.scope, M$));
        else if (r.invalidated) return cl(r.scope, M$);
        else if (!a) return ti;
        return (
          (r.fiber = Qq(t.idleTimeToLive).pipe(
            Hi(() => {
              if (t.state._tag === "Acquired" && t.state.refCount === 0)
                return ((t.state = UYt), cl(r.scope, M$));
              return ti;
            }),
            up(
              jn(() => {
                r.fiber = void 0;
              }),
            ),
            G0(t.context),
            Pj(t.scope),
          )),
          ti
        );
      }),
      r.value
    );
  });
});