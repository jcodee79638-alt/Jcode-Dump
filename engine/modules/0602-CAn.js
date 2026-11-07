
function CAn(e, t) {
  return (r, s) => {
    let a = r.constant(Gut()),
      H = r.oneof(
        a,
        r.integer({ min: 1 }).map(Gut),
        e.arbitrary.map((u) => qut(u)),
        t.arbitrary.map((u) => jye(u)),
      );
    return OAn(r, s, a, H);
  };
}