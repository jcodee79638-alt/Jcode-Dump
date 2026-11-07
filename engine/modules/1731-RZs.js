
function RZs(e) {
  let t = Object.fromEntries(
      Object.entries(e.mcp ?? {}).flatMap(([s, a]) => ("type" in a ? [[s, WZs(a)]] : [])),
    ),
    r = e.experimental?.mcp_timeout;
  if (!r && !Object.keys(t).length) return;
  return { timeout: r === void 0 ? void 0 : { request: r }, servers: t };
}