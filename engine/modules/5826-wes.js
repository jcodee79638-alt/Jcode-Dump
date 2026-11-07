
function wes(e, t) {
  for (let r of hnH) {
    if (r.method && r.method !== e) continue;
    if (r.exact ? t === r.path : t === r.path || t.startsWith(r.path + "/")) return r.action === "local";
  }
  return !1;
}