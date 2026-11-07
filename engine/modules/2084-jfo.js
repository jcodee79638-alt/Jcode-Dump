
function jfo(e, t) {
  return ja(Ifo, (r) =>
    e
      .glob(r.pattern, { cwd: t, absolute: !0, dot: !0, symlink: !0 })
      .pipe(Vn((s) => s.toSorted().map((a) => ({ directory: t, filepath: a, primary: r.primary })))),
  ).pipe(
    Vn((r) => r.flat()),
    $s(() => Jt([])),
  );
}