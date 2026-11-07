
function Fpn(e) {
  return Bpn(
    e.reduce((t, r) => {
      if (!r.durable) return t;
      let s = Npn(r.type, r.durable.version);
      if (t.has(s)) throw Error(`Duplicate durable event definition for ${s}`);
      return (t.set(s, r), t);
    }, new Map()),
  );
}