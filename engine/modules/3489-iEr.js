
function iEr(e, t = (r) => r.message) {
  let r = {},
    s = [];
  for (let a of e.issues)
    if (a.path.length > 0) EDa(r, a.path[0], () => []).push(t(a));
    else s.push(t(a));
  return { formErrors: s, fieldErrors: r };
}