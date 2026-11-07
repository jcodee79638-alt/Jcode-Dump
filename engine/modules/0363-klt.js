
function klt(e, t, r) {
  return new TBe(
    Reflect.ownKeys(e).map((s) => new Clt(s, e[s].ast)),
    [],
    r,
    t,
  );
}