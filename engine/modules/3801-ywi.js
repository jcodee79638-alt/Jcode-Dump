
function ywi(e, t) {
  var r;
  if (!t.applyRegexFlags || !e.flags) return e.source;
  let s = { i: e.flags.includes("i"), m: e.flags.includes("m"), s: e.flags.includes("s") },
    a = s.i ? e.source.toLowerCase() : e.source,
    H = "",
    u = !1,
    f = !1,
    d = !1;
  for (let _ = 0; _ < a.length; _++) {
    if (u) {
      ((H += a[_]), (u = !1));
      continue;
    }
    if (s.i) {
      if (f) {
        if (a[_].match(/[a-z]/)) {
          if (d) ((H += a[_]), (H += `${a[_ - 2]}-${a[_]}`.toUpperCase()), (d = !1));
          else if (a[_ + 1] === "-" && ((r = a[_ + 2]) == null ? void 0 : r.match(/[a-z]/)))
            ((H += a[_]), (d = !0));
          else H += `${a[_]}${a[_].toUpperCase()}`;
          continue;
        }
      } else if (a[_].match(/[a-z]/)) {
        H += `[${a[_]}${a[_].toUpperCase()}]`;
        continue;
      }
    }
    if (s.m) {
      if (a[_] === "^") {
        H += `(^|(?<=[\r
]))`;
        continue;
      } else if (a[_] === "$") {
        H += `($|(?=[\r
]))`;
        continue;
      }
    }
    if (s.s && a[_] === ".") {
      H += f
        ? `${a[_]}\r
`
        : `[${a[_]}\r
]`;
      continue;
    }
    if (((H += a[_]), a[_] === "\\")) u = !0;
    else if (f && a[_] === "]") f = !1;
    else if (!f && a[_] === "[") f = !0;
  }
  try {
    new RegExp(H);
  } catch (_) {
    return (
      console.warn(
        `Could not convert regex pattern at ${t.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`,
      ),
      e.source
    );
  }
  return H;
}