
var $St = (e) => {
  let t = new URL(e);
  ((t.search = ""), (t.hash = ""));
  let r = t.pathname.replace(/\/+$/, "");
  return r.length === 0 ? t.origin : `${t.origin}${r}`;
};