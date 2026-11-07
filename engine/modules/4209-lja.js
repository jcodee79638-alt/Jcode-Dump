
function lja(e) {
  return ft(function* () {
    let r = [],
      s;
    while (!0) {
      let a = yield* lXe({ sessionID: e, limit: 50, before: s }).pipe(
        GM(Xw.isInstance, () => Jt({ items: [], more: !1, cursor: void 0 })),
      );
      if (a.items.length === 0) break;
      for (let H = a.items.length - 1; H >= 0; H--) {
        let u = a.items[H];
        if (u) r.push(u);
      }
      if (!a.more || !a.cursor) break;
      s = a.cursor;
    }
    return r;
  });
}