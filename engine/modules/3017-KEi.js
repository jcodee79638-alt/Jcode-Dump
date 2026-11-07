
function KEi(e) {
  return LLr(e).pipe(
    Hi((t) => {
      let r = t.flatMap((s) => (s._tag === "Unavailable" ? [s.key] : []));
      if (r.length > 0) return new XEi({ keys: r });
      return Jt(zEi(t));
    }),
  );
}