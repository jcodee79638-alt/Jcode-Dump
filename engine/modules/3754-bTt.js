
function bTt(e) {
  let t;
  try {
    t = new URL(e);
  } catch (s) {
    throw new $T({ url: e, message: `Invalid URL: ${e}` });
  }
  if (t.protocol === "data:") return;
  if (t.protocol !== "http:" && t.protocol !== "https:")
    throw new $T({ url: e, message: `URL scheme must be http, https, or data, got ${t.protocol}` });
  let r = t.hostname.toLowerCase().replace(/\.+$/, "");
  if (!r) throw new $T({ url: e, message: "URL must have a hostname" });
  if (r === "localhost" || r.endsWith(".local") || r.endsWith(".localhost") || r.endsWith(".internal"))
    throw new $T({ url: e, message: `URL with hostname ${r} is not allowed` });
  if (r.startsWith("[") && r.endsWith("]")) {
    let s = r.slice(1, -1);
    if (vwi(s)) throw new $T({ url: e, message: `URL with IPv6 address ${r} is not allowed` });
    return;
  }
  if (zIr(r)) {
    if (QIr(r)) throw new $T({ url: e, message: `URL with IP address ${r} is not allowed` });
  }
}