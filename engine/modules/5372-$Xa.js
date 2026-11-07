
function $Xa(e, t) {
  let r = t.split(`
`).length;
  if (
    e.split(`
`).length >= Math.max(r + 3, r * 2)
  )
    return !0;
  if (r === 1) return !1;
  return e.trim().length > Math.max(t.trim().length + 500, t.trim().length * 4);
}