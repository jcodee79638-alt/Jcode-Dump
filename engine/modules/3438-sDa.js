
function sDa(e, t) {
  for (let r of Reflect.ownKeys(t)) {
    let s = Object.getOwnPropertyDescriptor(t, r);
    if (!s.enumerable) continue;
    if (s.get) Dvi(e, r, () => t[r]);
    else yvi(e, r, s.value);
  }
}