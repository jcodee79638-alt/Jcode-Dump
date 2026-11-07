
function SDr({ model: e, settings: t, telemetry: r, headers: s }) {
  var a;
  return {
    "ai.model.provider": e.provider,
    "ai.model.id": e.modelId,
    ...Object.entries(t).reduce((H, [u, f]) => {
      if (u === "timeout") {
        let d = b6i(f);
        if (d != null) H[`ai.settings.${u}`] = d;
      } else H[`ai.settings.${u}`] = f;
      return H;
    }, {}),
    ...Object.entries((a = r == null ? void 0 : r.metadata) != null ? a : {}).reduce(
      (H, [u, f]) => ((H[`ai.telemetry.metadata.${u}`] = f), H),
      {},
    ),
    ...Object.entries(s != null ? s : {}).reduce((H, [u, f]) => {
      if (f !== void 0) H[`ai.request.headers.${u}`] = f;
      return H;
    }, {}),
  };
}