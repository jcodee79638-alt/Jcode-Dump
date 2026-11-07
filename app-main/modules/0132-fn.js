
function fn(e, t) {
  if (!t.length || t.length > le.fileBytes) throw new T("size");
  let n = Cs.default.extname(e).toLowerCase(),
    i = {
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".webp": "image/webp",
      ".gif": "image/gif",
    }[n];
  if (i) return i;
  if (n === ".pdf" && String.fromCharCode(...t.subarray(0, 5)) === "%PDF-") return "pdf";
  if ([".docx", ".xlsx", ".pptx"].includes(n) && t[0] === 80 && t[1] === 75 && t[2] === 3 && t[3] === 4)
    return n.slice(1);
  if (
    [
      ".pdf",
      ".docx",
      ".xlsx",
      ".pptx",
      ".exe",
      ".dll",
      ".com",
      ".scr",
      ".msi",
      ".lnk",
      ".url",
      ".zip",
      ".7z",
      ".rar",
      ".doc",
      ".xls",
      ".ppt",
      ".docm",
      ".xlsm",
      ".pptm",
      ".svg",
      ".iso",
    ].includes(n) ||
    t.includes(0) ||
    !Ur.isUtf8(t)
  )
    throw new T("type");
  if (t.length > le.textBytes) throw new T("text");
  return "text/plain";
}