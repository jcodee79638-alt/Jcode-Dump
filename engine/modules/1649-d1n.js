
function d1n(e, t = [], r = Iht.DEFAULT) {
  let s = null,
    a = [],
    H = [];
  function u(d) {
    if (Array.isArray(a)) a.push(d);
    else if (s !== null) a[s] = d;
  }
  return (
    m1n(
      e,
      {
        onObjectBegin: () => {
          let d = {};
          (u(d), H.push(a), (a = d), (s = null));
        },
        onObjectProperty: (d) => {
          s = d;
        },
        onObjectEnd: () => {
          a = H.pop();
        },
        onArrayBegin: () => {
          let d = [];
          (u(d), H.push(a), (a = d), (s = null));
        },
        onArrayEnd: () => {
          a = H.pop();
        },
        onLiteralValue: u,
        onError: (d, _, L) => {
          t.push({ error: d, offset: _, length: L });
        },
      },
      r,
    ),
    a[0]
  );
}