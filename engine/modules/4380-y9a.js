
function y9a(e) {
  if (!e) return { supportsFormMode: !1, supportsUrlMode: !1 };
  let t = e.form !== void 0,
    r = e.url !== void 0;
  return { supportsFormMode: t || (!t && !r), supportsUrlMode: r };
}