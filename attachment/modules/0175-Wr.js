
function Wr(c) {
  let t = c.length;
  for (; t > 0 && c[t - 1] !== " " && /\s/.test(c[t - 1]);) t--;
  return c.slice(0, t);
}