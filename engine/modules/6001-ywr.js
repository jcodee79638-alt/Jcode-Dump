
function ywr(e) {
  return e.pipe(Zo((t) => new E$e({ name: t._tag, data: { message: t.message } })));
}