
function NJa(e) {
  var t = {};
  for (var r in zjr) t[r] = e && owe(e, r) ? e[r] : zjr[r];
  if (t.ecmaVersion === "latest") t.ecmaVersion = 1e8;
  else if (t.ecmaVersion == null) {
    if (!JXi && typeof console === "object" && console.warn)
      ((JXi = !0),
        console.warn(`Since Acorn 8.0.0, options.ecmaVersion is required.
Defaulting to 2020, but this will stop working in the future.`));
    t.ecmaVersion = 11;
  } else if (t.ecmaVersion >= 2015) t.ecmaVersion -= 2009;
  if (t.allowReserved == null) t.allowReserved = t.ecmaVersion < 5;
  if (!e || e.allowHashBang == null) t.allowHashBang = t.ecmaVersion >= 14;
  if (GXi(t.onToken)) {
    var s = t.onToken;
    t.onToken = function (a) {
      return s.push(a);
    };
  }
  if (GXi(t.onComment)) t.onComment = FJa(t, t.onComment);
  return t;
}