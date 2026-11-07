
function wBs(e) {
  let t = e.name + "=" + e.valueEncoded;
  if (e.options === void 0) return t;
  let r = e.options;
  if (r.maxAge !== void 0) {
    let s = Aut(Ag(r.maxAge));
    t += "; Max-Age=" + Math.trunc(s);
  }
  if (r.domain !== void 0) t += "; Domain=" + r.domain;
  if (r.path !== void 0) t += "; Path=" + r.path;
  if (r.priority !== void 0)
    switch (r.priority) {
      case "low":
        t += "; Priority=Low";
        break;
      case "medium":
        t += "; Priority=Medium";
        break;
      case "high":
        t += "; Priority=High";
        break;
    }
  if (r.expires !== void 0) t += "; Expires=" + r.expires.toUTCString();
  if (r.httpOnly) t += "; HttpOnly";
  if (r.secure) t += "; Secure";
  if (r.partitioned) t += "; Partitioned";
  if (r.sameSite !== void 0)
    switch (r.sameSite) {
      case "lax":
        t += "; SameSite=Lax";
        break;
      case "strict":
        t += "; SameSite=Strict";
        break;
      case "none":
        t += "; SameSite=None";
        break;
    }
  return t;
}