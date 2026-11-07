
function Fua(e) {
  let t = new Set();
  for (let r of e) {
    if (t.has(r.key)) throw new JEi({ key: r.key });
    t.add(r.key);
  }
}