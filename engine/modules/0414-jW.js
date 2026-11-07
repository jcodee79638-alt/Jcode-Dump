
var jW = ne(() => {
  R0();
  Jg();
  BH();
  lD();
  FM();
  KH();
  gE();
  lBe();
  Hf();
  R_();
  Yu();
  xQt();
  Tv();
  $Be();
  bie();
  Vye();
  ((UQ = tG("Declaration")),
    (san = tG("Null")),
    (jlt = tG("Void")),
    (VNs = tG("Never")),
    (qye = tG("Literal")),
    (qNs = tG("UniqueSymbol")),
    (Plt = tG("Arrays")),
    (Xye = tG("Objects")),
    (vpe = tG("Union")),
    (WQt = tG("Suspend")));
  VQt = {};
  wv = class wv {
    [DBe] = DBe;
    annotations;
    checks;
    encoding;
    context;
    constructor(e = void 0, t = void 0, r = void 0, s = void 0) {
      ((this.annotations = e), (this.checks = t), (this.encoding = r), (this.context = s));
    }
    toString() {
      return `<${this._tag}>`;
    }
  };
  bpe = class bpe extends wv {
    _tag = "Declaration";
    typeParameters;
    run;
    encodingChecks;
    constructor(e, t, r, s, a, H, u) {
      super(r, s, a, H);
      ((this.typeParameters = e), (this.run = t), (this.encodingChecks = u));
    }
    getParser() {
      let e = this.run(this.typeParameters);
      return (t, r) => {
        if (vl(t)) return vQ;
        return bW(e(t.value, this, r), Lo);
      };
    }
    rebuild(e, t, r) {
      let s = Gye(this.typeParameters, e);
      return s === this.typeParameters
        ? this
        : new bpe(s, this.run, this.annotations, t, void 0, this.context, r);
    }
    recur(e) {
      return this.rebuild(e, this.checks, this.encodingChecks);
    }
    flip(e) {
      return this.rebuild(e, this.encodingChecks, this.checks);
    }
    getExpected() {
      let e = this.annotations?.expected;
      if (typeof e === "string") return e;
      return "<Declaration>";
    }
  };
  oan = class oan extends wv {
    _tag = "Null";
    getParser() {
      return qlt(this, null);
    }
    getExpected() {
      return "null";
    }
  };
  Jye = new oan();
  aan = class aan extends wv {
    _tag = "Undefined";
    getParser() {
      return qlt(this, void 0);
    }
    toCodecJson() {
      return x$(this, [Han]);
    }
    getExpected() {
      return "undefined";
    }
  };
  ((Han = new S$(
    Jye,
    new Zg(
      Sm(() => {
        return;
      }),
      Sm(() => null),
    ),
  )),
    (qQt = new aan()));
  can = class can extends wv {
    _tag = "Void";
    getParser() {
      return qlt(this, void 0);
    }
    toCodecJson() {
      return x$(this, [Han]);
    }
    getExpected() {
      return "void";
    }
  };
  Aan = new can();
  uan = class uan extends wv {
    _tag = "Never";
    getParser() {
      return wie(this, xtn);
    }
    getExpected() {
      return "never";
    }
  };
  lan = new uan();
  fan = class fan extends wv {
    _tag = "Any";
    getParser() {
      return wie(this, nKt);
    }
    getExpected() {
      return "any";
    }
  };
  pan = new fan();
  dan = class dan extends wv {
    _tag = "Unknown";
    getParser() {
      return wie(this, nKt);
    }
    getExpected() {
      return "unknown";
    }
  };
  MBe = new dan();
  eG = class eG extends wv {
    _tag = "Literal";
    literal;
    constructor(e, t, r, s, a) {
      super(t, r, s, a);
      if (typeof e === "number" && !globalThis.Number.isFinite(e))
        throw Error(`A numeric literal must be finite, got ${af(e)}`);
      this.literal = e;
    }
    getParser() {
      return qlt(this, this.literal);
    }
    toCodecJson() {
      return typeof this.literal === "bigint" ? Qon(this) : this;
    }
    toCodecStringTree() {
      return typeof this.literal === "string" ? this : Qon(this);
    }
    getExpected() {
      return typeof this.literal === "string"
        ? JSON.stringify(this.literal)
        : globalThis.String(this.literal);
    }
  };
  man = class man extends wv {
    _tag = "String";
    getParser() {
      return wie(this, lQ);
    }
    getExpected() {
      return "string";
    }
  };
  xBe = new man();
  _an = class _an extends wv {
    _tag = "Number";
    getParser() {
      return wie(this, zFe);
    }
    toCodecJson() {
      if (this.checks && (IBe(this.checks, "isFinite") || IBe(this.checks, "isInt"))) return this;
      return x$(this, [ZNs]);
    }
    toCodecStringTree() {
      if (this.checks && (IBe(this.checks, "isFinite") || IBe(this.checks, "isInt"))) return x$(this, [s9s]);
      return x$(this, [o9s]);
    }
    getExpected() {
      return "number";
    }
  };
  GQt = new _an();
  han = class han extends wv {
    _tag = "Boolean";
    getParser() {
      return wie(this, Itn);
    }
    getExpected() {
      return "boolean";
    }
  };
  Lan = new han();
  $an = class $an extends wv {
    _tag = "BigInt";
    getParser() {
      return wie(this, Dtn);
    }
    toCodecStringTree() {
      return x$(this, [a9s]);
    }
    getExpected() {
      return "bigint";
    }
  };
  gan = new $an();
  jpe = class jpe extends wv {
    _tag = "Arrays";
    isMutable;
    elements;
    rest;
    encodingChecks;
    constructor(e, t, r, s, a, H, u, f) {
      super(s, a, H, u);
      ((this.isMutable = e), (this.elements = t), (this.rest = r), (this.encodingChecks = f));
      let d = t.findIndex(h1);
      if (d !== -1 && (t.slice(d + 1).some((_) => !h1(_)) || r.length > 1))
        throw Error("A required element cannot follow an optional element. ts(1257)");
      if (r.length > 1 && r.slice(1).some(h1))
        throw Error("An optional element cannot follow a rest element. ts(1266)");
    }
    getParser(e) {
      let t = this,
        r = t.elements.map((_) => ({ ast: _, parser: e(_) })),
        s = t.rest.map((_) => ({ ast: _, parser: e(_) })),
        a = r.length,
        [H, ...u] = s,
        f = u.length;
      function d(_, L) {
        if (L < a) return r[L];
        else if (L >= _) return u[L - _];
        return H;
      }
      return mlt(function* (_, L) {
        if (_._tag === "None") return _;
        let I = _.value;
        if (!Array.isArray(I)) return yield* bn(new OU(t, _));
        let D = I.length,
          S = {
            ast: t,
            getParser: d,
            oinput: _,
            len: D,
            tailThreshold: XNs(D, a, f),
            output: new globalThis.Array(D),
            issues: void 0,
            options: L,
          },
          T = XQt(L?.concurrency),
          C = GNs(S, I, { concurrency: T?.concurrency, end: t.rest.length === 0 ? a : Math.max(D, a + f) });
        if (C) yield* C;
        if (t.rest.length === 0 && D > a)
          for (let O = a; O <= D - 1; O++) {
            let B = new v6([O], new Mlt(t, I[O]));
            if (L.errors === "all")
              if (S.issues) S.issues.push(B);
              else S.issues = [B];
            else return yield* bn(new XM(t, _, [B]));
          }
        if (S.issues) return yield* bn(new XM(t, _, S.issues));
        return Lo(S.output);
      });
    }
    rebuild(e, t, r) {
      let s = Gye(this.elements, e),
        a = Gye(this.rest, e);
      return s === this.elements && a === this.rest
        ? this
        : new jpe(this.isMutable, s, a, this.annotations, t, void 0, this.context, r);
    }
    recur(e) {
      return this.rebuild(e, this.checks, this.encodingChecks);
    }
    flip(e) {
      return this.rebuild(e, this.encodingChecks, this.checks);
    }
    getExpected() {
      return "array";
    }
  };
  GNs = F2e()({
    onItem(e, t, r) {
      let s = r < e.len ? Lo(t) : eH();
      return e.getParser(e.tailThreshold, r).parser(s, e.options);
    },
    step(e, t, r, s) {
      if (r._tag === "Failure") return vlt(e, e.ast, s, r);
      else if (r.value._tag === "Some") e.output[s] = r.value.value;
      else {
        let a = e.getParser(e.tailThreshold, s);
        if (h1(a.ast)) return;
        let H = new v6([s], new _Be(a.ast.context?.annotations));
        if (e.options.errors === "all")
          if (e.issues) e.issues.push(H);
          else e.issues = [H];
        else return WC(new XM(e.ast, e.oinput, [H]));
      }
    },
  });
  JNs = new globalThis.RegExp(`(?:${SBe}|Infinity|-Infinity|NaN)`);
  TBe = class TBe extends wv {
    _tag = "Objects";
    propertySignatures;
    indexSignatures;
    encodingChecks;
    constructor(e, t, r, s, a, H, u) {
      super(r, s, a, H);
      ((this.propertySignatures = e), (this.indexSignatures = t), (this.encodingChecks = u));
      let f = e.map((d) => d.name).filter((d, _, L) => L.indexOf(d) !== _);
      if (f.length > 0) throw Error(`Duplicate identifiers: ${JSON.stringify(f)}. ts(2300)`);
    }
    getParser(e) {
      let t = this,
        r = [],
        s = new Set(),
        a = [];
      for (let f of t.propertySignatures)
        (r.push(f.name), s.add(f.name), a.push({ ps: f, parser: e(f.type), name: f.name, type: f.type }));
      let H = t.indexSignatures.length;
      if (t.propertySignatures.length === 0 && t.indexSignatures.length === 0) return wie(t, rKt);
      let u =
        H > 0
          ? F2e()({
              onItem: mlt(function* (f, [d, _]) {
                let I = e(kan(_.parameter))(Lo(d), f.options),
                  D = NC(I) ? I : yield* _h(I);
                if (D._tag === "Failure") {
                  let B = vlt(f, t, d, D);
                  if (B) yield* B;
                  return;
                }
                let S = Lo(f.input[d]),
                  C = e(_.type)(S, f.options),
                  O = NC(C) ? C : yield* _h(C);
                if (O._tag === "Failure") {
                  let B = vlt(f, t, d, O);
                  if (B) yield* B;
                  return;
                } else if (D.value._tag === "Some" && O.value._tag === "Some") {
                  let B = D.value.value;
                  if (s.has(d) || s.has(B)) return;
                  let V = O.value.value;
                  if (_.merge && _.merge.decode && Object.hasOwn(f.out, B)) {
                    let [q, Z] = _.merge.decode.combine([B, f.out[B]], [B, V]);
                    Nye(f.out, q, Z);
                  } else Nye(f.out, B, V);
                }
              }),
              step: (f, d, _) => (_._tag === "Failure" ? _ : void 0),
            })
          : void 0;
      return mlt(function* (f, d) {
        if (f._tag === "None") return f;
        let _ = f.value;
        if (!(typeof _ === "object" && _ !== null && !Array.isArray(_))) return yield* bn(new OU(t, f));
        let L = {},
          I = { ast: t, oinput: f, input: _, out: L, issues: void 0, options: d },
          D = d.errors === "all",
          S = d.onExcessProperty === "error",
          T = d.onExcessProperty === "preserve",
          C;
        if (t.indexSignatures.length === 0 && (S || T)) {
          C = Reflect.ownKeys(_);
          for (let V = 0; V < C.length; V++) {
            let q = C[V];
            if (!s.has(q))
              if (S) {
                let Z = new v6([q], new Mlt(t, _[q]));
                if (D) {
                  if (I.issues) I.issues.push(Z);
                  else I.issues = [Z];
                  continue;
                } else return yield* bn(new XM(t, f, [Z]));
              } else Nye(L, q, _[q]);
          }
        }
        let O = XQt(d?.concurrency),
          B = KNs(I, a, O);
        if (B) yield* B;
        if (u) {
          let V = ZF();
          for (let Z = 0; Z < H; Z++) {
            let se = t.indexSignatures[Z],
              ae = Kye(_, se.parameter);
            for (let z = 0; z < ae.length; z++) {
              let Ae = ae[z];
              V.push([Ae, se]);
            }
          }
          let q = u(I, V, O);
          if (q) yield* q;
        }
        if (I.issues) return yield* bn(new XM(t, f, I.issues));
        if (d.propertyOrder === "original") {
          let V = (C ?? Reflect.ownKeys(_)).concat(r),
            q = {};
          for (let Z of V) if (Object.hasOwn(L, Z)) Nye(q, Z, L[Z]);
          return Lo(q);
        }
        return Lo(L);
      });
    }
    rebuild(e, t, r, s) {
      let a = Gye(this.propertySignatures, (u) => {
          let f = e(u.type);
          return f === u.type ? u : new Clt(u.name, f);
        }),
        H = Gye(this.indexSignatures, (u) => {
          let f = e(u.parameter),
            d = e(u.type),
            _ = t ? u.merge?.flip() : u.merge;
          return f === u.parameter && d === u.type && _ === u.merge ? u : new JQt(f, d, _);
        });
      return a === this.propertySignatures && H === this.indexSignatures
        ? this
        : new TBe(a, H, this.annotations, r, void 0, this.context, s);
    }
    flip(e) {
      return this.rebuild(e, !0, this.encodingChecks, this.checks);
    }
    recur(e) {
      return this.rebuild(e, !1, this.checks, this.encodingChecks);
    }
    getExpected() {
      if (this.propertySignatures.length === 0 && this.indexSignatures.length === 0) return "object | array";
      return "object";
    }
  };
  KNs = F2e()({
    onItem(e, t) {
      let r = Object.hasOwn(e.input, t.name) ? Lo(e.input[t.name]) : eH();
      return t.parser(r, e.options);
    },
    step(e, t, r) {
      if (r._tag === "Failure") return vlt(e, e.ast, t.name, r);
      else if (r.value._tag === "Some") Nye(e.out, t.name, r.value.value);
      else if (!h1(t.type)) {
        let s = new v6([t.name], new _Be(t.type.context?.annotations));
        if (e.options.errors === "all") {
          if (e.issues) e.issues.push(s);
          else e.issues = [s];
          return;
        } else return WC(new XM(e.ast, e.oinput, [s]));
      }
    },
  });
  Yon = new WeakMap();
  b6 = class b6 extends wv {
    _tag = "Union";
    types;
    mode;
    encodingChecks;
    constructor(e, t, r, s, a, H, u) {
      super(r, s, a, H);
      ((this.types = e), (this.mode = t), (this.encodingChecks = u));
    }
    getParser(e) {
      let t = this;
      return (r, s) => {
        if (r._tag === "None") return Jt(r);
        let a = r.value,
          H = Ult(a, t.types),
          u = {
            ast: t,
            recur: e,
            oinput: r,
            input: a,
            out: void 0,
            successes: [],
            issues: void 0,
            options: s,
          },
          f = XQt(s?.concurrency),
          d = YNs(u, H, f);
        if (!d) return u.out ? Jt(u.out) : bn(new xlt(t, a, u.issues ?? []));
        return Hi(d, (_) => (u.out ? Jt(u.out) : bn(new xlt(t, a, u.issues ?? []))));
      };
    }
    rebuild(e, t, r) {
      let s = Gye(this.types, e);
      return s === this.types ? this : new b6(s, this.mode, this.annotations, t, void 0, this.context, r);
    }
    recur(e) {
      return this.rebuild(e, this.checks, this.encodingChecks);
    }
    flip(e) {
      return this.rebuild(e, this.encodingChecks, this.checks);
    }
    getExpected(e) {
      let t = this.annotations?.expected;
      if (typeof t === "string") return t;
      if (this.types.length === 0) return "never";
      let r = this.types.map((s) => {
        let a = ME(s);
        switch (a._tag) {
          case "Arrays": {
            let H = a.elements.filter(qye);
            if (H.length > 0)
              return `${ean(a.isMutable)}[ ${H.map((u) => e(u) + tan(u.context?.isOptional)).join(", ")}, ... ]`;
            break;
          }
          case "Objects": {
            let H = a.propertySignatures.filter((u) => qye(u.type));
            if (H.length > 0)
              return `{ ${H.map((u) => `${ean(u.type.context?.isMutable)}${rye(u.name)}${tan(u.type.context?.isOptional)}: ${e(u.type)}`).join(", ")}, ... }`;
            break;
          }
        }
        return e(a);
      });
      return Array.from(new Set(r)).join(" | ");
    }
  };
  ((YNs = F2e()({
    onItem(e, t) {
      return e.recur(t)(e.oinput, e.options);
    },
    step(e, t, r) {
      if (r._tag === "Failure") {
        let s = pie(r.cause);
        if (xm(s)) return r;
        if (e.issues) e.issues.push(s.success);
        else e.issues = [s.success];
      } else {
        if (e.out && e.ast.mode === "oneOf")
          return (e.successes.push(t), WC(new OQt(e.ast, e.input, e.successes)));
        if (((e.out = r.value), e.successes.push(t), e.ast.mode === "anyOf")) return M$;
      }
    },
  })),
    (Dan = new b6([new eG("Infinity"), new eG("-Infinity"), new eG("NaN")], "anyOf")),
    (ZNs = new S$(
      new b6([GQt, Dan], "anyOf"),
      new Zg(
        Tlt(),
        Sm((e) => (globalThis.Number.isFinite(e) ? e : globalThis.String(e))),
      ),
    )));
  Flt = class Flt extends wv {
    _tag = "Suspend";
    thunk;
    constructor(e, t, r, s, a) {
      if (r !== void 0) throw Error("Cannot add checks to Suspend");
      super(t, void 0, s, a);
      this.thunk = Nlt(e);
    }
    getParser(e) {
      return e(this.thunk());
    }
    recur(e) {
      return new Flt(() => e(this.thunk()), this.annotations, void 0, void 0, this.context);
    }
    getExpected(e) {
      return e(this.thunk());
    }
  };
  blt = class blt extends Jfe {
    _tag = "Filter";
    run;
    annotations;
    aborted;
    constructor(e, t = void 0, r = !1) {
      super();
      ((this.run = e), (this.annotations = t), (this.aborted = r));
    }
    annotate(e) {
      return new blt(this.run, { ...this.annotations, ...e }, this.aborted);
    }
    abort() {
      return new blt(this.run, this.annotations, !0);
    }
    and(e, t) {
      return new yBe([this, e], t);
    }
  };
  yBe = class yBe extends Jfe {
    _tag = "FilterGroup";
    checks;
    annotations;
    constructor(e, t = void 0) {
      super();
      ((this.checks = e), (this.annotations = t));
    }
    annotate(e) {
      return new yBe(this.checks, { ...this.annotations, ...e });
    }
    and(e, t) {
      return new yBe([this, e], t);
    }
  };
  jBe = xan(Vlt);
  t9s = xan(YQt);
  ((Cie = _6((e) => {
    if (e.encoding) return Cie(x$(e, void 0));
    let t = e,
      r = t.recur?.(Cie) ?? t;
    if (zQt(r))
      return bBe(r, (s) => {
        s.encodingChecks.value = void 0;
      });
    return r;
  })),
    (ME = _6((e) => Cie(kQ(e)))));
  kQ = _6((e) => {
    if (e.encoding) return r9s(e, e.encoding);
    let t = e;
    return t.flip?.(kQ) ?? t.recur?.(kQ) ?? t;
  });
  n9s = _6((e) => new globalThis.RegExp(`^${Can(e, !0)}$`));
  ((kan = Yye((e) => {
    switch (e._tag) {
      default:
        return e;
      case "Number":
        return e.toCodecStringTree();
      case "Union":
        return e.recur(kan);
    }
  })),
    (ran = new globalThis.RegExp(`^${SBe}$`)));
  ((Uan = Qye(xBe, [Oan()])),
    (s9s = new S$(Uan, gBe)),
    (o9s = new S$(new b6([Uan, Dan], "anyOf"), gBe)),
    (nan = new globalThis.RegExp(`^${Nan}$`)));
  ((Ban = Qye(xBe, [Fan({ expected: "a string representing a bigint" })])),
    (a9s = new S$(Ban, RQt)),
    (qpH = new globalThis.RegExp(`^${H9s}$`)));
  ((tYt = ABe), (CBe = uBe), (Ran = Zsn));
  ((Xlt = new bpe([], () => (e, t) => (c9s(e) ? Jt(e) : bn(new OU(t, Lo(e)))), {
    typeConstructor: { _tag: "effect/Json" },
    generation: { runtime: "Schema.Json", Type: "Schema.Json" },
    expected: "JSON value",
    toCodecJson: () => new S$(MBe, Tpe()),
    toArbitrary: () => (e) => e.jsonValue(),
  })),
    (Wan = zye(Xlt, {
      typeConstructor: { _tag: "effect/MutableJson" },
      generation: { runtime: "Schema.MutableJson", Type: "Schema.MutableJson" },
    })),
    (Van = new S$(
      Jye,
      new Zg(
        QC(),
        Sm(() => null),
      ),
    )),
    (qan = new S$(Xlt, Tpe())));
  ((u9s = new bpe([], () => (e, t) => (A9s(e) ? Jt(e) : bn(new OU(t, Lo(e)))), {
    expected: "StringTree",
    toCodecStringTree: () => new S$(MBe, Tpe()),
  })),
    (Gan = new S$(u9s, Tpe())));
});