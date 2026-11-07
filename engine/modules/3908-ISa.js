
function ISa({ provider: e, modelId: t }) {
  WTt({
    warnings: [
      {
        type: "compatibility",
        feature: "specificationVersion",
        details: "Using v2 specification compatibility mode. Some features may not be available.",
      },
    ],
    provider: e,
    model: t,
  });
}