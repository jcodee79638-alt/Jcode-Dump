
var uon = "~effect/encoding/EncodingError",
  Bye,
  Ilt = (e) => (typeof e === "string" ? SQt(_on.encode(e)) : SQt(e)),
  Rye = (e) => {
    let t = Lon(e),
      r = t.length;
    if (r % 4 !== 0)
      return dh(
        new Bye({
          kind: "Decode",
          module: "Base64",
          input: t,
          message: `Length must be a multiple of 4, but is ${r}`,
        }),
      );
    let s = t.indexOf("=");
    if (s !== -1 && (s < r - 2 || (s === r - 2 && t[r - 1] !== "=")))
      return dh(
        new Bye({
          kind: "Decode",
          module: "Base64",
          input: t,
          message: "Found a '=' character, but it is not at the end",
        }),
      );
    try {
      let a = t.endsWith("==") ? 2 : t.endsWith("=") ? 1 : 0,
        H = new Uint8Array(3 * (r / 4) - a);
      for (let u = 0, f = 0; u < r; u += 4, f += 3) {
        let d =
          (Elt(t.charCodeAt(u)) << 18) |
          (Elt(t.charCodeAt(u + 1)) << 12) |
          (Elt(t.charCodeAt(u + 2)) << 6) |
          Elt(t.charCodeAt(u + 3));
        ((H[f] = d >> 16), (H[f + 1] = (d >> 8) & 255), (H[f + 2] = d & 255));
      }
      return D$(H);
    } catch (a) {
      return dh(
        new Bye({
          kind: "Decode",
          module: "Base64",
          input: t,
          message: a instanceof Error ? a.message : "Invalid input",
        }),
      );
    }
  },
  fBe = (e) => wKt(Rye(e), (t) => hon.decode(t)),
  pon = (e) => (typeof e === "string" ? fon(_on.encode(e)) : fon(e)),
  don = (e) => {
    let t = Lon(e),
      r = t.length;
    if (r % 4 === 1)
      return dh(
        new Bye({
          module: "Base64Url",
          kind: "Decode",
          input: t,
          message: `Length should be a multiple of 4, but is ${r}`,
        }),
      );
    if (!/^[-_A-Z0-9]*?={0,2}$/i.test(t))
      return dh(new Bye({ module: "Base64Url", kind: "Decode", input: t, message: "Invalid input" }));
    let s = r % 4 === 2 ? `${t}==` : r % 4 === 3 ? `${t}=` : t;
    return ((s = s.replace(/-/g, "+").replace(/_/g, "/")), Rye(s));
  },
  mon = (e) => wKt(don(e), (t) => hon.decode(t)),
  _on,
  hon,
  Lon = (e) => e.replace(/[\n\r]/g, ""),
  SQt = (e) => {
    let t = e.length,
      r = "",
      s;
    for (s = 2; s < t; s += 3)
      ((r += CQ[e[s - 2] >> 2]),
        (r += CQ[((e[s - 2] & 3) << 4) | (e[s - 1] >> 4)]),
        (r += CQ[((e[s - 1] & 15) << 2) | (e[s] >> 6)]),
        (r += CQ[e[s] & 63]));
    if (s === t + 1) ((r += CQ[e[s - 2] >> 2]), (r += CQ[(e[s - 2] & 3) << 4]), (r += "=="));
    if (s === t)
      ((r += CQ[e[s - 2] >> 2]),
        (r += CQ[((e[s - 2] & 3) << 4) | (e[s - 1] >> 4)]),
        (r += CQ[(e[s - 1] & 15) << 2]),
        (r += "="));
    return r;
  },
  CQ,
  lon,
  fon = (e) => SQt(e).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");