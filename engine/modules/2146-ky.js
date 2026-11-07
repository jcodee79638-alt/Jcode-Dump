
var ky = Ie(function (htc, FVe) {
  var { URL: rHr } = cr("url"),
    q2 = cr("path/win32"),
    { homedir: H_o } = cr("os"),
    Mwn = jVe(),
    q$t = Qj(),
    xwn = Ewn(),
    { log: c_o } = mg(),
    Swn = /\\|[/]/,
    Twn = /^(?:git[+])?[a-z]+:/i,
    A_o = /^[^@]+@[^:.]+\.[^:]+:.+$/i,
    iHr = /[.](?:tgz|tar\.gz|tar)$/i,
    u_o = /:[0-9]+(\/|$)/i,
    l_o = /^(?:[.]|~[/]|[/\\]|[a-zA-Z]:)/,
    f_o = /^(?:[.]|~[/]|[/]|[a-zA-Z]:)/;
  function NVe(e, t) {
    let r, s;
    if (typeof e === "object")
      if (e instanceof G$t && (!t || t === e.where)) return e;
      else if (e.name && e.rawSpec) return NVe.resolve(e.name, e.rawSpec, t || e.where);
      else return NVe(e.raw, t || e.where);
    let a = e.indexOf("@", 1),
      H = a > 0 ? e.slice(0, a) : e;
    if (Twn.test(e)) s = e;
    else if (A_o.test(e)) s = `git+ssh://${e}`;
    else if (!H.startsWith("@") && (Swn.test(H) || iHr.test(H))) s = e;
    else if (a > 0) ((r = H), (s = e.slice(a + 1) || "*"));
    else if (xwn(e).validForOldPackages) ((r = e), (s = "*"));
    else s = e;
    return vwn(r, s, t, e);
  }
  function p_o(e) {
    if (!e) return !1;
    if (e.toLowerCase().startsWith("file:")) return !0;
    return l_o.test(e);
  }
  function d_o(e) {
    if (!e) return !1;
    return e.toLowerCase().startsWith("npm:");
  }
  function vwn(e, t, r, s) {
    let a = new G$t({ raw: s, name: e, rawSpec: t, fromArgument: s != null });
    if (e) a.name = e;
    if (!r) r = process.cwd();
    if (p_o(t)) return ywn(a, r);
    else if (d_o(t)) return D_o(a, r);
    let H = Mwn.fromUrl(t, { noGitPlus: !0, noCommittish: !0 });
    if (H) return g_o(a, H);
    else if (t && Twn.test(t)) return I_o(a);
    else if (t && (Swn.test(t) || iHr.test(t))) return ywn(a, r);
    else return y_o(a);
  }
  function m_o(e, t = "https://registry.npmjs.org") {
    let r = NVe(e);
    if (r.type !== "version") throw L_o(r.type, r.raw);
    let s = "pkg:npm/" + r.name.replace(/^@/, "%40") + "@" + r.rawSpec;
    if (t !== "https://registry.npmjs.org") s += "?repository_url=" + t;
    return s;
  }
  function __o(e, t, r) {
    let s = Error(`Invalid package name "${e}" of package "${r}": ${t.errors.join("; ")}.`);
    return ((s.code = "EINVALIDPACKAGENAME"), s);
  }
  function h_o(e, t) {
    let r = Error(
      `Invalid tag name "${e}" of package "${t}": Tags may not have any characters that encodeURIComponent encodes.`,
    );
    return ((r.code = "EINVALIDTAGNAME"), r);
  }
  function L_o(e, t) {
    let r = Error(`Invalid type "${e}" of package "${t}": Purl can only be generated for "version" types.`);
    return ((r.code = "EINVALIDPURLTYPE"), r);
  }
  class G$t {
    constructor(e) {
      if (((this.type = e.type), (this.registry = e.registry), (this.where = e.where), e.raw == null))
        this.raw = e.name ? `${e.name}@${e.rawSpec}` : e.rawSpec;
      else this.raw = e.raw;
      if (
        ((this.name = void 0),
        (this.escapedName = void 0),
        (this.scope = void 0),
        (this.rawSpec = e.rawSpec || ""),
        (this.saveSpec = e.saveSpec),
        (this.fetchSpec = e.fetchSpec),
        e.name)
      )
        this.setName(e.name);
      ((this.gitRange = e.gitRange),
        (this.gitCommittish = e.gitCommittish),
        (this.gitSubdir = e.gitSubdir),
        (this.hosted = e.hosted));
    }
    setName(e) {
      let t = xwn(e);
      if (!t.validForOldPackages) throw __o(e, t, this.raw);
      return (
        (this.name = e),
        (this.scope = e[0] === "@" ? e.slice(0, e.indexOf("/")) : void 0),
        (this.escapedName = e.replace("/", "%2f")),
        this
      );
    }
    toString() {
      let e = [];
      if (this.name != null && this.name !== "") e.push(this.name);
      let t = this.saveSpec || this.fetchSpec || this.rawSpec;
      if (t != null && t !== "") e.push(t);
      return e.length ? e.join("@") : this.raw;
    }
    toJSON() {
      let e = Object.assign({}, this);
      return (delete e.hosted, e);
    }
  }
  function nHr(e, t) {
    if (!t) {
      e.gitCommittish = null;
      return;
    }
    for (let r of t.split("::")) {
      if (!r.includes(":")) {
        if (e.gitRange) throw Error("cannot override existing semver range with a committish");
        if (e.gitCommittish) throw Error("cannot override existing committish with a second committish");
        e.gitCommittish = r;
        continue;
      }
      let [s, a] = r.split(":");
      if (s === "semver") {
        if (e.gitCommittish) throw Error("cannot override existing committish with a semver range");
        if (e.gitRange) throw Error("cannot override existing semver range with a second semver range");
        e.gitRange = decodeURIComponent(a);
        continue;
      }
      if (s === "path") {
        if (e.gitSubdir) throw Error("cannot override existing path with a second path");
        e.gitSubdir = `/${a}`;
        continue;
      }
      c_o.warn("npm-package-arg", `ignoring unknown key "${s}"`);
    }
  }
  var $_o = new Map([
    ["\x00", "%00"],
    ["\t", "%09"],
    [
      `
`,
      "%0A",
    ],
    ["\r", "%0D"],
    [" ", "%20"],
    ['"', "%22"],
    ["#", "%23"],
    ["%", "%25"],
    ["?", "%3F"],
    ["[", "%5B"],
    ["\\", "/"],
    ["]", "%5D"],
    ["^", "%5E"],
    ["|", "%7C"],
    ["~", "%7E"],
  ]);
  function Dwn(e) {
    let t = "";
    for (let r = 0; r < e.length; r++) t = `${t}${$_o.get(e[r]) ?? e[r]}`;
    if (t.startsWith("file:")) return t;
    return `file:${t}`;
  }
  function ywn(e, t) {
    ((e.type = iHr.test(e.rawSpec) ? "file" : "directory"), (e.where = t));
    let r = Dwn(e.rawSpec);
    if (r.startsWith("file:/")) {
      if (/^file:\/\/[^/]/.test(r)) r = `file:/${r.slice(5)}`;
      if (/^\/{1,3}\.\.?(\/|$)/.test(r.slice(5))) r = r.replace(/^file:\/{1,3}/, "file:");
    }
    let s, a;
    try {
      ((s = new rHr(r, `${Dwn(q2.resolve(t))}/`)), (a = new rHr(r)));
    } catch (f) {
      let d = Error("Invalid file: URL, must comply with RFC 8089");
      throw Object.assign(d, { raw: e.rawSpec, spec: e, where: t, originalError: f });
    }
    let H = decodeURIComponent(a.pathname),
      u = decodeURIComponent(s.pathname);
    if (
      ((H = H.replace(/^\/+([a-z]:\/)/i, "$1")),
      (u = u.replace(/^\/+([a-z]:\/)/i, "$1")),
      /^\/~(\/|$)/.test(H))
    )
      ((e.saveSpec = `file:${H.substr(1)}`), (u = q2.resolve(H_o(), H.substr(3))));
    else if (!q2.isAbsolute(r.slice(5))) e.saveSpec = `file:${q2.relative(t, u)}`;
    else e.saveSpec = `file:${q2.resolve(u)}`;
    if (
      ((e.fetchSpec = q2.resolve(t, u)),
      (e.saveSpec = e.saveSpec.split("\\").join("/")),
      e.saveSpec.startsWith("file://"))
    )
      e.saveSpec = `file:/${e.saveSpec.slice(7)}`;
    return e;
  }
  function g_o(e, t) {
    return (
      (e.type = "git"),
      (e.hosted = t),
      (e.saveSpec = t.toString({ noGitPlus: !1, noCommittish: !1 })),
      (e.fetchSpec = t.getDefaultRepresentation() === "shortcut" ? null : t.toString()),
      nHr(e, t.committish),
      e
    );
  }
  function E_o(e, t) {
    let r = Error(`Unsupported URL Type "${e}": ${t}`);
    return ((r.code = "EUNSUPPORTEDPROTOCOL"), r);
  }
  function I_o(e) {
    let t = e.rawSpec;
    if (((e.saveSpec = t), t.startsWith("git+ssh:"))) {
      let s = t.match(/^git\+ssh:\/\/([^:#]+:[^#]+(?:\.git)?)(?:#(.*))?$/i);
      if (s && !s[1].match(u_o)) return ((e.type = "git"), nHr(e, s[2]), (e.fetchSpec = s[1]), e);
    } else if (t.startsWith("git+file://")) t = t.replace(/\\/g, "/");
    let r = new rHr(t);
    switch (r.protocol) {
      case "git:":
      case "git+http:":
      case "git+https:":
      case "git+rsync:":
      case "git+ftp:":
      case "git+file:":
      case "git+ssh:":
        if (
          ((e.type = "git"),
          nHr(e, r.hash.slice(1)),
          r.protocol === "git+file:" && /^git\+file:\/\/[a-z]:/i.test(t))
        )
          e.fetchSpec = `git+file://${r.host.toLowerCase()}:${r.pathname}`;
        else ((r.hash = ""), (e.fetchSpec = r.toString()));
        if (e.fetchSpec.startsWith("git+")) e.fetchSpec = e.fetchSpec.slice(4);
        break;
      case "http:":
      case "https:":
        ((e.type = "remote"), (e.fetchSpec = e.saveSpec));
        break;
      default:
        throw E_o(r.protocol, t);
    }
    return e;
  }
  function D_o(e, t) {
    let r = NVe(e.rawSpec.substr(4), t);
    if (r.type === "alias") throw Error("nested aliases not supported");
    if (!r.registry) throw Error("aliases only work for registry deps");
    if (!r.name) throw Error("aliases must have a name");
    return (
      (e.subSpec = r),
      (e.registry = !0),
      (e.type = "alias"),
      (e.saveSpec = null),
      (e.fetchSpec = null),
      e
    );
  }
  function y_o(e) {
    e.registry = !0;
    let t = e.rawSpec.trim();
    ((e.saveSpec = null), (e.fetchSpec = t));
    let r = q$t.valid(t, !0),
      s = q$t.validRange(t, !0);
    if (r) e.type = "version";
    else if (s) e.type = "range";
    else {
      if (encodeURIComponent(t) !== t) throw h_o(t, e.raw);
      e.type = "tag";
    }
    return e;
  }
  FVe.exports = NVe;
  FVe.exports.resolve = vwn;
  FVe.exports.toPurl = m_o;
  FVe.exports.Result = G$t;
});