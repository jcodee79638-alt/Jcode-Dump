
var W1e,
  Rpt,
  sfn = "~effect/ChildProcessSpawner/ChildProcessHandle",
  v3s,
  FRe = (e) => Object.assign(Object.create(v3s), e),
  Wpt = (e) => {
    let t = (s, a) =>
        e(s).pipe(
          Vn((H) => C6(a?.includeStderr === !0 ? H.all : H.stdout)),
          hh,
        ),
      r = (s, a) => d1e(t(s, a));
    return kS.of({
      spawn: e,
      exitCode: (s) => FL(Hi(e(s), (a) => a.exitCode)),
      streamString: t,
      streamLines: r,
      lines: (s, a) => GYt(r(s, a)),
      string: (s, a) => cG(t(s, a)),
    });
  },
  kS;