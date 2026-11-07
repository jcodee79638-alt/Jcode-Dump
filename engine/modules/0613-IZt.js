
function IZt(e, t, r, s, a) {
  let H = pBs(r, t, s),
    u = FAn(t),
    f = class extends e {
      constructor(...[d, _]) {
        d = d ?? {};
        let L = r.make(d, _);
        super({ ...d, ...L }, { ..._, disableChecks: !0 });
      }
      static [HRe] = HRe;
      get [u]() {
        return u;
      }
      static [lBs] = !0;
      static identifier = t;
      static fields = r.fields;
      static get ast() {
        return H(this).ast;
      }
      static pipe() {
        return vA(this, arguments);
      }
      static rebuild(d) {
        return H(this).rebuild(d);
      }
      static make(d, _) {
        return new this(d, _);
      }
      static makeOption(d, _) {
        return vft(H(this))(d ?? {}, _);
      }
      static makeEffect(d, _) {
        return H(this).makeEffect(d ?? {}, _);
      }
      static annotate(d) {
        return this.rebuild(zye(this.ast, d));
      }
      static annotateKey(d) {
        return this.rebuild(Wlt(this.ast, d));
      }
      static check(...d) {
        return this.rebuild(Qye(this.ast, d));
      }
      static extend(d) {
        return (_, L) => {
          let I = { ...r.fields, ..._ };
          return IZt(this, d, $Zt(klt(I, r.ast.checks, { identifier: d }), I), L, a);
        };
      }
      static mapFields(d, _) {
        return r.mapFields(d, _);
      }
    };
  if (a !== void 0) Object.assign(f.prototype, a(t));
  return f;
}