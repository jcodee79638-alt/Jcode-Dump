
function aoH(e, t) {
  if (!e.schema || typeof e.schema !== "object") return;
  if (e.in === "path") {
    e.schema = m9(e.schema);
    return;
  }
  if (e.in === "query") {
    let r = RsH[`${t} ${e.name}`];
    if (r) {
      e.schema = r;
      return;
    }
  }
  e.schema = m9(e.schema);
}