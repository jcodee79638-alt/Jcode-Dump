
async function Fn(e, t, n = !1) {
  let i = await ms(e, t);
  if (
    !i.info.isFile() ||
    i.info.nlink !== 1 ||
    i.info.size > ln.fileBytes ||
    !/\.(html?|css|js|mjs|cjs|json|svg|png|jpe?g|gif|webp|ico|woff2?|ttf|map)$/i.test(i.target) ||
    (n && (!/\.html?$/i.test(i.target) || i.info.size === 0))
  )
    throw Error("Preview is unavailable.");
  return (await oe.access(i.target, Bn.constants.R_OK), i);
}