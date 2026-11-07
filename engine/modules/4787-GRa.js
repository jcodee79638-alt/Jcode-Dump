
function GRa(e = Lx) {
  if (typeof e.allowEmptyArrays < "u" && typeof e.allowEmptyArrays !== "boolean")
    throw TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof e.encodeDotInKeys < "u" && typeof e.encodeDotInKeys !== "boolean")
    throw TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  if (e.encoder !== null && typeof e.encoder < "u" && typeof e.encoder !== "function")
    throw TypeError("Encoder has to be a function.");
  let t = e.charset || Lx.charset;
  if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
    throw TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  let r = qSr;
  if (typeof e.format < "u") {
    if (!APt(XSr, e.format)) throw TypeError("Unknown format option provided.");
    r = e.format;
  }
  let s = XSr[r],
    a = Lx.filter;
  if (typeof e.filter === "function" || vP(e.filter)) a = e.filter;
  let H;
  if (e.arrayFormat && e.arrayFormat in gVi) H = e.arrayFormat;
  else if ("indices" in e) H = e.indices ? "indices" : "repeat";
  else H = Lx.arrayFormat;
  if ("commaRoundTrip" in e && typeof e.commaRoundTrip !== "boolean")
    throw TypeError("`commaRoundTrip` must be a boolean, or absent");
  let u = typeof e.allowDots > "u" ? (!!e.encodeDotInKeys === !0 ? !0 : Lx.allowDots) : !!e.allowDots;
  return {
    addQueryPrefix: typeof e.addQueryPrefix === "boolean" ? e.addQueryPrefix : Lx.addQueryPrefix,
    allowDots: u,
    allowEmptyArrays: typeof e.allowEmptyArrays === "boolean" ? !!e.allowEmptyArrays : Lx.allowEmptyArrays,
    arrayFormat: H,
    charset: t,
    charsetSentinel: typeof e.charsetSentinel === "boolean" ? e.charsetSentinel : Lx.charsetSentinel,
    commaRoundTrip: !!e.commaRoundTrip,
    delimiter: typeof e.delimiter > "u" ? Lx.delimiter : e.delimiter,
    encode: typeof e.encode === "boolean" ? e.encode : Lx.encode,
    encodeDotInKeys: typeof e.encodeDotInKeys === "boolean" ? e.encodeDotInKeys : Lx.encodeDotInKeys,
    encoder: typeof e.encoder === "function" ? e.encoder : Lx.encoder,
    encodeValuesOnly: typeof e.encodeValuesOnly === "boolean" ? e.encodeValuesOnly : Lx.encodeValuesOnly,
    filter: a,
    format: r,
    formatter: s,
    serializeDate: typeof e.serializeDate === "function" ? e.serializeDate : Lx.serializeDate,
    skipNulls: typeof e.skipNulls === "boolean" ? e.skipNulls : Lx.skipNulls,
    sort: typeof e.sort === "function" ? e.sort : null,
    strictNullHandling:
      typeof e.strictNullHandling === "boolean" ? e.strictNullHandling : Lx.strictNullHandling,
  };
}