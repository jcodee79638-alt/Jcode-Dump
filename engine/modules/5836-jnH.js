
function jnH(e, t) {
  let r = e.searchParams.get("workspace");
  return t ?? (r ? YS.make(r) : void 0);
}