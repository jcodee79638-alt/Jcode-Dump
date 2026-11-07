
function n5a(e, t) {
  let r = t.replace(/\\/g, "/").replace(/\/$/, "");
  if (!r) return !1;
  let s = e.match(/<modules>([\s\S]*?)<\/modules>/g) ?? [];
  for (let a of s) {
    let H = a.replace(/<!--[\s\S]*?-->/g, "");
    for (let u of H.matchAll(/<module>\s*([^<]+?)\s*<\/module>/g))
      if (u[1].replace(/\\/g, "/").replace(/^\.\//, "").replace(/\/$/, "") === r) return !0;
  }
  return !1;
}