
var Mzn = Ie(function (YAc, yzn) {
  var Vko = new Set(["github.com", "gist.github.com", "gitlab.com", "bitbucket.com", "bitbucket.org"]),
    { parse: qko } = cr("url"),
    F0t = cr("path"),
    Gko = TAr(),
    D7e = g7e(),
    { isWindows: B0t } = czn(),
    Xko = I7e(),
    ESe = cr("fs/promises");
  yzn.exports = (e, t = "HEAD", r = null, s = {}) =>
    Gko(e, s).then((a) => Kko(e, a, t, zko(a, t, s), r || Jko(e, s.cwd), s));
  var kAr = (e, t) => {
      if (t.gitShallow === !1 || t.gitShallow) return t.gitShallow;
      return Vko.has(qko(e).host);
    },
    Jko = (e, t = process.cwd()) => F0t.resolve(t, F0t.basename(e.replace(/[/\\]?\.git$/, ""))),
    Kko = (e, t, r, s, a, H) => {
      if (!s) return e6o(e, r, a, H);
      if (s.sha === t.refs.HEAD.sha) return Zko(e, s, a, H);
      if (s.type === "tag" || s.type === "branch") return Yko(e, s, a, H);
      return Qko(e, s, a, H);
    },
    zko = (e, t, r) => {
      let { spec: s = {} } = r;
      if (((t = s.gitCommittish || t), !e)) return null;
      if (s.gitRange) return Xko(e, s.gitRange, r);
      if (!t) return e.refs.HEAD;
      if (e.refs[t]) return e.refs[t];
      if (e.shas[t]) return e.refs[e.shas[t][0]];
      return null;
    },
    Qko = (e, t, r, s) => {
      let a = kAr(e, s),
        H = ["fetch", "origin", t.rawRef].concat(a ? ["--depth=1"] : []),
        u = (f) => D7e(f, { ...s, cwd: r });
      return ESe.mkdir(r, { recursive: !0 })
        .then(() => u(["init"]))
        .then(() => (B0t(s) ? u(["config", "--local", "--add", "core.longpaths", "true"]) : null))
        .then(() => u(["remote", "add", "origin", e]))
        .then(() => u(H))
        .then(() => u(["checkout", t.sha]))
        .then(() => Dzn(r, s))
        .then(() => t.sha);
    },
    Yko = (e, t, r, s) => {
      let a = ["clone", "-b", t.ref, e, r, "--recurse-submodules"];
      if (kAr(e, s)) a.push("--depth=1");
      if (B0t(s)) a.push("--config", "core.longpaths=true");
      return D7e(a, s).then(() => t.sha);
    },
    Zko = (e, t, r, s) => {
      let a = ["clone", e, r, "--recurse-submodules"];
      if (kAr(e, s)) a.push("--depth=1");
      if (B0t(s)) a.push("--config", "core.longpaths=true");
      return D7e(a, s).then(() => t.sha);
    },
    Dzn = async (e, t) => {
      if (
        !(await ESe.stat(`${e}/.gitmodules`)
          .then(() => !0)
          .catch(() => !1))
      )
        return null;
      return D7e(["submodule", "update", "-q", "--init", "--recursive"], { ...t, cwd: e });
    },
    e6o = (e, t, r, s) => {
      let a = B0t(s) ? ["--config", "core.longpaths=true"] : [],
        H = ["clone", "--mirror", "-q", e, r + "/.git"],
        u = (f) => D7e(f, { ...s, cwd: r });
      return ESe.mkdir(r, { recursive: !0 })
        .then(() => u(H.concat(a)))
        .then(() => u(["init"]))
        .then(() => u(["checkout", t]))
        .then(() => Dzn(r, s))
        .then(() => u(["rev-parse", "--revs-only", "HEAD"]))
        .then(({ stdout: f }) => f.trim());
    };
});