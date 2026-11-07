
function YX(e = fetch) {
  if (VBi.has(e)) return e;
  return (t, r) => {
    if (r?.redirect === "error" || r?.redirect === "manual") return e(t, r);
    return Promise.resolve(e(t, { ...r, redirect: "manual" })).then((s) => Pbt(e, t, r, s) ?? s);
  };
}