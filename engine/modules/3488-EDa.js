
function EDa(e, t, r) {
  if (!Object.prototype.hasOwnProperty.call(e, t))
    if (t === "__proto__")
      Object.defineProperty(e, t, { value: r(), writable: !0, enumerable: !0, configurable: !0 });
    else e[t] = r();
  return e[t];
}