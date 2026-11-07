
function Oon(e) {
  let t = e?.separator ?? ",",
    r = e?.keyValueSeparator ?? "=";
  return Sm((s) =>
    s.split(t).reduce((a, H) => {
      let [u, f] = H.split(r);
      if (u && f) a[u] = f;
      return a;
    }, {}),
  );
}