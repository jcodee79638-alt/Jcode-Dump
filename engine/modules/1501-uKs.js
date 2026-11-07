
function uKs(e, t) {
  let r = t.length;
  return e.modify({ url: e.url.length <= r ? "/" : e.url.slice(r) });
}