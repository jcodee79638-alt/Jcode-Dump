
var xgr = Ie(function (sbc, NMi) {
  var dT = xxt();
  NMi.exports = mGe;
  function mGe() {}
  mGe.prototype = Object.create(Object.prototype, {
    _url: {
      get: function () {
        return new dT(this.href);
      },
    },
    protocol: {
      get: function () {
        var e = this._url;
        if (e && e.scheme) return e.scheme + ":";
        else return ":";
      },
      set: function (e) {
        var t = this.href,
          r = new dT(t);
        if (r.isAbsolute()) {
          if (
            ((e = e.replace(/:+$/, "")), (e = e.replace(/[^-+\.a-zA-Z0-9]/g, dT.percentEncode)), e.length > 0)
          )
            ((r.scheme = e), (t = r.toString()));
        }
        this.href = t;
      },
    },
    host: {
      get: function () {
        var e = this._url;
        if (e.isAbsolute() && e.isAuthorityBased()) return e.host + (e.port ? ":" + e.port : "");
        else return "";
      },
      set: function (e) {
        var t = this.href,
          r = new dT(t);
        if (r.isAbsolute() && r.isAuthorityBased()) {
          if (((e = e.replace(/[^-+\._~!$&'()*,;:=a-zA-Z0-9]/g, dT.percentEncode)), e.length > 0))
            ((r.host = e), delete r.port, (t = r.toString()));
        }
        this.href = t;
      },
    },
    hostname: {
      get: function () {
        var e = this._url;
        if (e.isAbsolute() && e.isAuthorityBased()) return e.host;
        else return "";
      },
      set: function (e) {
        var t = this.href,
          r = new dT(t);
        if (r.isAbsolute() && r.isAuthorityBased()) {
          if (
            ((e = e.replace(/^\/+/, "")),
            (e = e.replace(/[^-+\._~!$&'()*,;:=a-zA-Z0-9]/g, dT.percentEncode)),
            e.length > 0)
          )
            ((r.host = e), (t = r.toString()));
        }
        this.href = t;
      },
    },
    port: {
      get: function () {
        var e = this._url;
        if (e.isAbsolute() && e.isAuthorityBased() && e.port !== void 0) return e.port;
        else return "";
      },
      set: function (e) {
        var t = this.href,
          r = new dT(t);
        if (r.isAbsolute() && r.isAuthorityBased()) {
          if (((e = "" + e), (e = e.replace(/[^0-9].*$/, "")), (e = e.replace(/^0+/, "")), e.length === 0))
            e = "0";
          if (parseInt(e, 10) <= 65535) ((r.port = e), (t = r.toString()));
        }
        this.href = t;
      },
    },
    pathname: {
      get: function () {
        var e = this._url;
        if (e.isAbsolute() && e.isHierarchical()) return e.path;
        else return "";
      },
      set: function (e) {
        var t = this.href,
          r = new dT(t);
        if (r.isAbsolute() && r.isHierarchical()) {
          if (e.charAt(0) !== "/") e = "/" + e;
          ((e = e.replace(/[^-+\._~!$&'()*,;:=@\/a-zA-Z0-9]/g, dT.percentEncode)),
            (r.path = e),
            (t = r.toString()));
        }
        this.href = t;
      },
    },
    search: {
      get: function () {
        var e = this._url;
        if (e.isAbsolute() && e.isHierarchical() && e.query !== void 0) return "?" + e.query;
        else return "";
      },
      set: function (e) {
        var t = this.href,
          r = new dT(t);
        if (r.isAbsolute() && r.isHierarchical()) {
          if (e.charAt(0) === "?") e = e.substring(1);
          ((e = e.replace(/[^-+\._~!$&'()*,;:=@\/?a-zA-Z0-9]/g, dT.percentEncode)),
            (r.query = e),
            (t = r.toString()));
        }
        this.href = t;
      },
    },
    hash: {
      get: function () {
        var e = this._url;
        if (e == null || e.fragment == null || e.fragment === "") return "";
        else return "#" + e.fragment;
      },
      set: function (e) {
        var t = this.href,
          r = new dT(t);
        if (e.charAt(0) === "#") e = e.substring(1);
        ((e = e.replace(/[^-+\._~!$&'()*,;:=@\/?a-zA-Z0-9]/g, dT.percentEncode)),
          (r.fragment = e),
          (t = r.toString()),
          (this.href = t));
      },
    },
    username: {
      get: function () {
        var e = this._url;
        return e.username || "";
      },
      set: function (e) {
        var t = this.href,
          r = new dT(t);
        if (r.isAbsolute())
          ((e = e.replace(/[\x00-\x1F\x7F-\uFFFF "#<>?`\/@\\:]/g, dT.percentEncode)),
            (r.username = e),
            (t = r.toString()));
        this.href = t;
      },
    },
    password: {
      get: function () {
        var e = this._url;
        return e.password || "";
      },
      set: function (e) {
        var t = this.href,
          r = new dT(t);
        if (r.isAbsolute()) {
          if (e === "") r.password = null;
          else ((e = e.replace(/[\x00-\x1F\x7F-\uFFFF "#<>?`\/@\\]/g, dT.percentEncode)), (r.password = e));
          t = r.toString();
        }
        this.href = t;
      },
    },
    origin: {
      get: function () {
        var e = this._url;
        if (e == null) return "";
        var t = function (r) {
          var s = [e.scheme, e.host, +e.port || r];
          return s[0] + "://" + s[1] + (s[2] === r ? "" : ":" + s[2]);
        };
        switch (e.scheme) {
          case "ftp":
            return t(21);
          case "gopher":
            return t(70);
          case "http":
          case "ws":
            return t(80);
          case "https":
          case "wss":
            return t(443);
          default:
            return e.scheme + "://";
        }
      },
    },
  });
  mGe._inherit = function (e) {
    Object.getOwnPropertyNames(mGe.prototype).forEach(function (t) {
      if (t === "constructor" || t === "href") return;
      var r = Object.getOwnPropertyDescriptor(mGe.prototype, t);
      Object.defineProperty(e, t, r);
    });
  };
});