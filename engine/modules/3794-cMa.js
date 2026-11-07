
function cMa(e, t) {
  let r = [
      YL(e.left._def, { ...t, currentPath: [...t.currentPath, "allOf", "0"] }),
      YL(e.right._def, { ...t, currentPath: [...t.currentPath, "allOf", "1"] }),
    ].filter((a) => !!a),
    s = [];
  return (
    r.forEach((a) => {
      if (HMa(a)) s.push(...a.allOf);
      else {
        let H = a;
        if ("additionalProperties" in a && a.additionalProperties === !1) {
          let { additionalProperties: u, ...f } = a;
          H = f;
        }
        s.push(H);
      }
    }),
    s.length ? { allOf: s } : void 0
  );
}