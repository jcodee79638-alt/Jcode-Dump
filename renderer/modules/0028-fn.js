
function fn(e) {
  let n;
  if (e.sources)
    for (; e.sources.length;) {
      const i = e.sources.pop(),
        s = e.sourceSlots.pop(),
        l = i.observers;
      if (l && l.length) {
        const a = l.pop(),
          c = i.observerSlots.pop();
        s < l.length && ((a.sourceSlots[c] = s), (l[s] = a), (i.observerSlots[s] = c));
      }
    }
  if (e.tOwned) {
    for (n = e.tOwned.length - 1; n >= 0; n--) fn(e.tOwned[n]);
    delete e.tOwned;
  }
  if (e.owned) {
    for (n = e.owned.length - 1; n >= 0; n--) fn(e.owned[n]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (n = e.cleanups.length - 1; n >= 0; n--) e.cleanups[n]();
    e.cleanups = null;
  }
  e.state = 0;
}