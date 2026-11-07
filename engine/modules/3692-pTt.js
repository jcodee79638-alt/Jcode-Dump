
var pTt = ne(() => {
  F8();
  F8();
  EIr();
  tTt();
  sPi();
  IIr();
  yIr();
  ((a0 = to("ZodType", (e, t) => (cya(), Ig.init(e, t), (e.def = t), (e.type = t.type), e), {
    check(...e) {
      let t = this.def;
      return this.clone(
        kN(t, {
          checks: [
            ...(t.checks ?? []),
            ...e.map((r) =>
              typeof r === "function" ? { _zod: { check: r, def: { check: "custom" }, onattach: [] } } : r,
            ),
          ],
        }),
        { parent: !0 },
      );
    },
    with(...e) {
      return this.check(...e);
    },
    clone(e, t) {
      return H7(this, e, t);
    },
    brand() {
      return this;
    },
    register(e, t) {
      return (e.add(this, t), this);
    },
    refine(e, t) {
      return this.check(Qya(e, t));
    },
    superRefine(e, t) {
      return this.check(Yya(e, t));
    },
    overwrite(e) {
      return this.check(mHe(e));
    },
    optional() {
      return OE(this);
    },
    exactOptional() {
      return Oya(this);
    },
    nullable() {
      return kCi(this);
    },
    nullish() {
      return OE(kCi(this));
    },
    nonoptional(e) {
      return Wya(this, e);
    },
    array() {
      return Va(this);
    },
    or(e) {
      return Ip([this, e]);
    },
    and(e) {
      return uTt(this, e);
    },
    transform(e) {
      return OCi(this, XCi(e));
    },
    default(e) {
      return Fya(this, e);
    },
    prefault(e) {
      return Rya(this, e);
    },
    catch(e) {
      return qya(this, e);
    },
    pipe(e) {
      return OCi(this, e);
    },
    readonly() {
      return Jya(this);
    },
    describe(e) {
      let t = this.clone();
      return (dHe.add(t, { description: e }), t);
    },
    meta(...e) {
      if (e.length === 0) return dHe.get(this);
      let t = this.clone();
      return (dHe.add(t, e[0]), t);
    },
    isOptional() {
      return this.safeParse(void 0).success;
    },
    isNullable() {
      return this.safeParse(null).success;
    },
    apply(e, ...t) {
      return t.length === 0 ? e(this) : e(this, ...t);
    },
    get "~standard"() {
      return t5e(this, "~standard", {
        ..._Er(this),
        jsonSchema: { input: l5e(this, "input"), output: l5e(this, "output") },
      });
    },
    set "~standard"(e) {
      GZ(this, "~standard", e);
    },
    parse: function e(t, r) {
      return ICi(this, t, r, { callee: e });
    },
    parseAsync: async function e(t, r) {
      return await DCi(this, t, r, { callee: e });
    },
    safeParse(e, t) {
      return yCi(this, e, t);
    },
    async safeParseAsync(e, t) {
      return sTt(this, e, t);
    },
    get spa() {
      return this?.safeParseAsync;
    },
    set spa(e) {
      GZ(this, "spa", e);
    },
    validate(e, t) {
      return wSt(this, e, t);
    },
    validateAsync(e, t) {
      return kSt(this, e, t);
    },
    encode: function e(t, r) {
      return MCi(this, t, r, { callee: e });
    },
    decode: function e(t, r) {
      return xCi(this, t, r, { callee: e });
    },
    encodeAsync: async function e(t, r) {
      return await SCi(this, t, r, { callee: e });
    },
    decodeAsync: async function e(t, r) {
      return await TCi(this, t, r, { callee: e });
    },
    safeEncode(e, t) {
      return vCi(this, e, t);
    },
    safeDecode(e, t) {
      return bCi(this, e, t);
    },
    async safeEncodeAsync(e, t) {
      return jCi(this, e, t);
    },
    async safeDecodeAsync(e, t) {
      return PCi(this, e, t);
    },
    toJSONSchema(e) {
      return KPi(this, {})(e);
    },
    get description() {
      return dHe.get(this)?.description;
    },
    get _def() {
      return this._zod.def;
    },
  })),
    (UCi = to(
      "_ZodString",
      (e, t) => {
        (RSt.init(e, t), a0.init(e, t), (e._zod.processJSONSchema = (r, s, a) => QEr(e, r, s, a)));
      },
      kvi(
        {
          format: (e) => N8(e).format ?? null,
          minLength: (e) => N8(e).minimum ?? null,
          maxLength: (e) => N8(e).maximum ?? null,
        },
        {
          regex(...e) {
            return this.check(kEr(...e));
          },
          includes(...e) {
            return this.check(NEr(...e));
          },
          startsWith(...e) {
            return this.check(FEr(...e));
          },
          endsWith(...e) {
            return this.check(BEr(...e));
          },
          min(...e) {
            return this.check(Gbe(...e));
          },
          max(...e) {
            return this.check(ZSt(...e));
          },
          length(...e) {
            return this.check(eTt(...e));
          },
          nonempty(...e) {
            return this.check(Gbe(1, ...e));
          },
          lowercase(e) {
            return this.check(OEr(e));
          },
          uppercase(e) {
            return this.check(UEr(e));
          },
          trim() {
            return this.check(VEr());
          },
          normalize(...e) {
            return this.check(WEr(...e));
          },
          toLowerCase() {
            return this.check(qEr());
          },
          toUpperCase() {
            return this.check(GEr());
          },
          slugify() {
            return this.check(XEr());
          },
        },
      ),
    )),
    (NCi = to(
      "ZodString",
      (e, t) => {
        (RSt.init(e, t), UCi.init(e, t));
      },
      {
        email(e) {
          return this.check(APi(Aya, e));
        },
        url(e) {
          return this.check(jEr(WCi, e));
        },
        jwt(e) {
          return this.check(vPi(Mya, e));
        },
        emoji(e) {
          return this.check(mPi(lya, e));
        },
        guid(e) {
          return this.check(uPi(uya, e));
        },
        uuid(e) {
          return this.check(lPi(oTt, e));
        },
        uuidv4(e) {
          return this.check(fPi(oTt, e));
        },
        uuidv6(e) {
          return this.check(pPi(oTt, e));
        },
        uuidv7(e) {
          return this.check(dPi(oTt, e));
        },
        nanoid(e) {
          return this.check(_Pi(fya, e));
        },
        cuid(e) {
          return this.check(hPi(pya, e));
        },
        cuid2(e) {
          return this.check(LPi(dya, e));
        },
        ulid(e) {
          return this.check($Pi(mya, e));
        },
        base64(e) {
          return this.check(xPi(Iya, e));
        },
        base64url(e) {
          return this.check(SPi(Dya, e));
        },
        xid(e) {
          return this.check(gPi(_ya, e));
        },
        ksuid(e) {
          return this.check(EPi(hya, e));
        },
        ipv4(e) {
          return this.check(IPi(Lya, e));
        },
        ipv6(e) {
          return this.check(DPi($ya, e));
        },
        cidrv4(e) {
          return this.check(yPi(gya, e));
        },
        cidrv6(e) {
          return this.check(MPi(Eya, e));
        },
        e164(e) {
          return this.check(TPi(yya, e));
        },
        datetime(e) {
          return this.check(KSt(xIr, e));
        },
        date(e) {
          return this.check(PEr(FCi, e));
        },
        time(e) {
          return this.check(CEr(BCi, e));
        },
        duration(e) {
          return this.check(wEr(RCi, e));
        },
      },
    )));
  ((vI = to("ZodStringFormat", (e, t) => {
    (nE.init(e, t), UCi.init(e, t));
  })),
    (xIr = to("ZodISODateTime", (e, t) => {
      (pji.init(e, t), vI.init(e, t));
    })),
    (FCi = to("ZodISODate", (e, t) => {
      (dji.init(e, t), vI.init(e, t));
    })),
    (BCi = to("ZodISOTime", (e, t) => {
      (mji.init(e, t), vI.init(e, t));
    })),
    (RCi = to("ZodISODuration", (e, t) => {
      (_ji.init(e, t), vI.init(e, t));
    })),
    (Aya = to("ZodEmail", (e, t) => {
      (nji.init(e, t), vI.init(e, t));
    })),
    (uya = to("ZodGUID", (e, t) => {
      (tji.init(e, t), vI.init(e, t));
    })),
    (oTt = to("ZodUUID", (e, t) => {
      (rji.init(e, t), vI.init(e, t));
    })),
    (WCi = to("ZodURL", (e, t) => {
      (oji.init(e, t), vI.init(e, t));
    })));
  ((lya = to("ZodEmoji", (e, t) => {
    (aji.init(e, t), vI.init(e, t));
  })),
    (fya = to("ZodNanoID", (e, t) => {
      (Hji.init(e, t), vI.init(e, t));
    })),
    (pya = to("ZodCUID", (e, t) => {
      (cji.init(e, t), vI.init(e, t));
    })),
    (dya = to("ZodCUID2", (e, t) => {
      (Aji.init(e, t), vI.init(e, t));
    })),
    (mya = to("ZodULID", (e, t) => {
      (uji.init(e, t), vI.init(e, t));
    })),
    (_ya = to("ZodXID", (e, t) => {
      (lji.init(e, t), vI.init(e, t));
    })),
    (hya = to("ZodKSUID", (e, t) => {
      (fji.init(e, t), vI.init(e, t));
    })),
    (Lya = to("ZodIPv4", (e, t) => {
      (hji.init(e, t), vI.init(e, t));
    })),
    ($ya = to("ZodIPv6", (e, t) => {
      ($ji.init(e, t), vI.init(e, t));
    })),
    (gya = to("ZodCIDRv4", (e, t) => {
      (gji.init(e, t), vI.init(e, t));
    })),
    (Eya = to("ZodCIDRv6", (e, t) => {
      (Eji.init(e, t), vI.init(e, t));
    })),
    (Iya = to("ZodBase64", (e, t) => {
      (Dji.init(e, t), vI.init(e, t));
    })),
    (Dya = to("ZodBase64URL", (e, t) => {
      (yji.init(e, t), vI.init(e, t));
    })),
    (yya = to("ZodE164", (e, t) => {
      (Mji.init(e, t), vI.init(e, t));
    })),
    (Mya = to("ZodJWT", (e, t) => {
      (xji.init(e, t), vI.init(e, t));
    })),
    (HTt = to(
      "ZodNumber",
      (e, t) => {
        (LEr.init(e, t),
          a0.init(e, t),
          (e._zod.processJSONSchema = (r, s, a) => YEr(e, r, s, a)),
          (e.isFinite = !0));
      },
      kvi(
        {
          minValue: (e) => {
            let { minimum: t, exclusiveMinimum: r } = N8(e);
            return Math.max(t ?? Number.NEGATIVE_INFINITY, r ?? Number.NEGATIVE_INFINITY);
          },
          maxValue: (e) => {
            let { maximum: t, exclusiveMaximum: r } = N8(e);
            return Math.min(t ?? Number.POSITIVE_INFINITY, r ?? Number.POSITIVE_INFINITY);
          },
          isInt: (e) => {
            let { isInt: t, multipleOf: r } = N8(e);
            return !!t || !!r?.some(Number.isSafeInteger);
          },
          format: (e) => N8(e).format ?? null,
        },
        {
          gt(e, t) {
            return this.check(QSt(e, t));
          },
          gte(e, t) {
            return this.check(A5e(e, t));
          },
          min(e, t) {
            return this.check(A5e(e, t));
          },
          lt(e, t) {
            return this.check(zSt(e, t));
          },
          lte(e, t) {
            return this.check(c5e(e, t));
          },
          max(e, t) {
            return this.check(c5e(e, t));
          },
          int(e) {
            return this.check(CCi(e));
          },
          safe(e) {
            return this.check(CCi(e));
          },
          positive(e) {
            return this.check(QSt(0, e));
          },
          nonnegative(e) {
            return this.check(A5e(0, e));
          },
          negative(e) {
            return this.check(zSt(0, e));
          },
          nonpositive(e) {
            return this.check(c5e(0, e));
          },
          multipleOf(e, t) {
            return this.check(YSt(e, t));
          },
          step(e, t) {
            return this.check(YSt(e, t));
          },
          finite() {
            return this;
          },
        },
      ),
    )));
  xya = to("ZodNumberFormat", (e, t) => {
    (Sji.init(e, t), HTt.init(e, t));
  });
  qCi = to("ZodBoolean", (e, t) => {
    (Tji.init(e, t), a0.init(e, t), (e._zod.processJSONSchema = (r, s, a) => ZEr(e, r, s, a)));
  });
  Sya = to("ZodNull", (e, t) => {
    (vji.init(e, t), a0.init(e, t), (e._zod.processJSONSchema = (r, s, a) => eIr(e, r, s, a)));
  });
  Tya = to("ZodAny", (e, t) => {
    (bji.init(e, t), a0.init(e, t), (e._zod.processJSONSchema = (r, s, a) => rIr(e, r, s, a)));
  });
  vya = to("ZodUnknown", (e, t) => {
    (jji.init(e, t), a0.init(e, t), (e._zod.processJSONSchema = (r, s, a) => nIr(e, r, s, a)));
  });
  bya = to("ZodNever", (e, t) => {
    (Pji.init(e, t), a0.init(e, t), (e._zod.processJSONSchema = (r, s, a) => tIr(e, r, s, a)));
  });
  jya = to(
    "ZodArray",
    (e, t) => {
      (aTt(),
        Cji.init(e, t),
        a0.init(e, t),
        (e._zod.processJSONSchema = (r, s, a) => HIr(e, r, s, a)),
        (e.element = t.element));
    },
    {
      min(e, t) {
        return this.check(Gbe(e, t));
      },
      nonempty(e) {
        return this.check(Gbe(1, e));
      },
      max(e, t) {
        return this.check(ZSt(e, t));
      },
      length(e, t) {
        return this.check(eTt(e, t));
      },
      unwrap() {
        return this.element;
      },
    },
  );
  TIr = to(
    "ZodObject",
    (e, t) => {
      (aTt(),
        Oji.init(e, t),
        a0.init(e, t),
        (e._zod.processJSONSchema = (r, s, a) => cIr(e, r, s, a)),
        mDa(e, "shape", (r) => r._zod.def.shape, !1));
    },
    {
      keyof() {
        return ax(Object.keys(this._zod.def.shape));
      },
      catchall(e) {
        return this.clone(kN(this._zod.def, { catchall: e }));
      },
      passthrough() {
        return this.clone(kN(this._zod.def, { catchall: gl() }));
      },
      loose() {
        return this.clone(kN(this._zod.def, { catchall: gl() }));
      },
      strict() {
        return this.clone(kN(this._zod.def, { catchall: y_() }));
      },
      strip() {
        return this.clone(kN(this._zod.def, { catchall: void 0 }));
      },
      extend(e) {
        return HDa(this, e);
      },
      safeExtend(e) {
        return cDa(this, e);
      },
      merge(e) {
        return ADa(this, e);
      },
      pick(e) {
        return oDa(this, e);
      },
      omit(e) {
        return aDa(this, e);
      },
      partial(...e) {
        return jvi(JCi, this, e[0]);
      },
      exactPartial(...e) {
        return jvi(KCi, this, e[0], "exactPartial");
      },
      required(...e) {
        return uDa(zCi, this, e[0]);
      },
    },
  );
  GCi = to("ZodUnion", (e, t) => {
    ($Er.init(e, t),
      a0.init(e, t),
      (e._zod.processJSONSchema = (r, s, a) => AIr(e, r, s, a)),
      (e.options = t.options));
  });
  Pya = to("ZodDiscriminatedUnion", (e, t) => {
    (GCi.init(e, t), Uji.init(e, t));
  });
  Cya = to("ZodIntersection", (e, t) => {
    (Nji.init(e, t), a0.init(e, t), (e._zod.processJSONSchema = (r, s, a) => uIr(e, r, s, a)));
  });
  wCi = to("ZodRecord", (e, t) => {
    (aTt(),
      Fji.init(e, t),
      a0.init(e, t),
      (e._zod.processJSONSchema = (r, s, a) => lIr(e, r, s, a)),
      (e.keyType = t.keyType),
      (e.valueType = t.valueType));
  });
  MIr = to("ZodEnum", (e, t) => {
    (Bji.init(e, t),
      a0.init(e, t),
      (e._zod.processJSONSchema = (s, a, H) => iIr(e, s, a, H)),
      (e.enum = t.entries),
      (e.options = [...e._zod.values]));
    let r = new Set(Object.keys(t.entries));
    ((e.extract = (s, a) => {
      let H = {};
      for (let u of s)
        if (r.has(u)) H[u] = t.entries[u];
        else throw Error(`Key ${u} not found in enum`);
      return new MIr({ ...t, checks: [], ...yA(a), entries: H });
    }),
      (e.exclude = (s, a) => {
        let H = { ...t.entries };
        for (let u of s)
          if (r.has(u)) delete H[u];
          else throw Error(`Key ${u} not found in enum`);
        return new MIr({ ...t, checks: [], ...yA(a), entries: H });
      }));
  });
  wya = to("ZodLiteral", (e, t) => {
    (Rji.init(e, t),
      a0.init(e, t),
      (e._zod.processJSONSchema = (r, s, a) => sIr(e, r, s, a)),
      (e.values = new Set(t.values)),
      Object.defineProperty(e, "value", {
        get() {
          if (t.values.length > 1)
            throw Error("This schema contains multiple valid literal values. Use `.values` instead.");
          return t.values[0];
        },
      }));
  });
  kya = to("ZodTransform", (e, t) => {
    (aTt(),
      Wji.init(e, t),
      a0.init(e, t),
      (e._zod.processJSONSchema = (r, s, a) => aIr(e, r, s, a)),
      (e._zod.parse = (r, s) => {
        if (s.direction === "backward") throw new r5e(e.constructor.name);
        r.addIssue = (H) => {
          if (typeof H === "string") r.issues.push(Dhe(H, r.value, t));
          else {
            let u = H;
            if (u.fatal) u.continue = !1;
            if ((u.code ?? (u.code = "custom"), !("input" in u))) u.input = r.value;
            (u.inst ?? (u.inst = e), r.issues.push(Dhe(u)));
          }
        };
        let a = t.transform(r.value, r);
        if (a instanceof Promise) return a.then((H) => ((r.value = H), r));
        return ((r.value = a), r);
      }));
  });
  JCi = to("ZodOptional", (e, t) => {
    (gEr.init(e, t),
      a0.init(e, t),
      (e._zod.processJSONSchema = (r, s, a) => rTt(e, r, s, a)),
      (e.unwrap = () => e._zod.def.innerType));
  });
  KCi = to("ZodExactOptional", (e, t) => {
    (Vji.init(e, t),
      a0.init(e, t),
      (e._zod.processJSONSchema = (r, s, a) => rTt(e, r, s, a)),
      (e.unwrap = () => e._zod.def.innerType));
  });
  Uya = to("ZodNullable", (e, t) => {
    (qji.init(e, t),
      a0.init(e, t),
      (e._zod.processJSONSchema = (r, s, a) => fIr(e, r, s, a)),
      (e.unwrap = () => e._zod.def.innerType));
  });
  Nya = to("ZodDefault", (e, t) => {
    (Gji.init(e, t),
      a0.init(e, t),
      (e._zod.processJSONSchema = (r, s, a) => mIr(e, r, s, a)),
      (e.unwrap = () => e._zod.def.innerType),
      (e.removeDefault = e.unwrap));
  });
  Bya = to("ZodPrefault", (e, t) => {
    (Xji.init(e, t),
      a0.init(e, t),
      (e._zod.processJSONSchema = (r, s, a) => _Ir(e, r, s, a)),
      (e.unwrap = () => e._zod.def.innerType));
  });
  zCi = to("ZodNonOptional", (e, t) => {
    (Jji.init(e, t),
      a0.init(e, t),
      (e._zod.processJSONSchema = (r, s, a) => pIr(e, r, s, a)),
      (e.unwrap = () => e._zod.def.innerType));
  });
  Vya = to("ZodCatch", (e, t) => {
    (Kji.init(e, t),
      a0.init(e, t),
      (e._zod.processJSONSchema = (r, s, a) => hIr(e, r, s, a)),
      (e.unwrap = () => e._zod.def.innerType),
      (e.removeCatch = e.unwrap));
  });
  QCi = to("ZodPipe", (e, t) => {
    (EEr.init(e, t),
      a0.init(e, t),
      (e._zod.processJSONSchema = (r, s, a) => LIr(e, r, s, a)),
      (e.in = t.in),
      (e.out = t.out));
  });
  ((Gya = to("ZodPreprocess", (e, t) => {
    (QCi.init(e, t), zji.init(e, t));
  })),
    (Xya = to("ZodReadonly", (e, t) => {
      (Qji.init(e, t),
        a0.init(e, t),
        (e._zod.processJSONSchema = (r, s, a) => $Ir(e, r, s, a)),
        (e.unwrap = () => e._zod.def.innerType));
    })));
  Kya = to("ZodLazy", (e, t) => {
    (Yji.init(e, t),
      a0.init(e, t),
      (e._zod.processJSONSchema = (r, s, a) => gIr(e, r, s, a)),
      (e.unwrap = () => e._zod.def.getter()));
  });
  vIr = to("ZodCustom", (e, t) => {
    (Zji.init(e, t), a0.init(e, t), (e._zod.processJSONSchema = (r, s, a) => oIr(e, r, s, a)));
  });
  Zya = to(
    "ZodInstanceOf",
    (e, t) => {
      vIr.init(e, t);
    },
    {
      properties(e, t) {
        return this.check(REr(e, t));
      },
    },
  );
});