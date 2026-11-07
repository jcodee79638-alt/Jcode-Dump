
function Ii(e) {
  if (
    typeof e !== "string" ||
    !e ||
    e.length > 32768 ||
    !_n.default.isAbsolute(e) ||
    /^[\\/]{2}/.test(e) ||
    /[\u0000-\u001f\u007f]/.test(e) ||
    (process.platform === "win32" && !/^[a-z]:[\\/]/i.test(e))
  )
    throw Error("Local storage requires an absolute local folder.");
  let t = _n.default.parse(e).root,
    n = e.slice(t.length).split(/[\\/]/).filter(Boolean);
  if (
    n.length > 128 ||
    n.some(
      (i) =>
        i === "." ||
        i === ".." ||
        /[:<>"|?*]/.test(i) ||
        /[. ]$/.test(i) ||
        /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(i),
    )
  )
    throw Error("Local storage requires ordinary folder names without traversal or device paths.");
  return n.reduce((i, r) => [...i, _n.default.join(i[i.length - 1], r)], [t]);
}