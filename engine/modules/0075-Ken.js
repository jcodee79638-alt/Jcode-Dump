
function Ken(e, t = Date.now()) {
  let r = Uq.get(e);
  if (!r || r.expiresAt <= t) {
    Uq.delete(e);
    return;
  }
  return r.id;
}