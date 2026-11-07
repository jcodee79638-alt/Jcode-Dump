
var aKe = (e) => {
  if (e instanceof Error) return e;
  if (typeof e === "object" && e !== null) {
    try {
      if (Object.prototype.toString.call(e) === "[object Error]") {
        let t = Error(e.message, e.cause ? { cause: e.cause } : {});
        if (e.stack) t.stack = e.stack;
        if (e.cause && !t.cause) t.cause = e.cause;
        if (e.name) t.name = e.name;
        return t;
      }
    } catch {}
    try {
      return Error(JSON.stringify(e));
    } catch {}
  }
  return Error(e);
};