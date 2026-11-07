
function pBs(e, t, r) {
  let s;
  return (a) => {
    if (s === void 0) {
      let H = fBs(a),
        u = cd(
          new bpe([e.ast], () => (f, d) => (f instanceof a || Ma(f, FAn(t)) ? Jt(f) : bn(new OU(d, Lo(f)))), {
            identifier: t,
            [Zye]: ([f]) => new S$(f, H),
            toCodec: ([f]) => new S$(f.ast, H),
            toArbitrary:
              ([f]) =>
              () => ({
                arbitrary: f.arbitrary.map((d) => new a(d)),
                terminal: f.terminal?.map((d) => new a(d)),
              }),
            toFormatter:
              ([f]) =>
              (d) =>
                `${a.identifier}(${f(d)})`,
            "~sentinels": vBe(e.ast),
            ...r,
          }),
        );
      s = e.pipe(v$(u, H));
    }
    return s;
  };
}