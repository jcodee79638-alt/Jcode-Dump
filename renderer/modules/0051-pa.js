
function pa(e, n, i) {
  let s = i.length,
    l = n.length,
    a = s,
    c = 0,
    d = 0,
    f = n[l - 1].nextSibling,
    u = null;
  for (; c < l || d < a;) {
    if (n[c] === i[d]) {
      (c++, d++);
      continue;
    }
    for (; n[l - 1] === i[a - 1];) (l--, a--);
    if (l === c) {
      const h = a < s ? (d ? i[d - 1].nextSibling : i[a - d]) : f;
      for (; d < a;) e.insertBefore(i[d++], h);
    } else if (a === d) for (; c < l;) ((!u || !u.has(n[c])) && n[c].remove(), c++);
    else if (n[c] === i[a - 1] && i[d] === n[l - 1]) {
      const h = n[--l].nextSibling;
      (e.insertBefore(i[d++], n[c++].nextSibling), e.insertBefore(i[--a], h), (n[l] = i[a]));
    } else {
      if (!u) {
        u = new Map();
        let m = d;
        for (; m < a;) u.set(i[m], m++);
      }
      const h = u.get(n[c]);
      if (h != null)
        if (d < h && h < a) {
          let m = c,
            y = 1,
            b;
          for (; ++m < l && m < a && !((b = u.get(n[m])) == null || b !== h + y);) y++;
          if (y > h - d) {
            const j = n[c];
            for (; d < h;) e.insertBefore(i[d++], j);
          } else e.replaceChild(i[d++], n[c++]);
        } else c++;
      else n[c++].remove();
    }
  }
}