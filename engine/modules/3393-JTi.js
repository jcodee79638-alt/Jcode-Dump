
var JTi = Ie(function (o7) {
  var lSt =
    (o7 && o7.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(o7, "__esModule", { value: !0 });
  o7.Browser = o7.Service = o7.Bonjour = void 0;
  var qIa = lSt(_Ti()),
    GIa = lSt(OTi()),
    O0r = lSt(XTi());
  o7.Browser = O0r.default;
  var XIa = lSt(y0r());
  o7.Service = XIa.default;
  class U0r {
    constructor(e = {}, t) {
      ((this.server = new GIa.default(e, t)), (this.registry = new qIa.default(this.server)));
    }
    publish(e) {
      return this.registry.publish(e);
    }
    unpublishAll(e) {
      return this.registry.unpublishAll(e);
    }
    find(e = null, t) {
      return new O0r.default(this.server.mdns, e, t);
    }
    findOne(e = null, t = 1e4, r) {
      let s = new O0r.default(this.server.mdns, e);
      var a;
      return (
        s.once("up", (H) => {
          if (a !== void 0) clearTimeout(a);
          if ((s.stop(), r)) r(H);
        }),
        (a = setTimeout(() => {
          if ((s.stop(), r)) r(null);
        }, t)),
        s
      );
    }
    destroy(e) {
      (this.registry.destroy(), this.server.mdns.destroy(e));
    }
  }
  o7.Bonjour = U0r;
  o7.default = U0r;
});