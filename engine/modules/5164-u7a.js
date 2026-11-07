
function u7a(e) {
  if (!e.startsWith('"')) return e;
  if (!e.endsWith('"')) return e;
  let t = e.slice(1, -1),
    r = [];
  for (let s = 0; s < t.length; s++) {
    let a = t[s];
    if (a !== "\\") {
      r.push(a.charCodeAt(0));
      continue;
    }
    let H = t[s + 1];
    if (!H) {
      r.push(92);
      continue;
    }
    if (H >= "0" && H <= "7") {
      let d = t.slice(s + 1, s + 4).match(/^[0-7]{1,3}/);
      if (!d) {
        (r.push(H.charCodeAt(0)), s++);
        continue;
      }
      (r.push(parseInt(d[0], 8)), (s += d[0].length));
      continue;
    }
    let u =
      H === "n"
        ? `
`
        : H === "r"
          ? "\r"
          : H === "t"
            ? "\t"
            : H === "b"
              ? "\b"
              : H === "f"
                ? "\f"
                : H === "v"
                  ? "\v"
                  : H === "\\" || H === '"'
                    ? H
                    : void 0;
    (r.push((u ?? H).charCodeAt(0)), s++);
  }
  return Buffer.from(r).toString();
}