
function Sga() {
  var e = rSi.DOMParser,
    t = !1;
  try {
    if (new e().parseFromString("", "text/html")) t = !0;
  } catch (r) {}
  return t;
}