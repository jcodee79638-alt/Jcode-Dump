
function ba(e, n, i, s = {}) {
  let l;
  return (
    rn((a) => {
      ((l = a), n === document ? e() : t(n, e(), n.firstChild ? null : void 0, i));
    }, s.owner),
    () => {
      (l(), (n.textContent = ""));
    }
  );
}