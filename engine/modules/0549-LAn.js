
function LAn(e) {
  let t = new Map();
  for (let s of Object.keys(e.definitions)) {
    let a = b2s(s);
    if (a !== s) t.set(s, a);
  }
  function r(s) {
    return Nft(s, (a) => {
      let H = a.split("/");
      if (H.length > 0) {
        let u = Wpe(H[H.length - 1]),
          f = t.get(u);
        if (f !== void 0) a = H.slice(0, -1).join("/") + "/" + f;
      }
      return a.replace(_An, "#/components/schemas");
    });
  }
  return {
    dialect: "openapi-3.1",
    schemas: jv(e.schemas, r),
    definitions: arn(e.definitions, (s, a) => [t.get(a) ?? a, r(s)]),
  };
}