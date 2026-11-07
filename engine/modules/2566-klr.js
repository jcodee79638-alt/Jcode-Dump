
var klr = Ie(function (gfc, Lri) {
  var { URL: hBo } = cr("url");
  function LBo(e) {
    try {
      let r = new hBo(e).pathname.slice(1);
      if (!r.match(/^-/)) {
        r = r.split("/");
        var t = r.indexOf("_rewrite");
        if (t === -1) t = r.length - 1;
        else t++;
        return decodeURIComponent(r[t]);
      }
    } catch {}
  }
  class nTe extends Error {
    constructor(e, t, r, s) {
      super();
      ((this.name = this.constructor.name),
        (this.headers = typeof t.headers?.raw === "function" ? t.headers.raw() : t.headers),
        (this.statusCode = t.status),
        (this.code = `E${t.status}`),
        (this.method = e),
        (this.uri = t.url),
        (this.body = r),
        (this.pkgid = s ? s.toString() : LBo(t.url)),
        Error.captureStackTrace(this, this.constructor));
    }
  }
  class dri extends nTe {
    constructor(e, t, r, s) {
      super(e, t, r, s);
      this.message = `${t.status} ${t.statusText} - ${this.method.toUpperCase()} ${this.spec || this.uri}${r && r.error ? " - " + r.error : ""}`;
    }
  }
  class mri extends nTe {
    constructor(e, t, r, s) {
      super(e, t, r, s);
      ((this.message = "OTP required for authentication"), (this.code = "EOTP"));
    }
  }
  class _ri extends nTe {
    constructor(e, t, r, s) {
      super(e, t, r, s);
      ((this.message = "Login is not allowed from your IP address"), (this.code = "EAUTHIP"));
    }
  }
  class hri extends nTe {
    constructor(e, t, r, s) {
      super(e, t, r, s);
      this.message = "Unable to authenticate, need: " + t.headers.get("www-authenticate");
    }
  }
  Lri.exports = {
    HttpErrorBase: nTe,
    HttpErrorGeneral: dri,
    HttpErrorAuthOTP: mri,
    HttpErrorAuthIPAddress: _ri,
    HttpErrorAuthUnknown: hri,
  };
});