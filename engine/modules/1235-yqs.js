
var yqs = (e) =>
    new srr({
      message:
        typeof e === "object" && e !== null && "message" in e && typeof e.message === "string"
          ? e.message
          : String(e),
      cause: e,
    }),
  Khn,
  Mqs;