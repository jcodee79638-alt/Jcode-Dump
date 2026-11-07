
async function oeo(e) {
  try {
    return (await e).default;
  } catch {
    return null;
  }
}