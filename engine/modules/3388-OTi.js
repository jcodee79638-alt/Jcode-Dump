
var OTi = Ie(function (_he) {
  var w0r =
    (_he && _he.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(_he, "__esModule", { value: !0 });
  _he.Server = void 0;
  var CIa = w0r(CTi()),
    wIa = w0r(kTi()),
    kIa = w0r(aSt());
  class k0r {
    constructor(e, t) {
      ((this.registry = {}),
        (this.mdns = (0, CIa.default)(e)),
        this.mdns.setMaxListeners(0),
        this.mdns.on("query", this.respondToQuery.bind(this)),
        (this.errorCallback =
          t !== null && t !== void 0
            ? t
            : function (r) {
                throw r;
              }));
    }
    register(e) {
      let t = (r) => {
        var s = this.registry[r.type];
        if (!s) s = this.registry[r.type] = [];
        else if (s.some(this.isDuplicateRecord(r))) return;
        s.push(r);
      };
      if (Array.isArray(e)) e.forEach(t);
      else t(e);
    }
    unregister(e) {
      let t = (r) => {
        let s = r.type;
        if (!(s in this.registry)) return;
        this.registry[s] = this.registry[s].filter((a) => a.name !== r.name);
      };
      if (Array.isArray(e)) e.forEach(t);
      else t(e);
    }
    respondToQuery(e) {
      let t = this;
      e.questions.forEach((r) => {
        var { type: s, name: a } = r,
          H = s === "ANY" ? Object.keys(t.registry).map(t.recordsFor.bind(t, a)).flat(1) : t.recordsFor(a, s);
        if (H.length === 0) return;
        var u = [];
        if (s !== "ANY")
          (H.forEach((f) => {
            if (f.type !== "PTR") return;
            u = u.concat(t.recordsFor(f.data, "SRV")).concat(t.recordsFor(f.data, "TXT"));
          }),
            u
              .filter(function (f) {
                return f.type === "SRV";
              })
              .map(function (f) {
                return f.data.target;
              })
              .filter(this.unique())
              .forEach(function (f) {
                u = u.concat(t.recordsFor(f, "A")).concat(t.recordsFor(f, "AAAA"));
              }));
        t.mdns.respond({ answers: H, additionals: u }, (f) => {
          if (f) this.errorCallback(f);
        });
      });
    }
    recordsFor(e, t) {
      if (!(t in this.registry)) return [];
      return this.registry[t].filter((r) => {
        var s = ~e.indexOf(".") ? r.name : r.name.split(".")[0];
        return (0, kIa.default)(s, e);
      });
    }
    isDuplicateRecord(e) {
      return (t) => e.type === t.type && e.name === t.name && (0, wIa.default)(e.data, t.data);
    }
    unique() {
      var e = [];
      return (t) => {
        if (~e.indexOf(t)) return !1;
        return (e.push(t), !0);
      };
    }
  }
  _he.Server = k0r;
  _he.default = k0r;
});