
function Fwn(e = Gxe) {
  return bWs(PWs, (t) => {
    let r = Array.isArray(t.message) ? t.message : [t.message];
    return [
      ["timestamp", t.timestamp],
      ["level", t.level],
      ["run", e],
      ...r.flatMap((s) => (Bwn(s) ? K$t(s) : [["message", s]])),
      ...(t.cause === void 0 ? [] : [["cause", t.cause]]),
      ...K$t(t.spans),
      ...K$t(t.annotations),
    ]
      .map(([s, a]) => `${s}=${w_o(a)}`)
      .join(" ");
  });
}