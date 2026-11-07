
function Jpe(e, t) {
  let r = D1e(e),
    s = uG(r),
    a = ME(r.ast),
    H = typeof t === "string" ? [t] : (t ?? []);
  return Gpe((u) => {
    let f = u.prefix ? [...u.prefix, ...H] : H;
    return pRe(a, u, H).pipe(
      _1((d) => s(d).pipe(zC((_) => new lG(f.length > 0 ? new v6(f, _) : _)))),
      zC((d) => new Xft(d)),
    );
  });
}