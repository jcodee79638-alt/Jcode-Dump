
function gHe(e, ...t) {
  let r = new Headers(X1a(e)),
    s = r.get("user-agent") || "";
  return (r.set("user-agent", [s, ...t].filter(Boolean).join(" ")), Object.fromEntries(r.entries()));
}