
function Vvi(e, t, r) {
  let s;
  return {
    success: !1,
    get error() {
      if (!s) ((s = new e(t.map((a) => hX(a, r, U8())))), (t = void 0), (r = void 0));
      return s;
    },
    set error(a) {
      ((s = a), (t = void 0), (r = void 0));
    },
  };
}