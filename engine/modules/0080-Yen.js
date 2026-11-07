
function Yen(e) {
  if (
    typeof e !== "string" ||
    !e ||
    e.length > 32768 ||
    !PJt.isAbsolute(e) ||
    /^[\\/]{2}/.test(e) ||
    /[\u0000-\u001f\u007f]/.test(e) ||
    !/^[a-z]:[\\/]/i.test(e)
  )
    throw Error("Local storage requires an absolute local folder.");
  let t = PJt.parse(e).root,
    r = e.slice(t.length).split(/[\\/]/).filter(Boolean);
  if (
    r.length > 128 ||
    r.some(
      (s) =>
        s === "." ||
        s === ".." ||
        /[:<>"|?*]/.test(s) ||
        /[. ]$/.test(s) ||
        /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(s),
    )
  )
    throw Error("Local storage requires ordinary folder names without traversal or device paths.");
  return r.reduce((s, a) => [...s, PJt.join(s[s.length - 1], a)], [t]);
}