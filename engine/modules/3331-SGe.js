
var SGe = ne(() => {
  R0();
  YA();
  KH();
  R_();
  Ov();
  jW();
  a_t();
  fhe();
  V0a = {
    [vSi]: vSi,
    pipe() {
      return vA(this, arguments);
    },
    prefix(e) {
      return MGe({ ...this, path: gMe(this.path, e) });
    },
    middleware(e) {
      return MGe({ ...this, middlewares: new Set([...this.middlewares, e]) });
    },
    annotate(e, t) {
      return MGe({ ...this, annotations: Oh(this.annotations, e, t) });
    },
    annotateMerge(e) {
      return MGe({ ...this, annotations: _I(this.annotations, e) });
    },
  };
  ((MH = xGe("GET")), (sc = xGe("POST")), (c0r = xGe("PUT")), (Cbe = xGe("PATCH")), (P8 = xGe("DELETE")));
});