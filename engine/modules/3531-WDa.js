
function WDa(e) {
  let t = new Map();
  for (let r of e.options) {
    let s = r._zod.propValues?.[e.discriminator];
    if (!s || s.size === 0)
      throw Error(`Invalid discriminated union option at index "${e.options.indexOf(r)}"`);
    for (let a of s)
      if (t.has(a)) {
        if (a !== void 0) throw Error(`Duplicate discriminator value "${String(a)}"`);
        t.set(a, null);
      } else t.set(a, r);
  }
  return t;
}