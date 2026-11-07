
function _Er(e) {
  return {
    validate: (t) => {
      let r = { async: !1 };
      try {
        let s = e._zod.run({ value: t, issues: [] }, r);
        if (!(s instanceof Promise)) return eji(s, r);
      } catch (s) {}
      return TDa(e, t);
    },
    vendor: "zod",
    version: 1,
  };
}