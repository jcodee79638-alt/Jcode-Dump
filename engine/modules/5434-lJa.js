
function lJa() {
  let e = { "User-Agent": `opencode/${VL}` };
  if (!process.env.PARALLEL_API_KEY) return e;
  return { ...e, Authorization: `Bearer ${process.env.PARALLEL_API_KEY}` };
}