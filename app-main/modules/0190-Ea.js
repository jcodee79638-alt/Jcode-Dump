
function Ea(e) {
  let t = q(e, 36);
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(t))
    throw Error("Choose an existing project command.");
  return t;
}