
function JZi(e, t) {
  let r = e instanceof Request ? e.headers : e,
    s = new Headers(r instanceof Headers ? r : Object.entries(r));
  if ((UrH(s), !t)) return s;
  for (let [a, H] of new Headers(t).entries()) s.set(a, H);
  return s;
}