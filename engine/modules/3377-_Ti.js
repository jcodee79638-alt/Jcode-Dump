
var _Ti = Ie(function (mhe) {
  var mTi =
    (mhe && mhe.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(mhe, "__esModule", { value: !0 });
  mhe.Registry = void 0;
  var JEa = mTi(aSt()),
    M0r = mTi(y0r()),
    KEa = 3600000,
    zEa = 3,
    QEa = function () {};
  class x0r {
    constructor(e) {
      ((this.services = []), (this.server = e));
    }
    publish(e) {
      function t(a, H, u) {
        if (a.activated) return;
        if (((a.activated = !0), H.services.push(a), !(a instanceof M0r.default))) return;
        if (u === null || u === void 0 ? void 0 : u.probe)
          H.probe(H.server.mdns, a, (f) => {
            if (f) {
              if (a.stop !== void 0) a.stop();
              console.log(Error("Service name is already in use on the network"));
              return;
            }
            H.announce(H.server, a);
          });
        else H.announce(H.server, a);
      }
      function r(a, H, u) {
        if (!u) u = QEa;
        if (!a.activated) return process.nextTick(u);
        if (!(a instanceof M0r.default)) return process.nextTick(u);
        H.teardown(H.server, a, u);
        let f = H.services.indexOf(a);
        if (f !== -1) H.services.splice(f, 1);
      }
      let s = new M0r.default(e);
      return (
        (s.start = t.bind(null, s, this)),
        (s.stop = r.bind(null, s, this)),
        s.start({ probe: e.probe !== !1 }),
        s
      );
    }
    unpublishAll(e) {
      (this.teardown(this.server, this.services, e), (this.services = []));
    }
    destroy() {
      this.services.map((e) => (e.destroyed = !0));
    }
    probe(e, t, r) {
      var s = !1,
        a = 0,
        H;
      let u = () => {
          if (!t.activated || t.destroyed) return;
          e.query(t.fqdn, "ANY", function () {
            ((s = !0), (H = setTimeout(++a < 3 ? u : _, 250)), H.unref());
          });
        },
        f = (L) => {
          if (!s) return;
          if (L.answers.some(d) || L.additionals.some(d)) _(!0);
        },
        d = (L) => (0, JEa.default)(L.name, t.fqdn),
        _ = (L) => {
          (e.removeListener("response", f), clearTimeout(H), r(!!L));
        };
      (e.on("response", f), setTimeout(u, Math.random() * 250));
    }
    announce(e, t) {
      var r = 1000,
        s = t.records();
      e.register(s);
      let a = () => {
        if (!t.activated || t.destroyed) return;
        e.mdns.respond(s, function () {
          if (!t.published) ((t.activated = !0), (t.published = !0), t.emit("up"));
          if (((r = r * zEa), r < KEa && !t.destroyed)) setTimeout(a, r).unref();
        });
      };
      a();
    }
    teardown(e, t, r) {
      if (!Array.isArray(t)) t = [t];
      t = t.filter((a) => a.activated);
      var s = t.flatMap(function (a) {
        a.activated = !1;
        var H = a.records();
        return (
          H.forEach((u) => {
            u.ttl = 0;
          }),
          H
        );
      });
      if (s.length === 0) return r && process.nextTick(r);
      (e.unregister(s),
        e.mdns.respond(s, function () {
          if (
            (t.forEach(function (a) {
              a.published = !1;
            }),
            typeof r === "function")
          )
            r.apply(null, arguments);
        }));
    }
  }
  mhe.Registry = x0r;
  mhe.default = x0r;
});