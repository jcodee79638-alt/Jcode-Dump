
async function eki(e) {
  if (e.type === "url") return jwi(e.url);
  let t = e.data instanceof Uint8Array ? e.data : IX(e.data);
  return new Blob([t], { type: e.mediaType });
}