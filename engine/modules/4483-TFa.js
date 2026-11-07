
function TFa(e, t) {
  let r = new URL(e.url || "/", `http://localhost:${ejt}`);
  if (r.pathname !== NMr) {
    (t.writeHead(404), t.end("Not found"));
    return;
  }
  let s = r.searchParams.get("code"),
    a = r.searchParams.get("state"),
    H = r.searchParams.get("error"),
    u = r.searchParams.get("error_description");
  if (!a) {
    (t.writeHead(400, { "Content-Type": "text/html; charset=utf-8" }),
      t.end(Zbt("Missing required state parameter - potential CSRF attack", { provider: "MCP" })));
    return;
  }
  if (H) {
    let d = u || H;
    if (Y8.has(a)) {
      let _ = Y8.get(a);
      (clearTimeout(_.timeout), Y8.delete(a), MRi(a), _.reject(Error(d)));
    }
    (t.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }),
      t.end(Zbt(d, { provider: "MCP" })),
      tjt());
    return;
  }
  if (!s) {
    (t.writeHead(400, { "Content-Type": "text/html; charset=utf-8" }),
      t.end(Zbt("No authorization code provided", { provider: "MCP" })));
    return;
  }
  if (!Y8.has(a)) {
    (t.writeHead(400, { "Content-Type": "text/html; charset=utf-8" }),
      t.end(Zbt("Invalid or expired state parameter - potential CSRF attack", { provider: "MCP" })));
    return;
  }
  let f = Y8.get(a);
  (clearTimeout(f.timeout),
    Y8.delete(a),
    MRi(a),
    f.resolve(s),
    t.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }),
    t.end(hFa({ provider: "MCP" })),
    tjt());
}