
function Ofo(e, t) {
  return ft(function* () {
    let r = yield* e
      .glob("{command,commands}/**/*.md", { cwd: t, absolute: !0, dot: !0, symlink: !0 })
      .pipe($s(() => Jt([])));
    return yield* ja(r.toSorted(), (s) =>
      e.readFileStringSafe(s).pipe(
        Vn((a) => (a === void 0 ? void 0 : Ufo(t, s, a))),
        $s(() => Jt(void 0)),
      ),
    ).pipe(Vn((s) => s.filter((a) => a !== void 0)));
  });
}