
function TEa(e, t) {
  return t.encodeCause(e).pipe(
    on,
    Vn((r) => ({ id: void 0, event: vEa, data: r })),
  );
}