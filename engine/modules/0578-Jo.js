
function Jo(e) {
  let t = e.map(ri);
  return cd(Olt(t, "anyOf", void 0), {
    literals: e,
    members: t,
    mapMembers(r) {
      return Io(r(this.members));
    },
    pick(r) {
      return Jo(r);
    },
    transform(r) {
      return Io(t.map((s, a) => s.transform(r[a])));
    },
  });
}