
var ozn = Ie(function (VAc, szn) {
  var w0t = Qj();
  szn.exports = (e) => Ako(e.reduce(mko, { versions: {}, "dist-tags": {}, refs: {}, shas: {} }));
  var Ako = (e) => fko(uko(lko(e))),
    uko = (e) => (
      Object.keys(e.refs).forEach((t) => {
        let r = e.refs[t];
        if (!e.shas[r.sha]) e.shas[r.sha] = [t];
        else e.shas[r.sha].push(t);
      }),
      e
    ),
    lko = (e) => (
      Object.keys(e.refs)
        .filter((t) => t.endsWith("^{}"))
        .forEach((t) => {
          let r = e.refs[t],
            s = e.refs[t.replace(/\^\{\}$/, "")];
          if (s) ((s.sha = r.sha), delete e.refs[t]);
        }),
      e
    ),
    fko = (e) => {
      let t = e.refs.HEAD || {};
      return (
        Object.keys(e.versions).forEach((s) => {
          let a = e.versions[s];
          if (e.refs.latest && a.sha === e.refs.latest.sha) e["dist-tags"].latest = s;
          else if (a.sha === t.sha) {
            if (((e["dist-tags"].HEAD = s), !e.refs.latest)) e["dist-tags"].latest = s;
          }
        }),
        e
      );
    },
    pko = (e) => {
      if (e.startsWith("refs/tags/")) return "tag";
      if (e.startsWith("refs/heads/")) return "branch";
      if (e.startsWith("refs/pull/")) return "pull";
      if (e === "HEAD") return "head";
      return "other";
    },
    dko = (e) => {
      let t = e.trim().split(/\s+/, 2);
      if (t.length < 2) return null;
      let r = t[0].trim(),
        s = t[1].trim(),
        a = pko(s);
      if (a === "tag") {
        let H = s.slice(10);
        return { sha: r, ref: H, rawRef: s, type: a };
      }
      if (a === "branch") {
        let H = s.slice(11);
        return { sha: r, ref: H, rawRef: s, type: a };
      }
      if (a === "pull") {
        let H = s.slice(5).replace(/\/head$/, "");
        return { sha: r, ref: H, rawRef: s, type: a };
      }
      if (a === "head") return { sha: r, ref: "HEAD", rawRef: s, type: a };
      return { sha: r, ref: s, rawRef: s, type: a };
    },
    mko = (e, t) => {
      let r = dko(t);
      if (!r) return e;
      if (((e.refs[r.ref] = r), (e.refs[r.rawRef] = r), r.type === "tag")) {
        let s = !r.ref.endsWith("^{}") && r.ref.match(/v?(\d+\.\d+\.\d+(?:[-+].+)?)$/);
        if (s && w0t.valid(s[1], !0)) e.versions[w0t.clean(s[1], !0)] = r;
      }
      return e;
    };
});