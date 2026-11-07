
function rn(e, n) {
  const i = Je,
    s = Ye,
    l = e.length === 0,
    a = n === void 0 ? s : n,
    c = l ? gi : { owned: null, cleanups: null, context: a ? a.context : null, owner: a },
    d = l ? e : () => e(() => Ze(() => fn(c)));
  ((Ye = c), (Je = null));
  try {
    return $n(d, !0);
  } finally {
    ((Je = i), (Ye = s));
  }
}