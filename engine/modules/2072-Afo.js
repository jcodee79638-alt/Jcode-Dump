
function Afo(e) {
  let t = e.split("/");
  return (
    e.length > 0 &&
    !e.includes("\\") &&
    !e.includes("\x00") &&
    !e.includes("?") &&
    !e.includes("#") &&
    !URL.canParse(e) &&
    !B2.posix.isAbsolute(e) &&
    !B2.win32.isAbsolute(e) &&
    t.every((r) => {
      try {
        let s = decodeURIComponent(r);
        return (
          s.length > 0 &&
          s !== "." &&
          s !== ".." &&
          !s.includes("/") &&
          !s.includes("\\") &&
          !s.includes("\x00")
        );
      } catch {
        return !1;
      }
    })
  );
}