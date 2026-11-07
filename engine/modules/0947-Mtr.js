
var Mtr = ne(() => {
  Jq();
  YA();
  BH();
  uye();
  KH();
  gE();
  Yu();
  _ie();
  aL();
  ((FVs = bA("effect/sql/CurrentTransformer", { defaultValue: IU })),
    (ytr = {
      _tag: "RecordInsertHelper",
      returning(e) {
        let t = Object.create(Object.getPrototypeOf(this));
        return (Object.assign(t, this, { returningIdentifier: e }), t);
      },
    }),
    (WVs = { ...ytr, _tag: "RecordUpdateHelper" }),
    (qVs = { ...ytr, _tag: "RecordUpdateHelperSingle" }),
    (Udn = { transforms: new WeakMap(), noTransforms: new WeakMap() }));
  ((JVs = gdt(" AND ", !0, "1=1")),
    (KVs = gdt(" OR ", !0, "1=1")),
    (Ndn = gdt(",", !1)),
    (QVs = pse([WU("")])),
    (ZVs = Symbol.for("effect/unstable/sql/Statement/statementCache")),
    (e7s = Symbol.for("effect/unstable/sql/Statement/statementCacheNoTransform")),
    (Gdn = {
      compile(e, t = !1, r) {
        let s = this.options;
        t = t || this.disableTransforms;
        let a = t ? e7s : ZVs;
        if (a in e) return e[a];
        let H = e.segments,
          u = H.length,
          f = "",
          d = [],
          _ = 0,
          L = r ?? ((T) => s.placeholder(++_, T)),
          I = (T) => s.placeholder(_, T),
          D = i7s(L);
        for (let T = 0; T < u; T++) {
          let C = H[T];
          switch (C._tag) {
            case "Literal": {
              if (((f += C.value), C.params)) d.push.apply(d, C.params);
              break;
            }
            case "Identifier": {
              f += s.onIdentifier(C.value, t);
              break;
            }
            case "Parameter": {
              ((f += L(C.value)), d.push(C.value));
              break;
            }
            case "ArrayHelper": {
              ((f += `(${D(C.value)})`), d.push.apply(d, C.value));
              break;
            }
            case "RecordInsertHelper": {
              let O = Object.keys(C.value[0]);
              if (s.onInsert) {
                let B = Array(C.value.length),
                  V = "";
                for (let se = 0; se < C.value.length; se++) {
                  let ae = Array(O.length);
                  ((B[se] = ae), (V += se === 0 ? "(" : ",("));
                  for (let z = 0; z < O.length; z++) {
                    let Ae = O[z],
                      le = C.value[se][Ae],
                      Be = d3e(le, s.onCustom, I, t);
                    ((ae[z] = Be), (V += z === 0 ? L(le) : `,${L(le)}`));
                  }
                  V += ")";
                }
                let [q, Z] = s.onInsert(
                  O.map((se) => s.onIdentifier(se, t)),
                  V,
                  B,
                  typeof C.returningIdentifier === "string"
                    ? [C.returningIdentifier, []]
                    : C.returningIdentifier
                      ? this.compile(C.returningIdentifier, t, L)
                      : void 0,
                );
                ((f += q), d.push.apply(d, Z));
              } else {
                let B = "";
                for (let V = 0; V < C.value.length; V++) {
                  B += V === 0 ? "(" : ",(";
                  for (let q = 0; q < O.length; q++) {
                    let Z = C.value[V][O[q]],
                      se = d3e(Z, s.onCustom, I, t);
                    (d.push(se), (B += q === 0 ? L(Z) : `,${L(Z)}`));
                  }
                  B += ")";
                }
                if (
                  ((f += `${Wdn(O, s.onIdentifier, t)} VALUES ${B}`),
                  typeof C.returningIdentifier === "string")
                )
                  f += ` RETURNING ${C.returningIdentifier}`;
                else if (C.returningIdentifier) {
                  f += " RETURNING ";
                  let [V, q] = this.compile(C.returningIdentifier, t, L);
                  ((f += V), d.push.apply(d, q));
                }
              }
              break;
            }
            case "RecordUpdateHelperSingle": {
              let O = Object.keys(C.value);
              if (C.omit.length > 0) O = O.filter((B) => !C.omit.includes(B));
              if (s.onRecordUpdateSingle) {
                let [B, V] = s.onRecordUpdateSingle(
                  O.map((q) => s.onIdentifier(q, t)),
                  O.map((q) => d3e(C.value[q], s.onCustom, I, t)),
                  typeof C.returningIdentifier === "string"
                    ? [C.returningIdentifier, []]
                    : C.returningIdentifier
                      ? this.compile(C.returningIdentifier, t, L)
                      : void 0,
                );
                ((f += B), d.push.apply(d, V));
              } else {
                for (let B = 0, V = O.length; B < V; B++) {
                  let q = s.onIdentifier(O[B], t);
                  if (B === 0) f += `${q} = ${L(C.value[O[B]])}`;
                  else f += `, ${q} = ${L(C.value[O[B]])}`;
                  d.push(d3e(C.value[O[B]], s.onCustom, I, t));
                }
                if (typeof C.returningIdentifier === "string")
                  if (this.dialect === "mssql")
                    f += ` OUTPUT ${C.returningIdentifier === "*" ? "INSERTED.*" : C.returningIdentifier}`;
                  else f += ` RETURNING ${C.returningIdentifier}`;
                else if (C.returningIdentifier) {
                  f += this.dialect === "mssql" ? " OUTPUT " : " RETURNING ";
                  let [B, V] = this.compile(C.returningIdentifier, t, L);
                  ((f += B), d.push.apply(d, V));
                }
              }
              break;
            }
            case "RecordUpdateHelper": {
              let O = Object.keys(C.value[0]),
                B = Array(C.value.length),
                V = "";
              for (let se = 0; se < C.value.length; se++) {
                let ae = Array(O.length);
                ((B[se] = ae), (V += se === 0 ? "(" : ",("));
                for (let z = 0; z < O.length; z++) {
                  let Ae = O[z],
                    le = C.value[se][Ae];
                  ((ae[z] = d3e(le, s.onCustom, I, t)), (V += z === 0 ? L(le) : `,${L(le)}`));
                }
                V += ")";
              }
              let [q, Z] = s.onRecordUpdate(
                V,
                C.alias,
                Wdn(O, s.onIdentifier, t),
                B,
                typeof C.returningIdentifier === "string"
                  ? [C.returningIdentifier, []]
                  : C.returningIdentifier
                    ? this.compile(C.returningIdentifier, t, L)
                    : void 0,
              );
              ((f += q), d.push.apply(d, Z));
              break;
            }
            case "Custom": {
              let [O, B] = s.onCustom(C, L, t);
              ((f += O), d.push.apply(d, B));
              break;
            }
          }
        }
        let S = [f, d];
        if (r !== void 0) return S;
        return (e[a] = S);
      },
      get withoutTransform() {
        let e = Object.create(Gdn);
        return (Object.assign(e, this, { disableTransforms: !0 }), e);
      },
    }));
  r7s = {
    ...Bq({
      label: "Statement",
      evaluate(e) {
        let t = bye(e, "sql.execute", { kind: "client" }),
          r = e.getRef(y6),
          s = e.getRef(Xin);
        return JC(
          this.withConnectionSpan("execute", (a, H, u) => a.execute(H, u, this.transformRows), !1, t),
          (a) => Kzt(t, a, r, s),
        );
      },
    }),
    [m3e]: m3e,
    withConnection(e, t, r = !1) {
      return Uye("sql.execute", { kind: "client" }, (s) => this.withConnectionSpan(e, t, r, s));
    },
    withConnectionSpan(e, t, r, s) {
      return Rdn(this, s, (a) => {
        let [H, u] = a.compile(r);
        for (let [f, d] of this.spanAttributes) s.attribute(f, d);
        return (s.attribute(Fdn, e), s.attribute(Bdn, H), FL(Hi(this.acquirer, (f) => t(f, H, u))));
      });
    },
    get withoutTransform() {
      return this.withConnection("executeWithoutTransform", (e, t, r) => e.execute(t, r, void 0), !0);
    },
    get raw() {
      return this.withConnection("executeRaw", (e, t, r) => e.executeRaw(t, r), !0);
    },
    get stream() {
      let e = this;
      return hh(
        Hi(Xsn("sql.execute", { kind: "client" }), (t) =>
          Rdn(e, t, (r) => {
            let [s, a] = r.compile();
            for (let [H, u] of e.spanAttributes) t.attribute(H, u);
            return (
              t.attribute(Fdn, "executeStream"),
              t.attribute(Bdn, s),
              Vn(e.acquirer, (H) => H.executeStream(s, a, e.transformRows))
            );
          }),
        ),
      );
    },
    get values() {
      return this.withConnection("executeValues", (e, t, r) => e.executeValues(t, r));
    },
    get unprepared() {
      let e = this;
      return e.withConnection("executeUnprepared", (t, r, s) => t.executeUnprepared(r, s, e.transformRows));
    },
    compile(e) {
      return this.compiler.compile(this, e ?? !1);
    },
    toJSON() {
      let [e, t] = this.compile();
      return { _id: "Statement", segments: this.segments, sql: e, params: t };
    },
  };
  Dtr = t7s('"');
  o7s = pse([WU("1=0")]);
});