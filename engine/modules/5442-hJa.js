
function hJa(e, t) {
  let r = e[t];
  if (r.startsWith("*** Add File:")) {
    let s = r.slice(13).trim();
    return s ? { filePath: s, nextIdx: t + 1 } : null;
  }
  if (r.startsWith("*** Delete File:")) {
    let s = r.slice(16).trim();
    return s ? { filePath: s, nextIdx: t + 1 } : null;
  }
  if (r.startsWith("*** Update File:")) {
    let s = r.slice(16).trim(),
      a,
      H = t + 1;
    if (H < e.length && e[H].startsWith("*** Move to:")) ((a = e[H].slice(12).trim()), H++);
    return s ? { filePath: s, movePath: a, nextIdx: H } : null;
  }
  return null;
}