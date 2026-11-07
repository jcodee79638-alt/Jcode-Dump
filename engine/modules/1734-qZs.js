
function qZs(e) {
  let r = pMn(e.npm).provider(e.options ?? {}),
    s = e.api ?? r.url;
  return {
    name: e.name,
    env: e.env,
    api: e.npm
      ? { type: "aisdk", package: e.npm, ...(s === void 0 ? {} : { url: s }), settings: r.settings ?? {} }
      : void 0,
    request: e.options && { headers: r.headers, body: r.body },
    models: e.models && Object.fromEntries(Object.entries(e.models).map(([a, H]) => [a, GZs(H, e.npm)])),
  };
}