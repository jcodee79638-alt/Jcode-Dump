
function RQa(e) {
  let t = TEr(),
    r = new WeakSet(),
    s = (a) => {
      if (typeof a !== "object" || a === null) return;
      if (r.has(a)) return;
      if ((r.add(a), Vzi(a))) {
        let H = typeof a.meta === "function" ? a.meta() : void 0,
          u = typeof a.description === "string" ? a.description : void 0,
          f = { ...(H && typeof H === "object" ? H : {}), ...(u ? { description: u } : {}) };
        if (Object.keys(f).length) t.add(a, f);
        s(a._zod.def);
        return;
      }
      for (let H of Object.values(a)) s(H);
    };
  return (s(e), t);
}