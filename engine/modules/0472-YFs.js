
function YFs(e) {
  if (e.protocol !== "file:")
    return bn(new NQ({ module: "Path", method: "fromFileUrl", description: "URL must be of scheme file" }));
  else if (e.hostname !== "")
    return bn(new NQ({ module: "Path", method: "fromFileUrl", description: "Invalid file URL host" }));
  let t = e.pathname;
  for (let r = 0; r < t.length; r++)
    if (t[r] === "%") {
      let s = t.codePointAt(r + 2) | 32;
      if (t[r + 1] === "2" && s === 102)
        return bn(
          new NQ({
            module: "Path",
            method: "fromFileUrl",
            description: "must not include encoded / characters",
          }),
        );
    }
  return Jt(decodeURIComponent(t));
}