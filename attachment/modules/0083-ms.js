
function ms(c) {
  return c.cancelable ? (rt(c), !0) : (c.stopPropagation(), !1);
}