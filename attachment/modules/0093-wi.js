
function wi(c, t, e, s, i, n) {
  ((c[t * 4 + 0] = Math.min(c[t * 4 + 0], e)),
    (c[t * 4 + 1] = Math.min(c[t * 4 + 1], s)),
    (c[t * 4 + 2] = Math.max(c[t * 4 + 2], i)),
    (c[t * 4 + 3] = Math.max(c[t * 4 + 3], n)));
}