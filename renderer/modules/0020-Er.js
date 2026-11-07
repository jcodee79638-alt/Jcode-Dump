
function Er(e, n, i, s = Nt, l) {
  const a = {
    fn: e,
    state: s,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: n,
    owner: Ye,
    context: Ye ? Ye.context : null,
    pure: i,
  };
  return (Ye === null || (Ye !== gi && (Ye.owned ? Ye.owned.push(a) : (Ye.owned = [a]))), a);
}