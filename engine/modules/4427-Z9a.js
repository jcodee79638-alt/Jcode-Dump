
async function Z9a(e, t, r) {
  let s = YBi(e);
  if (t.validateResourceURL) return await t.validateResourceURL(s, r?.resource);
  if (!r) return;
  if (!ZBi({ requestedResource: s, configuredResource: r.resource }))
    throw Error(`Protected resource ${r.resource} does not match expected ${s} (or origin)`);
  return new URL(r.resource);
}