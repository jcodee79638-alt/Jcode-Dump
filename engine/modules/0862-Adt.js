
function Adt(e) {
  return ft(function* () {
    if (yield* cdt) return yield* e;
    let r = new Set(),
      s = yield* e.pipe(IA(cdt, r));
    return (yield* ja(r, (a) => a(), { discard: !0 }), s);
  });
}