
function wji(e) {
  let t = Object.keys(e.shape),
    r = Object.getOwnPropertySymbols(e.shape),
    s = r.length ? r : BDa,
    a = s.length ? [...t, ...s] : t;
  for (let u of a)
    if (!e.shape?.[u]?._zod?.traits?.has("$ZodType"))
      throw Error(`Invalid element at key "${String(u)}": expected a Zod schema`);
  let H = vvi(e.shape);
  return { ...e, allKeys: a, symbolKeys: s, keySet: new Set(t), numKeys: t.length, optionalKeys: new Set(H) };
}