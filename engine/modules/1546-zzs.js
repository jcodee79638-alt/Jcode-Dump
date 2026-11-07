
function zzs(e) {
  if ("transport" in e) return ZIn(e);
  let t = e.protocol;
  return ZIn({
    id: e.id,
    provider: e.provider,
    protocol: t,
    endpoint: e.endpoint,
    auth: e.auth,
    headers: e.headers,
    transport: Ynr({ framing: e.framing }),
    defaults: e.defaults,
  });
}