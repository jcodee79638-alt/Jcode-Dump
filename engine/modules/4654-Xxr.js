
async function Xxr(e) {
  let t = [];
  if (typeof e === "string" || ArrayBuffer.isView(e) || e instanceof ArrayBuffer) t.push(e);
  else if ($Wi(e)) t.push(e instanceof Blob ? e : await e.arrayBuffer());
  else if (Gxr(e)) for await (let r of e) t.push(...(await Xxr(r)));
  else {
    let r = e?.constructor?.name;
    throw Error(`Unexpected data type: ${typeof e}${r ? `; constructor: ${r}` : ""}${QBa(e)}`);
  }
  return t;
}