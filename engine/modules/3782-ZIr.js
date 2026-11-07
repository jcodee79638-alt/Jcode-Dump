
function ZIr(e) {
  let { stackTraceLimit: t } = Error;
  try {
    Error.stackTraceLimit = 0;
  } catch (r) {
    return Iwi(e);
  }
  try {
    return Iwi(e);
  } finally {
    Error.stackTraceLimit = t;
  }
}