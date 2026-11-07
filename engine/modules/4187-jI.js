
var jI = ne(async () => {
  Gt();
  GFe();
  BA();
  await r5();
  ((Ec = Jj),
    (Td = re.check(k6("msg")).pipe(
      Jl("MessageID"),
      Bl((e) => ({ ascending: (t) => e.make(QJt("message", t)) })),
    )),
    (Zp = re.check(k6("prt")).pipe(
      Jl("PartID"),
      Bl((e) => ({ ascending: (t) => e.make(QJt("part", t)) })),
    )));
});