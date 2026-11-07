
function DMr(e) {
  return e instanceof Error
    ? "errors" in e && Array.isArray(e.errors)
      ? e.errors.map(DMr).join(", ")
      : "cause" in e && e.cause instanceof Error
        ? `${e}: ${DMr(e.cause)}`
        : e.message
    : `${e}`;
}