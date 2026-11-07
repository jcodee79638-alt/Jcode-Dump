
async function oRi(e, { fetchFn: t = fetch, protocolVersion: r = Sje } = {}) {
  let s = { "MCP-Protocol-Version": r, Accept: "application/json" },
    a = nFa(e);
  for (let { url: H, type: u } of a) {
    let f = await EMr(H, s, t);
    if (!f) continue;
    if (!f.ok) {
      if ((await f.body?.cancel(), f.status < 500)) continue;
      throw Error(
        `HTTP ${f.status} trying to load ${u === "oauth" ? "OAuth" : "OpenID provider"} metadata from ${H}`,
      );
    }
    if (u === "oauth") return dMr.parse(await f.json());
    else return JBi.parse(await f.json());
  }
  return;
}