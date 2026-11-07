
function e5e(e) {
  let t = Object.getOwnPropertyDescriptor(e, "shape");
  return t?.get ? t.get.raw : t?.value;
}