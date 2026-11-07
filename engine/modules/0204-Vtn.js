
var Vtn = "~effect/data/Option",
  qtn,
  dOs,
  mOs,
  _Os,
  mKt = (e) => Ma(e, Vtn),
  c2e = (e) => e._tag === "None",
  _Kt = (e) => e._tag === "Some",
  hKt,
  LKt = (e) => {
    let t = Object.create(dOs);
    return ((t.value = e), t);
  };