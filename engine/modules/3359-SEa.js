
function SEa(e, t) {
  return e.pipe(
    t.sseMode === "data" ? xE((r) => ({ id: void 0, event: "message", data: r })) : Za,
    _cn((r) => on(t.encodeEvents(r))),
    zBe((r) => lcn(TEa(r, t))),
    xE(bEa),
    HG,
  );
}