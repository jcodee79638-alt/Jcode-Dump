
var l$t = ne(() => {
  l$t();
  Gt();
  Hu();
  Hu();
  ((Cvn = nt({ type: ri("directory"), path: bo }).annotate({ identifier: "SkillV2.DirectorySource" })),
    (wvn = nt({ type: ri("url"), url: re }).annotate({ identifier: "SkillV2.UrlSource" })),
    (Har = nt({ name: re, description: re.pipe(Gn), slash: Vi.pipe(Gn), location: bo, content: re }).annotate(
      { identifier: "SkillV2.Info" },
    )),
    (kvn = nt({ type: ri("embedded"), skill: B2s(() => Har) }).annotate({
      identifier: "SkillV2.EmbeddedSource",
    })),
    (cco = Object.assign(Io([Cvn, wvn, kvn]).pipe(_D("type"), P2s({ identifier: "SkillV2.Source" })), {
      equals: (e, t) => {
        if (e.type !== t.type) return !1;
        if (e.type === "directory" && t.type === "directory") return e.path === t.path;
        if (e.type === "url" && t.type === "url") return e.url === t.url;
        if (e.type === "embedded" && t.type === "embedded") return e.skill.name === t.skill.name;
        return !1;
      },
      key: (e) =>
        e.type === "directory"
          ? `directory:${e.path}`
          : e.type === "url"
            ? `url:${e.url}`
            : `embedded:${e.skill.name}`,
    })));
});