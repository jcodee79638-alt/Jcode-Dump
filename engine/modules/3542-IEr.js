
var IEr = ne(() => {
  USt();
  yhe();
  s5e();
  k8();
  dEr();
  k8();
  Ig = to(
    "$ZodType",
    (e, t) => {
      var r;
      (e ?? (e = {}), (e._zod.def = t), (e._zod.bag = e._zod.bag || {}), (e._zod.version = Wbi));
      let s = e._zod.def.checks,
        a = e._zod.traits.has("$ZodCheck") ? [e, ...(s ?? [])] : s?.length ? [...s] : [];
      for (let H of a) for (let u of H._zod.onattach) u(e);
      if (a.length === 0)
        ((r = e._zod).deferred ?? (r.deferred = []),
          e._zod.deferred?.push(() => {
            e._zod.run = e._zod.parse;
          }));
      else {
        let H = (f, d, _) => {
            if (f.memo) return f;
            let L = _X(f),
              I;
            for (let D of d) {
              if (D._zod.def.when) {
                if (Pvi(f)) continue;
                if (!D._zod.def.when(f)) continue;
              } else if (L) continue;
              let S = f.issues.length,
                T = D._zod.check(f);
              if (T instanceof Promise && _?.async === !1) throw new LX();
              if (I || T instanceof Promise)
                I = (I ?? Promise.resolve()).then(async () => {
                  if ((await T, f.issues.length === S)) return;
                  if ((SSt(f.issues, S, e), !L)) L = _X(f, S);
                });
              else {
                if (f.issues.length === S) continue;
                if ((SSt(f.issues, S, e), !L)) L = _X(f, S);
              }
            }
            if (I) return I.then(() => f);
            return f;
          },
          u = (f, d, _) => {
            if (_X(f)) return ((f.aborted = !0), f);
            let L = H(d, a, _);
            if (L instanceof Promise) {
              if (_.async === !1) throw new LX();
              return L.then((I) => e._zod.parse(I, _));
            }
            return e._zod.parse(L, _);
          };
        e._zod.run = (f, d) => {
          if (d.skipChecks) return e._zod.parse(f, d);
          if (d.direction === "backward") {
            let L = e._zod.parse({ value: f.value, issues: [] }, { ...d, skipChecks: !0 });
            if (L instanceof Promise) return L.then((I) => u(I, f, d));
            return u(L, f, d);
          }
          let _ = e._zod.parse(f, d);
          if (_ instanceof Promise) {
            if (d.async === !1) throw new LX();
            return _.then((L) => H(L, a, d));
          }
          return H(_, a, d);
        };
      }
    },
    {
      get "~standard"() {
        return t5e(this, "~standard", _Er(this));
      },
      set "~standard"(e) {
        GZ(this, "~standard", e);
      },
    },
  );
  ((RSt = to("$ZodString", (e, t) => {
    (Ig.init(e, t),
      (e._zod.pattern = t.pattern ?? Ibi),
      (e._zod.parse = (r, s) => {
        if (t.coerce)
          try {
            r.value = String(r.value);
          } catch (a) {}
        if (typeof r.value === "string") return r;
        return (r.issues.push({ expected: "string", code: "invalid_type", input: r.value, inst: e }), r);
      }));
  })),
    (nE = to("$ZodStringFormat", (e, t) => {
      (o5e.init(e, t), RSt.init(e, t));
    })),
    (tji = to("$ZodGUID", (e, t) => {
      (t.pattern ?? (t.pattern = Hbi), nE.init(e, t));
    })),
    (rji = to("$ZodUUID", (e, t) => {
      if (t.version) {
        let s = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[t.version];
        if (s === void 0) throw Error(`Invalid UUID version: "${t.version}"`);
        t.pattern ?? (t.pattern = cEr(s));
      } else t.pattern ?? (t.pattern = cEr());
      nE.init(e, t);
    })),
    (nji = to("$ZodEmail", (e, t) => {
      (t.pattern ?? (t.pattern = cbi), nE.init(e, t));
    })));
  jDa = /[\t\n\r]/g;
  ((oji = to("$ZodURL", (e, t) => {
    (nE.init(e, t),
      (e._zod.check = (r) => {
        try {
          let s = r.value.trim(),
            a = vDa(s, t);
          if (a === iji) {
            r.issues.push({
              code: "invalid_format",
              format: "url",
              note: "Invalid URL format",
              input: r.value,
              inst: e,
              continue: !t.abort,
            });
            return;
          }
          if (a === FSt) {
            r.issues.push({
              code: "invalid_format",
              format: "url",
              input: r.value,
              inst: e,
              continue: !t.abort,
            });
            return;
          }
          if (a === !0) {
            r.value = Vbi(s);
            return;
          }
          if (t.hostname && !PDa(a, t.hostname))
            r.issues.push({
              code: "invalid_format",
              format: "url",
              note: "Invalid hostname",
              pattern: t.hostname.source,
              input: r.value,
              inst: e,
              continue: !t.abort,
            });
          if (t.protocol && !CDa(a, t.protocol))
            r.issues.push({
              code: "invalid_format",
              format: "url",
              note: "Invalid protocol",
              pattern: t.protocol.source,
              input: r.value,
              inst: e,
              continue: !t.abort,
            });
          r.value = t.normalize ? a.href : Vbi(s);
          return;
        } catch (s) {
          r.issues.push({
            code: "invalid_format",
            format: "url",
            input: r.value,
            inst: e,
            continue: !t.abort,
          });
        }
      }));
  })),
    (aji = to("$ZodEmoji", (e, t) => {
      (t.pattern ?? (t.pattern = Abi()), nE.init(e, t));
    })),
    (Hji = to("$ZodNanoID", (e, t) => {
      if (t.length !== void 0 && (!Number.isInteger(t.length) || t.length < 1))
        throw Error(`Invalid nanoid length: ${t.length}`);
      (t.pattern ?? (t.pattern = t.length === void 0 ? sbi : obi(t.length)), nE.init(e, t));
    })),
    (cji = to("$ZodCUID", (e, t) => {
      (t.pattern ?? (t.pattern = ebi), nE.init(e, t));
    })),
    (Aji = to("$ZodCUID2", (e, t) => {
      (t.pattern ?? (t.pattern = tbi), nE.init(e, t));
    })),
    (uji = to("$ZodULID", (e, t) => {
      (t.pattern ?? (t.pattern = rbi), nE.init(e, t));
    })),
    (lji = to("$ZodXID", (e, t) => {
      (t.pattern ?? (t.pattern = nbi), nE.init(e, t));
    })),
    (fji = to("$ZodKSUID", (e, t) => {
      (t.pattern ?? (t.pattern = ibi), nE.init(e, t));
    })),
    (pji = to("$ZodISODateTime", (e, t) => {
      (t.pattern ?? (t.pattern = Ebi(t)), nE.init(e, t));
    })),
    (dji = to("$ZodISODate", (e, t) => {
      (t.pattern ?? (t.pattern = $bi), nE.init(e, t));
    })),
    (mji = to("$ZodISOTime", (e, t) => {
      (t.pattern ?? (t.pattern = gbi(t)), nE.init(e, t));
    })),
    (_ji = to("$ZodISODuration", (e, t) => {
      (t.pattern ?? (t.pattern = abi), nE.init(e, t));
    })),
    (hji = to("$ZodIPv4", (e, t) => {
      (t.pattern ?? (t.pattern = ubi), nE.init(e, t));
    })),
    (wDa = /^[0-9a-fA-F:.]+$/));
  (($ji = to("$ZodIPv6", (e, t) => {
    (t.pattern ?? (t.pattern = lbi),
      nE.init(e, t),
      (e._zod.check = (r) => {
        if (!Lji(r.value))
          r.issues.push({
            code: "invalid_format",
            format: "ipv6",
            input: r.value,
            inst: e,
            continue: !t.abort,
          });
      }));
  })),
    (gji = to("$ZodCIDRv4", (e, t) => {
      (t.pattern ?? (t.pattern = fbi), nE.init(e, t));
    })));
  Eji = to("$ZodCIDRv6", (e, t) => {
    (t.pattern ?? (t.pattern = pbi),
      nE.init(e, t),
      (e._zod.check = (r) => {
        if (!kDa(r.value))
          r.issues.push({
            code: "invalid_format",
            format: "cidrv6",
            input: r.value,
            inst: e,
            continue: !t.abort,
          });
      }));
  });
  ((hEr = /^[0-9a-zA-Z+/]*={0,2}$/),
    (Dji = to("$ZodBase64", (e, t) => {
      (t.pattern ?? (t.pattern = hEr),
        nE.init(e, t),
        (e._zod.check = (r) => {
          if (Iji(r.value)) return;
          r.issues.push({
            code: "invalid_format",
            format: "base64",
            input: r.value,
            inst: e,
            continue: !t.abort,
          });
        }));
    })),
    (WSt = /^[A-Za-z0-9_-]*$/));
  ((yji = to("$ZodBase64URL", (e, t) => {
    (t.pattern ?? (t.pattern = WSt),
      nE.init(e, t),
      (e._zod.check = (r) => {
        if (ODa(r.value)) return;
        r.issues.push({
          code: "invalid_format",
          format: "base64url",
          input: r.value,
          inst: e,
          continue: !t.abort,
        });
      }));
  })),
    (Mji = to("$ZodE164", (e, t) => {
      (t.pattern ?? (t.pattern = hbi), nE.init(e, t));
    })));
  ((xji = to("$ZodJWT", (e, t) => {
    (nE.init(e, t),
      (e._zod.check = (r) => {
        if (UDa(r.value, t.alg)) return;
        r.issues.push({ code: "invalid_format", format: "jwt", input: r.value, inst: e, continue: !t.abort });
      }));
  })),
    (LEr = to("$ZodNumber", (e, t) => {
      (Ig.init(e, t),
        (e._zod.pattern = i5e),
        (e._zod.parse = (r, s) => {
          if (t.coerce)
            try {
              r.value = Number(r.value);
            } catch (u) {}
          let a = r.value;
          if (typeof a === "number" && !Number.isNaN(a) && Number.isFinite(a)) return r;
          let H =
            typeof a === "number"
              ? Number.isNaN(a)
                ? "NaN"
                : !Number.isFinite(a)
                  ? String(a)
                  : void 0
              : void 0;
          return (
            r.issues.push({
              expected: "number",
              code: "invalid_type",
              input: a,
              inst: e,
              ...(H ? { received: H } : {}),
            }),
            r
          );
        }));
    })),
    (Sji = to("$ZodNumberFormat", (e, t) => {
      (vbi.init(e, t), LEr.init(e, t));
    })),
    (Tji = to("$ZodBoolean", (e, t) => {
      (Ig.init(e, t),
        (e._zod.pattern = Dbi),
        (e._zod.parse = (r, s) => {
          if (t.coerce)
            try {
              r.value = Boolean(r.value);
            } catch (H) {}
          let a = r.value;
          if (typeof a === "boolean") return r;
          return (r.issues.push({ expected: "boolean", code: "invalid_type", input: a, inst: e }), r);
        }));
    })),
    (vji = to("$ZodNull", (e, t) => {
      (Ig.init(e, t),
        (e._zod.pattern = ybi),
        (e._zod.values = new Set([null])),
        (e._zod.parse = (r, s) => {
          let a = r.value;
          if (a === null) return r;
          return (r.issues.push({ expected: "null", code: "invalid_type", input: a, inst: e }), r);
        }));
    })),
    (bji = to("$ZodAny", (e, t) => {
      (Ig.init(e, t), (e._zod.parse = (r) => r));
    })),
    (jji = to("$ZodUnknown", (e, t) => {
      (Ig.init(e, t), (e._zod.parse = (r) => r));
    })),
    (Pji = to("$ZodNever", (e, t) => {
      (Ig.init(e, t),
        (e._zod.parse = (r, s) => (
          r.issues.push({ expected: "never", code: "invalid_type", input: r.value, inst: e }),
          r
        )));
    })));
  Cji = to("$ZodArray", (e, t) => {
    Ig.init(e, t);
    let r = O8.memoizer;
    (r?.attach(e),
      (e._zod.parse = (s, a) => {
        let H = s.value;
        if (!Array.isArray(H))
          return (s.issues.push({ expected: "array", code: "invalid_type", input: H, inst: e }), s);
        s.value = r ? r.alloc(e, s, Array(H.length), a) : Array(H.length);
        let u = [],
          f = a?.abortEarly;
        for (let d = 0; d < H.length; d++) {
          let _ = H[d],
            L = t.element._zod.run({ value: _, issues: [] }, a);
          if (L instanceof Promise) u.push(L.then((I) => qbi(I, s, d)));
          else if ((qbi(L, s, d), f && L.issues.length !== 0 && _X(L))) break;
        }
        if (u.length) return Promise.all(u).then(() => s);
        return s;
      }),
      NDa(e, FDa));
  });
  BDa = [];
  ((RDa = to("$ZodObject", (e, t) => {
    Ig.init(e, t);
    let r = Object.getOwnPropertyDescriptor(t, "shape"),
      s = r?.get ? r.get.raw : (t.shape ?? {});
    if (s) {
      let _ = () => {
        let L = { ...s };
        return (Object.defineProperty(t, "shape", { value: L }), (_.raw = L), L);
      };
      ((_.raw = s), Object.defineProperty(t, "shape", { get: _ }));
    }
    let a = ZGe(() => wji(t));
    wm(e, "propValues", (_) => {
      let L = _.def.shape,
        I = {};
      for (let D in L) {
        let S = L[D]._zod;
        if (S.values) {
          if (!Object.prototype.hasOwnProperty.call(I, D)) wN(I, D, new Set());
          for (let T of S.values) I[D].add(T);
          if (S.optin !== void 0) I[D].add(void 0);
        }
      }
      return I;
    });
    let H = Vbe,
      u = t.catchall,
      f,
      d = O8.memoizer;
    (d?.attach(e),
      (e._zod.parse = (_, L) => {
        f ?? (f = a.value);
        let I = _.value;
        if (!H(I)) return (_.issues.push({ expected: "object", code: "invalid_type", input: I, inst: e }), _);
        _.value = d ? d.alloc(e, _, {}, L) : {};
        let D = [],
          S = f.shape,
          T = L?.abortEarly,
          C = _.issues.length;
        for (let O of f.allKeys) {
          if (T && _.issues.length !== C) {
            if (_X(_, C)) break;
            C = _.issues.length;
          }
          if (O === "__proto__") continue;
          let B = S[O],
            V = B._zod.optin,
            q = B._zod.optout,
            Z = B._zod.run({ value: I[O], issues: [] }, L);
          if (Z instanceof Promise) D.push(Z.then((se) => BSt(se, _, O, I, V, q)));
          else BSt(Z, _, O, I, V, q);
        }
        if (!u) return D.length ? Promise.all(D).then(() => _) : _;
        return kji(D, I, _, L, a.value, e, T === !0);
      }));
  })),
    (Oji = to("$ZodObjectJIT", (e, t) => {
      RDa.init(e, t);
      let r = e._zod.parse,
        s = ZGe(() => wji(t)),
        a = O8.memoizer,
        H = (S) => {
          let T = s.value,
            C = T.symbolKeys,
            O = new pEr(["payload", "ctx"], { shape: S, inst: e, memo: a, syms: C }),
            B = (se) => `shape[${se}]._zod.run({ value: input[${se}], issues: [] }, ctx)`,
            V = (se, ae) => `
          let ${se}_ab = false;
          for (let i = 0; i < ${se}.issues.length; i++) {
            const iss = ${se}.issues[i];
            iss.path = iss.path ? [${ae}, ...iss.path] : [${ae}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${se}_ab = true;
          }
          if (${se}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;
          O.write("const input = payload.value;");
          let q = Object.create(null),
            Z = 0;
          for (let se of T.allKeys) q[se] = `key_${Z++}`;
          O.write(a ? "const newResult = memo.alloc(inst, payload, {}, ctx);" : "const newResult = {};");
          for (let se of T.allKeys) {
            if (se === "__proto__") continue;
            let ae = q[se],
              z = typeof se === "symbol" ? `syms[${C.indexOf(se)}]` : Mvi(se),
              Ae = `${z} in input`,
              le = S[se],
              Be = le?._zod?.optin,
              Te = Be !== void 0,
              Lt = le?._zod?.optout === "optional";
            if ((O.write(`const ${ae} = ${B(z)};`), Te && Lt)) {
              let Ht = Be === "optional" ? `${ae}_present` : `${ae}.value !== undefined || ${ae}_present`;
              O.write(`
        const ${ae}_present = ${Ae};
        if (!${ae}.issues.length || ${ae}_present) {
          if (${ae}.issues.length) {${V(ae, z)}
          }

          if (${Ht}) {
            newResult[${z}] = ${ae}.value;
          }
        }

      `);
            } else if (!Te)
              O.write(`
        const ${ae}_present = ${Ae};
        if (${ae}.issues.length) {${V(ae, z)}
        }
        if (!${ae}_present && !${ae}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${z}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${ae}_present) {
          newResult[${z}] = ${ae}.value;
        }

      `);
            else if (
              (O.write(`
        if (${ae}.issues.length) {${V(ae, z)}
        }
      `),
              Be === "defaulted")
            )
              O.write(`newResult[${z}] = ${ae}.value;`);
            else
              O.write(`
        if (${ae}.value !== undefined || ${Ae}) {
          newResult[${z}] = ${ae}.value;
        }
      `);
          }
          return (O.write("payload.value = newResult;"), O.write("return payload;"), O.compile());
        },
        u,
        f = Vbe,
        d = !O8.jitless,
        L = d && Svi.value,
        I = t.catchall,
        D;
      e._zod.parse = (S, T) => {
        D ?? (D = s.value);
        let C = S.value;
        if (!f(C)) return (S.issues.push({ expected: "object", code: "invalid_type", input: C, inst: e }), S);
        if (d && L && T?.async === !1 && T.jitless !== !0) {
          if (!u) u = H(t.shape);
          if (((S = u(S, T)), !I)) return S;
          return kji([], C, S, T, D, e, T?.abortEarly === !0);
        }
        return r(S, T);
      };
    })));
  $Er = to("$ZodUnion", (e, t) => {
    (Ig.init(e, t),
      wm(e, "optin", (s) =>
        s.def.options.some((a) => a._zod.optin === "defaulted")
          ? "defaulted"
          : s.def.options.some((a) => a._zod.optin !== void 0)
            ? "optional"
            : void 0,
      ),
      wm(e, "optout", (s) => (s.def.options.some((a) => a._zod.optout === "optional") ? "optional" : void 0)),
      wm(e, "values", (s) => {
        if (s.def.options.every((a) => a._zod.values))
          return new Set(s.def.options.flatMap((a) => Array.from(a._zod.values)));
        return;
      }),
      wm(e, "pattern", (s) => {
        if (s.def.options.every((a) => a._zod.pattern)) {
          let a = s.def.options.map((H) => H._zod.pattern);
          return new RegExp(`^(${a.map((H) => ySt(H.source)).join("|")})$`);
        }
        return;
      }));
    let r = t.options.length === 1 ? t.options[0]._zod.run : null;
    e._zod.parse = (s, a) => {
      if (r) return r(s, a);
      let H = !1,
        u = [];
      for (let f of t.options) {
        let d = f._zod.run({ value: s.value, issues: [] }, a);
        if (d instanceof Promise) (u.push(d), (H = !0));
        else {
          if (d.issues.length === 0) return d;
          u.push(d);
        }
      }
      if (!H) return Gbi(u, s, e, a);
      return Promise.all(u).then((f) => Gbi(f, s, e, a));
    };
  });
  ((Uji = to("$ZodDiscriminatedUnion", (e, t) => {
    ((t.inclusive = !1), $Er.init(e, t));
    let r = e._zod.parse;
    (wm(e, "propValues", (a) => {
      let H = {},
        u = 0;
      for (let f of a.def.options) {
        let d = f._zod.propValues;
        if (!d || Object.keys(d).length === 0)
          throw Error(`Invalid discriminated union option at index "${a.def.options.indexOf(f)}"`);
        if (d[a.def.discriminator]?.has(void 0)) u++;
        for (let [_, L] of Object.entries(d)) {
          if (!Object.prototype.hasOwnProperty.call(H, _)) wN(H, _, new Set());
          for (let I of L) H[_].add(I);
        }
      }
      if (!a.def.unionFallback && u > 1) H[a.def.discriminator]?.delete(void 0);
      return H;
    }),
      t.options.forEach((a, H) => {
        let u = e5e(a._zod.def);
        if (u && !Object.prototype.hasOwnProperty.call(u, t.discriminator))
          throw Error(`Invalid discriminated union option at index "${H}"`);
      }));
    let s = ZGe(() => WDa(t));
    e._zod.parse = (a, H) => {
      let u = a.value;
      if (!Vbe(u)) return (a.issues.push({ code: "invalid_type", expected: "object", input: u, inst: e }), a);
      let f = u?.[t.discriminator],
        d = s.value.get(f);
      if (d && (f !== void 0 || H.direction !== "backward")) return d._zod.run(a, H);
      if (t.unionFallback || H.direction === "backward") return r(a, H);
      return (
        a.issues.push({
          code: "invalid_union",
          errors: [],
          note: "No matching discriminator",
          discriminator: t.discriminator,
          options: Array.from(s.value.keys()).filter((_) => s.value.get(_) !== null),
          input: u,
          path: [t.discriminator],
          inst: e,
        }),
        a
      );
    };
  })),
    (Nji = to("$ZodIntersection", (e, t) => {
      (Ig.init(e, t),
        (e._zod.parse = (r, s) => {
          let a = r.value,
            H = t.left._zod.run({ value: a, issues: [] }, s),
            u = t.right._zod.run({ value: a, issues: [] }, s);
          if (H instanceof Promise || u instanceof Promise)
            return Promise.all([H, u]).then(([d, _]) => Xbi(r, d, _));
          return Xbi(r, H, u);
        }));
    })));
  ((Fji = to("$ZodRecord", (e, t) => {
    Ig.init(e, t);
    let r = O8.memoizer;
    (r?.attach(e),
      (e._zod.parse = (s, a) => {
        let H = s.value;
        if (!Ihe(H))
          return (s.issues.push({ expected: "record", code: "invalid_type", input: H, inst: e }), s);
        let u = [],
          f = t.keyType._zod.values;
        if (f && !t.partial) {
          s.value = r ? r.alloc(e, s, {}, a) : {};
          let d = new Set();
          for (let L of f)
            if (typeof L === "string" || typeof L === "number" || typeof L === "symbol") {
              if ((d.add(typeof L === "number" ? L.toString() : L), L === "__proto__")) continue;
              let I = t.keyType._zod.run({ value: L, issues: [] }, a);
              if (I instanceof Promise) throw Error("Async schemas not supported in object keys currently");
              if (I.issues.length) {
                s.issues.push({
                  code: "invalid_key",
                  origin: "record",
                  issues: I.issues.map((T) => hX(T, a, U8())),
                  input: L,
                  path: [L],
                  inst: e,
                });
                continue;
              }
              let D = I.value;
              if (D === "__proto__") continue;
              let S = t.valueType._zod.run({ value: H[L], issues: [] }, a);
              if (S instanceof Promise)
                u.push(
                  S.then((T) => {
                    if (T.issues.length) s.issues.push(...XZ(L, T.issues));
                    s.value[D] = T.value;
                  }),
                );
              else {
                if (S.issues.length) s.issues.push(...XZ(L, S.issues));
                s.value[D] = S.value;
              }
            }
          let _;
          for (let L in H)
            if (!d.has(L))
              if (t.mode === "loose") {
                if (L === "__proto__") continue;
                s.value[L] = H[L];
              } else ((_ = _ ?? []), _.push(L));
          if (_ && _.length > 0)
            s.issues.push({ code: "unrecognized_keys", input: H, inst: e, keys: _, continue: !0 });
        } else {
          s.value = r ? r.alloc(e, s, {}, a) : {};
          let d;
          for (let _ of Reflect.ownKeys(H)) {
            if (_ === "__proto__") continue;
            if (!Object.prototype.propertyIsEnumerable.call(H, _)) continue;
            let L = t.keyType._zod.run({ value: _, issues: [] }, a);
            if (L instanceof Promise) throw Error("Async schemas not supported in object keys currently");
            if (typeof _ === "string" && i5e.test(_) && L.issues.length) {
              let T = t.keyType._zod.run({ value: Number(_), issues: [] }, a);
              if (T instanceof Promise) throw Error("Async schemas not supported in object keys currently");
              if (T.issues.length === 0) L = T;
            }
            if (L.issues.length) {
              if (t.mode === "loose") s.value[_] = H[_];
              else if (f) ((d = d ?? []), d.push(_));
              else
                s.issues.push({
                  code: "invalid_key",
                  origin: "record",
                  issues: L.issues.map((T) => hX(T, a, U8())),
                  input: _,
                  path: [_],
                  inst: e,
                });
              continue;
            }
            let D = L.value;
            if (D === "__proto__") continue;
            let S = t.valueType._zod.run({ value: H[_], issues: [] }, a);
            if (S instanceof Promise)
              u.push(
                S.then((T) => {
                  if (T.issues.length) s.issues.push(...XZ(_, T.issues));
                  s.value[D] = T.value;
                }),
              );
            else {
              if (S.issues.length) s.issues.push(...XZ(_, S.issues));
              s.value[D] = S.value;
            }
          }
          if (d && d.length > 0)
            s.issues.push({ code: "unrecognized_keys", input: H, inst: e, keys: d, continue: !0 });
        }
        if (u.length) return Promise.all(u).then(() => s);
        return s;
      }));
  })),
    (Bji = to("$ZodEnum", (e, t) => {
      Ig.init(e, t);
      let r = QGe(t.entries),
        s = new Set(r);
      ((e._zod.values = s),
        wm(e, "pattern", (a) => {
          let H = QGe(a.def.entries).filter((u) => Tvi.has(typeof u));
          return new RegExp(H.length ? `^(${H.map((u) => pHe(u.toString())).join("|")})$` : "^[^\\s\\S]$");
        }),
        (e._zod.parse = (a, H) => {
          let u = a.value;
          if (s.has(u)) return a;
          return (a.issues.push({ code: "invalid_value", values: r, input: u, inst: e }), a);
        }));
    })),
    (Rji = to("$ZodLiteral", (e, t) => {
      Ig.init(e, t);
      let r = new Set(t.values);
      ((e._zod.values = r),
        wm(e, "pattern", (s) => {
          let a = s.def.values;
          return new RegExp(
            a.length
              ? `^(${a.map((H) => (typeof H === "string" ? pHe(H) : H ? pHe(H.toString()) : String(H))).join("|")})$`
              : "^[^\\s\\S]$",
          );
        }),
        (e._zod.parse = (s, a) => {
          let H = s.value;
          if (r.has(H)) return s;
          return (s.issues.push({ code: "invalid_value", values: t.values, input: H, inst: e }), s);
        }));
    })),
    (Wji = to("$ZodTransform", (e, t) => {
      (Ig.init(e, t),
        (e._zod.optin = "optional"),
        O8.memoizer?.guard(e),
        (e._zod.parse = (r, s) => {
          if (s.direction === "backward") throw new r5e(e.constructor.name);
          let a = t.transform(r.value, r);
          if (s.async) return (a instanceof Promise ? a : Promise.resolve(a)).then((u) => ((r.value = u), r));
          if (a instanceof Promise) throw new LX();
          return ((r.value = a), r);
        }));
    })));
  ((gEr = to("$ZodOptional", (e, t) => {
    (Ig.init(e, t),
      wm(e, "optin", (r) => (r.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional")),
      (e._zod.optout = "optional"),
      wm(e, "values", (r) => {
        let s = r.def.innerType._zod.values;
        return s ? new Set([...s, void 0]) : void 0;
      }),
      wm(e, "pattern", (r) => {
        let s = r.def.innerType._zod.pattern;
        return s ? new RegExp(`^(${ySt(s.source)})?$`) : void 0;
      }),
      (e._zod.parse = (r, s) => {
        if (r.value === void 0) {
          if (t.innerType._zod.optin !== "defaulted") return r;
          let a = t.innerType._zod.run({ value: r.value, issues: [] }, s);
          if (a instanceof Promise) return a.then((H) => Jbi(r, H));
          return Jbi(r, a);
        }
        return t.innerType._zod.run(r, s);
      }));
  })),
    (Vji = to("$ZodExactOptional", (e, t) => {
      (gEr.init(e, t),
        wm(e, "values", (r) => r.def.innerType._zod.values),
        wm(e, "pattern", (r) => r.def.innerType._zod.pattern),
        (e._zod.parse = (r, s) => t.innerType._zod.run(r, s)));
    })),
    (qji = to("$ZodNullable", (e, t) => {
      (Ig.init(e, t),
        wm(e, "optin", (r) => r.def.innerType._zod.optin),
        wm(e, "optout", (r) => r.def.innerType._zod.optout),
        wm(e, "pattern", (r) => {
          let s = r.def.innerType._zod.pattern;
          return s ? new RegExp(`^(${ySt(s.source)}|null)$`) : void 0;
        }),
        wm(e, "values", (r) =>
          r.def.innerType._zod.values ? new Set([...r.def.innerType._zod.values, null]) : void 0,
        ),
        (e._zod.parse = (r, s) => {
          if (r.value === null) return r;
          return t.innerType._zod.run(r, s);
        }));
    })),
    (Gji = to("$ZodDefault", (e, t) => {
      (Ig.init(e, t),
        (e._zod.optin = "defaulted"),
        wm(e, "values", (r) => r.def.innerType._zod.values),
        (e._zod.parse = (r, s) => {
          if (s.direction === "backward") return t.innerType._zod.run(r, s);
          if (r.value === void 0) return ((r.value = t.defaultValue), r);
          let a = t.innerType._zod.run(r, s);
          if (a instanceof Promise) return a.then((H) => Kbi(H, t));
          return Kbi(a, t);
        }));
    })));
  ((Xji = to("$ZodPrefault", (e, t) => {
    (Ig.init(e, t),
      (e._zod.optin = "defaulted"),
      wm(e, "values", (r) => r.def.innerType._zod.values),
      (e._zod.parse = (r, s) => {
        if (s.direction === "backward") return t.innerType._zod.run(r, s);
        if (r.value === void 0) r.value = t.defaultValue;
        return t.innerType._zod.run(r, s);
      }));
  })),
    (Jji = to("$ZodNonOptional", (e, t) => {
      (Ig.init(e, t),
        wm(e, "values", (r) => {
          let s = r.def.innerType._zod.values;
          return s ? new Set([...s].filter((a) => a !== void 0)) : void 0;
        }),
        (e._zod.parse = (r, s) => {
          let a = t.innerType._zod.run(r, s);
          if (a instanceof Promise) return a.then((H) => zbi(H, e));
          return zbi(a, e);
        }));
    })));
  ((Kji = to("$ZodCatch", (e, t) => {
    (Ig.init(e, t),
      wm(e, "optin", (r) => (r.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional")),
      wm(e, "optout", (r) => r.def.innerType._zod.optout),
      wm(e, "values", (r) => r.def.innerType._zod.values),
      (e._zod.parse = (r, s) => {
        if (s.direction === "backward") return t.innerType._zod.run(r, s);
        let a = t.innerType._zod.run({ value: r.value, issues: [] }, s);
        if (a instanceof Promise) return a.then((H) => Qbi(r, H, t, s));
        return Qbi(r, a, t, s);
      }));
  })),
    (EEr = to("$ZodPipe", (e, t) => {
      (Ig.init(e, t),
        wm(e, "values", (r) => r.def.in._zod.values),
        wm(e, "optin", (r) => r.def.in._zod.optin),
        wm(e, "optout", (r) => r.def.out._zod.optout),
        wm(e, "propValues", (r) => r.def.in._zod.propValues),
        (e._zod.parse = (r, s) => {
          if (s.direction === "backward") {
            let H = t.out._zod.run(r, s);
            if (H instanceof Promise) return H.then((u) => NSt(u, t.in, s));
            return NSt(H, t.in, s);
          }
          let a = t.in._zod.run(r, s);
          if (a instanceof Promise) return a.then((H) => NSt(H, t.out, s));
          return NSt(a, t.out, s);
        }));
    })));
  ((zji = to("$ZodPreprocess", (e, t) => {
    EEr.init(e, t);
  })),
    (Qji = to("$ZodReadonly", (e, t) => {
      (Ig.init(e, t),
        wm(e, "propValues", (r) => r.def.innerType._zod.propValues),
        wm(e, "values", (r) => r.def.innerType._zod.values),
        wm(e, "optin", (r) => r.def.innerType?._zod?.optin),
        wm(e, "optout", (r) => r.def.innerType?._zod?.optout),
        (e._zod.parse = (r, s) => {
          if (s.direction === "backward") return t.innerType._zod.run(r, s);
          let a = t.innerType._zod.run(r, s);
          if (a instanceof Promise) return a.then(Ybi);
          return Ybi(a);
        }));
    })));
  ((Yji = to("$ZodLazy", (e, t) => {
    (Ig.init(e, t),
      Ivi(e._zod, "innerType", () => {
        let r = t;
        if (!r._cachedInner) r._cachedInner = t.getter();
        return r._cachedInner;
      }),
      wm(e, "pattern", (r) => r.innerType?._zod?.pattern),
      wm(e, "propValues", (r) => r.innerType?._zod?.propValues),
      wm(e, "optin", (r) => r.innerType?._zod?.optin ?? void 0),
      wm(e, "optout", (r) => r.innerType?._zod?.optout ?? void 0),
      (e._zod.parse = (r, s) => e._zod.innerType._zod.run(r, s)));
  })),
    (Zji = to("$ZodCustom", (e, t) => {
      (hT.init(e, t),
        Ig.init(e, t),
        (e._zod.parse = (r, s) => r),
        (e._zod.check = (r) => {
          let s = r.value,
            a = t.fn(s);
          if (a instanceof Promise) return a.then((H) => Zbi(H, r, s, e));
          Zbi(a, r, s, e);
          return;
        }));
    })));
});