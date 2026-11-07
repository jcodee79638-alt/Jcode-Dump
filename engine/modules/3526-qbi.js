
function qbi(e, t, r) {
  if (e.issues.length) t.issues.push(...XZ(r, e.issues));
  t.value[r] = e.value;
}