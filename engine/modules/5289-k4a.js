
function k4a(e, t, r = !1) {
  if (!t)
    return e
      .slice(1)
      .filter(
        (H) =>
          !H.text.startsWith("-") &&
          !(r && H.text.startsWith("/")) &&
          !(e[0]?.text === "chmod" && H.text.startsWith("+")),
      )
      .map((H) => H.text);
  let s = [],
    a = !1;
  for (let H of e.slice(1)) {
    if (a) {
      (s.push(H.text), (a = !1));
      continue;
    }
    if (H.type === "command_parameter") {
      let u = H.text.toLowerCase();
      if (x4a.has(u)) continue;
      a = M4a.has(u);
      continue;
    }
    s.push(H.text);
  }
  return s;
}