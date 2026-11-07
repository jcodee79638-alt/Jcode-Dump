
function vBe(e) {
  switch (e._tag) {
    default:
      return [];
    case "Declaration": {
      let t = e.annotations?.["~sentinels"];
      return Array.isArray(t) ? t : [];
    }
    case "Objects":
      return e.propertySignatures.flatMap((t) => {
        let r = t.type;
        if (!h1(r)) {
          if (qye(r)) return [{ key: t.name, literal: r.literal }];
          if (qNs(r)) return [{ key: t.name, literal: r.symbol }];
        }
        return [];
      });
    case "Arrays":
      return e.elements.flatMap((t, r) => (qye(t) && !h1(t) ? [{ key: r, literal: t.literal }] : []));
    case "Suspend":
      return vBe(e.thunk());
  }
}