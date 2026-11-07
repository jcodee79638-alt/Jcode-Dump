
function wvi(e, t) {
  for (let r in t) {
    let s = Object.getOwnPropertyDescriptor(t, r);
    if (s.get) Object.defineProperty(e, r, { ...s, enumerable: !1 });
    else fDa(e, r, s.value);
  }
}