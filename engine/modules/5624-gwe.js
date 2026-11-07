
function gwe(e) {
  if (e < 1024) return `${e} B`;
  if (e < 1048576) return `${Math.ceil(e / 1024)} KB`;
  return `${Math.ceil(e / 1048576)} MB`;
}