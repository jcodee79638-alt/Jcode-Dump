
function w2s(e) {
  let t = {
    input(r) {
      return gAn(e, r.target);
    },
    output(r) {
      return gAn(I1e(e), r.target);
    },
  };
  if ("~standard" in e) {
    let r = e;
    if ("jsonSchema" in r["~standard"]) return r;
    return (Object.assign(r["~standard"], { jsonSchema: t }), r);
  } else return Object.assign(e, { "~standard": { version: 1, vendor: "effect", jsonSchema: t } });
}