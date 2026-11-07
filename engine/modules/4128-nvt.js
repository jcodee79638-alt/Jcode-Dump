
function nvt(e, t) {
  var r, s, a;
  if ((r = t.indexOf(".")) > -1) t = t.replace(".", "");
  if ((s = t.search(/e/i)) > 0) {
    if (r < 0) r = s;
    ((r += +t.slice(s + 1)), (t = t.substring(0, s)));
  } else if (r < 0) r = t.length;
  for (s = 0; t.charCodeAt(s) === 48; s++);
  for (a = t.length; t.charCodeAt(a - 1) === 48; --a);
  if (((t = t.slice(s, a)), t)) {
    if (((a -= s), (e.e = r = r - s - 1), (e.d = []), (s = (r + 1) % Cl), r < 0)) s += Cl;
    if (s < a) {
      if (s) e.d.push(+t.slice(0, s));
      for (a -= Cl; s < a;) e.d.push(+t.slice(s, (s += Cl)));
      ((t = t.slice(s)), (s = Cl - t.length));
    } else s -= a;
    for (; s--;) t += "0";
    if ((e.d.push(+t), Uf)) {
      if (e.e > e.constructor.maxE) ((e.d = null), (e.e = NaN));
      else if (e.e < e.constructor.minE) ((e.e = 0), (e.d = [0]));
    }
  } else ((e.e = 0), (e.d = [0]));
  return e;
}