
class Mzi {
  scopes;
  invokeTool;
  toolKeys;
  logs;
  lastValue;
  callPermits;
  pendingSettlements = new Set();
  constructor(e, t, r = []) {
    let s = new Map();
    ((this.scopes = [s]),
      (this.invokeTool = e),
      (this.toolKeys = t),
      (this.logs = r),
      (this.lastValue = void 0),
      (this.callPermits = j6(szi)),
      s.set("tools", { mutable: !1, value: new oO([]) }),
      s.set("Promise", { mutable: !1, value: new s$e() }),
      s.set("undefined", { mutable: !1, value: void 0 }),
      s.set("Object", { mutable: !1, value: new Db("Object") }),
      s.set("Math", { mutable: !1, value: new Db("Math") }),
      s.set("JSON", { mutable: !1, value: new Db("JSON") }),
      s.set("Number", { mutable: !1, value: new yb("Number") }),
      s.set("String", { mutable: !1, value: new yb("String") }),
      s.set("Boolean", { mutable: !1, value: new yb("Boolean") }),
      s.set("Array", { mutable: !1, value: new Db("Array") }),
      s.set("console", { mutable: !1, value: new Db("console") }),
      s.set("parseInt", { mutable: !1, value: new yb("parseInt") }),
      s.set("parseFloat", { mutable: !1, value: new yb("parseFloat") }),
      s.set("Date", { mutable: !1, value: new Db("Date") }),
      s.set("RegExp", { mutable: !1, value: new Db("RegExp") }),
      s.set("Map", { mutable: !1, value: new Db("Map") }),
      s.set("Set", { mutable: !1, value: new Db("Set") }),
      s.set("URL", { mutable: !1, value: new Db("URL") }),
      s.set("URLSearchParams", { mutable: !1, value: new Db("URLSearchParams") }),
      s.set("encodeURI", { mutable: !1, value: new aO("encodeURI") }),
      s.set("encodeURIComponent", { mutable: !1, value: new aO("encodeURIComponent") }),
      s.set("decodeURI", { mutable: !1, value: new aO("decodeURI") }),
      s.set("decodeURIComponent", { mutable: !1, value: new aO("decodeURIComponent") }));
    for (let a of QCt) s.set(a, { mutable: !1, value: new o$e(a) });
    (s.set("NaN", { mutable: !1, value: NaN }), s.set("Infinity", { mutable: !1, value: 1 / 0 }));
  }
  run(e) {
    let t = this;
    return (
      this.pushScope(),
      ft(function* () {
        t.hoistFunctions(e.body);
        let r = void 0,
          s = !1;
        for (let a of e.body) {
          let H = yield* t.evaluateStatement(a);
          if (H.kind === "return") {
            ((r = H.value), (s = !0));
            break;
          }
          if (H.kind === "break" || H.kind === "continue")
            throw new is(`Unexpected '${H.kind}' outside of a loop.`, a);
          if (H.kind === "value") t.lastValue = H.value;
        }
        if (!s) r = t.lastValue;
        if (r instanceof Dx) r = yield* t.settlePromise(r);
        return (yield* t.drainPendingSettlements(), r);
      }).pipe(up(jn(() => t.popScope())))
    );
  }
  drainPendingSettlements() {
    let e = this;
    return ft(function* () {
      for (let t of [...e.pendingSettlements]) {
        let r = yield* e.observePromise(t);
        if (mh(r) || d1(r.cause)) continue;
        let s = OPr(hI(r.cause));
        throw new is(`Unhandled rejection from an un-awaited tool call: ${s.message}`, void 0, s.kind, [
          "Await tool calls - `const result = await tools.ns.tool(...)` - so failures can be caught and handled.",
        ]);
      }
    });
  }
  createToolCallPromise(e, t) {
    let r = this;
    return Vn(
      oBe(this.callPermits.withPermit(yH(() => r.invokeTool(e, t))), { startImmediately: !0 }),
      (s) => {
        let a = new Dx(s);
        return (r.pendingSettlements.add(a), a);
      },
    );
  }
  observePromise(e) {
    return (this.pendingSettlements.delete(e), e.fiber !== void 0 ? Cpe(e.fiber) : _h(e.immediate ?? ti));
  }
  settlePromise(e, t) {
    let r = this;
    return Hi(this.observePromise(e), (s) => r.unwrapPromiseExit(e, s, t));
  }
  unwrapPromiseExit(e, t, r) {
    if (mh(t)) return Jt(t.value);
    if (e?.interrupted === !0 && d1(t.cause))
      return bn(
        new is("This tool call was interrupted because another value settled a Promise.race first.", r),
      );
    return NL(t.cause);
  }
  evaluateStatement(e) {
    switch (e.type) {
      case "ExpressionStatement":
        return Vn(this.evaluateExpression(_u(e, "expression")), (t) => ({ kind: "value", value: t }));
      case "VariableDeclaration":
        return Vn(this.evaluateVariableDeclaration(e), () => ({ kind: "none" }));
      case "ReturnStatement": {
        let t = u9(e, "argument");
        return t
          ? Vn(this.evaluateExpression(t), (r) => ({ kind: "return", value: r }))
          : Jt({ kind: "return", value: void 0 });
      }
      case "BlockStatement":
        return this.evaluateBlock(e);
      case "IfStatement":
        return this.evaluateIfStatement(e);
      case "SwitchStatement":
        return this.evaluateSwitchStatement(e);
      case "WhileStatement":
        return this.evaluateWhileStatement(e);
      case "DoWhileStatement":
        return this.evaluateDoWhileStatement(e);
      case "ForStatement":
        return this.evaluateForStatement(e);
      case "ForOfStatement":
        return this.evaluateForOfStatement(e);
      case "ForInStatement":
        return this.evaluateForInStatement(e);
      case "BreakStatement":
        return Jt(this.evaluateBreakStatement(e));
      case "ContinueStatement":
        return Jt(this.evaluateContinueStatement(e));
      case "ThrowStatement":
        return this.evaluateThrowStatement(e);
      case "TryStatement":
        return this.evaluateTryStatement(e);
      case "EmptyStatement":
        return Jt({ kind: "none" });
      case "FunctionDeclaration":
        return Jt({ kind: "none" });
      default:
        throw IQe(e.type, e);
    }
  }
  evaluateBlock(e) {
    this.pushScope();
    let t = this;
    return ft(function* () {
      let r = vT(e, "body");
      t.hoistFunctions(r);
      for (let s of r) {
        let a = eM(s, "body"),
          H = yield* t.evaluateStatement(a);
        if (H.kind === "value") {
          t.lastValue = H.value;
          continue;
        }
        if (H.kind !== "none") return H;
      }
      return { kind: "none" };
    }).pipe(up(jn(() => t.popScope())));
  }
  createFunction(e) {
    if (e.generator === !0)
      throw new is("Generator functions are not supported in CodeMode.", e, "UnsupportedSyntax", [Zee]);
    return new A9(
      vT(e, "params").map((t, r) => eM(t, `params[${r}]`)),
      _u(e, "body"),
      this.scopes.slice(),
    );
  }
  hoistFunctions(e) {
    for (let t of e) {
      if (!mwe(t) || t.type !== "FunctionDeclaration") continue;
      let r = t;
      this.declare(A0(_u(r, "id"), "name"), this.createFunction(r), !0, r);
    }
  }
  evaluateIfStatement(e) {
    let t = _u(e, "test"),
      r = _u(e, "consequent"),
      s = u9(e, "alternate");
    return Hi(this.evaluateExpression(t), (a) =>
      a ? this.evaluateStatement(r) : s ? this.evaluateStatement(s) : Jt({ kind: "none" }),
    );
  }
  evaluateSwitchStatement(e) {
    let t = this;
    return (
      this.pushScope(),
      ft(function* () {
        let r = yield* t.evaluateExpression(_u(e, "discriminant"));
        if (rAe(r))
          throw new is("Switch discriminants must be data values in CodeMode.", e, "InvalidDataValue");
        let s = vT(e, "cases").map((f, d) => eM(f, `cases[${d}]`)),
          a,
          H;
        for (let [f, d] of s.entries()) {
          let _ = u9(d, "test");
          if (!_) {
            a = f;
            continue;
          }
          let L = yield* t.evaluateExpression(_);
          if (rAe(L))
            throw new is("Switch case values must be data values in CodeMode.", _, "InvalidDataValue");
          if (L === r) {
            H = f;
            break;
          }
        }
        let u = H ?? a;
        if (u === void 0) return { kind: "none" };
        for (let f = u; f < s.length; f += 1)
          for (let d of vT(s[f], "consequent")) {
            let _ = yield* t.evaluateStatement(eM(d, "consequent"));
            if (_.kind === "break") return { kind: "none" };
            if (_.kind === "return" || _.kind === "continue") return _;
            if (_.kind === "value") t.lastValue = _.value;
          }
        return { kind: "none" };
      }).pipe(up(jn(() => t.popScope())))
    );
  }
  evaluateWhileStatement(e) {
    let t = _u(e, "test"),
      r = _u(e, "body"),
      s = this;
    return ft(function* () {
      while (yield* s.evaluateExpression(t)) {
        let a = yield* s.evaluateStatement(r);
        if (a.kind === "continue") continue;
        if (a.kind === "break") return { kind: "none" };
        if (a.kind === "return") return a;
        if (a.kind === "value") s.lastValue = a.value;
      }
      return { kind: "none" };
    });
  }
  evaluateDoWhileStatement(e) {
    let t = _u(e, "body"),
      r = _u(e, "test"),
      s = this;
    return ft(function* () {
      do {
        let a = yield* s.evaluateStatement(t);
        if (a.kind === "continue") continue;
        if (a.kind === "break") return { kind: "none" };
        if (a.kind === "return") return a;
        if (a.kind === "value") s.lastValue = a.value;
      } while (yield* s.evaluateExpression(r));
      return { kind: "none" };
    });
  }
  evaluateForStatement(e) {
    this.pushScope();
    let t = this;
    return ft(function* () {
      let r = u9(e, "init"),
        s = u9(e, "test"),
        a = u9(e, "update"),
        H = _u(e, "body");
      if (r)
        if (r.type === "VariableDeclaration") yield* t.evaluateVariableDeclaration(r);
        else yield* t.evaluateExpression(r);
      let u =
        r?.type === "VariableDeclaration" && A0(r, "kind") !== "var"
          ? Array.from(t.currentScope().keys())
          : [];
      while (s ? yield* t.evaluateExpression(s) : !0) {
        let f;
        if (u.length > 0)
          ((f = new Map(
            u.map((_) => {
              let L = t.currentScope().get(_);
              return [_, { ...L }];
            }),
          )),
            t.scopes.push(f));
        let d = yield* t.evaluateStatement(H).pipe(
          up(
            jn(() => {
              if (f) t.popScope();
            }),
          ),
        );
        if (d.kind === "return") return d;
        if (d.kind === "break") return { kind: "none" };
        if (d.kind === "value") t.lastValue = d.value;
        if (f) {
          let _ = t.currentScope();
          for (let L of u) _.set(L, { ...f.get(L) });
        }
        if (a) yield* t.evaluateExpression(a);
        if (d.kind === "continue") continue;
      }
      return { kind: "none" };
    }).pipe(up(jn(() => t.popScope())));
  }
  evaluateForOfStatement(e) {
    if (_we(e, "await")) throw new is("for await...of is not supported.", e);
    let t = this;
    return ft(function* () {
      let r = _u(e, "left"),
        s = yield* t.evaluateExpression(_u(e, "right")),
        a = _u(e, "body"),
        H = Array.isArray(s) ? s : DQe(s);
      if (H === void 0) throw new is("for...of requires an array, string, Map, or Set value in CodeMode.", e);
      let u, f;
      if (r.type === "VariableDeclaration") {
        let d = vT(r, "declarations");
        if (d.length !== 1) throw new is("for...of supports one declared binding.", r);
        let _ = eM(d[0], "declarations[0]");
        u = { pattern: _u(_, "id"), mutable: A0(r, "kind") !== "const" };
      } else if (r.type === "Identifier") f = A0(r, "name");
      else throw new is("Unsupported for...of binding.", r);
      for (let d of H) {
        if (u) (t.pushScope(), yield* t.declarePattern(u.pattern, d, u.mutable, r));
        else if (f) t.setIdentifierValue(f, d, r);
        let _ = yield* t.evaluateStatement(a).pipe(
          up(
            jn(() => {
              if (u) t.popScope();
            }),
          ),
        );
        if (_.kind === "return") return _;
        if (_.kind === "break") return { kind: "none" };
        if (_.kind === "value") t.lastValue = _.value;
        if (_.kind === "continue") continue;
      }
      return { kind: "none" };
    });
  }
  enumerableKeys(e) {
    if (e instanceof oO) return [...this.toolKeys(e.path)];
    if (Array.isArray(e)) return Object.keys(e);
    if (e !== null && typeof e === "object" && !tAe(e)) return Object.keys(e);
    return;
  }
  evaluateForInStatement(e) {
    let t = this;
    return ft(function* () {
      let r = _u(e, "left"),
        s = yield* t.evaluateExpression(_u(e, "right")),
        a = _u(e, "body"),
        H = t.enumerableKeys(s);
      if (H === void 0)
        throw new is(
          "for...in requires a plain object, array, or tools reference in CodeMode. Use for...of for arrays/strings/Maps/Sets, or Object.keys(value) for a key list.",
          e,
        );
      let u, f;
      if (r.type === "VariableDeclaration") {
        let d = vT(r, "declarations");
        if (d.length !== 1) throw new is("for...in supports one declared binding.", r);
        let _ = eM(d[0], "declarations[0]");
        u = { pattern: _u(_, "id"), mutable: A0(r, "kind") !== "const" };
      } else if (r.type === "Identifier") f = A0(r, "name");
      else throw new is("Unsupported for...in binding.", r);
      for (let d of H) {
        if (u) (t.pushScope(), yield* t.declarePattern(u.pattern, d, u.mutable, r));
        else if (f) t.setIdentifierValue(f, d, r);
        let _ = yield* t.evaluateStatement(a).pipe(
          up(
            jn(() => {
              if (u) t.popScope();
            }),
          ),
        );
        if (_.kind === "return") return _;
        if (_.kind === "break") return { kind: "none" };
        if (_.kind === "value") t.lastValue = _.value;
        if (_.kind === "continue") continue;
      }
      return { kind: "none" };
    });
  }
  evaluateBreakStatement(e) {
    if (u9(e, "label")) throw new is("Labeled break is not supported in v1.", e);
    return { kind: "break" };
  }
  evaluateContinueStatement(e) {
    if (u9(e, "label")) throw new is("Labeled continue is not supported in v1.", e);
    return { kind: "continue" };
  }
  evaluateThrowStatement(e) {
    let t = _u(e, "argument");
    return Hi(this.evaluateExpression(t), (r) => bn(new dwe(r)));
  }
  evaluateTryStatement(e) {
    let t = _u(e, "block"),
      r = u9(e, "handler"),
      s = u9(e, "finalizer"),
      a = this,
      H = XC(this.evaluateStatement(t), {
        onFailure: (f) => {
          if (f.reasons.some(Cin) || !r) return NL(f);
          let d = Izi(hI(f)),
            _ = u9(r, "param");
          return (
            a.pushScope(),
            ft(function* () {
              if (_) yield* a.declarePattern(_, d, !0, r);
              return yield* a.evaluateStatement(_u(r, "body"));
            }).pipe(up(jn(() => a.popScope())))
          );
        },
        onSuccess: Jt,
      });
    if (!s) return H;
    let u = (f) => f.kind === "return" || f.kind === "break" || f.kind === "continue";
    return XC(H, {
      onFailure: (f) =>
        f.reasons.some(Cin) ? NL(f) : Hi(this.evaluateStatement(s), (d) => (u(d) ? Jt(d) : NL(f))),
      onSuccess: (f) => Hi(this.evaluateStatement(s), (d) => (u(d) ? Jt(d) : Jt(f))),
    });
  }
  evaluateVariableDeclaration(e) {
    let t = A0(e, "kind"),
      r = vT(e, "declarations"),
      s = this;
    return ft(function* () {
      for (let a of r) {
        let H = eM(a, "declarations");
        if (H.type !== "VariableDeclarator") throw new is("Unsupported variable declaration shape.", H);
        let u = u9(H, "init"),
          f = u ? yield* s.evaluateExpression(u) : void 0;
        yield* s.declarePattern(_u(H, "id"), f, t !== "const", H);
      }
    });
  }
  declarePattern(e, t, r, s) {
    let a = this;
    return ft(function* () {
      if (e.type === "Identifier") {
        a.declare(A0(e, "name"), t, r, s);
        return;
      }
      if (e.type === "AssignmentPattern") {
        let H = t === void 0 ? yield* a.evaluateExpression(_u(e, "right")) : t;
        yield* a.declarePattern(_u(e, "left"), H, r, s);
        return;
      }
      if (e.type === "ObjectPattern") {
        if (t === null || typeof t !== "object" || Array.isArray(t) || tAe(t))
          throw new is("Object destructuring requires a data object value.", e, "InvalidDataValue");
        let H = new Set();
        for (let u of vT(e, "properties")) {
          let f = eM(u, "properties");
          if (f.type === "RestElement") {
            let L = Object.create(null);
            for (let [I, D] of Object.entries(t)) if (!H.has(I) && !TT(I)) L[I] = D;
            yield* a.declarePattern(_u(f, "argument"), L, r, f);
            continue;
          }
          if (f.type !== "Property" || _we(f, "computed") || A0(f, "kind") !== "init")
            throw new is("Only named object destructuring properties are supported.", f);
          let d = _u(f, "key"),
            _ = d.type === "Identifier" ? A0(d, "name") : String(d.value);
          if (TT(_)) throw new is(`Property '${_}' is not available in CodeMode.`, d);
          (H.add(_), yield* a.declarePattern(_u(f, "value"), t[_], r, f));
        }
        return;
      }
      if (e.type === "ArrayPattern") {
        if (!Array.isArray(t)) throw new is("Array destructuring requires an array value.", e);
        for (let [H, u] of vT(e, "elements").entries()) {
          if (u === null) continue;
          let f = eM(u, `elements[${H}]`);
          if (f.type === "RestElement") {
            yield* a.declarePattern(_u(f, "argument"), t.slice(H), r, f);
            break;
          }
          yield* a.declarePattern(f, t[H], r, e);
        }
        return;
      }
      throw new is(`Unsupported binding pattern '${e.type}'.`, e);
    });
  }
  evaluateExpression(e) {
    switch (e.type) {
      case "Literal": {
        let t = e.regex;
        if (mwe(t) && typeof t.pattern === "string")
          return jn(() => this.constructRegExp([t.pattern, typeof t.flags === "string" ? t.flags : ""], e));
        return jn(() => q$(e.value, "Literal"));
      }
      case "Identifier":
        return jn(() => this.getIdentifierValue(A0(e, "name"), e));
      case "BinaryExpression":
        return this.evaluateBinaryExpression(e);
      case "LogicalExpression":
        return this.evaluateLogicalExpression(e);
      case "UnaryExpression":
        return this.evaluateUnaryExpression(e);
      case "AssignmentExpression":
        return this.evaluateAssignmentExpression(e);
      case "CallExpression":
        return this.evaluateCallExpression(e);
      case "ArrowFunctionExpression":
      case "FunctionExpression":
        return jn(() => this.createFunction(e));
      case "MemberExpression":
        return this.readMember(e);
      case "ChainExpression":
        return Vn(this.evaluateExpression(_u(e, "expression")), (t) => (t === k7 ? void 0 : t));
      case "ObjectExpression":
        return this.evaluateObjectExpression(e);
      case "ArrayExpression":
        return this.evaluateArrayExpression(e);
      case "TemplateLiteral":
        return this.evaluateTemplateLiteral(e);
      case "ConditionalExpression":
        return this.evaluateConditionalExpression(e);
      case "UpdateExpression":
        return this.evaluateUpdateExpression(e);
      case "AwaitExpression": {
        let t = this;
        return Hi(this.evaluateExpression(_u(e, "argument")), (r) =>
          r instanceof Dx ? t.settlePromise(r, e) : Jt(r),
        );
      }
      case "NewExpression":
        return this.evaluateNewExpression(e);
      default:
        throw IQe(e.type, e);
    }
  }
  evaluateNewExpression(e) {
    let t = _u(e, "callee");
    if (t.type !== "Identifier") throw IQe("NewExpression", e);
    let r = A0(t, "name"),
      s = vT(e, "arguments"),
      a = this;
    if (r === "Promise")
      throw new is(
        "new Promise(...) is not supported in CodeMode; tool calls already return promises - call the tool and await the result.",
        e,
        "UnsupportedSyntax",
        [Zee],
      );
    if (QCt.has(r))
      return ft(function* () {
        let H = s.length > 0 ? yield* a.evaluateExpression(eM(s[0], "arguments[0]")) : void 0;
        return yQe(r, H === void 0 ? "" : vd(H));
      });
    if (kKi.has(r))
      return ft(function* () {
        let H = yield* a.evaluateCallArguments(s);
        switch (r) {
          case "Date":
            return a.constructDate(H);
          case "RegExp":
            return a.constructRegExp(H, e);
          case "Map":
            return a.constructMap(H[0], e);
          case "Set":
            return a.constructSet(H[0], e);
          case "URL":
            return a.constructURL(H, e);
          default:
            return a.constructURLSearchParams(H[0], e);
        }
      });
    throw IQe("NewExpression", e);
  }
  constructDate(e) {
    if (e.length === 0) return new wI(Date.now());
    if (e.length === 1) {
      let r = e[0];
      if (r instanceof wI) return new wI(r.time);
      if (typeof r === "number") return new wI(new Date(r).getTime());
      if (typeof r === "string") return new wI(Date.parse(r));
      return new wI(Number.NaN);
    }
    let t = e.map((r) => a$e(r));
    return new wI(new Date(...t).getTime());
  }
  constructRegExp(e, t) {
    let r = e[0],
      s = r instanceof qy ? r.regex.source : r === void 0 ? "" : vd(r),
      a = e[1];
    if (a !== void 0 && typeof a !== "string")
      throw new is(
        `RegExp flags must be a string of flag characters (e.g. "g", "gi"), not ${a === null ? "null" : typeof a}.`,
        t,
      );
    let H = a ?? (r instanceof qy ? r.regex.flags : "");
    try {
      return new qy(s, H);
    } catch (u) {
      let f = kPr(u);
      throw new is(
        /flag/i.test(f)
          ? `new RegExp(...) received invalid flags ${JSON.stringify(H)} (${f}). Valid flags are d, g, i, m, s, u, v, and y.`
          : `new RegExp(...) received ${JSON.stringify(s)}, which is not a valid regular expression pattern (${f}). ${czi}`,
        t,
      ).as("SyntaxError");
    }
  }
  constructMap(e, t) {
    let r = new Gy();
    if (e === void 0 || e === null) return r;
    let s = Array.isArray(e) ? e : e instanceof Gy ? Array.from(e.map.entries(), ([a, H]) => [a, H]) : void 0;
    if (s === void 0)
      throw new is("new Map(...) expects an array of [key, value] pairs, a Map, or no argument.", t);
    for (let a of s) {
      if (!Array.isArray(a)) throw new is("new Map(...) expects [key, value] pairs.", t);
      r.map.set(a[0], a[1]);
    }
    return r;
  }
  constructSet(e, t) {
    let r = new ST();
    if (e === void 0 || e === null) return r;
    let s = Array.isArray(e)
      ? e
      : e instanceof ST
        ? Array.from(e.set.values())
        : typeof e === "string"
          ? Array.from(e)
          : void 0;
    if (s === void 0) throw new is("new Set(...) expects an array, Set, string, or no argument.", t);
    for (let a of s) r.set.add(a);
    return r;
  }
  constructURL(e, t) {
    if (e.length === 0)
      throw new is("new URL(...) requires a URL string and an optional base URL.", t).as("TypeError");
    let r = MQe(e[0], "new URL input"),
      s = e[1] === void 0 ? void 0 : MQe(e[1], "new URL base");
    try {
      return new Z1(new URL(r, s));
    } catch {
      throw new is(`new URL(...) received an invalid URL${s === void 0 ? "" : " or base URL"}.`, t).as(
        "TypeError",
      );
    }
  }
  constructURLSearchParams(e, t) {
    if (e === void 0) return new Sg(new URLSearchParams());
    if (e instanceof Sg) return new Sg(new URLSearchParams(e.params));
    if (typeof e === "string") return new Sg(new URLSearchParams(e));
    if (e === null || typeof e === "number" || typeof e === "boolean")
      return new Sg(new URLSearchParams(vd(e)));
    if (e instanceof Gy)
      return this.constructURLSearchParams(
        Array.from(e.map.entries(), ([s, a]) => [s, a]),
        t,
      );
    if (Array.isArray(e)) {
      let s = e.map((a) => {
        if (!Array.isArray(a) || a.length !== 2)
          throw new is("new URLSearchParams(...) expects an array of [name, value] pairs.", t).as(
            "TypeError",
          );
        return [c$e(a[0], "URLSearchParams name"), c$e(a[1], "URLSearchParams value")];
      });
      return new Sg(new URLSearchParams(s));
    }
    if (sO(e)) return new Sg(new URLSearchParams());
    let r = q$(e, "new URLSearchParams input");
    if (r === null || typeof r !== "object")
      throw new is(
        "new URLSearchParams(...) expects a query string, data object, array of pairs, or URLSearchParams.",
        t,
      ).as("TypeError");
    return new Sg(new URLSearchParams(Object.fromEntries(Object.entries(r).map(([s, a]) => [s, vd(a)]))));
  }
  evaluateBinaryExpression(e) {
    let t = A0(e, "operator"),
      r = this;
    return ft(function* () {
      let s = yield* r.evaluateExpression(_u(e, "left")),
        a = yield* r.evaluateExpression(_u(e, "right"));
      if (t === "instanceof") return mQa(s, a, e);
      return q$(r.applyBinaryOperator(t, s, a, e), "Binary expression result");
    });
  }
  applyBinaryOperator(e, t, r, s) {
    if (rAe(t) || rAe(r))
      throw new is("Binary operators require data values in CodeMode.", s, "InvalidDataValue");
    let a = (d) => {
        if (d instanceof wI) return e === "+" ? vd(d) : d.time;
        return d !== null && typeof d === "object" ? vd(d) : d;
      },
      H = t !== null && typeof t === "object" && r !== null && typeof r === "object",
      u = a(t),
      f = a(r);
    switch (e) {
      case "+":
        return u + f;
      case "-":
        return u - f;
      case "*":
        return u * f;
      case "/":
        return u / f;
      case "%":
        return u % f;
      case "**":
        return u ** f;
      case "==":
        return H ? t === r : u == f;
      case "===":
        return t === r;
      case "!=":
        return H ? t !== r : u != f;
      case "!==":
        return t !== r;
      case "<":
        return u < f;
      case "<=":
        return u <= f;
      case ">":
        return u > f;
      case ">=":
        return u >= f;
      case "&":
        return u & f;
      case "|":
        return u | f;
      case "^":
        return u ^ f;
      case "<<":
        return u << f;
      case ">>":
        return u >> f;
      case ">>>":
        return u >>> f;
      case "in":
        if (r === null || typeof r !== "object")
          throw new is("The 'in' operator requires a data object on the right-hand side.", s);
        return Object.hasOwn(r, a(t));
      default:
        throw new is(`Unsupported binary operator '${e}'.`, s);
    }
  }
  evaluateLogicalExpression(e) {
    let t = A0(e, "operator");
    return Hi(this.evaluateExpression(_u(e, "left")), (r) => {
      if (t === "&&") return r ? this.evaluateExpression(_u(e, "right")) : Jt(r);
      if (t === "||") return r ? Jt(r) : this.evaluateExpression(_u(e, "right"));
      if (t === "??") return r !== null && r !== void 0 ? Jt(r) : this.evaluateExpression(_u(e, "right"));
      throw new is(`Unsupported logical operator '${t}'.`, e);
    });
  }
  evaluateUnaryExpression(e) {
    let t = A0(e, "operator"),
      r = _u(e, "argument");
    if (t === "typeof" && r.type === "Identifier" && !this.resolveBinding(A0(r, "name")))
      return Jt("undefined");
    return Vn(this.evaluateExpression(r), (s) => {
      if (t === "typeof") return yzi(s);
      if (t === "!") return !s;
      if (rAe(s)) throw new is("Unary operators require data values in CodeMode.", e, "InvalidDataValue");
      let a = s instanceof wI ? s.time : s !== null && typeof s === "object" ? vd(s) : s,
        H;
      switch (t) {
        case "+":
          H = +a;
          break;
        case "-":
          H = -a;
          break;
        case "~":
          H = ~a;
          break;
        default:
          throw new is(`Unsupported unary operator '${t}'.`, e);
      }
      return q$(H, "Unary expression result");
    });
  }
  evaluateAssignmentExpression(e) {
    let t = _u(e, "left"),
      r = A0(e, "operator"),
      s = this;
    return ft(function* () {
      if (r === "??=" || r === "||=" || r === "&&=") return yield* s.evaluateLogicalAssignment(e, t, r);
      let a = yield* s.evaluateExpression(_u(e, "right"));
      if (t.type === "Identifier") {
        let H = A0(t, "name");
        if (r === "=") return s.setIdentifierValue(H, a, t);
        let u = q$(s.applyCompoundAssignment(r, s.getIdentifierValue(H, t), a, e), "Assignment result");
        return s.setIdentifierValue(H, u, t);
      }
      if (t.type === "MemberExpression") {
        if (r === "=") return yield* s.writeMember(t, a);
        return yield* s.modifyMember(t, (H) => {
          let u = q$(s.applyCompoundAssignment(r, H, a, e), "Assignment result");
          return Jt({ write: !0, next: u, result: u });
        });
      }
      throw new is("Assignment target must be an Identifier or MemberExpression.", t);
    });
  }
  evaluateLogicalAssignment(e, t, r) {
    let s = this,
      a = (H) => (r === "??=" ? H === null || H === void 0 : r === "||=" ? !H : Boolean(H));
    if (t.type === "Identifier") {
      let H = A0(t, "name");
      return ft(function* () {
        let u = s.getIdentifierValue(H, t);
        if (!a(u)) return u;
        let f = yield* s.evaluateExpression(_u(e, "right"));
        return s.setIdentifierValue(H, f, t);
      });
    }
    if (t.type === "MemberExpression")
      return s.modifyMember(t, (H) =>
        a(H)
          ? Vn(s.evaluateExpression(_u(e, "right")), (u) => ({ write: !0, next: u, result: u }))
          : Jt({ write: !1, next: H, result: H }),
      );
    throw new is("Assignment target must be an Identifier or MemberExpression.", t);
  }
  evaluateUpdateExpression(e) {
    let t = A0(e, "operator"),
      r = _u(e, "argument"),
      s = _we(e, "prefix"),
      a = t === "++" ? 1 : t === "--" ? -1 : void 0;
    if (a === void 0) throw new is(`Unsupported update operator '${t}'.`, e);
    if (r.type === "Identifier")
      return jn(() => {
        let H = A0(r, "name"),
          u = Number(this.getIdentifierValue(H, r)),
          f = u + a;
        return (this.setIdentifierValue(H, f, r), s ? f : u);
      });
    if (r.type === "MemberExpression")
      return this.modifyMember(r, (H) => {
        let u = Number(H),
          f = u + a;
        return Jt({ write: !0, next: f, result: s ? f : u });
      });
    throw new is("Update target must be an Identifier or MemberExpression.", r);
  }
  evaluateCallExpression(e) {
    let t = _u(e, "callee"),
      r = vT(e, "arguments"),
      s = this;
    return ft(function* () {
      let a = yield* s.evaluateExpression(t);
      if (a === k7) return k7;
      if ((a === null || a === void 0) && e.optional === !0) return k7;
      let H = yield* s.evaluateCallArguments(r);
      if (a instanceof oO) {
        if (a.path.length === 0) throw new is("The tools root is not callable.", t);
        return yield* s.createToolCallPromise(a.path, H);
      }
      if (a instanceof eAe) return yield* s.invokePromiseMethod(a, H, e);
      if (a instanceof A9) return yield* s.invokeFunction(a, H);
      if (a instanceof OP) return yield* s.invokeIntrinsic(a, H, e);
      if (a instanceof yJ) {
        if (a.namespace === "console") return s.invokeConsole(a.name, H, e);
        if (a.namespace === "Object" && H[0] instanceof oO)
          return s.invokeObjectMethodOnTools(a.name, H[0], e);
        return q$(LQa(a, H, e), `${a.namespace}.${a.name} result`);
      }
      if (a instanceof yb) return q$(YCt(a, H, e), `${a.name} result`);
      if (a instanceof aO) return twt(a, H, e);
      if (a instanceof o$e) return yQe(a.name, H[0] === void 0 ? "" : vd(H[0]));
      throw new is("Only tools are callable in CodeMode.", t);
    });
  }
  invokeObjectMethodOnTools(e, t, r) {
    if (e === "keys") return q$(this.enumerableKeys(t), "Object.keys result");
    throw new is(
      `Object.${e}(...) cannot read tool references: they are not plain data. Use Object.keys(tools) for names, or tools.$codemode.search({ query }) for signatures.`,
      r,
      "InvalidDataValue",
    );
  }
  invokeConsole(e, t, r) {
    if (!PKi.has(e)) throw new is(`console.${e} is not available in CodeMode.`, r);
    this.logs.push(rwt(this.formatConsoleMessage(e, t, r)));
    return;
  }
  formatConsoleMessage(e, t, r) {
    if (e === "dir") return t.length === 0 ? "undefined" : this.formatConsoleArgument(t[0]);
    if (e === "table") return this.formatConsoleTable(t[0], t[1], r);
    return `${e === "warn" ? "[warn] " : e === "error" ? "[error] " : e === "debug" ? "[debug] " : ""}${t.map((a) => this.formatConsoleArgument(a)).join(" ")}`;
  }
  formatConsoleArgument(e) {
    if (e === void 0) return "undefined";
    if (typeof e === "string") return e;
    return this.formatConsoleValue(e, new Set(), 0);
  }
  formatConsoleValue(e, t, r) {
    if (e === null || e === void 0) return "null";
    if (typeof e === "string") return JSON.stringify(e);
    if (typeof e === "number" || typeof e === "boolean") return String(e);
    if (typeof e !== "object") return String(e);
    if (e instanceof Dx) return "[Promise (await it to get its value)]";
    if (e instanceof wI) return vd(e);
    if (e instanceof qy) return vd(e);
    if (e instanceof Z1) return vd(e);
    if (e instanceof Sg) return vd(e);
    if (r > CKi) return "...";
    if (t.has(e)) return "[Circular]";
    if (e instanceof Gy) {
      t.add(e);
      try {
        let s = Array.from(e.map.entries(), ([a, H]) => [a, H]);
        return `Map(${e.map.size}) ${this.formatConsoleValue(s, t, r + 1)}`;
      } finally {
        t.delete(e);
      }
    }
    if (e instanceof ST) {
      t.add(e);
      try {
        return `Set(${e.set.size}) ${this.formatConsoleValue(Array.from(e.set.values()), t, r + 1)}`;
      } finally {
        t.delete(e);
      }
    }
    if (tAe(e)) return "[CodeMode reference]";
    t.add(e);
    try {
      if (Array.isArray(e)) return `[${e.map((s) => this.formatConsoleValue(s, t, r + 1)).join(",")}]`;
      return `{${Object.entries(e)
        .map(([s, a]) => `${JSON.stringify(s)}:${this.formatConsoleValue(a, t, r + 1)}`)
        .join(",")}}`;
    } finally {
      t.delete(e);
    }
  }
  formatConsoleTable(e, t, r) {
    if (e === void 0) return "undefined";
    if (rAe(e)) return "[CodeMode reference]";
    let s = q$(e, "console.table argument"),
      a = this.consoleTableColumns(t, r),
      H = this.consoleTableRows(s, a),
      u = a ?? Array.from(new Set(H.flatMap((d) => Object.keys(d.values))));
    return [
      ["(index)", ...u].join("\t"),
      ...H.map((d) => [d.index, ...u.map((_) => this.formatConsoleTableCell(d.values[_]))].join("\t")),
    ].join(`
`);
  }
  consoleTableColumns(e, t) {
    if (e === void 0) return;
    if (nwt(e)) return;
    let r = Qee(DJ(e, "console.table columns"), !0);
    return Array.isArray(r) ? r.map((s) => String(s)) : void 0;
  }
  consoleTableRows(e, t) {
    if (Array.isArray(e))
      return e.map((r, s) => ({ index: String(s), values: this.consoleTableValues(r, t) }));
    if (e !== null && typeof e === "object" && !sO(e))
      return Object.entries(e).map(([r, s]) => ({ index: r, values: this.consoleTableValues(s, t) }));
    return [{ index: "0", values: { Value: e } }];
  }
  consoleTableValues(e, t) {
    if (e !== null && typeof e === "object" && !Array.isArray(e) && !sO(e)) {
      let r = e;
      if (t !== void 0) return Object.fromEntries(t.map((s) => [s, r[s]]));
      return Object.fromEntries(Object.entries(r));
    }
    return { Value: e };
  }
  formatConsoleTableCell(e) {
    if (e === void 0) return "";
    if (typeof e === "string") return e;
    return this.formatConsoleValue(e, new Set(), 0);
  }
  evaluateCallArguments(e) {
    let t = this;
    return ft(function* () {
      let r = [];
      for (let [s, a] of e.entries()) {
        let H = eM(a, `arguments[${s}]`);
        if (H.type === "SpreadElement") {
          let u = yield* t.evaluateExpression(_u(H, "argument")),
            f = DQe(u);
          if (f === void 0)
            throw new is("Spread arguments require an array, string, Map, or Set in CodeMode.", H);
          r.push(...f);
        } else r.push(yield* t.evaluateExpression(H));
      }
      return r;
    });
  }
  invokePromiseMethod(e, t, r) {
    let s = this;
    if (e.name === "resolve") {
      let H = t[0];
      return Jt(H instanceof Dx ? H : new Dx(void 0, Jt(H)));
    }
    if (e.name === "reject") return jn(() => new Dx(void 0, bn(new dwe(t[0]))));
    let a = Array.isArray(t[0]) ? t[0] : DQe(t[0]);
    if (a === void 0)
      throw new is(
        `Promise.${e.name} expects an array of promises or plain values (e.g. Promise.${e.name}(items.map((item) => tools.ns.tool(item)))).`,
        r,
      );
    switch (e.name) {
      case "all": {
        let H = a.map((u) => (u instanceof Dx ? this.settlePromise(u, r) : Jt(u)));
        return ft(function* () {
          let u = [];
          for (let f of H) u.push(yield* f);
          return u;
        });
      }
      case "allSettled": {
        let H = a.map((u) =>
          u instanceof Dx
            ? Vn(this.observePromise(u), (f) => ({ promise: u, exit: f }))
            : Jt({ promise: void 0, exit: RC(u) }),
        );
        return ft(function* () {
          let u = [];
          for (let f of H) {
            let { exit: d, promise: _ } = yield* f;
            if (mh(d)) {
              u.push(Object.assign(Object.create(null), { status: "fulfilled", value: d.value }));
              continue;
            }
            let L = _?.interrupted === !0 && d1(d.cause);
            if (d1(d.cause) && !L) return yield* NL(d.cause);
            let I = L
              ? new is(
                  "This tool call was interrupted because another value settled a Promise.race first.",
                  r,
                )
              : hI(d.cause);
            u.push(Object.assign(Object.create(null), { status: "rejected", reason: Izi(I) }));
          }
          return u;
        });
      }
      case "race": {
        if (a.length === 0)
          throw new is("Promise.race([]) would never settle; provide at least one promise or value.", r);
        let H = a.map((u, f) =>
          u instanceof Dx
            ? Vn(this.observePromise(u), (d) => ({ index: f, exit: d }))
            : Jt({ index: f, exit: RC(u) }),
        );
        return ft(function* () {
          let u = yield* $Qt(H);
          for (let [d, _] of a.entries()) {
            if (d === u.index || !(_ instanceof Dx) || _.fiber === void 0) continue;
            ((_.interrupted = !0), yield* s2(_.fiber));
          }
          let f = a[u.index];
          return yield* s.unwrapPromiseExit(f instanceof Dx ? f : void 0, u.exit, r);
        });
      }
    }
  }
  invokeFunction(e, t) {
    let r = this;
    return yH(() => {
      let s = r.scopes;
      return (
        (r.scopes = [...e.capturedScopes, new Map()]),
        ft(function* () {
          let H = r.currentScope();
          for (let u of e.parameters)
            for (let f of xQe(u)) H.set(f, { mutable: !0, value: void 0, initialized: !1 });
          for (let [u, f] of e.parameters.entries()) {
            if (f.type === "RestElement") {
              yield* r.declarePattern(_u(f, "argument"), t.slice(u), !0, f);
              break;
            }
            yield* r.declarePattern(f, t[u], !0, f);
          }
          if (e.body.type === "BlockStatement") {
            let u = yield* r.evaluateStatement(e.body);
            return u.kind === "return" || u.kind === "value" ? u.value : void 0;
          }
          return yield* r.evaluateExpression(e.body);
        }).pipe(
          up(
            jn(() => {
              r.scopes = s;
            }),
          ),
        )
      );
    });
  }
  invokeIntrinsic(e, t, r) {
    if (typeof e.receiver === "string") {
      if (
        (e.name === "replace" || e.name === "replaceAll") &&
        (t[1] instanceof A9 || t[1] instanceof yb || t[1] instanceof aO)
      )
        return this.invokeStringReplacer(e.receiver, e.name, t, r);
      return Jt(_Qa(e.receiver, e.name, t, r));
    }
    if (typeof e.receiver === "number") return Jt(ZKi(e.receiver, e.name, t, r));
    if (Array.isArray(e.receiver)) return this.invokeArrayMethod(e.receiver, e.name, t, r);
    if (e.receiver instanceof wI) return Jt(WKi(e.receiver, e.name, r));
    if (e.receiver instanceof qy) return Jt(Azi(e.receiver, e.name, t, r));
    if (e.receiver instanceof Gy) return this.invokeMapMethod(e.receiver, e.name, t, r);
    if (e.receiver instanceof ST) return this.invokeSetMethod(e.receiver, e.name, t, r);
    if (e.receiver instanceof Z1) return Jt(gzi(e.receiver, e.name, r));
    if (e.receiver instanceof Sg) return this.invokeURLSearchParamsMethod(e.receiver, e.name, t, r);
    throw new is(`Method '${e.name}' is not available in CodeMode.`, r);
  }
  invokeStringReplacer(e, t, r, s) {
    let a = this.applyCollectionCallback(r[1], `String.${t}`, s),
      H = [],
      u = (...d) => {
        let _ = d[0],
          L = d[d.length - 1],
          I = L !== null && typeof L === "object",
          D = d[d.length - (I ? 3 : 2)];
        if (typeof _ !== "string" || typeof D !== "number")
          throw new is(`String.${t} produced an invalid replacement match.`, s);
        if (I) {
          let S = Object.create(null);
          for (let [T, C] of Object.entries(L)) if (!TT(T)) S[T] = C;
          d[d.length - 1] = S;
        }
        return (H.push({ match: _, offset: D, args: d }), _);
      },
      f = r[0];
    if (f instanceof qy) {
      if (t === "replaceAll" && !f.regex.global)
        throw new is(
          `String.replaceAll requires a regular expression with the global (g) flag: write /${f.regex.source}/${f.regex.flags}g, or use String.replace to replace only the first match.`,
          s,
        );
      if (t === "replace") e.replace(f.regex, u);
      else e.replaceAll(f.regex, u);
    } else {
      if (typeof f !== "string") throw new is(`String.${t} expects argument 1 to be a string.`, s);
      if (t === "replace") e.replace(f, u);
      else e.replaceAll(f, u);
    }
    return ft(function* () {
      let d = [],
        _ = 0;
      for (let L of H)
        (d.push(e.slice(_, L.offset), vd(q$(yield* a(L.args), `String.${t} replacer result`))),
          (_ = L.offset + L.match.length));
      return (d.push(e.slice(_)), q$(d.join(""), `String.${t} result`));
    });
  }
  applyCollectionCallback(e, t, r) {
    if (!(e instanceof A9) && !(e instanceof yb) && !(e instanceof aO))
      throw new is(`${t} expects a function callback.`, r);
    return (s) =>
      e instanceof yb ? Jt(YCt(e, s, r)) : e instanceof aO ? Jt(twt(e, s, r)) : this.invokeFunction(e, s);
  }
  invokeMapMethod(e, t, r, s) {
    switch (t) {
      case "get":
        return Jt(e.map.get(r[0]));
      case "has":
        return Jt(e.map.has(r[0]));
      case "set":
        return jn(() => (e.map.set(r[0], r[1]), e));
      case "delete":
        return jn(() => e.map.delete(r[0]));
      case "clear":
        return jn(() => {
          e.map.clear();
          return;
        });
      case "keys":
        return jn(() => Array.from(e.map.keys()));
      case "values":
        return jn(() => Array.from(e.map.values()));
      case "entries":
        return jn(() => Array.from(e.map.entries(), ([a, H]) => [a, H]));
      case "forEach": {
        let a = this.applyCollectionCallback(r[0], "Map.forEach", s);
        return ft(function* () {
          for (let [H, u] of Array.from(e.map.entries())) yield* a([u, H, e]);
          return;
        });
      }
      default:
        throw new is(`Map method '${t}' is not available in CodeMode.`, s);
    }
  }
  invokeSetMethod(e, t, r, s) {
    switch (t) {
      case "has":
        return Jt(e.set.has(r[0]));
      case "add":
        return jn(() => (e.set.add(r[0]), e));
      case "delete":
        return jn(() => e.set.delete(r[0]));
      case "clear":
        return jn(() => {
          e.set.clear();
          return;
        });
      case "keys":
      case "values":
        return jn(() => Array.from(e.set.values()));
      case "entries":
        return jn(() => Array.from(e.set.values(), (a) => [a, a]));
      case "forEach": {
        let a = this.applyCollectionCallback(r[0], "Set.forEach", s);
        return ft(function* () {
          for (let H of Array.from(e.set.values())) yield* a([H, H, e]);
          return;
        });
      }
      default:
        throw new is(`Set method '${t}' is not available in CodeMode.`, s);
    }
  }
  invokeURLSearchParamsMethod(e, t, r, s) {
    let a = (u) => c$e(r[u], `URLSearchParams.${t} argument ${u + 1}`),
      H = (u) => {
        if (r.length < u)
          throw new is(`URLSearchParams.${t} requires ${u} argument${u === 1 ? "" : "s"}.`, s).as(
            "TypeError",
          );
      };
    switch (t) {
      case "append":
        return (
          H(2),
          jn(() => {
            e.params.append(a(0), a(1));
            return;
          })
        );
      case "delete":
        return (
          H(1),
          jn(() => {
            if (r[1] !== void 0) e.params.delete(a(0), a(1));
            else e.params.delete(a(0));
            return;
          })
        );
      case "get":
        return (H(1), jn(() => e.params.get(a(0))));
      case "getAll":
        return (H(1), jn(() => e.params.getAll(a(0))));
      case "has":
        return (H(1), jn(() => (r[1] !== void 0 ? e.params.has(a(0), a(1)) : e.params.has(a(0)))));
      case "set":
        return (
          H(2),
          jn(() => {
            e.params.set(a(0), a(1));
            return;
          })
        );
      case "sort":
        return jn(() => {
          e.params.sort();
          return;
        });
      case "keys":
        return jn(() => Array.from(e.params.keys()));
      case "values":
        return jn(() => Array.from(e.params.values()));
      case "entries":
        return jn(() => Array.from(e.params.entries(), ([u, f]) => [u, f]));
      case "toString":
        return jn(() => e.params.toString());
      case "forEach": {
        H(1);
        let u = this.applyCollectionCallback(r[0], "URLSearchParams.forEach", s);
        return ft(function* () {
          for (let [f, d] of Array.from(e.params.entries())) yield* u([d, f, e]);
          return;
        });
      }
      default:
        throw new is(`URLSearchParams method '${t}' is not available in CodeMode.`, s);
    }
  }
  invokeArrayMethod(e, t, r, s) {
    let a = (d, _) => {
      if (d === void 0) return;
      if (typeof d !== "number") throw new is(`Array.${t} expects ${_} to be a number.`, s);
      return d;
    };
    switch (t) {
      case "join": {
        if (r.length > 1 || (r.length === 1 && typeof r[0] !== "string"))
          throw new is("Array.join expects zero arguments or one string separator.", s);
        let d = q$(e, "Array.join input");
        return Jt(d.map((_) => vd(_ ?? "")).join(r.length === 0 ? "," : r[0]));
      }
      case "includes":
        if (r.length === 0 || r.length > 2)
          throw new is("Array.includes expects a value and optional start index.", s);
        return Jt(e.includes(r[0], a(r[1], "start index")));
      case "indexOf":
        return Jt(e.indexOf(r[0], a(r[1], "start index")));
      case "lastIndexOf":
        return Jt(r[1] === void 0 ? e.lastIndexOf(r[0]) : e.lastIndexOf(r[0], a(r[1], "start index")));
      case "at":
        return Jt(e.at(a(r[0], "index") ?? 0));
      case "slice":
        return Jt(e.slice(a(r[0], "start"), a(r[1], "end")));
      case "concat":
        return Jt(e.concat(...r));
      case "flat":
        return Jt(e.flat(a(r[0], "depth") ?? 1));
      case "reverse":
        return Jt([...e].reverse());
      case "sort":
      case "toSorted":
        return this.sortArray(e, r[0], s);
      case "toReversed":
        return Jt([...e].reverse());
      case "with": {
        let d = a(r[0], "index") ?? 0,
          _ = d < 0 ? e.length + d : d;
        if (_ < 0 || _ >= e.length) throw new is("Array.with index is out of range.", s);
        let L = [...e];
        return ((L[_] = r[1]), Jt(L));
      }
      case "push": {
        for (let d of r) this.rejectCircularInsertion(e, d, "Array.push result", s);
        return (e.push(...r), Jt(e.length));
      }
      case "unshift": {
        for (let d of r) this.rejectCircularInsertion(e, d, "Array.unshift result", s);
        return (e.unshift(...r), Jt(e.length));
      }
      case "pop":
        return Jt(e.pop());
      case "shift":
        return Jt(e.shift());
      case "splice": {
        if (r.length === 0) return Jt(e.splice(0, 0));
        let d = a(r[0], "start") ?? 0;
        if (r.length === 1) return Jt(e.splice(d));
        let _ = a(r[1], "delete count") ?? 0,
          L = r.slice(2);
        for (let I of L) this.rejectCircularInsertion(e, I, "Array.splice result", s);
        return Jt(e.splice(d, _, ...L));
      }
      case "fill":
        return (
          this.rejectCircularInsertion(e, r[0], "Array.fill result", s),
          Jt(e.fill(r[0], a(r[1], "start"), a(r[2], "end")))
        );
      case "copyWithin":
        return Jt(e.copyWithin(a(r[0], "target index") ?? 0, a(r[1], "start") ?? 0, a(r[2], "end")));
      case "keys":
        return Jt(Array.from(e.keys()));
      case "values":
        return Jt([...e]);
      case "entries":
        return Jt(Array.from(e.entries(), ([d, _]) => [d, _]));
    }
    let H = r[0];
    if (!(H instanceof A9) && !(H instanceof yb) && !(H instanceof aO))
      throw new is(`Array.${t} expects a function callback.`, s);
    let u = this,
      f = (d) =>
        H instanceof yb ? Jt(YCt(H, d, s)) : H instanceof aO ? Jt(twt(H, d, s)) : u.invokeFunction(H, d);
    return ft(function* () {
      let d = e.slice();
      switch (t) {
        case "map": {
          let _ = [];
          for (let [L, I] of d.entries()) _.push(yield* f([I, L, d]));
          return _;
        }
        case "flatMap": {
          let _ = [];
          for (let [L, I] of d.entries()) {
            let D = yield* f([I, L, d]);
            if (Array.isArray(D)) _.push(...D);
            else _.push(D);
          }
          return _;
        }
        case "filter": {
          let _ = [];
          for (let [L, I] of d.entries()) if (yield* f([I, L, d])) _.push(I);
          return _;
        }
        case "find":
          for (let [_, L] of d.entries()) if (yield* f([L, _, d])) return L;
          return;
        case "findIndex":
          for (let [_, L] of d.entries()) if (yield* f([L, _, d])) return _;
          return -1;
        case "some":
          for (let [_, L] of d.entries()) if (yield* f([L, _, d])) return !0;
          return !1;
        case "every":
          for (let [_, L] of d.entries()) if (!(yield* f([L, _, d]))) return !1;
          return !0;
        case "forEach":
          for (let [_, L] of d.entries()) yield* f([L, _, d]);
          return;
        case "reduce": {
          let _, L;
          if (r.length >= 2) ((_ = r[1]), (L = 0));
          else {
            if (d.length === 0) throw new is("Array.reduce of an empty array with no initial value.", s);
            ((_ = d[0]), (L = 1));
          }
          for (let I = L; I < d.length; I += 1) _ = yield* f([_, d[I], I, d]);
          return _;
        }
        case "reduceRight": {
          let _, L;
          if (r.length >= 2) ((_ = r[1]), (L = d.length - 1));
          else {
            if (d.length === 0) throw new is("Array.reduceRight of an empty array with no initial value.", s);
            ((_ = d[d.length - 1]), (L = d.length - 2));
          }
          for (let I = L; I >= 0; I -= 1) _ = yield* f([_, d[I], I, d]);
          return _;
        }
        case "findLast":
          for (let _ = d.length - 1; _ >= 0; _ -= 1) if (yield* f([d[_], _, d])) return d[_];
          return;
        case "findLastIndex":
          for (let _ = d.length - 1; _ >= 0; _ -= 1) if (yield* f([d[_], _, d])) return _;
          return -1;
      }
      throw new is(`Array method '${t}' is not available in CodeMode.`, s);
    });
  }
  sortArray(e, t, r) {
    if (t !== void 0 && !(t instanceof A9))
      throw new is("Array.sort expects an arrow function comparator.", r);
    if (!(t instanceof A9))
      return jn(() =>
        [...e].sort((f, d) => {
          let _ = vd(f),
            L = vd(d);
          return _ < L ? -1 : _ > L ? 1 : 0;
        }),
      );
    let s = this,
      a = (f) => {
        if (f.length <= 1) return Jt(f);
        let d = Math.floor(f.length / 2);
        return ft(function* () {
          let _ = yield* a(f.slice(0, d)),
            L = yield* a(f.slice(d)),
            I = [],
            D = 0,
            S = 0;
          while (D < _.length && S < L.length) {
            let T = a$e(yield* s.invokeFunction(t, [_[D], L[S]]));
            if (Number.isNaN(T) || T <= 0) I.push(_[D++]);
            else I.push(L[S++]);
          }
          return [...I, ..._.slice(D), ...L.slice(S)];
        });
      },
      H = e.filter((f) => f !== void 0),
      u = e.length - H.length;
    return Vn(a(H), (f) => [...f, ...Array(u).fill(void 0)]);
  }
  evaluateObjectExpression(e) {
    let t = Object.create(null),
      r = vT(e, "properties"),
      s = this;
    return ft(function* () {
      for (let a of r) {
        let H = eM(a, "properties");
        if (H.type === "SpreadElement") {
          let L = yield* s.evaluateExpression(_u(H, "argument"));
          if (L === null || L === void 0 || sO(L)) continue;
          if (typeof L !== "object" || Array.isArray(L) || tAe(L))
            throw new is("Object spread requires a data object in CodeMode.", H, "InvalidDataValue");
          for (let [I, D] of Object.entries(L)) {
            if (TT(I)) throw new is(`Property '${I}' is not available in CodeMode.`, H);
            t[I] = D;
          }
          continue;
        }
        if (H.type !== "Property") throw new is("Only standard object properties are supported.", H);
        if (A0(H, "kind") !== "init") throw new is("Only init object properties are supported.", H);
        let u = _u(H, "key"),
          f = _u(H, "value"),
          d = _we(H, "computed"),
          _;
        if (d) _ = s.toPropertyKey(yield* s.evaluateExpression(u), u);
        else if (u.type === "Identifier") _ = A0(u, "name");
        else if (u.type === "Literal") _ = s.toPropertyKey(u.value, u);
        else throw new is("Unsupported object property key shape.", u);
        if (TT(String(_))) throw new is(`Property '${String(_)}' is not available in CodeMode.`, u);
        t[String(_)] = yield* s.evaluateExpression(f);
      }
      return t;
    });
  }
  evaluateArrayExpression(e) {
    let t = vT(e, "elements"),
      r = [],
      s = this;
    return ft(function* () {
      for (let a of t) {
        if (a === null) {
          r.push(void 0);
          continue;
        }
        let H = eM(a, "elements");
        if (H.type === "SpreadElement") {
          let u = yield* s.evaluateExpression(_u(H, "argument")),
            f = DQe(u);
          if (f === void 0)
            throw new is("Array spread requires an array, string, Map, or Set in CodeMode.", H);
          r.push(...f);
        } else r.push(yield* s.evaluateExpression(H));
      }
      return r;
    });
  }
  evaluateTemplateLiteral(e) {
    let t = vT(e, "quasis"),
      r = vT(e, "expressions"),
      s = "",
      a = this;
    return ft(function* () {
      for (let H = 0; H < t.length; H += 1) {
        let u = eM(t[H], "quasis"),
          f = u.value;
        if (!mwe(f) || typeof f.cooked !== "string") throw new is("Invalid template literal quasi.", u);
        if (((s += f.cooked), H < r.length)) {
          let d = yield* a.evaluateExpression(eM(r[H], "expressions"));
          s += vd(q$(d, "Template interpolation"));
        }
      }
      return s;
    });
  }
  evaluateConditionalExpression(e) {
    return Hi(this.evaluateExpression(_u(e, "test")), (t) =>
      this.evaluateExpression(_u(e, t ? "consequent" : "alternate")),
    );
  }
  applyCompoundAssignment(e, t, r, s) {
    if (!OKi.has(e)) throw new is(`Unsupported assignment operator '${e}'.`, s);
    return this.applyBinaryOperator(e.slice(0, -1), t, r, s);
  }
  getMemberReference(e) {
    let t = _u(e, "object"),
      r = _u(e, "property"),
      s = _we(e, "computed"),
      a = e.optional === !0,
      H = this;
    return ft(function* () {
      let u = yield* H.evaluateExpression(t);
      if (u === k7) return k7;
      if ((u === null || u === void 0) && a) return k7;
      let f = s
        ? H.toPropertyKey(yield* H.evaluateExpression(r), r)
        : r.type === "Identifier"
          ? A0(r, "name")
          : H.toPropertyKey(yield* H.evaluateExpression(r), r);
      if (u instanceof oO) {
        if (typeof f !== "string" || TT(f))
          throw new is("Tool paths must use safe string property names.", r);
        return new oO([...u.path, f]);
      }
      if (u instanceof s$e) {
        if (typeof f === "string" && izi.has(f)) return new eAe(f);
        throw new is(
          `Promise.${String(f)} is not available in CodeMode. Available: Promise.all, Promise.allSettled, Promise.race, Promise.resolve, and Promise.reject; consume promises with await.`,
          r,
        );
      }
      if (u instanceof Db) {
        if (typeof f !== "string" || TT(f))
          throw new is(`${u.name}.${String(f)} is not available in CodeMode.`, r);
        if (u.name === "Math" && XKi.has(f)) return new GE(Math[f]);
        return new yJ(u.name, f);
      }
      if (typeof u === "string") {
        if (f === "length") return new GE(u.length);
        if (typeof f === "number") return new GE(u[f]);
        if (typeof f === "string" && /^\d+$/.test(f)) return new GE(u[Number(f)]);
        if (typeof f === "string" && lzi.has(f)) return new OP(u, f);
        return new GE(void 0);
      }
      if (typeof u === "number") {
        if (typeof f === "string" && zKi.has(f)) return new OP(u, f);
        return new GE(void 0);
      }
      if (u instanceof yb && typeof f === "string" && !TT(f)) {
        if (u.name === "Number" && QKi.has(f)) return new GE(Number[f]);
        if (u.name === "Number" && YKi.has(f)) return new yJ("Number", f);
        if (u.name === "String" && fzi.has(f)) return new yJ("String", f);
      }
      if (u instanceof wI) {
        if (typeof f === "string" && FKi.has(f)) return new OP(u, f);
        return new GE(void 0);
      }
      if (u instanceof qy) {
        if (typeof f === "string" && Hzi.has(f)) return new GE(u.regex[f]);
        if (typeof f === "string" && azi.has(f)) return new OP(u, f);
        return new GE(void 0);
      }
      if (u instanceof Gy) {
        if (f === "size") return new GE(u.map.size);
        if (typeof f === "string" && vKi.has(f)) return new OP(u, f);
        return new GE(void 0);
      }
      if (u instanceof ST) {
        if (f === "size") return new GE(u.set.size);
        if (typeof f === "string" && bKi.has(f)) return new OP(u, f);
        return new GE(void 0);
      }
      if (u instanceof Z1) {
        if (f === "searchParams") return new GE(u.searchParams);
        if (typeof f === "string" && hzi.has(f)) return new OP(u, f);
        if (typeof f === "string" && mzi.has(f)) return { target: u, key: f };
        return new GE(void 0);
      }
      if (u instanceof Sg) {
        if (f === "size") return new GE(u.params.size);
        if (typeof f === "string" && Lzi.has(f)) return new OP(u, f);
        return new GE(void 0);
      }
      if (u instanceof Dx) {
        if (f === "then" || f === "catch" || f === "finally")
          throw new is(
            `Promise.prototype.${String(f)} is not supported in CodeMode; use await instead (with try/catch to handle failures) - e.g. \`const result = await tools.ns.tool(...)\`.`,
            r,
            "UnsupportedSyntax",
            [Zee],
          );
        throw new is(
          "This value is an un-awaited Promise and has no readable properties; await it first - e.g. `const result = await tools.ns.tool(...)`.",
          t,
          "InvalidDataValue",
        );
      }
      if (tAe(u))
        throw new is(
          "CodeMode runtime references are opaque and do not expose properties.",
          t,
          "InvalidDataValue",
        );
      if (typeof u !== "object" || u === null)
        throw new is("Cannot access a property on a non-object value.", t);
      if (typeof f === "string" && TT(f)) throw new is(`Property '${f}' is not available in CodeMode.`, r);
      if (Array.isArray(u)) {
        if (
          f !== "length" &&
          !(typeof f === "string" && zCt.has(f)) &&
          typeof f !== "number" &&
          !/^\d+$/.test(f)
        ) {
          if (typeof f === "string" && Object.hasOwn(u, f)) return new GE(u[f]);
          return new GE(void 0);
        }
        return { target: u, key: f };
      }
      return { target: u, key: f };
    });
  }
  readMember(e) {
    return Vn(this.getMemberReference(e), (t) => {
      if (t === k7) return k7;
      if (t instanceof GE) return t.value;
      if (t === void 0 || t instanceof oO || t instanceof eAe || t instanceof OP || t instanceof yJ) return t;
      if (Array.isArray(t.target)) {
        if (typeof t.key === "string" && zCt.has(t.key)) return new OP(t.target, t.key);
        return t.key === "length" ? t.target.length : t.target[Number(t.key)];
      }
      if (t.target instanceof Z1) return t.target.url[String(t.key)];
      return t.target[String(t.key)];
    });
  }
  writeMember(e, t) {
    return this.modifyMember(e, () => Jt({ write: !0, next: t, result: t }));
  }
  modifyMember(e, t) {
    let r = this;
    return ft(function* () {
      let s = yield* r.getMemberReference(e);
      if (
        s === k7 ||
        s instanceof GE ||
        s === void 0 ||
        s instanceof oO ||
        s instanceof eAe ||
        s instanceof OP ||
        s instanceof yJ
      )
        throw new is("Only data fields may be assigned in CodeMode.", e);
      if (Array.isArray(s.target)) {
        if (s.key === "length") throw new is("Array length cannot be assigned in CodeMode.", e);
        if (typeof s.key === "string" && zCt.has(s.key))
          throw new is("Array methods cannot be assigned in CodeMode.", e);
      }
      let a = Array.isArray(s.target) ? Number(s.key) : String(s.key),
        H = s.target instanceof Z1 ? s.target.url[a] : s.target[a],
        { write: u, next: f, result: d } = yield* t(H);
      if (u) r.assignToReference(s, a, f, e);
      return d;
    });
  }
  rejectCircularInsertion(e, t, r, s, a = new Set()) {
    if (t === e) throw new is(`${r} contains a circular value.`, s, "InvalidDataValue");
    if (t === null || typeof t !== "object" || tAe(t) || a.has(t)) return;
    a.add(t);
    let H = Array.isArray(t) ? t : Object.values(t);
    for (let u of H) this.rejectCircularInsertion(e, u, r, s, a);
    a.delete(t);
  }
  assignToReference(e, t, r, s) {
    if (Array.isArray(e.target)) {
      let u = e.target,
        f = t;
      if (!Number.isInteger(f) || f < 0)
        throw new is("Array assignment index must be a non-negative integer.", s, "InvalidDataValue");
      (this.rejectCircularInsertion(u, r, "Array assignment result", s), (u[f] = r));
      return;
    }
    if (e.target instanceof Z1) {
      let u = t;
      if (!_zi.has(u)) throw new is(`URL.${u} is read-only.`, s).as("TypeError");
      try {
        let f = e.target.url;
        f[u] = c$e(r, `URL.${u} value`);
        return;
      } catch (f) {
        if (f instanceof is || f instanceof yx) throw f;
        throw new is(`URL.${u} received an invalid value.`, s).as("TypeError");
      }
    }
    let a = e.target,
      H = t;
    (this.rejectCircularInsertion(a, r, "Object assignment result", s), (a[H] = r));
  }
  toPropertyKey(e, t) {
    if (typeof e === "string" || typeof e === "number") return e;
    throw new is("Property key must be a string or number.", t);
  }
  declare(e, t, r, s) {
    let a = this.currentScope(),
      H = a.get(e);
    if (H && H.initialized !== !1) throw new is(`Identifier '${e}' has already been declared.`, s);
    a.set(e, { mutable: r, value: t, initialized: !0 });
  }
  getIdentifierValue(e, t) {
    let r = this.resolveBinding(e);
    if (!r) throw new is(`Unknown identifier '${e}'.`, t).as("ReferenceError");
    if (r.initialized === !1)
      throw new is(`Cannot access '${e}' before initialization.`, t).as("ReferenceError");
    return r.value;
  }
  setIdentifierValue(e, t, r) {
    let s = this.resolveBinding(e);
    if (!s) throw new is(`Unknown identifier '${e}'.`, r).as("ReferenceError");
    if (!s.mutable) throw new is(`Cannot assign to constant '${e}'.`, r).as("TypeError");
    return ((s.value = t), t);
  }
  resolveBinding(e) {
    for (let t = this.scopes.length - 1; t >= 0; t -= 1) {
      let s = this.scopes[t]?.get(e);
      if (s) return s;
    }
    return;
  }
  currentScope() {
    let e = this.scopes[this.scopes.length - 1];
    if (!e) throw new is("Interpreter scope stack is empty.");
    return e;
  }
  pushScope() {
    this.scopes.push(new Map());
  }
  popScope() {
    this.scopes.pop();
  }
}