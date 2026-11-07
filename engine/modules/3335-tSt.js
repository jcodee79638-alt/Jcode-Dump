
var tSt = ne(() => {
  n2();
  BH();
  upt();
  Yu();
  Ov();
  ppt();
  p2();
  fhe();
  ((OSi = Rd({ status: 400 })),
    (Z0a = Rd({ status: 401 })),
    (eEa = Rd({ status: 403 })),
    (tEa = Rd({ status: 404 })),
    (rEa = Rd({ status: 500 })));
  PA = class PA extends (
    $y("effect/HttpApiError/BadRequest")(
      { _tag: Vc("BadRequest") },
      { description: "BadRequest", httpApiStatus: 400 },
    )
  ) {
    [ZW] = !0;
    [kj]() {
      return Jt(OSi);
    }
    static singleton = new PA();
  };
  eSt = class eSt extends (
    $y("effect/HttpApiError/Unauthorized")(
      { _tag: Vc("Unauthorized") },
      { description: "Unauthorized", httpApiStatus: 401 },
    )
  ) {
    [ZW] = !0;
    [kj]() {
      return Jt(Z0a);
    }
  };
  USi = eSt.pipe(ESi({ decode: () => new eSt({}) }));
  NSi = class NSi extends (
    $y("effect/HttpApiError/Forbidden")(
      { _tag: Vc("Forbidden") },
      { description: "Forbidden", httpApiStatus: 403 },
    )
  ) {
    [ZW] = !0;
    [kj]() {
      return Jt(eEa);
    }
  };
  FSi = class FSi extends (
    $y("effect/HttpApiError/NotFound")(
      { _tag: Vc("NotFound") },
      { description: "NotFound", httpApiStatus: 404 },
    )
  ) {
    [ZW] = !0;
    [kj]() {
      return Jt(tEa);
    }
  };
  aX = class aX extends (
    $y("effect/HttpApiError/InternalServerError")(
      { _tag: Vc("InternalServerError") },
      { description: "InternalServerError", httpApiStatus: 500 },
    )
  ) {
    [kj]() {
      return Jt(rEa);
    }
  };
  kB = class kB extends Yut("HttpApiSchemaError") {
    [u0r] = u0r;
    static is(e) {
      return Ma(e, u0r);
    }
    static wrap(e, t) {
      return Zo(t, (r) => new kB({ kind: e, cause: r }));
    }
    name = "HttpApiSchemaError";
    message = this.kind;
    [kj]() {
      return Jt(OSi);
    }
  };
});