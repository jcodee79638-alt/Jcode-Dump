
function $i(e) {
  for (let n = 0; n < e.observers.length; n += 1) {
    const i = e.observers[n];
    i.state || ((i.state = zn), i.pure ? et.push(i) : Pt.push(i), i.observers && $i(i));
  }
}