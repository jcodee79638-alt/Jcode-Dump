
function eFa(e, t = "", r = {}) {
  if (t.endsWith("/")) t = t.slice(0, -1);
  return r.prependPathname ? `${t}/.well-known/${e}` : `/.well-known/${e}${t}`;
}