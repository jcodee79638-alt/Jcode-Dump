
function ri(e) {
  let t = cd(new eG(e), {
    literal: e,
    transform(r) {
      return t.pipe(v$(ri(r), { decode: Sm(() => r), encode: Sm(() => e) }));
    },
  });
  return t;
}