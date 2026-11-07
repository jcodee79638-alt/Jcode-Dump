
function jFa(e) {
  let r = tLe.get(e) ?? e,
    s = Y8.get(r);
  if (s)
    (clearTimeout(s.timeout), Y8.delete(r), tLe.delete(e), s.reject(Error("Authorization cancelled")), tjt());
}