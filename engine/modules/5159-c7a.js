
function c7a(e) {
  if (!z6.isInstance(e) || e.data.statusCode !== 429) return !1;
  return [
    qF.global_concurrency,
    qF.user_concurrency,
    qF.allowance_reserved,
    qF.upload_capacity,
    qF.ingress_rate_limited,
  ].includes(e.data.message);
}