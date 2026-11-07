
async function kn(c, t, e, s) {
  const i = Math.min(1, 1280 / Math.max(t, e)),
    n = document.createElement("canvas");
  for (let r = 0; r < 5; r++) {
    ((n.width = Math.max(1, Math.round(t * i * Math.pow(0.8, r)))),
      (n.height = Math.max(1, Math.round(e * i * Math.pow(0.8, r)))));
    const a = n.getContext("2d", { alpha: !1 });
    ((a.fillStyle = "white"), a.fillRect(0, 0, n.width, n.height), a.drawImage(c, 0, 0, n.width, n.height));
    const o = await new Promise((l) => n.toBlob(l, "image/jpeg", 0.82));
    if (o && o.size <= 96 * 1024)
      return {
        filename: s,
        mime: "image/jpeg",
        url: "data:image/jpeg;base64," + Tn(new Uint8Array(await o.arrayBuffer())),
      };
  }
  return Et("image");
}