
function zbe(e) {
  if (e instanceof ND) {
    let t = {};
    for (let r in e.shape) {
      let s = e.shape[r];
      t[r] = gX.create(zbe(s));
    }
    return new ND({ ...e._def, shape: () => t });
  } else if (e instanceof $X) return new $X({ ...e._def, type: zbe(e.element) });
  else if (e instanceof gX) return gX.create(zbe(e.unwrap()));
  else if (e instanceof hHe) return hHe.create(zbe(e.unwrap()));
  else if (e instanceof YZ) return YZ.create(e.items.map((t) => zbe(t)));
  else return e;
}