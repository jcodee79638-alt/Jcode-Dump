
function whe({ operationId: e, telemetry: t }) {
  return {
    "operation.name": `${e}${(t == null ? void 0 : t.functionId) != null ? ` ${t.functionId}` : ""}`,
    "resource.name": t == null ? void 0 : t.functionId,
    "ai.operationId": e,
    "ai.telemetry.functionId": t == null ? void 0 : t.functionId,
  };
}