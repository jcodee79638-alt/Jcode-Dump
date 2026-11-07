
function Svn(e, t, r) {
  let s = Evn.join(e, ...t.host.split(":"), ...t.segments);
  return r ? `${s}@${encodeURIComponent(r)}` : s;
}