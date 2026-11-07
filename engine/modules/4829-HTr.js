
async function HTr(e) {
  let t = [];
  if (typeof e === "string" || ArrayBuffer.isView(e) || e instanceof ArrayBuffer) t.push(e);
  else if (UVi(e)) t.push(e instanceof Blob ? e : await e.arrayBuffer());
  else if (_Pt(e)) for await (let r of e) t.push(...(await HTr(r)));
  else {
    let r = e?.constructor?.name;
    throw Error(`Unexpected data type: ${typeof e}${r ? `; constructor: ${r}` : ""}${o3a(e)}`);
  }
  return t;
}