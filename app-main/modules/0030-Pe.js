
function Pe(e) {
  let t = q(e);
  if (
    Cn.default.isAbsolute(t) ||
    t
      .split(/[\\/]/)
      .some(
        (n) =>
          n === ".." ||
          n.toLowerCase() === ".git" ||
          /[. ]$/.test(n) ||
          /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(n),
      ) ||
    /[\r\n:]/.test(t)
  )
    throw Error("Choose a file inside the project.");
  return t.replaceAll("\\", "/");
}