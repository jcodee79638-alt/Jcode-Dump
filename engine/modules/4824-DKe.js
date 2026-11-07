
function DKe(e) {
  return (
    (
      (typeof e === "object" &&
        e !== null &&
        (("name" in e && e.name && String(e.name)) ||
          ("url" in e && e.url && String(e.url)) ||
          ("filename" in e && e.filename && String(e.filename)) ||
          ("path" in e && e.path && String(e.path)))) ||
      ""
    )
      .split(/[\\/]/)
      .pop() || void 0
  );
}