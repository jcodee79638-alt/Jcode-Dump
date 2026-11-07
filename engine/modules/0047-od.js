
var od = ne(() => {
  ((B6s = Symbol.for(Hen)),
    (pc = class e extends ((wZr = Error), (CZr = B6s), wZr) {
      constructor({ name: t, message: r, cause: s }) {
        super(r);
        ((this[CZr] = !0), (this.name = t), (this.cause = s));
      }
      static isInstance(t) {
        return e.hasMarker(t, Hen);
      }
      static hasMarker(t, r) {
        let s = Symbol.for(r);
        return t != null && typeof t === "object" && s in t && typeof t[s] === "boolean" && t[s] === !0;
      }
    }),
    (Aen = `vercel.ai.error.${cen}`),
    (R6s = Symbol.for(Aen)),
    (U0 = class extends ((OZr = pc), (kZr = R6s), OZr) {
      constructor({
        message: e,
        url: t,
        requestBodyValues: r,
        statusCode: s,
        responseHeaders: a,
        responseBody: H,
        cause: u,
        isRetryable: f = s != null && (s === 408 || s === 409 || s === 429 || s >= 500),
        data: d,
      }) {
        super({ name: cen, message: e, cause: u });
        ((this[kZr] = !0),
          (this.url = t),
          (this.requestBodyValues = r),
          (this.statusCode = s),
          (this.responseHeaders = a),
          (this.responseBody = H),
          (this.isRetryable = f),
          (this.data = d));
      }
      static isInstance(e) {
        return pc.hasMarker(e, Aen);
      }
    }),
    (len = `vercel.ai.error.${uen}`),
    (W6s = Symbol.for(len)),
    (xJt = class extends ((NZr = pc), (UZr = W6s), NZr) {
      constructor({ message: e = "Empty response body" } = {}) {
        super({ name: uen, message: e });
        this[UZr] = !0;
      }
      static isInstance(e) {
        return pc.hasMarker(e, len);
      }
    }));
  ((pen = `vercel.ai.error.${fen}`),
    (V6s = Symbol.for(pen)),
    (SAt = class extends ((BZr = pc), (FZr = V6s), BZr) {
      constructor({ message: e, cause: t, argument: r }) {
        super({ name: fen, message: e, cause: t });
        ((this[FZr] = !0), (this.argument = r));
      }
      static isInstance(e) {
        return pc.hasMarker(e, pen);
      }
    }),
    (men = `vercel.ai.error.${den}`),
    (q6s = Symbol.for(men)),
    (Oq = class extends ((WZr = pc), (RZr = q6s), WZr) {
      constructor({ prompt: e, message: t, cause: r }) {
        super({ name: den, message: `Invalid prompt: ${t}`, cause: r });
        ((this[RZr] = !0), (this.prompt = e));
      }
      static isInstance(e) {
        return pc.hasMarker(e, men);
      }
    }),
    (hen = `vercel.ai.error.${_en}`),
    (G6s = Symbol.for(hen)),
    (TAt = class extends ((qZr = pc), (VZr = G6s), qZr) {
      constructor({ data: e, message: t = `Invalid response data: ${JSON.stringify(e)}.` }) {
        super({ name: _en, message: t });
        ((this[VZr] = !0), (this.data = e));
      }
      static isInstance(e) {
        return pc.hasMarker(e, hen);
      }
    }),
    ($en = `vercel.ai.error.${Len}`),
    (X6s = Symbol.for($en)),
    (Jne = class extends ((XZr = pc), (GZr = X6s), XZr) {
      constructor({ text: e, cause: t }) {
        super({
          name: Len,
          message: `JSON parsing failed: Text: ${e}.
Error message: ${fW(t)}`,
          cause: t,
        });
        ((this[GZr] = !0), (this.text = e));
      }
      static isInstance(e) {
        return pc.hasMarker(e, $en);
      }
    }),
    (Een = `vercel.ai.error.${gen}`),
    (J6s = Symbol.for(Een)),
    (SJt = class extends ((KZr = pc), (JZr = J6s), KZr) {
      constructor({ message: e }) {
        super({ name: gen, message: e });
        this[JZr] = !0;
      }
      static isInstance(e) {
        return pc.hasMarker(e, Een);
      }
    }),
    (Den = `vercel.ai.error.${Ien}`),
    (K6s = Symbol.for(Den)),
    (z6s = class extends ((QZr = pc), (zZr = K6s), QZr) {
      constructor({ message: e }) {
        super({ name: Ien, message: e });
        this[zZr] = !0;
      }
      static isInstance(e) {
        return pc.hasMarker(e, Den);
      }
    }),
    (Men = `vercel.ai.error.${yen}`),
    (Q6s = Symbol.for(Men)),
    (Y6s = class extends ((ZZr = pc), (YZr = Q6s), ZZr) {
      constructor({ message: e = "No content generated." } = {}) {
        super({ name: yen, message: e });
        this[YZr] = !0;
      }
      static isInstance(e) {
        return pc.hasMarker(e, Men);
      }
    }),
    (Sen = `vercel.ai.error.${xen}`),
    (Z6s = Symbol.for(Sen)),
    (e8s = class extends ((ten = pc), (een = Z6s), ten) {
      constructor({ errorName: e = xen, modelId: t, modelType: r, message: s = `No such ${r}: ${t}` }) {
        super({ name: e, message: s });
        ((this[een] = !0), (this.modelId = t), (this.modelType = r));
      }
      static isInstance(e) {
        return pc.hasMarker(e, Sen);
      }
    }),
    (ven = `vercel.ai.error.${Ten}`),
    (t8s = Symbol.for(ven)),
    (TJt = class extends ((nen = pc), (ren = t8s), nen) {
      constructor(e) {
        super({
          name: Ten,
          message: `Too many values for a single embedding call. The ${e.provider} model "${e.modelId}" can only embed up to ${e.maxEmbeddingsPerCall} values per call, but ${e.values.length} values were provided.`,
        });
        ((this[ren] = !0),
          (this.provider = e.provider),
          (this.modelId = e.modelId),
          (this.maxEmbeddingsPerCall = e.maxEmbeddingsPerCall),
          (this.values = e.values));
      }
      static isInstance(e) {
        return pc.hasMarker(e, ven);
      }
    }),
    (jen = `vercel.ai.error.${ben}`),
    (r8s = Symbol.for(jen)),
    (dy = class e extends ((sen = pc), (ien = r8s), sen) {
      constructor({ value: t, cause: r, context: s }) {
        let a = "Type validation failed";
        if (s == null ? void 0 : s.field) a += ` for ${s.field}`;
        if ((s == null ? void 0 : s.entityName) || (s == null ? void 0 : s.entityId)) {
          a += " (";
          let H = [];
          if (s.entityName) H.push(s.entityName);
          if (s.entityId) H.push(`id: "${s.entityId}"`);
          ((a += H.join(", ")), (a += ")"));
        }
        super({
          name: ben,
          message: `${a}: Value: ${JSON.stringify(t)}.
Error message: ${fW(r)}`,
          cause: r,
        });
        ((this[ien] = !0), (this.value = t), (this.context = s));
      }
      static isInstance(t) {
        return pc.hasMarker(t, jen);
      }
      static wrap({ value: t, cause: r, context: s }) {
        var a, H, u;
        if (
          e.isInstance(r) &&
          r.value === t &&
          ((a = r.context) == null ? void 0 : a.field) === (s == null ? void 0 : s.field) &&
          ((H = r.context) == null ? void 0 : H.entityName) === (s == null ? void 0 : s.entityName) &&
          ((u = r.context) == null ? void 0 : u.entityId) === (s == null ? void 0 : s.entityId)
        )
          return r;
        return new e({ value: t, cause: r, context: s });
      }
    }),
    (Cen = `vercel.ai.error.${Pen}`),
    (n8s = Symbol.for(Cen)),
    (gv = class extends ((aen = pc), (oen = n8s), aen) {
      constructor({ functionality: e, message: t = `'${e}' functionality not supported.` }) {
        super({ name: Pen, message: t });
        ((this[oen] = !0), (this.functionality = e));
      }
      static isInstance(e) {
        return pc.hasMarker(e, Cen);
      }
    }));
});
import { StringDecoder as i8s } from "string_decoder";