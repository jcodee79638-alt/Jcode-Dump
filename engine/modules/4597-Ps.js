
function Ps(e, t, r, s) {
  if (r === "a" && !s) throw TypeError("Private accessor was defined without a getter");
  if (typeof t === "function" ? e !== t || !s : !t.has(e))
    throw TypeError("Cannot read private member from an object whose class did not declare it");
  return r === "m" ? s : r === "a" ? s.call(e) : s ? s.value : t.get(e);
}