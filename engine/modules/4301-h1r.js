
var h1r = Ie(function (yUi) {
  Object.defineProperty(yUi, "__esModule", { value: !0 });
  yUi.ValueScope = yUi.ValueScopeName = yUi.Scope = yUi.varKinds = yUi.UsedValueState = void 0;
  var W$ = bXe();
  class IUi extends Error {
    constructor(e) {
      super(`CodeGen: "code" for ${e} not defined`);
      this.value = e.value;
    }
  }
  var Wvt;
  (function (e) {
    ((e[(e.Started = 0)] = "Started"), (e[(e.Completed = 1)] = "Completed"));
  })(Wvt || (yUi.UsedValueState = Wvt = {}));
  yUi.varKinds = { const: new W$.Name("const"), let: new W$.Name("let"), var: new W$.Name("var") };
  class m1r {
    constructor({ prefixes: e, parent: t } = {}) {
      ((this._names = {}), (this._prefixes = e), (this._parent = t));
    }
    toName(e) {
      return e instanceof W$.Name ? e : this.name(e);
    }
    name(e) {
      return new W$.Name(this._newName(e));
    }
    _newName(e) {
      let t = this._names[e] || this._nameGroup(e);
      return `${e}${t.index++}`;
    }
    _nameGroup(e) {
      var t, r;
      if (
        ((r = (t = this._parent) === null || t === void 0 ? void 0 : t._prefixes) === null || r === void 0
          ? void 0
          : r.has(e)) ||
        (this._prefixes && !this._prefixes.has(e))
      )
        throw Error(`CodeGen: prefix "${e}" is not allowed in this scope`);
      return (this._names[e] = { prefix: e, index: 0 });
    }
  }
  yUi.Scope = m1r;
  class _1r extends W$.Name {
    constructor(e, t) {
      super(t);
      this.prefix = e;
    }
    setValue(e, { property: t, itemIndex: r }) {
      ((this.value = e), (this.scopePath = W$._`.${new W$.Name(t)}[${r}]`));
    }
  }
  yUi.ValueScopeName = _1r;
  var QCa = W$._`\n`;
  class DUi extends m1r {
    constructor(e) {
      super(e);
      ((this._values = {}), (this._scope = e.scope), (this.opts = { ...e, _n: e.lines ? QCa : W$.nil }));
    }
    get() {
      return this._scope;
    }
    name(e) {
      return new _1r(e, this._newName(e));
    }
    value(e, t) {
      var r;
      if (t.ref === void 0) throw Error("CodeGen: ref must be passed in value");
      let s = this.toName(e),
        { prefix: a } = s,
        H = (r = t.key) !== null && r !== void 0 ? r : t.ref,
        u = this._values[a];
      if (u) {
        let _ = u.get(H);
        if (_) return _;
      } else u = this._values[a] = new Map();
      u.set(H, s);
      let f = this._scope[a] || (this._scope[a] = []),
        d = f.length;
      return ((f[d] = t.ref), s.setValue(t, { property: a, itemIndex: d }), s);
    }
    getValue(e, t) {
      let r = this._values[e];
      if (!r) return;
      return r.get(t);
    }
    scopeRefs(e, t = this._values) {
      return this._reduceValues(t, (r) => {
        if (r.scopePath === void 0) throw Error(`CodeGen: name "${r}" has no value`);
        return W$._`${e}${r.scopePath}`;
      });
    }
    scopeCode(e = this._values, t, r) {
      return this._reduceValues(
        e,
        (s) => {
          if (s.value === void 0) throw Error(`CodeGen: name "${s}" has no value`);
          return s.value.code;
        },
        t,
        r,
      );
    }
    _reduceValues(e, t, r = {}, s) {
      let a = W$.nil;
      for (let H in e) {
        let u = e[H];
        if (!u) continue;
        let f = (r[H] = r[H] || new Map());
        u.forEach((d) => {
          if (f.has(d)) return;
          f.set(d, Wvt.Started);
          let _ = t(d);
          if (_) {
            let L = this.opts.es5 ? yUi.varKinds.var : yUi.varKinds.const;
            a = W$._`${a}${L} ${d} = ${_};${this.opts._n}`;
          } else if ((_ = s === null || s === void 0 ? void 0 : s(d))) a = W$._`${a}${_}${this.opts._n}`;
          else throw new IUi(d);
          f.set(d, Wvt.Completed);
        });
      }
      return a;
    }
  }
  yUi.ValueScope = DUi;
});