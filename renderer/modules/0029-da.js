
function da(e) {
  return e instanceof Error ? e : new Error(typeof e == "string" ? e : "Unknown error", { cause: e });
}