
function ENs(e, t) {
  for (let [r, { value: s }] of t.journal) {
    if (s !== r.value) ((r.version = r.version + 1), (r.value = s));
    for (let a of r.pending.values()) e.currentDispatcher.scheduleTask(a, 0);
    r.pending.clear();
  }
}