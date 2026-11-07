
function XSt(e, t, r) {
  let s = nPi.get(e);
  if (s !== void 0) return s ? H5e : a5e;
  if (t.has(e)) return H5e;
  t.add(e);
  let a = a5e,
    H = (L) => {
      if (a !== H5e && L?._zod) {
        let I = XSt(L, t, r);
        if (I > a) a = I;
      }
    },
    u = (L, I) => {
      let D = a5e;
      for (let S of Reflect.ownKeys(L)) {
        let T = Object.getOwnPropertyDescriptor(L, S);
        if (I && !T.enumerable) continue;
        let C = T.get ? GSt : T.value?._zod ? XSt(T.value, t, r) : a5e;
        if (C > D) D = C;
      }
      return D;
    },
    f = (L) => {
      if (L > a) a = L;
    },
    d = e._zod.def,
    _ = d.type;
  switch (_) {
    case "object": {
      let L = e5e(d);
      (f(L ? u(L, !0) : GSt), H(d.catchall));
      break;
    }
    case "array":
      H(d.element);
      break;
    case "tuple":
      for (let L of d.items) H(L);
      H(d.rest);
      break;
    case "record":
    case "map":
      (H(d.keyType), H(d.valueType));
      break;
    case "set":
      H(d.valueType);
      break;
    case "union":
      for (let L of d.options) H(L);
      break;
    case "intersection":
      (H(d.left), H(d.right));
      break;
    case "optional":
    case "nullable":
    case "default":
    case "prefault":
    case "catch":
    case "readonly":
    case "nonoptional":
    case "promise":
    case "success":
      H(d.innerType);
      break;
    case "pipe":
      (H(d.in), H(d.out));
      break;
    case "function":
      (H(d.input), H(d.output));
      break;
    case "lazy": {
      let L = d._cachedInner ?? (r ? e._zod.innerType : void 0);
      f(L ? XSt(L, t, !1) : GSt);
      break;
    }
    case "template_literal":
    case "string":
    case "number":
    case "int":
    case "boolean":
    case "bigint":
    case "symbol":
    case "undefined":
    case "null":
    case "void":
    case "never":
    case "any":
    case "unknown":
    case "date":
    case "nan":
    case "enum":
    case "literal":
    case "file":
    case "transform":
    case "custom":
      break;
    default:
      for (let L in d) {
        let I = Object.getOwnPropertyDescriptor(d, L);
        if (!I || I.get) continue;
        let D = I.value;
        if (!D || typeof D !== "object") continue;
        if (D._zod) H(D);
        else if (Array.isArray(D)) for (let S of D) H(S);
      }
  }
  return (t.delete(e), VDa(e, a));
}