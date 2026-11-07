
function zwi({ id: e, model: t, created: r }) {
  return {
    id: e != null ? e : void 0,
    modelId: t != null ? t : void 0,
    timestamp: r != null ? new Date(r * 1000) : void 0,
  };
}