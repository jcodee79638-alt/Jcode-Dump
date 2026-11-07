
function oSt(e) {
  let t = GSi.get(e);
  if (t !== void 0) return t;
  let r = {
      openapi: "3.1.0",
      info: { title: "Api", version: "0.0.1" },
      paths: {},
      components: { schemas: {}, securitySchemes: {} },
      security: [],
      tags: [],
    },
    s = [];
  (R1(e.annotations, TGe, (H) => {
    r.info.title = H;
  }),
    R1(e.annotations, d0r, (H) => {
      r.info.version = H;
    }),
    R1(e.annotations, wbe, (H) => {
      r.info.description = H;
    }),
    R1(e.annotations, m0r, (H) => {
      r.info.license = H;
    }),
    R1(e.annotations, sSt, (H) => {
      r.info.summary = H;
    }),
    R1(e.annotations, _0r, (H) => {
      r.servers = [...H];
    }),
    kSi(e, {
      onGroup({ group: H }) {
        if (Pp(H.annotations, f0r)) return;
        let u = { name: pye(H.annotations, TGe, () => H.identifier) };
        (R1(H.annotations, wbe, (f) => {
          u.description = f;
        }),
          R1(H.annotations, iSt, (f) => {
            u.externalDocs = f;
          }),
          R1(H.annotations, vGe, (f) => {
            Object.assign(u, f);
          }),
          R1(H.annotations, bGe, (f) => {
            u = f(u);
          }),
          r.tags.push(u));
      },
      onEndpoint({ endpoint: H, group: u, mergedAnnotations: f, middleware: d }) {
        if (Pp(f, f0r)) return;
        let _ = {
            tags: [pye(u.annotations, TGe, () => u.identifier)],
            operationId: pye(H.annotations, p0r, () => (u.topLevel ? H.name : `${u.identifier}.${H.name}`)),
            parameters: [],
            security: [],
            responses: {},
          },
          L = H.path.replace(/:(\w+)\??/g, "{$1}"),
          I = H.method.toLowerCase();
        function D(B) {
          if (B.size > 0) {
            let V = {},
              q = !1;
            if (
              (B.forEach(({ encoding: Z, schemas: se }, ae) => {
                let z = se.filter((Be) => !lhe(Be.ast));
                if (z.length === 0) return;
                q = !0;
                let Ae = z.map(rG),
                  le = Ae.length === 1 ? Ae[0] : new b6(Ae, "anyOf");
                (s.push({
                  _tag: "schema",
                  ast: XSi(le, Z._tag),
                  path: ["paths", L, I, "requestBody", "content", ae, "schema"],
                }),
                  (V[ae] = { schema: {} }));
              }),
              q)
            )
              _.requestBody = { content: V, required: !0 };
          }
        }
        function S(B, V) {
          for (let [q, { content: Z, descriptions: se, streamContent: ae }] of B) {
            let z = se.size > 0 ? Array.from(se).join(" | ") : V();
            if (((_.responses[q] = { description: z }), Z !== void 0))
              Z.forEach((Ae, le) => {
                Ae.forEach((Be, Te) => {
                  let Lt = Array.from(Be, rG),
                    Ht = Lt.length === 1 ? Lt[0] : new b6(Lt, "anyOf");
                  (s.push({
                    _tag: "schema",
                    ast: XSi(Ht, le),
                    path: ["paths", L, I, "responses", String(q), "content", Te, "schema"],
                  }),
                    (_.responses[q].content ??= {}),
                    (_.responses[q].content[Te] = { schema: {} }));
                });
              });
            if (ae !== void 0)
              ae.forEach((Ae, le) => {
                if (((_.responses[q].content ??= {}), zxt(Ae)))
                  (s.push({
                    _tag: "schema",
                    ast: rG(Ae.events),
                    path: ["paths", L, I, "responses", String(q), "content", le, "schema"],
                  }),
                    s.push({
                      _tag: "schema",
                      ast: rG(wj(qft(Ae.error, yd()))),
                      path: [
                        "paths",
                        L,
                        I,
                        "responses",
                        String(q),
                        "content",
                        le,
                        "x-effect-stream",
                        "causeSchema",
                      ],
                    }),
                    s.push({
                      _tag: "schema",
                      ast: rG(Ae.error),
                      path: [
                        "paths",
                        L,
                        I,
                        "responses",
                        String(q),
                        "content",
                        le,
                        "x-effect-stream",
                        "errorSchema",
                      ],
                    }),
                    (_.responses[q].content[le] = {
                      schema: {},
                      "x-effect-stream": {
                        encoding: "sse",
                        causeSchema: {},
                        errorSchema: {},
                        failureEvent: aEa,
                      },
                    }));
                else
                  _.responses[q].content[le] = {
                    schema: { type: "string", format: "binary" },
                    "x-effect-stream": { encoding: "uint8array" },
                  };
              });
          }
        }
        function T(B, V) {
          if (B) {
            let q = Ppe(B.ast);
            if (Xye(q))
              for (let Z of q.propertySignatures)
                (_.parameters.push({
                  name: String(Z.name),
                  in: V,
                  schema: {},
                  required: V === "path" || !h1(Z.type),
                }),
                  s.push({
                    _tag: "parameter",
                    ast: Z.type,
                    path: ["paths", L, I, "parameters", String(_.parameters.length - 1), "schema"],
                  }));
          }
        }
        (R1(H.annotations, wbe, (B) => {
          _.description = B;
        }),
          R1(H.annotations, sSt, (B) => {
            _.summary = B;
          }),
          R1(H.annotations, L0r, (B) => {
            _.deprecated = B;
          }),
          R1(H.annotations, iSt, (B) => {
            _.externalDocs = B;
          }),
          d.forEach((B) => {
            if (!rSt(B)) return;
            for (let [V, q] of Object.entries(B.security)) (C(V, q), _.security.push({ [V]: [] }));
          }));
        function C(B, V) {
          if (r.components.securitySchemes[B] !== void 0) return;
          r.components.securitySchemes[B] = cEa(V);
        }
        let O = j1e(H.method);
        if (O) D(H.payload);
        if ((T(H.params, "path"), !O && H.payload.size === 1)) {
          let B = H.payload.values().next().value;
          T(B.schemas[0], "query");
        }
        if (
          (T(H.headers, "header"),
          T(H.query, "query"),
          S(HEa(H), () => "Success"),
          S(JSi(Pbe(H), bbe, KSi), () => "Error"),
          !r.paths[L])
        )
          r.paths[L] = {};
        (R1(H.annotations, vGe, (B) => {
          Object.assign(_, B);
        }),
          R1(H.annotations, bGe, (B) => {
            _ = B(_);
          }),
          (r.paths[L][I] = _));
      },
    }),
    R1(e.annotations, Zxt, (H) => {
      H.forEach((u) => {
        let f = CBe(u.ast);
        if (f !== void 0) {
          if (f in r.components.schemas)
            throw new globalThis.Error(`Duplicate component schema identifier: ${f}`);
          ((r.components.schemas[f] = {}),
            s.push({ _tag: "schema", ast: u.ast, path: ["components", "schemas", f] }));
        }
      });
    }));
  function a(H) {
    return "/" + H.map(oRe).join("/");
  }
  if (TS(s)) {
    let H = WSi(jv(s, (d) => d.ast)),
      u = LAn(VSi(H)),
      f = s.map((d, _) => {
        let L = a(d.path),
          I = u.schemas[_];
        return { op: "replace", path: L, value: I };
      });
    (Object.entries(u.definitions).forEach(([d, _]) => {
      f.push({ op: "add", path: a(["components", "schemas", d]), value: _ });
    }),
      (r = lAn(f, r)));
  }
  return (
    Object.keys(r.components.schemas).forEach((H) => {
      if (!dZt.test(H)) throw new globalThis.Error(`Invalid component schema key: ${H}`);
    }),
    R1(e.annotations, vGe, (H) => {
      Object.assign(r, H);
    }),
    R1(e.annotations, bGe, (H) => {
      r = H(r);
    }),
    GSi.set(e, r),
    r
  );
}