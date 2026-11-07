
function Ic(e, t, r, s, a) {
  if (s === "m") throw TypeError("Private method is not writable");
  if (s === "a" && !a) throw TypeError("Private accessor was defined without a setter");
  if (typeof t === "function" ? e !== t || !a : !t.has(e))
    throw TypeError("Cannot write private member to an object whose class did not declare it");
  return (s === "a" ? a.call(e, r) : a ? (a.value = r) : t.set(e, r), r);
}