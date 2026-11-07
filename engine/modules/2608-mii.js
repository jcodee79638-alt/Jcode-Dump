
var mii = Ie(function (apc, dii) {
  var fii = cr("fs"),
    y3o = ky(),
    { URL: Rfr } = cr("url"),
    uii = (e, t) => {
      let r = new Rfr(e),
        s = `//${r.host}${r.pathname}`;
      while (s.length > 2) {
        let a = M3o(s, t);
        if (a) return { regKey: s, authKey: a };
        s = s.replace(/([^/]+|\/)$/, "");
      }
      return { regKey: !1, authKey: null };
    },
    M3o = (e, t) => {
      if (t[`${e}:_authToken`]) return "_authToken";
      if (t[`${e}:_auth`]) return "_auth";
      if (t[`${e}:username`] && t[`${e}:_password`]) return "username";
      if (t[`${e}:certfile`] && t[`${e}:keyfile`]) return "certfile";
      return !1;
    },
    x3o = (e, t) => {
      let r = new Rfr(e),
        s = new Rfr(t);
      return r.host === s.host;
    },
    S3o = (e) => {
      let { spec: t } = e,
        { scope: r, subSpec: s } = t ? y3o(t) : {},
        a = s && s.scope,
        H = s ? a : r;
      return (H && e[`${H}:registry`]) || e.registry;
    },
    lii = (e) => {
      try {
        return fii.readFileSync(e, "utf8");
      } catch (t) {
        if (t.code !== "ENOENT") throw t;
        return null;
      }
    },
    pii = (e, t = {}) => {
      let { forceAuth: r } = t;
      if (!e) throw Error("URI is required");
      let { regKey: s, authKey: a } = uii(e, r || t);
      if (r && !s)
        return new MIt({
          regKey: !1,
          authKey: null,
          scopeAuthKey: null,
          token: r._authToken || r.token,
          username: r.username,
          password: r._password || r.password,
          auth: r._auth || r.auth,
          certfile: r.certfile,
          keyfile: r.keyfile,
        });
      if (!s) {
        let I = S3o(t);
        if (I && e !== I && x3o(e, I)) return pii(I, t);
        else if (I !== t.registry) {
          let { regKey: D, authKey: S } = uii(I, t);
          return new MIt({ scopeAuthKey: D, regKey: D, authKey: S });
        }
      }
      let {
        [`${s}:_authToken`]: H,
        [`${s}:username`]: u,
        [`${s}:_password`]: f,
        [`${s}:_auth`]: d,
        [`${s}:certfile`]: _,
        [`${s}:keyfile`]: L,
      } = t;
      return new MIt({
        scopeAuthKey: null,
        regKey: s,
        authKey: a,
        token: H,
        auth: d,
        username: u,
        password: f,
        certfile: _,
        keyfile: L,
      });
    };
  class MIt {
    constructor({
      token: e,
      auth: t,
      username: r,
      password: s,
      scopeAuthKey: a,
      certfile: H,
      keyfile: u,
      regKey: f,
      authKey: d,
    }) {
      if (
        ((this.scopeAuthKey = a),
        (this.regKey = f),
        (this.authKey = d),
        (this.token = null),
        (this.auth = null),
        (this.isBasicAuth = !1),
        (this.cert = null),
        (this.key = null),
        e)
      )
        this.token = e;
      else if (t) this.auth = t;
      else if (r && s) {
        let _ = Buffer.from(s, "base64").toString("utf8");
        ((this.auth = Buffer.from(`${r}:${_}`, "utf8").toString("base64")), (this.isBasicAuth = !0));
      }
      if (H && u) {
        let _ = lii(H, "utf-8"),
          L = lii(u, "utf-8");
        if (_ && L) ((this.cert = _), (this.key = L));
      }
    }
  }
  dii.exports = pii;
});