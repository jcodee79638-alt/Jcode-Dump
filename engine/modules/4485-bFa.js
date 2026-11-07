
function bFa(e, t) {
  if (t) tLe.set(t, e);
  return new Promise((r, s) => {
    let a = setTimeout(() => {
      if (Y8.has(e)) {
        if ((Y8.delete(e), t)) tLe.delete(t);
        (s(Error("OAuth callback timeout - authorization took too long")), tjt());
      }
    }, SFa);
    Y8.set(e, { resolve: r, reject: s, timeout: a });
  });
}