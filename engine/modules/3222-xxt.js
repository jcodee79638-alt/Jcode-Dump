
var xxt = Ie(function (ebc, yMi) {
  yMi.exports = Hb;
  function Hb(e) {
    if (!e) return Object.create(Hb.prototype);
    this.url = e.replace(/^[ \t\n\r\f]+|[ \t\n\r\f]+$/g, "");
    var t = Hb.pattern.exec(this.url);
    if (t) {
      if (t[2]) this.scheme = t[2];
      if (t[4]) {
        var r = t[4].match(Hb.userinfoPattern);
        if (r) ((this.username = r[1]), (this.password = r[3]), (t[4] = t[4].substring(r[0].length)));
        if (t[4].match(Hb.portPattern)) {
          var s = t[4].lastIndexOf(":");
          ((this.host = t[4].substring(0, s)), (this.port = t[4].substring(s + 1)));
        } else this.host = t[4];
      }
      if (t[5]) this.path = t[5];
      if (t[6]) this.query = t[7];
      if (t[8]) this.fragment = t[9];
    }
  }
  Hb.pattern = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/;
  Hb.userinfoPattern = /^([^@:]*)(:([^@]*))?@/;
  Hb.portPattern = /:\d+$/;
  Hb.authorityPattern = /^[^:\/?#]+:\/\//;
  Hb.hierarchyPattern = /^[^:\/?#]+:\//;
  Hb.percentEncode = function (t) {
    var r = t.charCodeAt(0);
    if (r < 256) return "%" + r.toString(16);
    else throw Error("can't percent-encode codepoints > 255 yet");
  };
  Hb.prototype = {
    constructor: Hb,
    isAbsolute: function () {
      return !!this.scheme;
    },
    isAuthorityBased: function () {
      return Hb.authorityPattern.test(this.url);
    },
    isHierarchical: function () {
      return Hb.hierarchyPattern.test(this.url);
    },
    toString: function () {
      var e = "";
      if (this.scheme !== void 0) e += this.scheme + ":";
      if (this.isAbsolute()) {
        if (((e += "//"), this.username || this.password)) {
          if (((e += this.username || ""), this.password)) e += ":" + this.password;
          e += "@";
        }
        if (this.host) e += this.host;
      }
      if (this.port !== void 0) e += ":" + this.port;
      if (this.path !== void 0) e += this.path;
      if (this.query !== void 0) e += "?" + this.query;
      if (this.fragment !== void 0) e += "#" + this.fragment;
      return e;
    },
    resolve: function (e) {
      var t = this,
        r = new Hb(e),
        s = new Hb();
      if (r.scheme !== void 0)
        ((s.scheme = r.scheme),
          (s.username = r.username),
          (s.password = r.password),
          (s.host = r.host),
          (s.port = r.port),
          (s.path = H(r.path)),
          (s.query = r.query));
      else if (((s.scheme = t.scheme), r.host !== void 0))
        ((s.username = r.username),
          (s.password = r.password),
          (s.host = r.host),
          (s.port = r.port),
          (s.path = H(r.path)),
          (s.query = r.query));
      else if (
        ((s.username = t.username), (s.password = t.password), (s.host = t.host), (s.port = t.port), !r.path)
      )
        if (((s.path = t.path), r.query !== void 0)) s.query = r.query;
        else s.query = t.query;
      else {
        if (r.path.charAt(0) === "/") s.path = H(r.path);
        else ((s.path = a(t.path, r.path)), (s.path = H(s.path)));
        s.query = r.query;
      }
      return ((s.fragment = r.fragment), s.toString());
      function a(u, f) {
        if (t.host !== void 0 && !t.path) return "/" + f;
        var d = u.lastIndexOf("/");
        if (d === -1) return f;
        else return u.substring(0, d + 1) + f;
      }
      function H(u) {
        if (!u) return u;
        var f = "";
        while (u.length > 0) {
          if (u === "." || u === "..") {
            u = "";
            break;
          }
          var d = u.substring(0, 2),
            _ = u.substring(0, 3),
            L = u.substring(0, 4);
          if (_ === "../") u = u.substring(3);
          else if (d === "./") u = u.substring(2);
          else if (_ === "/./") u = "/" + u.substring(3);
          else if (d === "/." && u.length === 2) u = "/";
          else if (L === "/../" || (_ === "/.." && u.length === 3))
            ((u = "/" + u.substring(4)), (f = f.replace(/\/?[^\/]*$/, "")));
          else {
            var I = u.match(/(\/?([^\/]*))/)[0];
            ((f += I), (u = u.substring(I.length)));
          }
        }
        return f;
      }
    },
  };
});