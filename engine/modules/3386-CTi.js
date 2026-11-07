
var CTi = Ie(function (gCc, PTi) {
  var j0r = STi(),
    TIa = cr("dgram"),
    vIa = bTi(),
    bIa = cr("events"),
    C0r = cr("os"),
    P0r = function () {};
  PTi.exports = function (e) {
    if (!e) e = {};
    var t = new bIa.EventEmitter(),
      r = typeof e.port === "number" ? e.port : 5353,
      s = e.type || "udp4",
      a = e.ip || e.host || (s === "udp4" ? "224.0.0.251" : null),
      H = { address: a, port: r },
      u = {},
      f = !1,
      d = null;
    if (s === "udp6" && (!a || !e.interface))
      throw Error("For IPv6 multicast you must specify `ip` and `interface`");
    var _ =
      e.socket ||
      TIa.createSocket({
        type: s,
        reuseAddr: e.reuseAddr !== !1,
        toString: function () {
          return s;
        },
      });
    (_.on("error", function (I) {
      if (I.code === "EACCES" || I.code === "EADDRINUSE") t.emit("error", I);
      else t.emit("warning", I);
    }),
      _.on("message", function (I, D) {
        try {
          I = j0r.decode(I);
        } catch (S) {
          t.emit("warning", S);
          return;
        }
        if ((t.emit("packet", I, D), I.type === "query")) t.emit("query", I, D);
        if (I.type === "response") t.emit("response", I, D);
      }),
      _.on("listening", function () {
        if (!r) r = H.port = _.address().port;
        if (e.multicast !== !1)
          (t.update(),
            (d = setInterval(t.update, 5000)),
            _.setMulticastTTL(e.ttl || 255),
            _.setMulticastLoopback(e.loopback !== !1));
      }));
    var L = vIa(function (I) {
      if (!r || e.bind === !1) return I(null);
      (_.once("error", I),
        _.bind(r, e.bind || e.interface, function () {
          (_.removeListener("error", I), I(null));
        }));
    });
    return (
      L(function (I) {
        if (I) return t.emit("error", I);
        t.emit("ready");
      }),
      (t.send = function (I, D, S) {
        if (typeof D === "function") return t.send(I, null, D);
        if (!S) S = P0r;
        if (!D) D = H;
        else if (!D.host && !D.address) D.address = H.address;
        L(T);
        function T(C) {
          if (f) return S();
          if (C) return S(C);
          var O = j0r.encode(I);
          _.send(O, 0, O.length, D.port, D.address || D.host, S);
        }
      }),
      (t.response = t.respond =
        function (I, D, S) {
          if (Array.isArray(I)) I = { answers: I };
          ((I.type = "response"), (I.flags = (I.flags || 0) | j0r.AUTHORITATIVE_ANSWER), t.send(I, D, S));
        }),
      (t.query = function (I, D, S, T) {
        if (typeof D === "function") return t.query(I, null, null, D);
        if (typeof D === "object" && D && D.port) return t.query(I, null, D, S);
        if (typeof S === "function") return t.query(I, D, null, S);
        if (!T) T = P0r;
        if (typeof I === "string") I = [{ name: I, type: D || "ANY" }];
        if (Array.isArray(I)) I = { type: "query", questions: I };
        ((I.type = "query"), t.send(I, S, T));
      }),
      (t.destroy = function (I) {
        if (!I) I = P0r;
        if (f) return process.nextTick(I);
        ((f = !0), clearInterval(d));
        for (var D in u)
          try {
            _.dropMembership(a, D);
          } catch (S) {}
        ((u = {}), _.close(I));
      }),
      (t.update = function () {
        var I = e.interface ? [].concat(e.interface) : PIa(),
          D = !1;
        for (var S = 0; S < I.length; S++) {
          var T = I[S];
          if (u[T]) continue;
          try {
            (_.addMembership(a, T), (u[T] = !0), (D = !0));
          } catch (C) {
            t.emit("warning", C);
          }
        }
        if (D) {
          if (_.setMulticastInterface)
            try {
              _.setMulticastInterface(e.interface || jIa());
            } catch (C) {
              t.emit("warning", C);
            }
          t.emit("networkInterface");
        }
      }),
      t
    );
  };
  function jIa() {
    var e = C0r.networkInterfaces(),
      t = Object.keys(e);
    for (var r = 0; r < t.length; r++) {
      var s = e[t[r]];
      for (var a = 0; a < s.length; a++) {
        var H = s[a];
        if (jTi(H.family) && !H.internal) {
          if (C0r.platform() === "darwin" && t[r] === "en0") return H.address;
          return "0.0.0.0";
        }
      }
    }
    return "127.0.0.1";
  }
  function PIa() {
    var e = C0r.networkInterfaces(),
      t = Object.keys(e),
      r = [];
    for (var s = 0; s < t.length; s++) {
      var a = e[t[s]];
      for (var H = 0; H < a.length; H++) {
        var u = a[H];
        if (jTi(u.family)) {
          r.push(u.address);
          break;
        }
      }
    }
    return r;
  }
  function jTi(e) {
    return e === 4 || e === "IPv4";
  }
});