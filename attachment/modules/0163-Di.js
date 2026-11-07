
function Di(c, t) {
  if (t.bitmap) {
    c.drawImage(t.bitmap, 0, 0);
    return;
  }
  const { width: e, height: s } = t,
    i = s % ft,
    n = (s - i) / ft,
    r = i === 0 ? n : n + 1,
    a = c.createImageData(e, ft);
  let o = 0;
  const l = t.data,
    h = a.data;
  for (let d = 0; d < r; d++)
    (({ srcPos: o } = Zi({ src: l, srcPos: o, dest: h, width: e, height: d < n ? ft : i, nonBlackColor: 0 })),
      c.putImageData(a, 0, d * ft));
}