
var yPn = Ie(function ($ec, DPn) {
  var pL = (...e) => (e.every((t) => t) ? e.join("") : ""),
    wy = (e) => (e ? encodeURIComponent(e) : ""),
    IPn = (e) =>
      e
        .toLowerCase()
        .replace(/^\W+/g, "")
        .replace(/(?<!\W)\W+$/, "")
        .replace(/\//g, "")
        .replace(/\W+/g, "-"),
    Gfo = {
      sshtemplate: ({ domain: e, user: t, project: r, committish: s }) =>
        `git@${e}:${t}/${r}.git${pL("#", s)}`,
      sshurltemplate: ({ domain: e, user: t, project: r, committish: s }) =>
        `git+ssh://git@${e}/${t}/${r}.git${pL("#", s)}`,
      edittemplate: ({ domain: e, user: t, project: r, committish: s, editpath: a, path: H }) =>
        `https://${e}/${t}/${r}${pL("/", a, "/", wy(s || "HEAD"), "/", H)}`,
      browsetemplate: ({ domain: e, user: t, project: r, committish: s, treepath: a }) =>
        `https://${e}/${t}/${r}${pL("/", a, "/", wy(s))}`,
      browsetreetemplate: ({
        domain: e,
        user: t,
        project: r,
        committish: s,
        treepath: a,
        path: H,
        fragment: u,
        hashformat: f,
      }) => `https://${e}/${t}/${r}/${a}/${wy(s || "HEAD")}/${H}${pL("#", f(u || ""))}`,
      browseblobtemplate: ({
        domain: e,
        user: t,
        project: r,
        committish: s,
        blobpath: a,
        path: H,
        fragment: u,
        hashformat: f,
      }) => `https://${e}/${t}/${r}/${a}/${wy(s || "HEAD")}/${H}${pL("#", f(u || ""))}`,
      docstemplate: ({ domain: e, user: t, project: r, treepath: s, committish: a }) =>
        `https://${e}/${t}/${r}${pL("/", s, "/", wy(a))}#readme`,
      httpstemplate: ({ auth: e, domain: t, user: r, project: s, committish: a }) =>
        `git+https://${pL(e, "@")}${t}/${r}/${s}.git${pL("#", a)}`,
      filetemplate: ({ domain: e, user: t, project: r, committish: s, path: a }) =>
        `https://${e}/${t}/${r}/raw/${wy(s || "HEAD")}/${a}`,
      shortcuttemplate: ({ type: e, user: t, project: r, committish: s }) => `${e}:${t}/${r}${pL("#", s)}`,
      pathtemplate: ({ user: e, project: t, committish: r }) => `${e}/${t}${pL("#", r)}`,
      bugstemplate: ({ domain: e, user: t, project: r }) => `https://${e}/${t}/${r}/issues`,
      hashformat: IPn,
    },
    Hoe = {};
  Hoe.github = {
    protocols: ["git:", "http:", "git+ssh:", "git+https:", "ssh:", "https:"],
    domain: "github.com",
    treepath: "tree",
    blobpath: "blob",
    editpath: "edit",
    filetemplate: ({ auth: e, user: t, project: r, committish: s, path: a }) =>
      `https://${pL(e, "@")}raw.githubusercontent.com/${t}/${r}/${wy(s || "HEAD")}/${a}`,
    gittemplate: ({ auth: e, domain: t, user: r, project: s, committish: a }) =>
      `git://${pL(e, "@")}${t}/${r}/${s}.git${pL("#", a)}`,
    tarballtemplate: ({ domain: e, user: t, project: r, committish: s }) =>
      `https://codeload.${e}/${t}/${r}/tar.gz/${wy(s || "HEAD")}`,
    extract: (e) => {
      let [, t, r, s, a] = e.pathname.split("/", 5);
      if (s && s !== "tree") return;
      if (!s) a = e.hash.slice(1);
      if (r && r.endsWith(".git")) r = r.slice(0, -4);
      if (!t || !r) return;
      return { user: t, project: r, committish: a };
    },
  };
  Hoe.bitbucket = {
    protocols: ["git+ssh:", "git+https:", "ssh:", "https:"],
    domain: "bitbucket.org",
    treepath: "src",
    blobpath: "src",
    editpath: "?mode=edit",
    edittemplate: ({ domain: e, user: t, project: r, committish: s, treepath: a, path: H, editpath: u }) =>
      `https://${e}/${t}/${r}${pL("/", a, "/", wy(s || "HEAD"), "/", H, u)}`,
    tarballtemplate: ({ domain: e, user: t, project: r, committish: s }) =>
      `https://${e}/${t}/${r}/get/${wy(s || "HEAD")}.tar.gz`,
    extract: (e) => {
      let [, t, r, s] = e.pathname.split("/", 4);
      if (["get"].includes(s)) return;
      if (r && r.endsWith(".git")) r = r.slice(0, -4);
      if (!t || !r) return;
      return { user: t, project: r, committish: e.hash.slice(1) };
    },
  };
  Hoe.gitlab = {
    protocols: ["git+ssh:", "git+https:", "ssh:", "https:"],
    domain: "gitlab.com",
    treepath: "tree",
    blobpath: "tree",
    editpath: "-/edit",
    tarballtemplate: ({ domain: e, user: t, project: r, committish: s }) =>
      `https://${e}/api/v4/projects/${wy(t + "/" + r)}/repository/archive.tar.gz?sha=${wy(s || "HEAD")}`,
    extract: (e) => {
      let t = e.pathname.slice(1);
      if (t.includes("/-/") || t.includes("/archive.tar.gz")) return;
      let r = t.split("/"),
        s = r.pop();
      if (s.endsWith(".git")) s = s.slice(0, -4);
      let a = r.join("/");
      if (!a || !s) return;
      return { user: a, project: s, committish: e.hash.slice(1) };
    },
  };
  Hoe.gist = {
    protocols: ["git:", "git+ssh:", "git+https:", "ssh:", "https:"],
    domain: "gist.github.com",
    editpath: "edit",
    sshtemplate: ({ domain: e, project: t, committish: r }) => `git@${e}:${t}.git${pL("#", r)}`,
    sshurltemplate: ({ domain: e, project: t, committish: r }) => `git+ssh://git@${e}/${t}.git${pL("#", r)}`,
    edittemplate: ({ domain: e, user: t, project: r, committish: s, editpath: a }) =>
      `https://${e}/${t}/${r}${pL("/", wy(s))}/${a}`,
    browsetemplate: ({ domain: e, project: t, committish: r }) => `https://${e}/${t}${pL("/", wy(r))}`,
    browsetreetemplate: ({ domain: e, project: t, committish: r, path: s, hashformat: a }) =>
      `https://${e}/${t}${pL("/", wy(r))}${pL("#", a(s))}`,
    browseblobtemplate: ({ domain: e, project: t, committish: r, path: s, hashformat: a }) =>
      `https://${e}/${t}${pL("/", wy(r))}${pL("#", a(s))}`,
    docstemplate: ({ domain: e, project: t, committish: r }) => `https://${e}/${t}${pL("/", wy(r))}`,
    httpstemplate: ({ domain: e, project: t, committish: r }) => `git+https://${e}/${t}.git${pL("#", r)}`,
    filetemplate: ({ user: e, project: t, committish: r, path: s }) =>
      `https://gist.githubusercontent.com/${e}/${t}/raw${pL("/", wy(r))}/${s}`,
    shortcuttemplate: ({ type: e, project: t, committish: r }) => `${e}:${t}${pL("#", r)}`,
    pathtemplate: ({ project: e, committish: t }) => `${e}${pL("#", t)}`,
    bugstemplate: ({ domain: e, project: t }) => `https://${e}/${t}`,
    gittemplate: ({ domain: e, project: t, committish: r }) => `git://${e}/${t}.git${pL("#", r)}`,
    tarballtemplate: ({ project: e, committish: t }) =>
      `https://codeload.github.com/gist/${e}/tar.gz/${wy(t || "HEAD")}`,
    extract: (e) => {
      let [, t, r, s] = e.pathname.split("/", 4);
      if (s === "raw") return;
      if (!r) {
        if (!t) return;
        ((r = t), (t = null));
      }
      if (r.endsWith(".git")) r = r.slice(0, -4);
      return { user: t, project: r, committish: e.hash.slice(1) };
    },
    hashformat: function (e) {
      return e && "file-" + IPn(e);
    },
  };
  Hoe.sourcehut = {
    protocols: ["git+ssh:", "https:"],
    domain: "git.sr.ht",
    treepath: "tree",
    blobpath: "tree",
    filetemplate: ({ domain: e, user: t, project: r, committish: s, path: a }) =>
      `https://${e}/${t}/${r}/blob/${wy(s) || "HEAD"}/${a}`,
    httpstemplate: ({ domain: e, user: t, project: r, committish: s }) =>
      `https://${e}/${t}/${r}${pL("#", s)}`,
    tarballtemplate: ({ domain: e, user: t, project: r, committish: s }) =>
      `https://${e}/${t}/${r}/archive/${wy(s) || "HEAD"}.tar.gz`,
    bugstemplate: () => null,
    extract: (e) => {
      let [, t, r, s] = e.pathname.split("/", 4);
      if (["archive"].includes(s)) return;
      if (r && r.endsWith(".git")) r = r.slice(0, -4);
      if (!t || !r) return;
      return { user: t, project: r, committish: e.hash.slice(1) };
    },
  };
  for (let [e, t] of Object.entries(Hoe)) Hoe[e] = Object.assign({}, Gfo, t);
  DPn.exports = Hoe;
});