
var Xtn = "~effect/data/Result",
  Jtn,
  hOs,
  LOs,
  gKt = (e) => Ma(e, Xtn),
  EKt = (e) => e._tag === "Failure",
  IKt = (e) => e._tag === "Success",
  DKt = (e) => {
    let t = Object.create(LOs);
    return ((t.failure = e), t);
  },
  yKt = (e) => {
    let t = Object.create(hOs);
    return ((t.success = e), t);
  },
  Ktn;