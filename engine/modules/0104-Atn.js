
function Atn(e) {
  if (!NM(e)) throw Ap();
  let t = {};
  if (["light", "system", "ember", "dark", "charcoal"].includes(String(e.theme))) t.theme = e.theme;
  if (e.modelVersion === 1 && (e.model === "jaccoder-5.5" || e.model === "jcoder-5.6"))
    ((t.model = e.model), (t.modelVersion = 1));
  if (e.themeVersion === 1) t.themeVersion = 1;
  if (["off", "low", "high", "xhigh"].includes(String(e.thinking))) t.thinking = e.thinking;
  for (let r of ["sidebarCollapsed", "projectsCollapsed"]) if (typeof e[r] === "boolean") t[r] = e[r];
  if (e.tutorialVersion === 0 || e.tutorialVersion === 1) t.tutorialVersion = e.tutorialVersion;
  if (NM(e.collapsedProjects))
    t.collapsedProjects = Object.fromEntries(
      Object.entries(e.collapsedProjects)
        .filter(([r, s]) => r.length <= 512 && typeof s === "boolean")
        .slice(0, 2000),
    );
  if (NM(e.drafts)) {
    if (Object.keys(e.drafts).length > 2000) throw Ap();
    t.drafts = Object.fromEntries(
      Object.entries(e.drafts).map(([r, s]) => {
        if (
          r.length > 4096 ||
          !NM(s) ||
          typeof s.text !== "string" ||
          s.text.length > 200000 ||
          !Array.isArray(s.attachments) ||
          s.attachments.length > 10
        )
          throw Ap();
        let a = s.attachments.map((H) => {
          if (
            !NM(H) ||
            typeof H.id !== "string" ||
            !/^[A-Za-z0-9_-]{1,100}$/.test(H.id) ||
            typeof H.filename !== "string" ||
            H.filename.length > 260 ||
            typeof H.mime !== "string" ||
            H.mime.length > 150 ||
            !Number.isSafeInteger(H.size) ||
            Number(H.size) < 0 ||
            Number(H.size) > Ch.attachment
          )
            throw Ap();
          return { id: H.id, filename: H.filename, mime: H.mime, size: H.size };
        });
        return [r, { text: s.text, attachments: a }];
      }),
    );
  }
  if (Buffer.byteLength(JSON.stringify(t)) > Ch.settings) throw Ap();
  return t;
}