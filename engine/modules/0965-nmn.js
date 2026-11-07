
function nmn(e, t) {
  for (let r of t)
    for (let s of Object.getOwnPropertyNames(r.prototype)) {
      if (s === "constructor") continue;
      Object.defineProperty(
        e.prototype,
        s,
        Object.getOwnPropertyDescriptor(r.prototype, s) || Object.create(null),
      );
    }
}