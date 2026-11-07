
function rja(e, t) {
  return Fhe(() => {
    let r = t.message;
    if (r === "") {
      if (t.responseBody) return t.responseBody;
      if (t.statusCode) {
        let s = pOi[t.statusCode];
        if (s) return s;
      }
      return "Unknown error";
    }
    if (!t.responseBody || (t.statusCode && r !== pOi[t.statusCode])) return r;
    try {
      let s = JSON.parse(t.responseBody),
        a = s.message || s.error || s.error?.message;
      if (a && typeof a === "string") return `${r}: ${a}`;
    } catch {}
    if (/^\s*<!doctype|^\s*<html/i.test(t.responseBody)) {
      if (t.statusCode === 401)
        return "Unauthorized: request was blocked by a gateway or proxy. Your authentication token may be missing or expired \u2014 try running `opencode auth login <your provider URL>` to re-authenticate.";
      if (t.statusCode === 403)
        return "Forbidden: request was blocked by a gateway or proxy. You may not have permission to access this resource \u2014 check your account and provider settings.";
      return r;
    }
    return `${r}: ${t.responseBody}`;
  }).trim();
}