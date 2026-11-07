
async function nRi(e) {
  let t = e instanceof Response ? e.status : void 0,
    r = e instanceof Response ? await e.text() : e;
  try {
    let s = zBi.parse(JSON.parse(r)),
      { error: a, error_description: H, error_uri: u } = s;
    return new (eRi[a] || rce)(H || "", u);
  } catch (s) {
    let a = e instanceof Response ? Yje(e, e.url) : void 0,
      H = `${t ? `HTTP ${t}: ` : ""}${a ?? `Invalid OAuth error response: ${s}. Raw body: ${r}`}`;
    return new rce(H);
  }
}