
function ahn(e, t) {
  let { name: r, config: s } = Pf(e, t),
    a = s?.mode;
  return a === "number" ? new dqs(r) : a === "bigint" ? new _qs(r) : new fqs(r);
}