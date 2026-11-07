
var oZs,
  Z1n,
  aZs,
  HZs = (e) => {
    let t = { ...e.options };
    for (let [a, H] of Object.entries(e)) if (!aZs.has(a)) t[a] = H;
    let r = {};
    for (let [a, H] of Object.entries(e.tools ?? {})) {
      let u = H ? "allow" : "deny";
      if (a === "write" || a === "edit" || a === "patch") {
        r.edit = u;
        continue;
      }
      r[a] = u;
    }
    globalThis.Object.assign(r, e.permission);
    let s = e.steps ?? e.maxSteps;
    return { ...e, options: t, permission: r, ...(s !== void 0 ? { steps: s } : {}) };
  },
  j2;