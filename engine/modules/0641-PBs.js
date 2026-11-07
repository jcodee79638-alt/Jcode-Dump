
function PBs(e) {
  let t = e
    .split(";")
    .map((f) => f.trim())
    .filter((f) => f !== "");
  if (t.length === 0) return;
  let r = t[0].indexOf("=");
  if (r === -1) return;
  let s = t[0].slice(0, r);
  if (!CBs.test(s)) return;
  let a = t[0].slice(r + 1),
    H = eun(a);
  if (t.length === 1) return Object.assign(Object.create(YAn), { name: s, value: H, valueEncoded: a });
  let u = {};
  for (let f = 1; f < t.length; f++) {
    let d = t[f],
      _ = d.indexOf("="),
      L = _ === -1 ? d : d.slice(0, _).trim(),
      I = _ === -1 ? void 0 : d.slice(_ + 1).trim();
    switch (L.toLowerCase()) {
      case "domain": {
        if (I === void 0) break;
        let D = I.trim().replace(/^\./, "");
        if (D) u.domain = D;
        break;
      }
      case "expires": {
        if (I === void 0) break;
        let D = new Date(I);
        if (!isNaN(D.getTime())) u.expires = D;
        break;
      }
      case "max-age": {
        if (I === void 0) break;
        let D = parseInt(I, 10);
        if (!isNaN(D)) u.maxAge = Pv(D);
        break;
      }
      case "path": {
        if (I === void 0) break;
        if (I[0] === "/") u.path = I;
        break;
      }
      case "priority": {
        if (I === void 0) break;
        switch (I.toLowerCase()) {
          case "low":
            u.priority = "low";
            break;
          case "medium":
            u.priority = "medium";
            break;
          case "high":
            u.priority = "high";
            break;
        }
        break;
      }
      case "httponly": {
        u.httpOnly = !0;
        break;
      }
      case "secure": {
        u.secure = !0;
        break;
      }
      case "partitioned": {
        u.partitioned = !0;
        break;
      }
      case "samesite": {
        if (I === void 0) break;
        switch (I.toLowerCase()) {
          case "lax":
            u.sameSite = "lax";
            break;
          case "strict":
            u.sameSite = "strict";
            break;
          case "none":
            u.sameSite = "none";
            break;
        }
        break;
      }
    }
  }
  return Object.assign(Object.create(YAn), {
    name: s,
    value: H,
    valueEncoded: a,
    options: Object.keys(u).length > 0 ? u : void 0,
  });
}