
function Tft(e) {
  let t = iRe(Cie(e.ast)),
    r = jft(t);
  return (s, a) =>
    r(
      s,
      a?.disableChecks
        ? a?.parseOptions
          ? { ...a.parseOptions, disableChecks: !0 }
          : { disableChecks: !0 }
        : a?.parseOptions,
    );
}