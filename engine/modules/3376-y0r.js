
var y0r = Ie(function (dhe) {
  var fTi =
    (dhe && dhe.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(dhe, "__esModule", { value: !0 });
  dhe.Service = void 0;
  var lTi = fTi(cr("os")),
    XEa = fTi(E0r()),
    pTi = cr("events"),
    dTi = I0r(),
    HSt = ".local";
  class D0r extends pTi.EventEmitter {
    constructor(e) {
      super();
      if (
        ((this.probe = !0),
        (this.published = !1),
        (this.activated = !1),
        (this.destroyed = !1),
        (this.txtService = new XEa.default()),
        !e.name)
      )
        throw Error("ServiceConfig requires `name` property to be set");
      if (!e.type) throw Error("ServiceConfig requires `type` property to be set");
      if (!e.port) throw Error("ServiceConfig requires `port` property to be set");
      ((this.name = e.name.split(".").join("-")),
        (this.protocol = e.protocol || "tcp"),
        (this.type = dTi.toString({ name: e.type, protocol: this.protocol })),
        (this.port = e.port),
        (this.host = e.host || lTi.default.hostname()),
        (this.fqdn = `${this.name}.${this.type}${HSt}`),
        (this.txt = e.txt),
        (this.subtypes = e.subtypes),
        (this.disableIPv6 = !!e.disableIPv6));
    }
    records() {
      var e = [this.RecordPTR(this), this.RecordSRV(this), this.RecordTXT(this)];
      for (let r of this.subtypes || []) e.push(this.RecordSubtypePTR(this, r));
      let t = Object.values(lTi.default.networkInterfaces());
      for (let r of t) {
        let s = r;
        for (let a of s) {
          if (a.internal || a.mac === "00:00:00:00:00:00") continue;
          switch (a.family) {
            case "IPv4":
              e.push(this.RecordA(this, a.address));
              break;
            case "IPv6":
              if (this.disableIPv6) break;
              e.push(this.RecordAAAA(this, a.address));
              break;
          }
        }
      }
      return e;
    }
    RecordPTR(e) {
      return { name: `${e.type}${HSt}`, type: "PTR", ttl: 28800, data: e.fqdn };
    }
    RecordSubtypePTR(e, t) {
      return {
        name: `_${t}._sub.${e.type}${HSt}`,
        type: "PTR",
        ttl: 28800,
        data: `${e.name}.${e.type}${HSt}`,
      };
    }
    RecordSRV(e) {
      return { name: e.fqdn, type: "SRV", ttl: 120, data: { port: e.port, target: e.host } };
    }
    RecordTXT(e) {
      return { name: e.fqdn, type: "TXT", ttl: 4500, data: this.txtService.encode(e.txt) };
    }
    RecordA(e, t) {
      return { name: e.host, type: "A", ttl: 120, data: t };
    }
    RecordAAAA(e, t) {
      return { name: e.host, type: "AAAA", ttl: 120, data: t };
    }
  }
  dhe.Service = D0r;
  dhe.default = D0r;
});