
var cKi = Ie(function (qyA, IPr) {
  var Iza = ZJi().SourceMapConsumer,
    $Pr = cr("path"),
    IJ;
  try {
    if (((IJ = cr("fs")), !IJ.existsSync || !IJ.readFileSync)) IJ = null;
  } catch (e) {}
  var Dza = tKi();
  function rKi(e, t) {
    return e.require(t);
  }
  var nKi = !1,
    iKi = !1,
    gPr = !1,
    LQe = "auto",
    n$e = {},
    $Qe = {},
    yza = /^data:application\/json[^,]+base64,/,
    Qce = [],
    Yce = [];
  function DPr() {
    if (LQe === "browser") return !0;
    if (LQe === "node") return !1;
    return (
      typeof window < "u" &&
      typeof XMLHttpRequest === "function" &&
      !(window.require && window.module && window.process && window.process.type === "renderer")
    );
  }
  function Mza() {
    return typeof process === "object" && process !== null && typeof process.on === "function";
  }
  function xza() {
    if (typeof process === "object" && process !== null) return process.version;
    else return "";
  }
  function Sza() {
    if (typeof process === "object" && process !== null) return process.stderr;
  }
  function Tza(e) {
    if (typeof process === "object" && process !== null && typeof process.exit === "function")
      return process.exit(e);
  }
  function GCt(e) {
    return function (t) {
      for (var r = 0; r < e.length; r++) {
        var s = e[r](t);
        if (s) return s;
      }
      return null;
    };
  }
  var yPr = GCt(Qce);
  Qce.push(function (e) {
    if (((e = e.trim()), /^file:/.test(e)))
      e = e.replace(/file:\/\/\/(\w:)?/, function (s, a) {
        return a ? "" : "/";
      });
    if (e in n$e) return n$e[e];
    var t = "";
    try {
      if (!IJ) {
        var r = new XMLHttpRequest();
        if ((r.open("GET", e, !1), r.send(null), r.readyState === 4 && r.status === 200)) t = r.responseText;
      } else if (IJ.existsSync(e)) t = IJ.readFileSync(e, "utf8");
    } catch (s) {}
    return (n$e[e] = t);
  });
  function EPr(e, t) {
    if (!e) return t;
    var r = $Pr.dirname(e),
      s = /^\w+:\/\/[^\/]*/.exec(r),
      a = s ? s[0] : "",
      H = r.slice(a.length);
    if (a && /^\/\w\:/.test(H))
      return ((a += "/"), a + $Pr.resolve(r.slice(a.length), t).replace(/\\/g, "/"));
    return a + $Pr.resolve(r.slice(a.length), t);
  }
  function vza(e) {
    var t;
    if (DPr())
      try {
        var r = new XMLHttpRequest();
        (r.open("GET", e, !1), r.send(null), (t = r.readyState === 4 ? r.responseText : null));
        var s = r.getResponseHeader("SourceMap") || r.getResponseHeader("X-SourceMap");
        if (s) return s;
      } catch (f) {}
    t = yPr(e);
    var a =
        /(?:\/\/[@#][\s]*sourceMappingURL=([^\s'"]+)[\s]*$)|(?:\/\*[@#][\s]*sourceMappingURL=([^\s*'"]+)[\s]*(?:\*\/)[\s]*$)/gm,
      H,
      u;
    while ((u = a.exec(t))) H = u;
    if (!H) return null;
    return H[1];
  }
  var MPr = GCt(Yce);
  Yce.push(function (e) {
    var t = vza(e);
    if (!t) return null;
    var r;
    if (yza.test(t)) {
      var s = t.slice(t.indexOf(",") + 1);
      ((r = Dza(s, "base64").toString()), (t = e));
    } else ((t = EPr(e, t)), (r = yPr(t)));
    if (!r) return null;
    return { url: t, map: r };
  });
  function xPr(e) {
    var t = $Qe[e.source];
    if (!t) {
      var r = MPr(e.source);
      if (r) {
        if (((t = $Qe[e.source] = { url: r.url, map: new Iza(r.map) }), t.map.sourcesContent))
          t.map.sources.forEach(function (a, H) {
            var u = t.map.sourcesContent[H];
            if (u) {
              var f = EPr(t.url, a);
              n$e[f] = u;
            }
          });
      } else t = $Qe[e.source] = { url: null, map: null };
    }
    if (t && t.map && typeof t.map.originalPositionFor === "function") {
      var s = t.map.originalPositionFor(e);
      if (s.source !== null) return ((s.source = EPr(t.url, s.source)), s);
    }
    return e;
  }
  function oKi(e) {
    var t = /^eval at ([^(]+) \((.+):(\d+):(\d+)\)$/.exec(e);
    if (t) {
      var r = xPr({ source: t[2], line: +t[3], column: t[4] - 1 });
      return "eval at " + t[1] + " (" + r.source + ":" + r.line + ":" + (r.column + 1) + ")";
    }
    if (((t = /^eval at ([^(]+) \((.+)\)$/.exec(e)), t)) return "eval at " + t[1] + " (" + oKi(t[2]) + ")";
    return e;
  }
  function bza() {
    var e,
      t = "";
    if (this.isNative()) t = "native";
    else {
      if (((e = this.getScriptNameOrSourceURL()), !e && this.isEval()))
        ((t = this.getEvalOrigin()), (t += ", "));
      if (e) t += e;
      else t += "<anonymous>";
      var r = this.getLineNumber();
      if (r != null) {
        t += ":" + r;
        var s = this.getColumnNumber();
        if (s) t += ":" + s;
      }
    }
    var a = "",
      H = this.getFunctionName(),
      u = !0,
      f = this.isConstructor(),
      d = !(this.isToplevel() || f);
    if (d) {
      var _ = this.getTypeName();
      if (_ === "[object Object]") _ = "null";
      var L = this.getMethodName();
      if (H) {
        if (_ && H.indexOf(_) != 0) a += _ + ".";
        if (((a += H), L && H.indexOf("." + L) != H.length - L.length - 1)) a += " [as " + L + "]";
      } else a += _ + "." + (L || "<anonymous>");
    } else if (f) a += "new " + (H || "<anonymous>");
    else if (H) a += H;
    else ((a += t), (u = !1));
    if (u) a += " (" + t + ")";
    return a;
  }
  function sKi(e) {
    var t = {};
    return (
      Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach(function (r) {
        t[r] = /^(?:is|get)/.test(r)
          ? function () {
              return e[r].call(e);
            }
          : e[r];
      }),
      (t.toString = bza),
      t
    );
  }
  function aKi(e, t) {
    if (t === void 0) t = { nextPosition: null, curPosition: null };
    if (e.isNative()) return ((t.curPosition = null), e);
    var r = e.getFileName() || e.getScriptNameOrSourceURL();
    if (r) {
      var s = e.getLineNumber(),
        a = e.getColumnNumber() - 1,
        H = /^v(10\.1[6-9]|10\.[2-9][0-9]|10\.[0-9]{3,}|1[2-9]\d*|[2-9]\d|\d{3,}|11\.11)/,
        u = H.test(xza()) ? 0 : 62;
      if (s === 1 && a > u && !DPr() && !e.isEval()) a -= u;
      var f = xPr({ source: r, line: s, column: a });
      ((t.curPosition = f), (e = sKi(e)));
      var d = e.getFunctionName;
      return (
        (e.getFunctionName = function () {
          if (t.nextPosition == null) return d();
          return t.nextPosition.name || d();
        }),
        (e.getFileName = function () {
          return f.source;
        }),
        (e.getLineNumber = function () {
          return f.line;
        }),
        (e.getColumnNumber = function () {
          return f.column + 1;
        }),
        (e.getScriptNameOrSourceURL = function () {
          return f.source;
        }),
        e
      );
    }
    var _ = e.isEval() && e.getEvalOrigin();
    if (_)
      return (
        (_ = oKi(_)),
        (e = sKi(e)),
        (e.getEvalOrigin = function () {
          return _;
        }),
        e
      );
    return e;
  }
  function jza(e, t) {
    if (gPr) ((n$e = {}), ($Qe = {}));
    var r = e.name || "Error",
      s = e.message || "",
      a = r + ": " + s,
      H = { nextPosition: null, curPosition: null },
      u = [];
    for (var f = t.length - 1; f >= 0; f--)
      (u.push(
        `
    at ` + aKi(t[f], H),
      ),
        (H.nextPosition = H.curPosition));
    return ((H.curPosition = H.nextPosition = null), a + u.reverse().join(""));
  }
  function HKi(e) {
    var t = /\n    at [^(]+ \((.*):(\d+):(\d+)\)/.exec(e.stack);
    if (t) {
      var r = t[1],
        s = +t[2],
        a = +t[3],
        H = n$e[r];
      if (!H && IJ && IJ.existsSync(r))
        try {
          H = IJ.readFileSync(r, "utf8");
        } catch (f) {
          H = "";
        }
      if (H) {
        var u = H.split(/(?:\r\n|\r|\n)/)[s - 1];
        if (u)
          return (
            r +
            ":" +
            s +
            `
` +
            u +
            `
` +
            Array(a).join(" ") +
            "^"
          );
      }
    }
    return null;
  }
  function Pza(e) {
    var t = HKi(e),
      r = Sza();
    if (r && r._handle && r._handle.setBlocking) r._handle.setBlocking(!0);
    if (t) (console.error(), console.error(t));
    (console.error(e.stack), Tza(1));
  }
  function Cza() {
    var e = process.emit;
    process.emit = function (t) {
      if (t === "uncaughtException") {
        var r = arguments[1] && arguments[1].stack,
          s = this.listeners(t).length > 0;
        if (r && !s) return Pza(arguments[1]);
      }
      return e.apply(this, arguments);
    };
  }
  var wza = Qce.slice(0),
    kza = Yce.slice(0);
  qyA.wrapCallSite = aKi;
  qyA.getErrorSource = HKi;
  qyA.mapSourcePosition = xPr;
  qyA.retrieveSourceMap = MPr;
  qyA.install = function (e) {
    if (((e = e || {}), e.environment)) {
      if (((LQe = e.environment), ["node", "browser", "auto"].indexOf(LQe) === -1))
        throw Error("environment " + LQe + " was unknown. Available options are {auto, browser, node}");
    }
    if (e.retrieveFile) {
      if (e.overrideRetrieveFile) Qce.length = 0;
      Qce.unshift(e.retrieveFile);
    }
    if (e.retrieveSourceMap) {
      if (e.overrideRetrieveSourceMap) Yce.length = 0;
      Yce.unshift(e.retrieveSourceMap);
    }
    if (e.hookRequire && !DPr()) {
      var t = rKi(IPr, "module"),
        r = t.prototype._compile;
      if (!r.__sourceMapSupport)
        ((t.prototype._compile = function (H, u) {
          return ((n$e[u] = H), ($Qe[u] = void 0), r.call(this, H, u));
        }),
          (t.prototype._compile.__sourceMapSupport = !0));
    }
    if (!gPr) gPr = "emptyCacheBetweenOperations" in e ? e.emptyCacheBetweenOperations : !1;
    if (!nKi) ((nKi = !0), (Error.prepareStackTrace = jza));
    if (!iKi) {
      var s = "handleUncaughtExceptions" in e ? e.handleUncaughtExceptions : !0;
      try {
        var a = rKi(IPr, "worker_threads");
        if (a.isMainThread === !1) s = !1;
      } catch (H) {}
      if (s && Mza()) ((iKi = !0), Cza());
    }
  };
  qyA.resetRetrieveHandlers = function () {
    ((Qce.length = 0),
      (Yce.length = 0),
      (Qce = wza.slice(0)),
      (Yce = kza.slice(0)),
      (MPr = GCt(Yce)),
      (yPr = GCt(Qce)));
  };
});