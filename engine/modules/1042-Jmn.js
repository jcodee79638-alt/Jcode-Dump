
function Jmn(e, t) {
  let { name: r, config: s } = Pf(e, t),
    a = s?.mode;
  return a === "number"
    ? new H4s(r, s?.precision, s?.scale)
    : a === "bigint"
      ? new A4s(r, s?.precision, s?.scale)
      : new o4s(r, s?.precision, s?.scale);
}