
function ax(e, t) {
  let r = Array.isArray(e) ? Object.fromEntries(e.map((s) => [s, s])) : e;
  return new MIr({ type: "enum", entries: r, ...yA(t) });
}