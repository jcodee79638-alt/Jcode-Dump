
async function Tt(e) {
  _(e, ["id", "directory"]);
  let t = await F(e.directory),
    n = N(e.id),
    i = await Promise.all([
      A.request("GET", `/session/${n}`, t),
      A.call("history", { id: n, directory: t }, 120000).then((r) => ({ value: r })),
      A.request("GET", "/session/status", t),
      A.request("GET", "/permission", t),
      A.request("GET", "/question", t),
      A.request("GET", `/session/${n}/children`, t),
    ]);
  return {
    chat: zt(i[0].value),
    messages: vt(i[1].value),
    ...Er(j(i[2].value)[n]),
    permissions: vt(i[3].value)
      .map(xi)
      .filter((r) => r.sessionId === n),
    questions: vt(i[4].value)
      .map(Ei)
      .filter((r) => r.sessionId === n),
    children: vt(i[5].value).map(zt),
  };
}