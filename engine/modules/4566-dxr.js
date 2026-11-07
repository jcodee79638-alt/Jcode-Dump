
function dxr(e) {
  let t = [],
    r = e.match(/\$\d+/g);
  if (r) for (let s of [...new Set(r)].sort()) t.push(s);
  if (e.includes("$ARGUMENTS")) t.push("$ARGUMENTS");
  return t;
}