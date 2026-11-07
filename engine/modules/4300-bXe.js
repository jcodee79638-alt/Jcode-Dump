
var bXe = Ie(function (gUi) {
  Object.defineProperty(gUi, "__esModule", { value: !0 });
  gUi.regexpCode =
    gUi.getEsmExportName =
    gUi.getProperty =
    gUi.safeStringify =
    gUi.stringify =
    gUi.strConcat =
    gUi.addCodeArg =
    gUi.str =
    gUi._ =
    gUi.nil =
    gUi._Code =
    gUi.Name =
    gUi.IDENTIFIER =
    gUi._CodeOrName =
      void 0;
  class Bvt {}
  gUi._CodeOrName = Bvt;
  gUi.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class vje extends Bvt {
    constructor(e) {
      super();
      if (!gUi.IDENTIFIER.test(e)) throw Error("CodeGen: name must be a valid identifier");
      this.str = e;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  gUi.Name = vje;
  class E7 extends Bvt {
    constructor(e) {
      super();
      this._items = typeof e === "string" ? [e] : e;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1) return !1;
      let e = this._items[0];
      return e === "" || e === '""';
    }
    get str() {
      var e;
      return (e = this._str) !== null && e !== void 0
        ? e
        : (this._str = this._items.reduce((t, r) => `${t}${r}`, ""));
    }
    get names() {
      var e;
      return (e = this._names) !== null && e !== void 0
        ? e
        : (this._names = this._items.reduce((t, r) => {
            if (r instanceof vje) t[r.str] = (t[r.str] || 0) + 1;
            return t;
          }, {}));
    }
  }
  gUi._Code = E7;
  gUi.nil = new E7("");
  function LUi(e, ...t) {
    let r = [e[0]],
      s = 0;
    while (s < t.length) (p1r(r, t[s]), r.push(e[++s]));
    return new E7(r);
  }
  gUi._ = LUi;
  var f1r = new E7("+");
  function $Ui(e, ...t) {
    let r = [vXe(e[0])],
      s = 0;
    while (s < t.length) (r.push(f1r), p1r(r, t[s]), r.push(f1r, vXe(e[++s])));
    return (bCa(r), new E7(r));
  }
  gUi.str = $Ui;
  function p1r(e, t) {
    if (t instanceof E7) e.push(...t._items);
    else if (t instanceof vje) e.push(t);
    else e.push(CCa(t));
  }
  gUi.addCodeArg = p1r;
  function bCa(e) {
    let t = 1;
    while (t < e.length - 1) {
      if (e[t] === f1r) {
        let r = jCa(e[t - 1], e[t + 1]);
        if (r !== void 0) {
          e.splice(t - 1, 3, r);
          continue;
        }
        e[t++] = "+";
      }
      t++;
    }
  }
  function jCa(e, t) {
    if (t === '""') return e;
    if (e === '""') return t;
    if (typeof e == "string") {
      if (t instanceof vje || e[e.length - 1] !== '"') return;
      if (typeof t != "string") return `${e.slice(0, -1)}${t}"`;
      if (t[0] === '"') return e.slice(0, -1) + t.slice(1);
      return;
    }
    if (typeof t == "string" && t[0] === '"' && !(e instanceof vje)) return `"${e}${t.slice(1)}`;
    return;
  }
  function PCa(e, t) {
    return t.emptyStr() ? e : e.emptyStr() ? t : $Ui`${e}${t}`;
  }
  gUi.strConcat = PCa;
  function CCa(e) {
    return typeof e == "number" || typeof e == "boolean" || e === null
      ? e
      : vXe(Array.isArray(e) ? e.join(",") : e);
  }
  function wCa(e) {
    return new E7(vXe(e));
  }
  gUi.stringify = wCa;
  function vXe(e) {
    return JSON.stringify(e)
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029");
  }
  gUi.safeStringify = vXe;
  function kCa(e) {
    return typeof e == "string" && gUi.IDENTIFIER.test(e) ? new E7(`.${e}`) : LUi`[${e}]`;
  }
  gUi.getProperty = kCa;
  function OCa(e) {
    if (typeof e == "string" && gUi.IDENTIFIER.test(e)) return new E7(`${e}`);
    throw Error(`CodeGen: invalid export name: ${e}, use explicit $id name mapping`);
  }
  gUi.getEsmExportName = OCa;
  function UCa(e) {
    return new E7(e.toString());
  }
  gUi.regexpCode = UCa;
});