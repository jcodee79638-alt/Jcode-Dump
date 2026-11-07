
async function N7i(e, t, r) {
  if (e.apiKey) return e.apiKey;
  let s = await SVa(t);
  if (s?.type === "api") return s.key;
  if (s?.type === "oauth")
    if (new G7i().needsRefresh(s.expires))
      try {
        return await TVa(s, t, r);
      } catch (u) {
        let f = u instanceof Error ? u.message : String(u),
          d = process.env[e.environmentVariableName];
        if (d) return d;
        throw new Ca({
          message: `OAuth token refresh failed and no fallback ${e.environmentVariableName} environment variable is set. Refresh error: ${f}. Re-authenticate with 'opencode auth login gitlab' or set ${e.environmentVariableName}.`,
        });
      }
    else return s.access;
  let a = process.env[e.environmentVariableName];
  if (!a)
    throw new Ca({
      message: `${e.description} API key is missing. Pass it as the 'apiKey' parameter, set the ${e.environmentVariableName} environment variable, or authenticate with 'opencode auth login gitlab'.`,
    });
  return a;
}