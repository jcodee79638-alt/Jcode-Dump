
function dxa(e) {
  let { lazy: t, lazyArgs: r } = e,
    s = t(...r);
  return Object.assign(s, { isSingle: t.single ?? !1, index: 0, items: [] });
}