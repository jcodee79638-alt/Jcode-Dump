
var Ov = ne(() => {
  Jg();
  n2();
  glt();
  $6();
  BH();
  pBe();
  aie();
  lD();
  FM();
  KH();
  q_();
  aAn();
  fZt();
  kft();
  kft();
  Bft();
  Hf();
  fye();
  R_();
  Yu();
  Tv();
  GKt();
  jW();
  $Be();
  bie();
  g1e();
  Vye();
  rZt();
  HRe = Pft;
  Jie = rAn;
  _Zt = G_;
  kv = iAn;
  xAn = Vpe;
  ((Kie = hZt), (cd = E1e));
  ((nw = VW((e) => cd(Vlt(e.ast), { schema: e }))),
    (be = VW((e) => nw(XW(e)))),
    (iw = VW((e) => cd(YQt(e.ast), { schema: e }))),
    (I1e = VW((e) => cd(Cie(e.ast), { schema: e }))),
    (k2s = VW((e) => cd(ME(e.ast), { schema: e }))));
  ((Wft = cd(lan)),
    (e0 = cd(pan)),
    (PH = cd(MBe)),
    (O2s = cd(Jye)),
    (U2s = cd(qQt)),
    (re = cd(xBe)),
    (Aa = cd(GQt)),
    (Vi = cd(Lan)),
    (N2s = cd(gan)),
    (LZt = cd(Aan)));
  ((On = VW((e) => cd(new jpe(!1, [], [e.ast]), { value: e }))),
    (F2s = VW((e) => cd(new jpe(!1, [e.ast], [e.ast]), { value: e }))),
    (J0 = VW((e) => cd(new jpe(!0, e.ast.elements, e.ast.rest), { schema: e }))));
  ((w6 = VW((e) => Io([e, O2s]))), (XW = VW((e) => Io([e, U2s]))));
  KW = QQt;
  cRe = Blt;
  ((gZt = X2s({ order: $W, annotate: (e) => ({ meta: { _tag: "isGreaterThan", exclusiveMinimum: e } }) })),
    (pG = J2s({ order: $W, annotate: (e) => ({ meta: { _tag: "isGreaterThanOrEqualTo", minimum: e } }) })),
    (zie = K2s({ order: $W, annotate: (e) => ({ meta: { _tag: "isLessThanOrEqualTo", maximum: e } }) })),
    (EZt = z2s({ order: $W, annotate: (e) => ({ meta: { _tag: "isBetween", ...e } }) })));
  PAn = re.check(jAn());
  DAn = [];
  ((iLH = qpe(globalThis.RegExp, {
    typeConstructor: { _tag: "RegExp" },
    generation: { runtime: "Schema.RegExp", Type: "globalThis.RegExp" },
    expected: "RegExp",
    toCodecJson: () =>
      JW()(
        nt({ source: re, flags: re }),
        Pie({
          decode: (e) =>
            ZA({
              try: () => new globalThis.RegExp(e.source, e.flags),
              catch: (t) => new hy(Lo(t), { message: globalThis.String(t) }),
            }),
          encode: (e) => Jt({ source: e.source, flags: e.flags }),
        }),
      ),
    toArbitrary: () => (e) =>
      e
        .tuple(
          e.constantFrom(
            ".",
            ".*",
            "\\d+",
            "\\w+",
            "[a-z]+",
            "[A-Z]+",
            "[0-9]+",
            "^[a-zA-Z0-9]+$",
            "^\\d{4}-\\d{2}-\\d{2}$",
          ),
          e
            .uniqueArray(e.constantFrom("g", "i", "m", "s", "u", "y"), { minLength: 0, maxLength: 6 })
            .map((t) => t.join("")),
        )
        .map(([t, r]) => new globalThis.RegExp(t, r)),
    toEquivalence: () => (e, t) => e.source === t.source && e.flags === t.flags,
  })),
    (nBs = re.annotate({ expected: "a string that will be decoded as a URL" })),
    (iBs = qpe(globalThis.URL, {
      typeConstructor: { _tag: "URL" },
      generation: { runtime: "Schema.URL", Type: "globalThis.URL" },
      expected: "URL",
      toCodecJson: () => JW()(nBs, Xon),
      toArbitrary: () => (e) => e.webUrl().map((t) => new globalThis.URL(t)),
      toEquivalence: () => (e, t) => e.toString() === t.toString(),
    })));
  ((sBs = re.annotate({ expected: "a string in ISO 8601 format that will be decoded as a Date" })),
    (sLH = qpe(globalThis.Date, {
      typeConstructor: { _tag: "Date" },
      generation: { runtime: "Schema.Date", Type: "globalThis.Date" },
      expected: "Date",
      toCodecJson: () => JW()(sBs, Von),
      toArbitrary: () => (e, t) =>
        e.date(UAn(t?.constraint, t?.constraint?.ordered?.order === Ytn ? t.constraint.ordered : void 0)),
    })),
    (uRe = qW(FKt, {
      typeConstructor: { _tag: "effect/Duration" },
      generation: {
        runtime: "Schema.Duration",
        Type: "Duration.Duration",
        importDeclaration: 'import * as Duration from "effect/Duration"',
      },
      expected: "Duration",
      toCodecJson: () =>
        JW()(
          Io([
            nt({ _tag: ri("Infinity") }),
            nt({ _tag: ri("NegativeInfinity") }),
            nt({ _tag: ri("Nanos"), value: N2s }),
            nt({ _tag: ri("Millis"), value: DI }),
          ]),
          Zq({
            decode: (e) => {
              switch (e._tag) {
                case "Infinity":
                  return SU;
                case "NegativeInfinity":
                  return dye;
                case "Nanos":
                  return spe(e.value);
                case "Millis":
                  return UC(e.value);
              }
            },
            encode: (e) => {
              switch (e.value._tag) {
                case "Infinity":
                  return { _tag: "Infinity" };
                case "NegativeInfinity":
                  return { _tag: "NegativeInfinity" };
                case "Nanos":
                  return { _tag: "Nanos", value: e.value.nanos };
                case "Millis":
                  return { _tag: "Millis", value: e.value.millis };
              }
            },
          }),
        ),
      toArbitrary: () => (e) =>
        e.oneof(e.constant(SU), e.constant(dye), e.bigInt().map(spe), e.maxSafeInteger().map(UC)),
      toFormatter: () => globalThis.String,
      toEquivalence: () => WKt,
    })),
    (oBs = Cj(PH)));
  ((aBs = qpe(globalThis.File, {
    typeConstructor: { _tag: "File" },
    generation: { runtime: "Schema.File", Type: "globalThis.File" },
    expected: "File",
    toCodecJson: () =>
      JW()(
        nt({ data: re.check(q2s()), type: re, name: re, lastModified: Aa }),
        Pie({
          decode: (e) =>
            rut(Rye(e.data), {
              onFailure: (t) => bn(new hy(Lo(e.data), { message: t.message })),
              onSuccess: (t) => {
                let r = new globalThis.Uint8Array(t);
                return Jt(new globalThis.File([r], e.name, { type: e.type, lastModified: e.lastModified }));
              },
            }),
          encode: (e) =>
            bl({
              try: async () => {
                let t = new globalThis.Uint8Array(await e.arrayBuffer());
                return { data: Ilt(t), type: e.type, name: e.name, lastModified: e.lastModified };
              },
              catch: (t) => new hy(Lo(e), { message: globalThis.String(t) }),
            }),
        }),
      ),
  })),
    (oLH = qpe(globalThis.FormData, {
      typeConstructor: { _tag: "FormData" },
      generation: { runtime: "Schema.FormData", Type: "globalThis.FormData" },
      expected: "FormData",
      toCodecJson: () =>
        JW()(
          On(TAn([re, Io([nt({ _tag: Vc("String"), value: re }), nt({ _tag: Vc("File"), value: aBs })])])),
          Pie({
            decode: (e) => {
              let t = new globalThis.FormData();
              for (let [r, s] of e) t.append(r, s.value);
              return Jt(t);
            },
            encode: (e) =>
              Jt(
                globalThis.Array.from(e.entries()).map(([t, r]) => {
                  if (typeof r === "string") return [t, { _tag: "String", value: r }];
                  else return [t, { _tag: "File", value: r }];
                }),
              ),
          }),
        ),
    })),
    (aLH = qpe(globalThis.URLSearchParams, {
      typeConstructor: { _tag: "URLSearchParams" },
      generation: { runtime: "Schema.URLSearchParams", Type: "globalThis.URLSearchParams" },
      expected: "URLSearchParams",
      toCodecJson: () =>
        JW()(
          re.annotate({ expected: "a query string that will be decoded as URLSearchParams" }),
          Zq({ decode: (e) => new globalThis.URLSearchParams(e), encode: (e) => e.toString() }),
        ),
    })),
    (mo = Aa.check(G2s())),
    (DI = Aa.check(ARe())),
    (O6 = re.annotate({ expected: "a string that will be decoded as a number" }).pipe(v$(Aa, gBe))),
    (HBs = re.check(V2s())),
    (cBs = re
      .annotate({ expected: "a string that will be decoded as a trimmed string" })
      .pipe(v$(HBs, Ron()))),
    (ABs = re.annotate({
      expected: "a base64 encoded string that will be decoded as Uint8Array",
      format: "byte",
      contentEncoding: "base64",
    })),
    (NAn = qpe(globalThis.Uint8Array, {
      typeConstructor: { _tag: "Uint8Array" },
      generation: { runtime: "Schema.Uint8Array", Type: "globalThis.Uint8Array" },
      expected: "Uint8Array",
      toCodecJson: () => JW()(ABs, Jon),
      toArbitrary: () => (e) => e.uint8Array(),
    })),
    (uBs = qW((e) => ron(e) && non(e), {
      typeConstructor: { _tag: "effect/DateTime.Utc" },
      generation: {
        runtime: "Schema.DateTimeUtc",
        Type: "DateTime.Utc",
        importDeclaration: 'import * as DateTime from "effect/DateTime"',
      },
      expected: "DateTime.Utc",
      toCodecJson: () => JW()(re, zon),
      toArbitrary: () => (e, t) =>
        e
          .date(
            UAn(
              t?.constraint,
              t?.constraint?.ordered?.order === son ? t.constraint.ordered : void 0,
              { valid: !0 },
              con,
            ),
          )
          .map((r) => oon(r)),
      toFormatter: () => (e) => e.toString(),
      toEquivalence: () => ion,
    })),
    (lBs = globalThis.Symbol.for("immer-draftable")));
  RAn = Yye((e) => {
    let t = mBs(e, RAn);
    return t !== e && h1(e) ? jBe(t) : t;
  });
  hBs = sZt(_Bs);
  ((LBs = new S$(
    new eG("null"),
    new Zg(
      Sm(() => null),
      Sm(() => "null"),
    ),
  )),
    ($Bs = new S$(
      new b6([new eG("true"), new eG("false")], "anyOf"),
      new Zg(
        Sm((e) => e === "true"),
        Wye(),
      ),
    )),
    (VAn = Yye((e) => {
      let t = WAn(e, VAn, (r) => x$(r, [gBs]));
      if (t !== e && h1(e)) return jBe(t);
      return t;
    })),
    (gBs = new S$(
      qQt,
      new Zg(
        QC(),
        Sm(() => {
          return;
        }),
      ),
    )),
    (qAn = Yye((e) => {
      let t = WAn(e, qAn, Za);
      if (t !== e && h1(e)) return jBe(t);
      return t;
    })),
    (GAn = Yye((e) => {
      if (vpe(e) && e.annotations?.[yAn]) return e;
      let t = EBs(e);
      if (Plt(t)) {
        let r = new b6([t, ZQt(xBe, t, new Zg(Non(), QC()))], "anyOf", { [yAn]: !0 });
        return h1(e) ? Vlt(r) : r;
      }
      return t;
    })));
  ((Qie = cd(Xlt)), (IBs = cd(Wan)));
});