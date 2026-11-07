
function UH(e, t) {
  let r = t?.PATH ?? t?.Path ?? process.env.PATH ?? process.env.Path ?? "",
    s = r ? r + kro.delimiter + uH.bin : uH.bin,
    a = Oxn.default.sync(e, {
      nothrow: !0,
      path: s,
      pathExt: t?.PATHEXT ?? t?.PathExt ?? process.env.PATHEXT ?? process.env.PathExt,
    });
  return typeof a === "string" ? a : null;
}