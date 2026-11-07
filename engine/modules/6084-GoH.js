
function GoH(e) {
  if (e instanceof Zhr) return `Project copy source not found: ${e.directory}`;
  if (e instanceof eLr) return `Project copy destination already exists: ${e.directory}`;
  if (e instanceof G_e) return `Project copy directory unavailable: ${e.directory}`;
  if (e instanceof tLr) return `Invalid project copy directory: ${e.directory}`;
  if (e instanceof rLr) return `Project copy strategy unavailable: ${e.strategy}`;
  return e.message;
}