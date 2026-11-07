
async function SVa(e) {
  try {
    let t = J7i();
    if (!BLe.existsSync(t)) return;
    let r = JSON.parse(BLe.readFileSync(t, "utf-8")),
      s = e.replace(/\/$/, ""),
      a = r.gitlab;
    if (a?.type === "oauth") {
      let u = typeof a.enterpriseUrl === "string" ? a.enterpriseUrl.replace(/\/$/, "") : void 0;
      if (u === s || (u === void 0 && s === q7i)) return a;
    } else if (a?.type === "api" && typeof a.key === "string") return a;
    return r[s] || r[`${s}/`];
  } catch {
    return;
  }
}