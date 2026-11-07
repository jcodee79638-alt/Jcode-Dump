
function ban(e, t, r) {
  let { literals: s, parameters: a } = van(e);
  return new TBe(
    s.map((H) => new Clt(H, t)),
    a.map((H) => new JQt(H, t, r)),
  );
}