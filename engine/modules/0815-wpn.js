
function wpn(e) {
  return (
    e?.reduce((t, [r, s]) => {
      let a = Yer(oVs(r, s), t),
        H = new Map([[r.name, a]]);
      for (let [u, f] of t) t.set(u, Yer(f, H));
      return (t.set(r.name, a), t);
    }, new Map()) ?? new Map()
  );
}