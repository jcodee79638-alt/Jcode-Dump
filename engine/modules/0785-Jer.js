
var Jer = "~effect/FiberMap",
  hWs = (e) => Ma(e, Jer),
  LWs,
  $Ws = (e, t) => {
    let r = Object.create(LWs);
    return ((r.state = { _tag: "Open", backing: e }), (r.deferred = t), r);
  },
  gWs = () =>
    Bd(
      jn(() => $Ws(Ope(), Kg())),
      (e) =>
        yH(() => {
          let t = e.state;
          if (t._tag === "Closed") return ti;
          return ((e.state = { _tag: "Closed" }), zlt(ncn(t.backing)).pipe(Jut(e.deferred)));
        }),
    ),
  qRe = -1,
  EWs,
  IWs,
  spn,
  opn,
  DWs,
  yWs,
  MWs = function () {
    let e = arguments[0];
    if (ug(arguments[2])) return ipn(e, arguments[1], arguments[2], arguments[3]);
    let t = arguments[1],
      r = arguments[2];
    return (s) => ipn(e, t, s, r);
  },
  ipn = (e, t, r, s) =>
    hl((a) => {
      if (e.state._tag === "Closed") return PS;
      else if (s?.onlyIfMissing === !0 && spn(e, t)) return jn(yWs);
      let H = G0(a.context)(r);
      return (IWs(e, t, H, s), Jt(H));
    });