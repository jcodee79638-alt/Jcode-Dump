
var hwe = "execute",
  TQa = "Run a confined orchestration script with access to connected MCP tools.",
  Ozi,
  bQa = (e) => {
    let t = e.split(/[?#]/, 1)[0].replace(/\/+$/, ""),
      r = t.slice(t.lastIndexOf("/") + 1);
    return r.length > 0 ? r : void 0;
  },
  kzi = (e, t) => `data:${e};base64,${t}`,
  PQa,
  CQa;