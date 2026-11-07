
function Ms(c, t) {
  const e = c[0],
    s = c[1],
    i = c[2],
    n = (1 - Math.abs(2 * i - 1)) * s,
    r = n * (1 - Math.abs(((e / 60) % 2) - 1)),
    a = i - n / 2;
  switch (Math.floor(e / 60)) {
    case 0:
      ((t[0] = n + a), (t[1] = r + a), (t[2] = a));
      break;
    case 1:
      ((t[0] = r + a), (t[1] = n + a), (t[2] = a));
      break;
    case 2:
      ((t[0] = a), (t[1] = n + a), (t[2] = r + a));
      break;
    case 3:
      ((t[0] = a), (t[1] = r + a), (t[2] = n + a));
      break;
    case 4:
      ((t[0] = r + a), (t[1] = a), (t[2] = n + a));
      break;
    case 5:
    case 6:
      ((t[0] = n + a), (t[1] = a), (t[2] = r + a));
      break;
  }
}