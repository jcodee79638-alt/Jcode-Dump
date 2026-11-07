
function Q_n(e, t) {
  let { name: r, config: s } = Pf(e, t);
  if (s?.mode === "json") return new cqs(r);
  if (s?.mode === "bigint") return new aqs(r);
  return new uqs(r);
}