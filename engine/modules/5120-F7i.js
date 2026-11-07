
function F7i(e) {
  let t = CVa();
  if (!t) return null;
  let r = new Date(t.updatedAt).getTime();
  if (Date.now() - r > e) return null;
  return { configs: new Map(Object.entries(t.configs)), writtenAt: r };
}