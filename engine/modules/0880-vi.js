
function vi(e, t) {
  if (!e || typeof e !== "object") return !1;
  if (e instanceof t) return !0;
  if (!Object.prototype.hasOwnProperty.call(t, Gr))
    throw Error(
      `Class "${t.name ?? "<unknown>"}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`,
    );
  let r = Object.getPrototypeOf(e)?.constructor;
  if (r)
    while (r) {
      if (Gr in r && r[Gr] === t[Gr]) return !0;
      r = Object.getPrototypeOf(r);
    }
  return !1;
}