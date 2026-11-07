
function C1a(e) {
  return (t, r, s) => {
    e(t, { ...r, all: !0 }, (a, H) => {
      if (a) {
        s(a);
        return;
      }
      try {
        let [u] = H;
        if (u == null) throw Error(`Hostname ${t} did not resolve to an address`);
        for (let { address: f, family: d } of H) j1a({ address: f, family: d, hostname: t });
        if (r.all === !0) s(null, H);
        else s(null, u.address, u.family);
      } catch (u) {
        s(u instanceof Error ? u : Error(String(u)));
      }
    });
  };
}