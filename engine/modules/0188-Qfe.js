
function Qfe(e, t) {
  let r = [];
  return JSON.stringify(
    e,
    function (s, a) {
      let H = DU(a);
      if (typeof H !== "object" || H === null) return H;
      while (r.length > 0 && r[r.length - 1] !== this) r.pop();
      if (r.includes(H)) return;
      return (r.push(H), H);
    },
    t?.space,
  );
}