
var fQa,
  rzi = (e, t, r) => {
    if (!fQa.has(e)) throw new is(`Object.${e} is not available in CodeMode.`, r);
    let s = () => {
        let H = q$(t[0], `Object.${e} input`);
        if (sO(H)) return {};
        if (H === null || typeof H !== "object" || Array.isArray(H))
          throw new is(`Object.${e} expects a data object.`, r);
        return H;
      },
      a = (H, u, f) => {
        if (TT(u)) throw new is(`Property '${u}' is not available in CodeMode.`, r);
        H[u] = f;
      };
    switch (e) {
      case "keys": {
        let H = q$(t[0], "Object.keys input");
        if (sO(H)) return [];
        if (Array.isArray(H)) return Object.keys(H);
        if (H === null || typeof H !== "object")
          throw new is("Object.keys expects a data object or array.", r);
        return Object.keys(H);
      }
      case "values":
        return Object.values(s());
      case "entries":
        return Object.entries(s()).map(([H, u]) => [H, u]);
      case "hasOwn":
        return Object.hasOwn(s(), String(t[1]));
      case "assign": {
        let H = Object.create(null);
        for (let u of t) {
          if (u === null || u === void 0) continue;
          let f = q$(u, "Object.assign input");
          if (sO(f)) continue;
          if (f === null || typeof f !== "object" || Array.isArray(f))
            throw new is("Object.assign expects data objects.", r);
          for (let [d, _] of Object.entries(f)) a(H, d, _);
        }
        return H;
      }
      case "fromEntries": {
        if (t[0] instanceof Gy) {
          let f = Object.create(null);
          for (let [d, _] of t[0].map.entries()) a(f, vd(d), _);
          return f;
        }
        if (t[0] instanceof Sg) {
          let f = Object.create(null);
          for (let [d, _] of t[0].params.entries()) a(f, d, _);
          return f;
        }
        let H = q$(t[0], "Object.fromEntries input");
        if (!Array.isArray(H)) throw new is("Object.fromEntries expects an array of [key, value] pairs.", r);
        let u = Object.create(null);
        for (let f of H) {
          if (!Array.isArray(f)) throw new is("Object.fromEntries expects [key, value] pairs.", r);
          a(u, String(f[0]), f[1]);
        }
        return u;
      }
    }
    throw new is(`Object.${e} is not available in CodeMode.`, r);
  };