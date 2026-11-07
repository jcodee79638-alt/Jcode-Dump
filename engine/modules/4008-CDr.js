
async function CDr(e) {
  await Promise.allSettled([...PDr].map((t) => t(e)));
}