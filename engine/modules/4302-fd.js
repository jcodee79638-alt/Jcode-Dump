
var fd = Ie(function (G8) {
  Object.defineProperty(G8, "__esModule", { value: !0 });
  G8.or =
    G8.and =
    G8.not =
    G8.CodeGen =
    G8.operators =
    G8.varKinds =
    G8.ValueScopeName =
    G8.ValueScope =
    G8.Scope =
    G8.Name =
    G8.regexpCode =
    G8.stringify =
    G8.getProperty =
    G8.nil =
    G8.strConcat =
    G8.str =
    G8._ =
      void 0;
  var Kc = bXe(),
    FD = h1r(),
    OHe = bXe();
  Object.defineProperty(G8, "_", {
    enumerable: !0,
    get: function () {
      return OHe._;
    },
  });
  Object.defineProperty(G8, "str", {
    enumerable: !0,
    get: function () {
      return OHe.str;
    },
  });
  Object.defineProperty(G8, "strConcat", {
    enumerable: !0,
    get: function () {
      return OHe.strConcat;
    },
  });
  Object.defineProperty(G8, "nil", {
    enumerable: !0,
    get: function () {
      return OHe.nil;
    },
  });
  Object.defineProperty(G8, "getProperty", {
    enumerable: !0,
    get: function () {
      return OHe.getProperty;
    },
  });
  Object.defineProperty(G8, "stringify", {
    enumerable: !0,
    get: function () {
      return OHe.stringify;
    },
  });
  Object.defineProperty(G8, "regexpCode", {
    enumerable: !0,
    get: function () {
      return OHe.regexpCode;
    },
  });
  Object.defineProperty(G8, "Name", {
    enumerable: !0,
    get: function () {
      return OHe.Name;
    },
  });
  var Kvt = h1r();
  Object.defineProperty(G8, "Scope", {
    enumerable: !0,
    get: function () {
      return Kvt.Scope;
    },
  });
  Object.defineProperty(G8, "ValueScope", {
    enumerable: !0,
    get: function () {
      return Kvt.ValueScope;
    },
  });
  Object.defineProperty(G8, "ValueScopeName", {
    enumerable: !0,
    get: function () {
      return Kvt.ValueScopeName;
    },
  });
  Object.defineProperty(G8, "varKinds", {
    enumerable: !0,
    get: function () {
      return Kvt.varKinds;
    },
  });
  G8.operators = {
    GT: new Kc._Code(">"),
    GTE: new Kc._Code(">="),
    LT: new Kc._Code("<"),
    LTE: new Kc._Code("<="),
    EQ: new Kc._Code("==="),
    NEQ: new Kc._Code("!=="),
    NOT: new Kc._Code("!"),
    OR: new Kc._Code("||"),
    AND: new Kc._Code("&&"),
    ADD: new Kc._Code("+"),
  };
  class UHe {
    optimizeNodes() {
      return this;
    }
    optimizeNames(e, t) {
      return this;
    }
  }
  class xUi extends UHe {
    constructor(e, t, r) {
      super();
      ((this.varKind = e), (this.name = t), (this.rhs = r));
    }
    render({ es5: e, _n: t }) {
      let r = e ? FD.varKinds.var : this.varKind,
        s = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${r} ${this.name}${s};` + t;
    }
    optimizeNames(e, t) {
      if (!e[this.name.str]) return;
      if (this.rhs) this.rhs = jje(this.rhs, e, t);
      return this;
    }
    get names() {
      return this.rhs instanceof Kc._CodeOrName ? this.rhs.names : {};
    }
  }
  class g1r extends UHe {
    constructor(e, t, r) {
      super();
      ((this.lhs = e), (this.rhs = t), (this.sideEffects = r));
    }
    render({ _n: e }) {
      return `${this.lhs} = ${this.rhs};` + e;
    }
    optimizeNames(e, t) {
      if (this.lhs instanceof Kc.Name && !e[this.lhs.str] && !this.sideEffects) return;
      return ((this.rhs = jje(this.rhs, e, t)), this);
    }
    get names() {
      let e = this.lhs instanceof Kc.Name ? {} : { ...this.lhs.names };
      return Jvt(e, this.rhs);
    }
  }
  class SUi extends g1r {
    constructor(e, t, r, s) {
      super(e, r, s);
      this.op = t;
    }
    render({ _n: e }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + e;
    }
  }
  class TUi extends UHe {
    constructor(e) {
      super();
      ((this.label = e), (this.names = {}));
    }
    render({ _n: e }) {
      return `${this.label}:` + e;
    }
  }
  class vUi extends UHe {
    constructor(e) {
      super();
      ((this.label = e), (this.names = {}));
    }
    render({ _n: e }) {
      return `break${this.label ? ` ${this.label}` : ""};` + e;
    }
  }
  class bUi extends UHe {
    constructor(e) {
      super();
      this.error = e;
    }
    render({ _n: e }) {
      return `throw ${this.error};` + e;
    }
    get names() {
      return this.error.names;
    }
  }
  class jUi extends UHe {
    constructor(e) {
      super();
      this.code = e;
    }
    render({ _n: e }) {
      return `${this.code};` + e;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(e, t) {
      return ((this.code = jje(this.code, e, t)), this);
    }
    get names() {
      return this.code instanceof Kc._CodeOrName ? this.code.names : {};
    }
  }
  class zvt extends UHe {
    constructor(e = []) {
      super();
      this.nodes = e;
    }
    render(e) {
      return this.nodes.reduce((t, r) => t + r.render(e), "");
    }
    optimizeNodes() {
      let { nodes: e } = this,
        t = e.length;
      while (t--) {
        let r = e[t].optimizeNodes();
        if (Array.isArray(r)) e.splice(t, 1, ...r);
        else if (r) e[t] = r;
        else e.splice(t, 1);
      }
      return e.length > 0 ? this : void 0;
    }
    optimizeNames(e, t) {
      let { nodes: r } = this,
        s = r.length;
      while (s--) {
        let a = r[s];
        if (a.optimizeNames(e, t)) continue;
        (twa(e, a.names), r.splice(s, 1));
      }
      return r.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((e, t) => Jhe(e, t.names), {});
    }
  }
  class NHe extends zvt {
    render(e) {
      return "{" + e._n + super.render(e) + "}" + e._n;
    }
  }
  class PUi extends zvt {}
  class jXe extends NHe {}
  jXe.kind = "else";
  class pee extends NHe {
    constructor(e, t) {
      super(t);
      this.condition = e;
    }
    render(e) {
      let t = `if(${this.condition})` + super.render(e);
      if (this.else) t += "else " + this.else.render(e);
      return t;
    }
    optimizeNodes() {
      super.optimizeNodes();
      let e = this.condition;
      if (e === !0) return this.nodes;
      let t = this.else;
      if (t) {
        let r = t.optimizeNodes();
        t = this.else = Array.isArray(r) ? new jXe(r) : r;
      }
      if (t) {
        if (e === !1) return t instanceof pee ? t : t.nodes;
        if (this.nodes.length) return this;
        return new pee(UUi(e), t instanceof pee ? [t] : t.nodes);
      }
      if (e === !1 || !this.nodes.length) return;
      return this;
    }
    optimizeNames(e, t) {
      var r;
      if (
        ((this.else = (r = this.else) === null || r === void 0 ? void 0 : r.optimizeNames(e, t)),
        !(super.optimizeNames(e, t) || this.else))
      )
        return;
      return ((this.condition = jje(this.condition, e, t)), this);
    }
    get names() {
      let e = super.names;
      if ((Jvt(e, this.condition), this.else)) Jhe(e, this.else.names);
      return e;
    }
  }
  pee.kind = "if";
  class bje extends NHe {}
  bje.kind = "for";
  class CUi extends bje {
    constructor(e) {
      super();
      this.iteration = e;
    }
    render(e) {
      return `for(${this.iteration})` + super.render(e);
    }
    optimizeNames(e, t) {
      if (!super.optimizeNames(e, t)) return;
      return ((this.iteration = jje(this.iteration, e, t)), this);
    }
    get names() {
      return Jhe(super.names, this.iteration.names);
    }
  }
  class wUi extends bje {
    constructor(e, t, r, s) {
      super();
      ((this.varKind = e), (this.name = t), (this.from = r), (this.to = s));
    }
    render(e) {
      let t = e.es5 ? FD.varKinds.var : this.varKind,
        { name: r, from: s, to: a } = this;
      return `for(${t} ${r}=${s}; ${r}<${a}; ${r}++)` + super.render(e);
    }
    get names() {
      let e = Jvt(super.names, this.from);
      return Jvt(e, this.to);
    }
  }
  class L1r extends bje {
    constructor(e, t, r, s) {
      super();
      ((this.loop = e), (this.varKind = t), (this.name = r), (this.iterable = s));
    }
    render(e) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(e);
    }
    optimizeNames(e, t) {
      if (!super.optimizeNames(e, t)) return;
      return ((this.iterable = jje(this.iterable, e, t)), this);
    }
    get names() {
      return Jhe(super.names, this.iterable.names);
    }
  }
  class Vvt extends NHe {
    constructor(e, t, r) {
      super();
      ((this.name = e), (this.args = t), (this.async = r));
    }
    render(e) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(e);
    }
  }
  Vvt.kind = "func";
  class qvt extends zvt {
    render(e) {
      return "return " + super.render(e);
    }
  }
  qvt.kind = "return";
  class kUi extends NHe {
    render(e) {
      let t = "try" + super.render(e);
      if (this.catch) t += this.catch.render(e);
      if (this.finally) t += this.finally.render(e);
      return t;
    }
    optimizeNodes() {
      var e, t;
      return (
        super.optimizeNodes(),
        (e = this.catch) === null || e === void 0 || e.optimizeNodes(),
        (t = this.finally) === null || t === void 0 || t.optimizeNodes(),
        this
      );
    }
    optimizeNames(e, t) {
      var r, s;
      return (
        super.optimizeNames(e, t),
        (r = this.catch) === null || r === void 0 || r.optimizeNames(e, t),
        (s = this.finally) === null || s === void 0 || s.optimizeNames(e, t),
        this
      );
    }
    get names() {
      let e = super.names;
      if (this.catch) Jhe(e, this.catch.names);
      if (this.finally) Jhe(e, this.finally.names);
      return e;
    }
  }
  class Gvt extends NHe {
    constructor(e) {
      super();
      this.error = e;
    }
    render(e) {
      return `catch(${this.error})` + super.render(e);
    }
  }
  Gvt.kind = "catch";
  class Xvt extends NHe {
    render(e) {
      return "finally" + super.render(e);
    }
  }
  Xvt.kind = "finally";
  class OUi {
    constructor(e, t = {}) {
      ((this._values = {}),
        (this._blockStarts = []),
        (this._constants = {}),
        (this.opts = {
          ...t,
          _n: t.lines
            ? `
`
            : "",
        }),
        (this._extScope = e),
        (this._scope = new FD.Scope({ parent: e })),
        (this._nodes = [new PUi()]));
    }
    toString() {
      return this._root.render(this.opts);
    }
    name(e) {
      return this._scope.name(e);
    }
    scopeName(e) {
      return this._extScope.name(e);
    }
    scopeValue(e, t) {
      let r = this._extScope.value(e, t);
      return ((this._values[r.prefix] || (this._values[r.prefix] = new Set())).add(r), r);
    }
    getScopeValue(e, t) {
      return this._extScope.getValue(e, t);
    }
    scopeRefs(e) {
      return this._extScope.scopeRefs(e, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(e, t, r, s) {
      let a = this._scope.toName(t);
      if (r !== void 0 && s) this._constants[a.str] = r;
      return (this._leafNode(new xUi(e, a, r)), a);
    }
    const(e, t, r) {
      return this._def(FD.varKinds.const, e, t, r);
    }
    let(e, t, r) {
      return this._def(FD.varKinds.let, e, t, r);
    }
    var(e, t, r) {
      return this._def(FD.varKinds.var, e, t, r);
    }
    assign(e, t, r) {
      return this._leafNode(new g1r(e, t, r));
    }
    add(e, t) {
      return this._leafNode(new SUi(e, G8.operators.ADD, t));
    }
    code(e) {
      if (typeof e == "function") e();
      else if (e !== Kc.nil) this._leafNode(new jUi(e));
      return this;
    }
    object(...e) {
      let t = ["{"];
      for (let [r, s] of e) {
        if (t.length > 1) t.push(",");
        if ((t.push(r), r !== s || this.opts.es5)) (t.push(":"), Kc.addCodeArg(t, s));
      }
      return (t.push("}"), new Kc._Code(t));
    }
    if(e, t, r) {
      if ((this._blockNode(new pee(e)), t && r)) this.code(t).else().code(r).endIf();
      else if (t) this.code(t).endIf();
      else if (r) throw Error('CodeGen: "else" body without "then" body');
      return this;
    }
    elseIf(e) {
      return this._elseNode(new pee(e));
    }
    else() {
      return this._elseNode(new jXe());
    }
    endIf() {
      return this._endBlockNode(pee, jXe);
    }
    _for(e, t) {
      if ((this._blockNode(e), t)) this.code(t).endFor();
      return this;
    }
    for(e, t) {
      return this._for(new CUi(e), t);
    }
    forRange(e, t, r, s, a = this.opts.es5 ? FD.varKinds.var : FD.varKinds.let) {
      let H = this._scope.toName(e);
      return this._for(new wUi(a, H, t, r), () => s(H));
    }
    forOf(e, t, r, s = FD.varKinds.const) {
      let a = this._scope.toName(e);
      if (this.opts.es5) {
        let H = t instanceof Kc.Name ? t : this.var("_arr", t);
        return this.forRange("_i", 0, Kc._`${H}.length`, (u) => {
          (this.var(a, Kc._`${H}[${u}]`), r(a));
        });
      }
      return this._for(new L1r("of", s, a, t), () => r(a));
    }
    forIn(e, t, r, s = this.opts.es5 ? FD.varKinds.var : FD.varKinds.const) {
      if (this.opts.ownProperties) return this.forOf(e, Kc._`Object.keys(${t})`, r);
      let a = this._scope.toName(e);
      return this._for(new L1r("in", s, a, t), () => r(a));
    }
    endFor() {
      return this._endBlockNode(bje);
    }
    label(e) {
      return this._leafNode(new TUi(e));
    }
    break(e) {
      return this._leafNode(new vUi(e));
    }
    return(e) {
      let t = new qvt();
      if ((this._blockNode(t), this.code(e), t.nodes.length !== 1))
        throw Error('CodeGen: "return" should have one node');
      return this._endBlockNode(qvt);
    }
    try(e, t, r) {
      if (!t && !r) throw Error('CodeGen: "try" without "catch" and "finally"');
      let s = new kUi();
      if ((this._blockNode(s), this.code(e), t)) {
        let a = this.name("e");
        ((this._currNode = s.catch = new Gvt(a)), t(a));
      }
      if (r) ((this._currNode = s.finally = new Xvt()), this.code(r));
      return this._endBlockNode(Gvt, Xvt);
    }
    throw(e) {
      return this._leafNode(new bUi(e));
    }
    block(e, t) {
      if ((this._blockStarts.push(this._nodes.length), e)) this.code(e).endBlock(t);
      return this;
    }
    endBlock(e) {
      let t = this._blockStarts.pop();
      if (t === void 0) throw Error("CodeGen: not in self-balancing block");
      let r = this._nodes.length - t;
      if (r < 0 || (e !== void 0 && r !== e))
        throw Error(`CodeGen: wrong number of nodes: ${r} vs ${e} expected`);
      return ((this._nodes.length = t), this);
    }
    func(e, t = Kc.nil, r, s) {
      if ((this._blockNode(new Vvt(e, t, r)), s)) this.code(s).endFunc();
      return this;
    }
    endFunc() {
      return this._endBlockNode(Vvt);
    }
    optimize(e = 1) {
      while (e-- > 0)
        (this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants));
    }
    _leafNode(e) {
      return (this._currNode.nodes.push(e), this);
    }
    _blockNode(e) {
      (this._currNode.nodes.push(e), this._nodes.push(e));
    }
    _endBlockNode(e, t) {
      let r = this._currNode;
      if (r instanceof e || (t && r instanceof t)) return (this._nodes.pop(), this);
      throw Error(`CodeGen: not in block "${t ? `${e.kind}/${t.kind}` : e.kind}"`);
    }
    _elseNode(e) {
      let t = this._currNode;
      if (!(t instanceof pee)) throw Error('CodeGen: "else" without "if"');
      return ((this._currNode = t.else = e), this);
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      let e = this._nodes;
      return e[e.length - 1];
    }
    set _currNode(e) {
      let t = this._nodes;
      t[t.length - 1] = e;
    }
  }
  G8.CodeGen = OUi;
  function Jhe(e, t) {
    for (let r in t) e[r] = (e[r] || 0) + (t[r] || 0);
    return e;
  }
  function Jvt(e, t) {
    return t instanceof Kc._CodeOrName ? Jhe(e, t.names) : e;
  }
  function jje(e, t, r) {
    if (e instanceof Kc.Name) return s(e);
    if (!a(e)) return e;
    return new Kc._Code(
      e._items.reduce((H, u) => {
        if (u instanceof Kc.Name) u = s(u);
        if (u instanceof Kc._Code) H.push(...u._items);
        else H.push(u);
        return H;
      }, []),
    );
    function s(H) {
      let u = r[H.str];
      if (u === void 0 || t[H.str] !== 1) return H;
      return (delete t[H.str], u);
    }
    function a(H) {
      return (
        H instanceof Kc._Code &&
        H._items.some((u) => u instanceof Kc.Name && t[u.str] === 1 && r[u.str] !== void 0)
      );
    }
  }
  function twa(e, t) {
    for (let r in t) e[r] = (e[r] || 0) - (t[r] || 0);
  }
  function UUi(e) {
    return typeof e == "boolean" || typeof e == "number" || e === null ? !e : Kc._`!${$1r(e)}`;
  }
  G8.not = UUi;
  var rwa = NUi(G8.operators.AND);
  function nwa(...e) {
    return e.reduce(rwa);
  }
  G8.and = nwa;
  var iwa = NUi(G8.operators.OR);
  function swa(...e) {
    return e.reduce(iwa);
  }
  G8.or = swa;
  function NUi(e) {
    return (t, r) => (t === Kc.nil ? r : r === Kc.nil ? t : Kc._`${$1r(t)} ${e} ${$1r(r)}`);
  }
  function $1r(e) {
    return e instanceof Kc.Name ? e : Kc._`(${e})`;
  }
});