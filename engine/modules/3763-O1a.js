
async function O1a() {
  let [e, { lookup: t }] = await Promise.all([Ewi("node:module"), Ewi("node:dns")]),
    r = e.createRequire(bwi()),
    { Agent: s, fetch: a } = r("undici"),
    H = new s({ connect: { lookup: C1a(t) } });
  return (u, f) => a(u, { ...f, dispatcher: H });
}