
function af(e, t) {
  let r = t?.space ?? 0,
    s = new WeakSet(),
    a = !r ? "" : typeof r === "number" ? " ".repeat(r) : r,
    H = (_) => a.repeat(_),
    u = (_, L) => {
      let I = _?.constructor;
      return I && I !== Object.prototype.constructor && I.name ? `${I.name}(${L})` : L;
    },
    f = (_) => {
      try {
        return Reflect.ownKeys(_);
      } catch {
        return ["[ownKeys threw]"];
      }
    };
  function d(_, L = 0) {
    if (Array.isArray(_)) {
      if (s.has(_)) return Ptn;
      if ((s.add(_), !a || _.length <= 1)) return `[${_.map((D) => d(D, L)).join(",")}]`;
      let I = _.map((D) => d(D, L + 1)).join(
        `,
` + H(L + 1),
      );
      return `[
${H(L + 1)}${I}
${H(L)}]`;
    }
    if (_ instanceof Date) return fKt(_);
    if (
      !t?.ignoreToString &&
      Ma(_, "toString") &&
      typeof _.toString === "function" &&
      _.toString !== Object.prototype.toString &&
      _.toString !== Array.prototype.toString
    ) {
      let I = aOs(_);
      if (_ instanceof Error && _.cause) return `${I} (cause: ${d(_.cause, L)})`;
      return I;
    }
    if (typeof _ === "string") return JSON.stringify(_);
    if (typeof _ === "number" || _ == null || typeof _ === "boolean" || typeof _ === "symbol")
      return String(_);
    if (typeof _ === "bigint") return String(_) + "n";
    if (typeof _ === "object" || typeof _ === "function") {
      if (s.has(_)) return Ptn;
      if ((s.add(_), eye in _)) return af(lKt(_));
      if (Symbol.iterator in _) return `${_.constructor.name}(${d(Array.from(_), L)})`;
      let I = f(_);
      if (!a || I.length <= 1) {
        let S = `{${I.map((T) => `${rye(T)}:${d(_[T], L)}`).join(",")}}`;
        return u(_, S);
      }
      let D = `{
${I.map((S) => `${H(L + 1)}${rye(S)}: ${d(_[S], L + 1)}`).join(`,
`)}
${H(L)}}`;
      return u(_, D);
    }
    return String(_);
  }
  return d(e, 0);
}