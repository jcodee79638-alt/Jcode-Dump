
function cn(e) {
  if (!W.default.isAbsolute(e) || e.includes("\x00") || (process.platform === "win32" && /^[\\/]{2}/.test(e)))
    throw Error("Choose an absolute local folder path.");
  return W.default.resolve(e);
}