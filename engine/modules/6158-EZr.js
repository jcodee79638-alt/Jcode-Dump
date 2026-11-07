
function EZr(e) {
  if (!e || typeof e !== "object") return Xne;
  if ("name" in e && e.name === "MessageAbortedError") return "Response stopped.";
  if (!("data" in e) || !e.data || typeof e.data !== "object" || !("message" in e.data)) return Xne;
  let t = e.data,
    r = t.message;
  if (r === cQ) return cQ;
  if (!("name" in e) || e.name !== "APIError") return Xne;
  let s = "statusCode" in t ? t.statusCode : void 0,
    a = "responseHeaders" in t ? t.responseHeaders : void 0,
    H = a && typeof a === "object" && "x-jac-support-id" in a ? a["x-jac-support-id"] : void 0;
  if (s === 426 && r === "Jac Code requires an update. Close and reopen Jac Code to update automatically.")
    return r;
  if (s === 429 && r === IAt) return EJt(r, H);
  let u = Object.values(qF).find((L) => L === r);
  if (u) return u;
  let f = typeof s === "number" && s >= 500 && s < 600,
    d = f && Object.values(qfe).find((L) => L === r);
  if (d) return EJt(d, H);
  if (s !== void 0 && !f) return Xne;
  let _ = "responseBody" in t ? t.responseBody : void 0;
  if (typeof _ !== "string" || _.length > (f ? 32768 : 4096)) return Xne;
  try {
    let L = JSON.parse(_);
    if (
      !L ||
      typeof L !== "object" ||
      (!f && (!("type" in L) || L.type !== "error")) ||
      !("error" in L) ||
      !L.error ||
      typeof L.error !== "object"
    )
      return Xne;
    let I = L.error;
    if (!("code" in I) || typeof I.code !== "string" || !Object.hasOwn(qfe, I.code)) return Xne;
    let D = qfe[I.code];
    return EJt(D, f ? H : "supportId" in I ? I.supportId : void 0);
  } catch {
    return Xne;
  }
}