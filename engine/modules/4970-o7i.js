
var o7i = (e) => {
  if (typeof Buffer < "u") {
    let t = Buffer.from(e, "base64");
    return Array.from(new Float32Array(t.buffer, t.byteOffset, t.length / Float32Array.BYTES_PER_ELEMENT));
  } else {
    let t = atob(e),
      r = t.length,
      s = new Uint8Array(r);
    for (let a = 0; a < r; a++) s[a] = t.charCodeAt(a);
    return Array.from(new Float32Array(s.buffer));
  }
};