
var kor = ne(() => {
  ((CTn = Symbol.for("immer-nothing")),
    (yTn = Symbol.for("immer-draftable")),
    (Iw = Symbol.for("immer-state")),
    (Jao = [
      function (e) {
        return `The plugin for '${e}' has not been loaded into Immer. To enable the plugin, import and call \`enable${e}()\` when initializing your application.`;
      },
      function (e) {
        return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${e}'`;
      },
      "This object has been frozen and should not be mutated",
      function (e) {
        return (
          "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " +
          e
        );
      },
      "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
      "Immer forbids circular references",
      "The first or second argument to `produce` must be a function",
      "The third argument to `produce` must be a function or undefined",
      "First argument to `createDraft` must be a plain object, an array, or an immerable object",
      "First argument to `finishDraft` must be a draft returned by `createDraft`",
      function (e) {
        return `'current' expects a draft, got: ${e}`;
      },
      "Object.defineProperty() cannot be used on an Immer draft",
      "Object.setPrototypeOf() cannot be used on an Immer draft",
      "Immer only supports deleting array indices",
      "Immer only supports setting array indices and the 'length' property",
      function (e) {
        return `'original' expects a draft, got: ${e}`;
      },
    ]));
  ((oN = Object), (Mxe = oN.getPrototypeOf));
  ((Kao = oN[PLt][xLt].toString()), (MTn = new WeakMap()));
  wLt = Array.isArray;
  DLt = { [YWe]: Yao };
  kTn = {};
  rHo = [];
  ((jLt = {
    get(e, t) {
      if (t === Iw) return e;
      let r = e.scope_.arrayMethodsPlugin_,
        s = e.type_ === 1 && typeof t === "string";
      if (s) {
        if (r?.isArrayOperationMethod(t)) return r.createMethodInterceptor(e, t);
      }
      let a = UY(e);
      if (!xTn(a, t, e.type_)) return oHo(e, a, t);
      let H = a[t];
      if (e.finalized_ || !NY(H)) return H;
      if (s && e.operationMethod && r?.isMutatingArrayMethod(e.operationMethod) && Qao(t)) return H;
      if (H === Dor(e.base_, t)) {
        MLt(e);
        let u = e.type_ === 1 ? +t : t,
          f = jor(e.scope_, H, e, u);
        return (e.copy_[u] = f);
      }
      return H;
    },
    has(e, t) {
      return t in UY(e);
    },
    ownKeys(e) {
      return Reflect.ownKeys(UY(e));
    },
    set(e, t, r) {
      let s = BTn(UY(e), t);
      if (s?.set) return (s.set.call(e.draft_, r), !0);
      if (!e.modified_) {
        let a = Dor(UY(e), t),
          H = a?.[Iw];
        if (H && H.base_ === r) return ((e.copy_[t] = r), e.assigned_.set(t, !1), !0);
        if (zao(r, a) && (r !== void 0 || xTn(e.base_, t, e.type_))) return !0;
        (MLt(e), bor(e));
      }
      if (
        (e.copy_[t] === r && (r !== void 0 || t in e.copy_)) ||
        (Number.isNaN(r) && Number.isNaN(e.copy_[t]))
      )
        return !0;
      return ((e.copy_[t] = r), e.assigned_.set(t, !0), iHo(e, t, r), !0);
    },
    deleteProperty(e, t) {
      if ((MLt(e), Dor(e.base_, t) !== void 0 || t in e.base_)) (e.assigned_.set(t, !1), bor(e));
      else e.assigned_.delete(t);
      if (e.copy_) delete e.copy_[t];
      return !0;
    },
    getOwnPropertyDescriptor(e, t) {
      let r = UY(e),
        s = Reflect.getOwnPropertyDescriptor(r, t);
      if (!s) return s;
      return { [yLt]: !0, [yor]: e.type_ !== 1 || t !== "length", [SLt]: s[SLt], [YWe]: r[t] };
    },
    defineProperty() {
      sN(11);
    },
    getPrototypeOf(e) {
      return Mxe(e.base_);
    },
    setPrototypeOf() {
      sN(12);
    },
  }),
    (eVe = {}));
  for (let e in jLt) {
    let t = jLt[e];
    eVe[e] = function () {
      let r = arguments;
      return ((r[0] = r[0][0]), t.apply(this, r));
    };
  }
  eVe.deleteProperty = function (e, t) {
    if (isNaN(parseInt(t))) sN(13);
    return eVe.set.call(this, e, t, void 0);
  };
  eVe.set = function (e, t, r) {
    if (t !== "length" && isNaN(parseInt(t))) sN(14);
    return jLt.set.call(this, e[0], t, r, e[0]);
  };
  ((cHo = new aHo()), (fme = cHo.produce));
});