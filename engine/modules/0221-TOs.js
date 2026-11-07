
var TOs = (e) => {
    let t = e[Symbol.iterator](),
      r = 0;
    while (!t.next().done) r++;
    return r;
  },
  m2e = (e) => {
    let r = e[Symbol.iterator]().next();
    if (r.done) throw Error("headUnsafe: empty iterable");
    return r.value;
  },
  vOs,
  bOs,
  jOs,
  nut = () => bOs;