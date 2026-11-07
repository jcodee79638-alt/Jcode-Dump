
function $He(e) {
  return (
    (e instanceof Error || e instanceof DOMException) &&
    (e.name === "AbortError" || e.name === "ResponseAborted" || e.name === "TimeoutError")
  );
}