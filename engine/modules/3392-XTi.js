
var XTi = Ie(function (hhe) {
  var wGe =
    (hhe && hhe.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(hhe, "__esModule", { value: !0 });
  hhe.Browser = void 0;
  var BIa = wGe(E0r()),
    cHe = wGe(aSt()),
    qTi = cr("events"),
    Nbe = I0r(),
    VTi = wGe(NTi()),
    RIa = wGe(BTi()),
    WIa = wGe(WTi()),
    GTi = ".local",
    VIa = "_services._dns-sd._udp" + GTi;
  class uSt extends qTi.EventEmitter {
    constructor(e, t, r) {
      super();
      if (
        ((this.onresponse = void 0),
        (this.serviceMap = {}),
        (this.wildcard = !1),
        (this._services = []),
        typeof t === "function")
      )
        return new uSt(e, null, t);
      if (
        ((this.mdns = e),
        (this.txt = new BIa.default(t !== null && t.txt != null ? t.txt : void 0)),
        t === null || t.type === void 0)
      )
        ((this.name = VIa), (this.wildcard = !0));
      else {
        if (((this.name = Nbe.toString({ name: t.type, protocol: t.protocol || "tcp" }) + GTi), t.name))
          this.name = t.name + "." + this.name;
        this.wildcard = !1;
      }
      if (t != null && t.txt !== void 0) this.txtQuery = (0, RIa.default)(t.txt);
      if (r) this.on("up", r);
      this.start();
    }
    start() {
      if (this.onresponse || this.name === void 0) return;
      var e = this,
        t = {};
      if (!this.wildcard) t[this.name] = !0;
      ((this.onresponse = (r, s) => {
        if (e.wildcard)
          r.answers.forEach((a) => {
            if (a.type !== "PTR" || a.name !== e.name || a.name in t) return;
            ((t[a.data] = !0), e.mdns.query(a.data, "PTR"));
          });
        Object.keys(t).forEach(function (a) {
          e.goodbyes(a, r).forEach(e.removeService.bind(e));
          var H = e.buildServicesFor(a, r, e.txt, s);
          if (H.length === 0) return;
          H.forEach((u) => {
            if (e.serviceMap[u.fqdn]) {
              e.updateService(u);
              return;
            }
            e.addService(u);
          });
        });
      }),
        this.mdns.on("response", this.onresponse),
        this.update());
    }
    stop() {
      if (!this.onresponse) return;
      (this.mdns.removeListener("response", this.onresponse), (this.onresponse = void 0));
    }
    update() {
      this.mdns.query(this.name, "PTR");
    }
    get services() {
      return this._services;
    }
    addService(e) {
      if ((0, VTi.default)(e, this.txtQuery) === !1) return;
      (this._services.push(e), (this.serviceMap[e.fqdn] = !0), this.emit("up", e));
    }
    updateService(e) {
      var t;
      if (
        (0, WIa.default)(
          e.txt,
          ((t = this._services.find((r) => (0, cHe.default)(r.fqdn, e.fqdn))) === null || t === void 0
            ? void 0
            : t.txt) || {},
        )
      )
        return;
      if (!(0, VTi.default)(e, this.txtQuery)) {
        this.removeService(e.fqdn);
        return;
      }
      ((this._services = this._services.map(function (r) {
        if (!(0, cHe.default)(r.fqdn, e.fqdn)) return r;
        return e;
      })),
        this.emit("txt-update", e));
    }
    removeService(e) {
      var t, r;
      if (
        (this._services.some(function (s, a) {
          if ((0, cHe.default)(s.fqdn, e)) return ((t = s), (r = a), !0);
        }),
        !t || r === void 0)
      )
        return;
      (this._services.splice(r, 1), delete this.serviceMap[e], this.emit("down", t));
    }
    goodbyes(e, t) {
      return t.answers
        .concat(t.additionals)
        .filter((r) => r.type === "PTR" && r.ttl === 0 && (0, cHe.default)(r.name, e))
        .map((r) => r.data);
    }
    buildServicesFor(e, t, r, s) {
      var a = t.answers.concat(t.additionals).filter((H) => H.ttl > 0);
      return a
        .filter((H) => H.type === "PTR" && (0, cHe.default)(H.name, e))
        .map((H) => {
          let u = { addresses: [], subtypes: [] };
          if (
            (a
              .filter((f) => f.type === "PTR" && (0, cHe.default)(f.data, H.data) && f.name.includes("._sub"))
              .forEach((f) => {
                let d = Nbe.toType(f.name);
                u.subtypes.push(d.subtype);
              }),
            a
              .filter((f) => (f.type === "SRV" || f.type === "TXT") && (0, cHe.default)(f.name, H.data))
              .forEach((f) => {
                if (f.type === "SRV") {
                  var d = f.name.split("."),
                    _ = d[0],
                    L = Nbe.toType(d.slice(1, -1).join("."));
                  ((u.name = _),
                    (u.fqdn = f.name),
                    (u.host = f.data.target),
                    (u.referer = s),
                    (u.port = f.data.port),
                    (u.type = L.name),
                    (u.protocol = L.protocol));
                } else if (f.type === "TXT") ((u.rawTxt = f.data), (u.txt = this.txt.decodeAll(f.data)));
              }),
            !u.name)
          )
            return;
          return (
            a
              .filter((f) => (f.type === "A" || f.type === "AAAA") && (0, cHe.default)(f.name, u.host))
              .forEach((f) => u.addresses.push(f.data)),
            u
          );
        })
        .filter((H) => !!H);
    }
  }
  hhe.Browser = uSt;
  hhe.default = uSt;
});