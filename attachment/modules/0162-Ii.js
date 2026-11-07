
function Ii(c, t) {
  const { width: e, height: s, kind: i } = t,
    n = s % ft,
    r = (s - n) / ft,
    a = n === 0 ? r : r + 1,
    o = c.createImageData(e, ft);
  let l = 0;
  const h = t.data,
    d = o.data;
  let u;
  if (i === Ve.GRAYSCALE_1BPP)
    for (u = 0; u < a; u++)
      (({ srcPos: l } = Zi({ src: h, srcPos: l, dest: d, width: e, height: u < r ? ft : n })),
        c.putImageData(o, 0, u * ft));
  else if (i === Ve.RGBA_32BPP) {
    let f = 0,
      p = e * ft * 4;
    for (u = 0; u < r; u++) (d.set(h.subarray(l, l + p)), (l += p), c.putImageData(o, 0, f), (f += ft));
    u < a && ((p = e * n * 4), d.set(h.subarray(l, l + p)), c.putImageData(o, 0, f));
  } else if (i === Ve.RGB_24BPP)
    for (u = 0; u < a; u++)
      (({ srcPos: l } = Tr({
        src: h,
        srcPos: l,
        dest: new Uint32Array(d.buffer),
        width: e,
        height: u < r ? ft : n,
      })),
        c.putImageData(o, 0, u * ft));
  else throw new Error(`bad image kind: ${i}`);
}