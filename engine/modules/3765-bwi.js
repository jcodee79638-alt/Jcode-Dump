
function bwi() {
  let e = Error.prepareStackTrace;
  try {
    Error.prepareStackTrace = (a, H) => H;
    let t = Error("Capture current module path");
    Error.captureStackTrace(t, bwi);
    let [r] = t.stack,
      s = r == null ? void 0 : r.getFileName();
    if (s == null) throw Error("Unable to determine the current module path");
    return s;
  } finally {
    Error.prepareStackTrace = e;
  }
}