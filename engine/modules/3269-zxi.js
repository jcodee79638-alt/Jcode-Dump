
function zxi(e, t, r) {
  var s, a, H;
  if (e === "left") ((s = t.previousSibling), (a = / $/));
  else ((s = t.nextSibling), (a = /^ /));
  if (s) {
    if (s.nodeType === 3) H = a.test(s.nodeValue);
    else if (r.preformattedCode && s.nodeName === "CODE") H = !1;
    else if (s.nodeType === 1 && !Kgr(s)) H = a.test(s.textContent);
  }
  return H;
}