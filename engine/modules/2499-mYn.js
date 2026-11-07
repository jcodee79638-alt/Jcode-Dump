
var mYn = Ie(function (Aur) {
  var iEt = lYn(),
    Oy = process.env;
  Object.defineProperty(Aur, "_vendors", {
    value: iEt.map(function (e) {
      return e.constant;
    }),
  });
  Aur.name = null;
  Aur.isPR = null;
  Aur.id = null;
  if (Oy.CI !== "false")
    iEt.forEach(function (e) {
      let r = (Array.isArray(e.env) ? e.env : [e.env]).every(function (s) {
        return fYn(s);
      });
      if (((Aur[e.constant] = r), !r)) return;
      ((Aur.name = e.name), (Aur.isPR = sOo(e)), (Aur.id = e.constant));
    });
  Aur.isCI = !!(
    Oy.CI !== "false" &&
    (Oy.BUILD_ID ||
      Oy.BUILD_NUMBER ||
      Oy.CI ||
      Oy.CI_APP_ID ||
      Oy.CI_BUILD_ID ||
      Oy.CI_BUILD_NUMBER ||
      Oy.CI_NAME ||
      Oy.CONTINUOUS_INTEGRATION ||
      Oy.RUN_ID ||
      Aur.name ||
      !1)
  );
  function fYn(e) {
    if (typeof e === "string") return !!Oy[e];
    if ("env" in e) return Oy[e.env] && Oy[e.env].includes(e.includes);
    if ("any" in e)
      return e.any.some(function (t) {
        return !!Oy[t];
      });
    return Object.keys(e).every(function (t) {
      return Oy[t] === e[t];
    });
  }
  function sOo(e) {
    switch (typeof e.pr) {
      case "string":
        return !!Oy[e.pr];
      case "object":
        if ("env" in e.pr)
          if ("any" in e.pr)
            return e.pr.any.some(function (t) {
              return Oy[e.pr.env] === t;
            });
          else return e.pr.env in Oy && Oy[e.pr.env] !== e.pr.ne;
        else if ("any" in e.pr)
          return e.pr.any.some(function (t) {
            return !!Oy[t];
          });
        else return fYn(e.pr);
      default:
        return null;
    }
  }
});