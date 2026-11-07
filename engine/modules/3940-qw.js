
async function qw({ telemetry: e, attributes: t }) {
  if ((e == null ? void 0 : e.isEnabled) !== !0) return {};
  let r = {};
  for (let [s, a] of Object.entries(t)) {
    if (a == null) continue;
    if (typeof a === "object" && "input" in a && typeof a.input === "function") {
      if ((e == null ? void 0 : e.recordInputs) === !1) continue;
      let H = await a.input();
      if (H != null) r[s] = H;
      continue;
    }
    if (typeof a === "object" && "output" in a && typeof a.output === "function") {
      if ((e == null ? void 0 : e.recordOutputs) === !1) continue;
      let H = await a.output();
      if (H != null) r[s] = H;
      continue;
    }
    r[s] = a;
  }
  return r;
}