
function xr(e) {
  if (!e || typeof e !== "object") return ht;
  if ("name" in e && e.name === "MessageAbortedError") return "Response stopped.";
  if (!("data" in e) || !e.data || typeof e.data !== "object" || !("message" in e.data)) return ht;
  let t = e.data,
    n = t.message;
  if (n === br) return br;
  if (!("name" in e) || e.name !== "APIError") return ht;
  let i = "statusCode" in t ? t.statusCode : void 0,
    r = "responseHeaders" in t ? t.responseHeaders : void 0,
    s = r && typeof r === "object" && "x-jac-support-id" in r ? r["x-jac-support-id"] : void 0;
  if (i === 426 && n === "Jac Code requires an update. Close and reopen Jac Code to update automatically.")
    return n;
  if (i === 429 && n === gi) return kr(n, s);
  let o = Object.values(Xt).find((w) => w === n);
  if (o) return o;
  let l = typeof i === "number" && i >= 500 && i < 600,
    u = l && Object.values(Pn).find((w) => w === n);
  if (u) return kr(u, s);
  if (i !== void 0 && !l) return ht;
  let p = "responseBody" in t ? t.responseBody : void 0;
  if (typeof p !== "string" || p.length > (l ? 32768 : 4096)) return ht;
  try {
    let w = JSON.parse(p);
    if (
      !w ||
      typeof w !== "object" ||
      (!l && (!("type" in w) || w.type !== "error")) ||
      !("error" in w) ||
      !w.error ||
      typeof w.error !== "object"
    )
      return ht;
    let f = w.error;
    if (!("code" in f) || typeof f.code !== "string" || !Object.hasOwn(Pn, f.code)) return ht;
    let h = Pn[f.code];
    return kr(h, l ? s : "supportId" in f ? f.supportId : void 0);
  } catch {
    return ht;
  }
}