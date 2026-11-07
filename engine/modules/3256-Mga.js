
function Mga(e, t, r) {
  var s = e.filter;
  if (typeof s === "string") {
    if (s === t.nodeName.toLowerCase()) return !0;
  } else if (Array.isArray(s)) {
    if (s.indexOf(t.nodeName.toLowerCase()) > -1) return !0;
  } else if (typeof s === "function") {
    if (s.call(e, t, r)) return !0;
  } else throw TypeError("`filter` needs to be a string, array, or function");
}