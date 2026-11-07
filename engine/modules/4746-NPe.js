
function NPe(e) {
  if (e instanceof GD) {
    let t = {};
    for (let r in e.shape) {
      let s = e.shape[r];
      t[r] = sJ.create(NPe(s));
    }
    return new GD({ ...e._def, shape: () => t });
  } else if (e instanceof iJ) return new iJ({ ...e._def, type: NPe(e.element) });
  else if (e instanceof sJ) return sJ.create(NPe(e.unwrap()));
  else if (e instanceof hce) return hce.create(NPe(e.unwrap()));
  else if (e instanceof Pee) return Pee.create(e.items.map((t) => NPe(t)));
  else return e;
}