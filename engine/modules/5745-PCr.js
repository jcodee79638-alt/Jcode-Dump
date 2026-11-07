
function PCr(e, t) {
  if (!e) return !0;
  if (e.startsWith("http://localhost:")) return !0;
  if (e.startsWith("http://127.0.0.1:")) return !0;
  if (e.startsWith("oc://renderer")) return !0;
  if (e === "tauri://localhost" || e === "http://tauri.localhost" || e === "https://tauri.localhost")
    return !0;
  if (wrH.test(e)) return !0;
  return t?.cors?.includes(e) ?? !1;
}