
function Vr(e) {
  let t = q(e, 80);
  if (!/^[A-Za-z0-9_-]+$/.test(t)) throw Error("Choose an existing run profile.");
  return t;
}