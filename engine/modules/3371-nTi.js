
var nTi = ne(() => {
  YA();
  R_();
  $Q();
  NEa = {
    [rTi]: rTi,
    add(...e) {
      let t = { ...this.endpoints };
      for (let r of e) t[r.name] = r;
      return oHe({
        identifier: this.identifier,
        topLevel: this.topLevel,
        endpoints: t,
        annotations: this.annotations,
      });
    },
    prefix(e) {
      return oHe({
        identifier: this.identifier,
        topLevel: this.topLevel,
        endpoints: vv(this.endpoints, (t) => t.prefix(e)),
        annotations: this.annotations,
      });
    },
    middleware(e) {
      return oHe({
        identifier: this.identifier,
        topLevel: this.topLevel,
        endpoints: vv(this.endpoints, (t) => t.middleware(e)),
        annotations: this.annotations,
      });
    },
    annotateMerge(e) {
      return oHe({
        identifier: this.identifier,
        topLevel: this.topLevel,
        endpoints: this.endpoints,
        annotations: _I(this.annotations, e),
      });
    },
    annotate(e, t) {
      return oHe({
        identifier: this.identifier,
        topLevel: this.topLevel,
        endpoints: this.endpoints,
        annotations: Oh(this.annotations, e, t),
      });
    },
    annotateEndpointsMerge(e) {
      return oHe({
        identifier: this.identifier,
        topLevel: this.topLevel,
        endpoints: vv(this.endpoints, (t) => t.annotateMerge(e)),
        annotations: this.annotations,
      });
    },
    annotateEndpoints(e, t) {
      return oHe({
        identifier: this.identifier,
        topLevel: this.topLevel,
        endpoints: vv(this.endpoints, (r) => r.annotate(e, t)),
        annotations: this.annotations,
      });
    },
    pipe() {
      return vA(this, arguments);
    },
  };
});