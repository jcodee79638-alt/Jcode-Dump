
function vVa(e, t) {
  let r = e["User-Agent"];
  return { ...e, "User-Agent": r ? `${r} ${t}` : t };
}