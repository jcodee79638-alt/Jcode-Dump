
function uVs(e) {
  return Bpn(
    e.reduce((t, r) => {
      let s = t.get(r.type);
      if (!s) return (t.set(r.type, r), t);
      if (r.durable && s.durable && r.durable.version !== s.durable.version) {
        if (r.durable.version > s.durable.version) t.set(r.type, r);
        return t;
      }
      if (r !== s) throw Error(`Duplicate latest event definition for ${r.type}`);
      return t;
    }, new Map()),
  );
}