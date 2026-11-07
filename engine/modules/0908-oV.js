
function oV(e, t) {
  return e.map((r) => {
    if (vi(r, sV)) {
      if (!(r.name in t)) throw Error(`No value for placeholder "${r.name}" was provided`);
      return t[r.name];
    }
    if (vi(r, My) && vi(r.value, sV)) {
      if (!(r.value.name in t)) throw Error(`No value for placeholder "${r.value.name}" was provided`);
      if (t[r.value.name] === null) return t[r.value.name];
      let s = r.encoder.mapToDriverValue.isNoop
        ? t[r.value.name]
        : r.encoder.mapToDriverValue(t[r.value.name]);
      return r.codec ? r.codec(s) : s;
    }
    return r;
  });
}