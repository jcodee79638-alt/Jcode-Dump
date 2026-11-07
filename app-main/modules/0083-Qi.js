
async function Qi(e, t) {
  let n = W.default.posix.dirname(wt(t));
  if (n === ".") return;
  (await X(e, n, !0), await sa(W.default.join(e, n)));
}