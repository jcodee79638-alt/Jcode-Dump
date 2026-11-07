
var A0r = ne(() => {
  YA();
  R_();
  $Q();
  SGe();
  fhe();
  Y0a = {
    [CSi]: CSi,
    pipe() {
      return vA(this, arguments);
    },
    add(...e) {
      let t = { ...this.groups };
      for (let r of e) t[r.identifier] = r;
      return phe({ identifier: this.identifier, groups: t, annotations: this.annotations });
    },
    addHttpApi(e) {
      let t = { ...this.groups };
      for (let r in e.groups) {
        let s = e.groups[r];
        ((s.annotations = _I(e.annotations, s.annotations)), (t[r] = s));
      }
      return phe({ identifier: this.identifier, groups: t, annotations: this.annotations });
    },
    prefix(e) {
      return phe({
        identifier: this.identifier,
        groups: vv(this.groups, (t) => t.prefix(e)),
        annotations: this.annotations,
      });
    },
    middleware(e) {
      return phe({
        identifier: this.identifier,
        groups: vv(this.groups, (t) => t.middleware(e)),
        annotations: this.annotations,
      });
    },
    annotate(e, t) {
      return phe({
        identifier: this.identifier,
        groups: this.groups,
        annotations: Oh(this.annotations, e, t),
      });
    },
    annotateMerge(e) {
      return phe({ identifier: this.identifier, groups: this.groups, annotations: _I(this.annotations, e) });
    },
  };
  Zxt = class Zxt extends _i()("effect/httpapi/HttpApi/AdditionalSchemas") {};
});