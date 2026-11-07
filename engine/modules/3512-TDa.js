
async function TDa(e, t) {
  let r = { async: !0 };
  return eji(await e._zod.run({ value: t, issues: [] }, r), r);
}