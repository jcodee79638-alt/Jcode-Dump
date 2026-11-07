
function AZr(e) {
  let t = HQ.join(e, "desktop-v3.json"),
    r = HQ.join(e, "kv.json"),
    s = Promise.resolve(),
    a = async () => {
      let H = await gJt(r, "utf8")
          .then(JSON.parse)
          .catch(() => ({})),
        u = await gJt(t, "utf8")
          .then(JSON.parse)
          .catch(() => ({})),
        f = u && typeof u === "object" && !Array.isArray(u) ? u : {},
        d = H && typeof H === "object" && !Array.isArray(H) ? H : {},
        _ = f.thinking ?? d.jac_thinking_v24,
        L = typeof f.theme === "string" ? f.theme : d.theme;
      return {
        theme:
          L === "light" || L === "system" || L === "ember"
            ? L
            : f.themeVersion === 1 && (L === "dark" || L === "charcoal")
              ? "charcoal"
              : "ember",
        themeVersion: 1,
        model: aZr(f.model, f.modelVersion),
        modelVersion: 1,
        thinking: _ === "low" || _ === "high" || _ === "xhigh" ? _ : "off",
        launchAtLogin: f.launchAtLogin !== !1,
        sidebarCollapsed: f.sidebarCollapsed === !0,
        projectsCollapsed: f.projectsCollapsed === !0,
        collapsedProjects:
          f.collapsedProjects &&
          typeof f.collapsedProjects === "object" &&
          !Array.isArray(f.collapsedProjects)
            ? Object.fromEntries(
                Object.entries(f.collapsedProjects)
                  .filter(([D, S]) => D.length <= 512 && typeof S === "boolean")
                  .slice(0, 2000),
              )
            : {},
        drafts: f.drafts && typeof f.drafts === "object" && !Array.isArray(f.drafts) ? f.drafts : {},
        accessMode: vFe(f.accessMode) ?? "ask",
        tutorialVersion: f.tutorialVersion === 1 ? 1 : 0,
      };
    };
  return {
    read: a,
    save(H) {
      let u = s.then(async () => {
        if (H.model !== void 0) zDe(H.model);
        let f = { ...(await a()), ...H, modelVersion: 1 };
        if ((await EAt(t, f), H.thinking !== void 0 || H.theme !== void 0)) {
          let d = await gJt(r, "utf8")
              .then(JSON.parse)
              .catch(() => ({})),
            _ = d && typeof d === "object" && !Array.isArray(d) ? d : {};
          await EAt(r, {
            ..._,
            ...(H.thinking === void 0 ? {} : { jac_thinking_v24: H.thinking }),
            ...(H.theme === void 0 ? {} : { theme: H.theme }),
          });
        }
        return f;
      });
      return (
        (s = u.then(
          () => {
            return;
          },
          () => {
            return;
          },
        )),
        u
      );
    },
  };
}
import qne from "path";
import { mkdir as k6s, stat as uZr, readFile as O6s } from "fs/promises";
import { Database as U6s } from "bun:sqlite";