
function Vn(c) {
  const t = document.createElement("span");
  ((t.style.visibility = "hidden"), (t.style.colorScheme = "only light"), document.body.append(t));
  for (const e of c.keys()) {
    t.style.color = e;
    const s = window.getComputedStyle(t).color;
    c.set(e, Ie(s));
  }
  t.remove();
}