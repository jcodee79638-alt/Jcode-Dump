
function Ehe(e, t, r, s) {
  let a = qZ(t);
  for (let H of r) {
    let u = Object.getOwnPropertyDescriptor(a, H);
    if (!u.enumerable) continue;
    if (u.get)
      Dvi(e, H, () => {
        let f = t._zod.def.shape[H];
        return s ? s(f, H) : f;
      });
    else yvi(e, H, s ? s(u.value, H) : u.value);
  }
}