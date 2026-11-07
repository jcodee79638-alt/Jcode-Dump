
var E0i,
  khr,
  Bae,
  g0i,
  whr = (e, t) => {
    let r;
    try {
      r = typeof Bun < "u" ? import.meta.resolve(e, t) : gAa($Aa(yN.join(t, "package.json")).resolve(e)).href;
    } catch {
      r = void 0;
    }
    return { directory: t, entrypoint: r };
  },
  IAa,
  tMt,
  DAa;