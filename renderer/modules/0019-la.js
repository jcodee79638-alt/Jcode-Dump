
function la(e, n, i) {
  let s;
  const l = Ye,
    a = Je;
  Je = Ye = e;
  try {
    s = e.fn(n);
  } catch (c) {
    return (
      e.pure && ((e.state = Nt), e.owned && e.owned.forEach(fn), (e.owned = null)),
      (e.updatedAt = i + 1),
      pi(c)
    );
  } finally {
    ((Je = a), (Ye = l));
  }
  (!e.updatedAt || e.updatedAt <= i) &&
    (e.updatedAt != null && "observers" in e ? vi(e, s) : (e.value = s), (e.updatedAt = i));
}