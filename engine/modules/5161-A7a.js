
function A7a(e) {
  return mQt(
    Jt((t) => {
      let r = e.parse(t.input),
        s = o7a(r, e.provider);
      if (!s) return Xp(t.attempt);
      let a = e.provider === QL && A4i(r) !== void 0,
        H = a ? yJt : n7a,
        u = a ? Math.ceil(yJt / DJt) : e.provider === QL ? r7a : t7a;
      if (t.attempt > u) return Xp(t.attempt);
      if (e.provider === QL && t.elapsed >= H) return Xp(t.attempt);
      let f =
        e.provider === QL
          ? Math.max(
              a ? DJt : MZr,
              z6.isInstance(r) ? (MAt(r.data.responseHeaders?.["retry-after"]) ?? 0) : 0,
            )
          : s7a(t.attempt, z6.isInstance(r) ? r : void 0);
      if (e.provider === QL && t.elapsed + f > H) return Xp(t.attempt);
      return ft(function* () {
        let d = yield* qC;
        return (
          yield* e.set({ attempt: t.attempt, message: s.message, action: s.action, next: d + f }),
          [t.attempt, UC(f)]
        );
      });
    }),
  );
}