
var uwe = Ie(function (VJi) {
  function gKa(e, t, r) {
    if (t in e) return e[t];
    else if (arguments.length === 3) return r;
    else throw Error('"' + t + '" is a required argument.');
  }
  VJi.getArg = gKa;
  var NJi = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,
    EKa = /^data:.+\,.+$/;
  function mQe(e) {
    var t = e.match(NJi);
    if (!t) return null;
    return { scheme: t[1], auth: t[2], host: t[3], port: t[4], path: t[5] };
  }
  VJi.urlParse = mQe;
  function cwe(e) {
    var t = "";
    if (e.scheme) t += e.scheme + ":";
    if (((t += "//"), e.auth)) t += e.auth + "@";
    if (e.host) t += e.host;
    if (e.port) t += ":" + e.port;
    if (e.path) t += e.path;
    return t;
  }
  VJi.urlGenerate = cwe;
  function cPr(e) {
    var t = e,
      r = mQe(e);
    if (r) {
      if (!r.path) return e;
      t = r.path;
    }
    var s = VJi.isAbsolute(t),
      a = t.split(/\/+/);
    for (var H, u = 0, f = a.length - 1; f >= 0; f--)
      if (((H = a[f]), H === ".")) a.splice(f, 1);
      else if (H === "..") u++;
      else if (u > 0)
        if (H === "") (a.splice(f + 1, u), (u = 0));
        else (a.splice(f, 2), u--);
    if (((t = a.join("/")), t === "")) t = s ? "/" : ".";
    if (r) return ((r.path = t), cwe(r));
    return t;
  }
  VJi.normalize = cPr;
  function FJi(e, t) {
    if (e === "") e = ".";
    if (t === "") t = ".";
    var r = mQe(t),
      s = mQe(e);
    if (s) e = s.path || "/";
    if (r && !r.scheme) {
      if (s) r.scheme = s.scheme;
      return cwe(r);
    }
    if (r || t.match(EKa)) return t;
    if (s && !s.host && !s.path) return ((s.host = t), cwe(s));
    var a = t.charAt(0) === "/" ? t : cPr(e.replace(/\/+$/, "") + "/" + t);
    if (s) return ((s.path = a), cwe(s));
    return a;
  }
  VJi.join = FJi;
  VJi.isAbsolute = function (e) {
    return e.charAt(0) === "/" || NJi.test(e);
  };
  function IKa(e, t) {
    if (e === "") e = ".";
    e = e.replace(/\/$/, "");
    var r = 0;
    while (t.indexOf(e + "/") !== 0) {
      var s = e.lastIndexOf("/");
      if (s < 0) return t;
      if (((e = e.slice(0, s)), e.match(/^([^\/]+:\/)?\/*$/))) return t;
      ++r;
    }
    return Array(r + 1).join("../") + t.substr(e.length + 1);
  }
  VJi.relative = IKa;
  var BJi = (function () {
    var e = Object.create(null);
    return !("__proto__" in e);
  })();
  function RJi(e) {
    return e;
  }
  function DKa(e) {
    if (WJi(e)) return "$" + e;
    return e;
  }
  VJi.toSetString = BJi ? RJi : DKa;
  function yKa(e) {
    if (WJi(e)) return e.slice(1);
    return e;
  }
  VJi.fromSetString = BJi ? RJi : yKa;
  function WJi(e) {
    if (!e) return !1;
    var t = e.length;
    if (t < 9) return !1;
    if (
      e.charCodeAt(t - 1) !== 95 ||
      e.charCodeAt(t - 2) !== 95 ||
      e.charCodeAt(t - 3) !== 111 ||
      e.charCodeAt(t - 4) !== 116 ||
      e.charCodeAt(t - 5) !== 111 ||
      e.charCodeAt(t - 6) !== 114 ||
      e.charCodeAt(t - 7) !== 112 ||
      e.charCodeAt(t - 8) !== 95 ||
      e.charCodeAt(t - 9) !== 95
    )
      return !1;
    for (var r = t - 10; r >= 0; r--) if (e.charCodeAt(r) !== 36) return !1;
    return !0;
  }
  function MKa(e, t, r) {
    var s = Awe(e.source, t.source);
    if (s !== 0) return s;
    if (((s = e.originalLine - t.originalLine), s !== 0)) return s;
    if (((s = e.originalColumn - t.originalColumn), s !== 0 || r)) return s;
    if (((s = e.generatedColumn - t.generatedColumn), s !== 0)) return s;
    if (((s = e.generatedLine - t.generatedLine), s !== 0)) return s;
    return Awe(e.name, t.name);
  }
  VJi.compareByOriginalPositions = MKa;
  function xKa(e, t, r) {
    var s = e.generatedLine - t.generatedLine;
    if (s !== 0) return s;
    if (((s = e.generatedColumn - t.generatedColumn), s !== 0 || r)) return s;
    if (((s = Awe(e.source, t.source)), s !== 0)) return s;
    if (((s = e.originalLine - t.originalLine), s !== 0)) return s;
    if (((s = e.originalColumn - t.originalColumn), s !== 0)) return s;
    return Awe(e.name, t.name);
  }
  VJi.compareByGeneratedPositionsDeflated = xKa;
  function Awe(e, t) {
    if (e === t) return 0;
    if (e === null) return 1;
    if (t === null) return -1;
    if (e > t) return 1;
    return -1;
  }
  function SKa(e, t) {
    var r = e.generatedLine - t.generatedLine;
    if (r !== 0) return r;
    if (((r = e.generatedColumn - t.generatedColumn), r !== 0)) return r;
    if (((r = Awe(e.source, t.source)), r !== 0)) return r;
    if (((r = e.originalLine - t.originalLine), r !== 0)) return r;
    if (((r = e.originalColumn - t.originalColumn), r !== 0)) return r;
    return Awe(e.name, t.name);
  }
  VJi.compareByGeneratedPositionsInflated = SKa;
  function TKa(e) {
    return JSON.parse(e.replace(/^\)]}'[^\n]*\n/, ""));
  }
  VJi.parseSourceMapInput = TKa;
  function vKa(e, t, r) {
    if (((t = t || ""), e)) {
      if (e[e.length - 1] !== "/" && t[0] !== "/") e += "/";
      t = e + t;
    }
    if (r) {
      var s = mQe(r);
      if (!s) throw Error("sourceMapURL could not be parsed");
      if (s.path) {
        var a = s.path.lastIndexOf("/");
        if (a >= 0) s.path = s.path.substring(0, a + 1);
      }
      t = FJi(cwe(s), t);
    }
    return cPr(t);
  }
  VJi.computeSourceURL = vKa;
});