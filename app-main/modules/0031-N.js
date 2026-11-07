
function N(e) {
  let t = q(e, 200);
  if (!/^[A-Za-z0-9_.-]+$/.test(t)) throw Error("Invalid request.");
  return t;
}