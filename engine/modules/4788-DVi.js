
function DVi(e, t = {}) {
  let r = e,
    s = GRa(t),
    a,
    H;
  if (typeof s.filter === "function") ((H = s.filter), (r = H("", r)));
  else if (vP(s.filter)) ((H = s.filter), (a = H));
  let u = [];
  if (typeof r !== "object" || r === null) return "";
  let f = gVi[s.arrayFormat],
    d = f === "comma" && s.commaRoundTrip;
  if (!a) a = Object.keys(r);
  if (s.sort) a.sort(s.sort);
  let _ = new WeakMap();
  for (let D = 0; D < a.length; ++D) {
    let S = a[D];
    if (s.skipNulls && r[S] === null) continue;
    EVi(
      u,
      IVi(
        r[S],
        S,
        f,
        d,
        s.allowEmptyArrays,
        s.strictNullHandling,
        s.skipNulls,
        s.encodeDotInKeys,
        s.encode ? s.encoder : null,
        s.filter,
        s.sort,
        s.allowDots,
        s.serializeDate,
        s.format,
        s.formatter,
        s.encodeValuesOnly,
        s.charset,
        _,
      ),
    );
  }
  let L = u.join(s.delimiter),
    I = s.addQueryPrefix === !0 ? "?" : "";
  if (s.charsetSentinel)
    if (s.charset === "iso-8859-1") I += "utf8=%26%2310003%3B&";
    else I += "utf8=%E2%9C%93&";
  return L.length > 0 ? I + L : "";
}