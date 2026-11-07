
function ALt(e, t = {}) {
  let { ignore: r, ...s } = t;
  if (Array.isArray(r)) {
    t = { ...s };
    for (let a of r)
      if ($io(a)) {
        if (!t.ignoreGlobs) t.ignoreGlobs = [];
        let H = eTn.makeRe(a, { dot: !0, lookbehinds: !1 });
        t.ignoreGlobs.push(H.source);
      } else {
        if (!t.ignorePaths) t.ignorePaths = [];
        t.ignorePaths.push(J6.resolve(e, a));
      }
  }
  return t;
}