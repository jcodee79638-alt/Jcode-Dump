
function dEa(e) {
  let t = new Map();
  return (
    e.forEach(({ encoding: r, schemas: s }, a) => {
      let H = G_(Io(s));
      if (r._tag === "Multipart") t.set(a, { _tag: "Multipart", mode: r.mode, limits: r.limits, decode: H });
      else t.set(a, { _tag: r._tag, decode: H, nullOnEmpty: s.some((u) => san(ME(u.ast))) });
    }),
    t
  );
}