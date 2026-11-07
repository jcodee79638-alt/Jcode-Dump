
var USt = ne(() => {
  yhe();
  s5e();
  k8();
  ((hT = to("$ZodCheck", (e, t) => {
    var r;
    (e._zod ?? (e._zod = {}), (e._zod.def = t), (r = e._zod).onattach ?? (r.onattach = []));
  })),
    (OSt = { number: "number", bigint: "bigint", object: "date" }),
    (lEr = to("$ZodCheckLessThan", (e, t) => {
      hT.init(e, t);
      let r = OSt[typeof t.value];
      e._zod.check = (s) => {
        if (t.inclusive ? s.value <= t.value : s.value < t.value) return;
        s.issues.push({
          origin: OSt[typeof s.value] ?? r,
          code: "too_big",
          maximum: typeof t.value === "object" ? t.value.getTime() : t.value,
          input: s.value,
          inclusive: t.inclusive,
          inst: e,
          continue: !t.abort,
        });
      };
    })),
    (fEr = to("$ZodCheckGreaterThan", (e, t) => {
      hT.init(e, t);
      let r = OSt[typeof t.value];
      e._zod.check = (s) => {
        if (t.inclusive ? s.value >= t.value : s.value > t.value) return;
        s.issues.push({
          origin: OSt[typeof s.value] ?? r,
          code: "too_small",
          minimum: typeof t.value === "object" ? t.value.getTime() : t.value,
          input: s.value,
          inclusive: t.inclusive,
          inst: e,
          continue: !t.abort,
        });
      };
    })),
    (Tbi = to("$ZodCheckMultipleOf", (e, t) => {
      (hT.init(e, t),
        (e._zod.check = (r) => {
          if (typeof r.value !== typeof t.value)
            throw Error("Cannot mix number and bigint in multiple_of check.");
          if (
            typeof r.value === "bigint"
              ? t.value !== BigInt(0) && r.value % t.value === BigInt(0)
              : Evi(r.value, t.value) === 0
          )
            return;
          r.issues.push({
            origin: typeof r.value,
            code: "not_multiple_of",
            divisor: t.value,
            input: r.value,
            inst: e,
            continue: !t.abort,
          });
        }));
    })),
    (vbi = to("$ZodCheckNumberFormat", (e, t) => {
      (hT.init(e, t), (t.format = t.format || "float64"));
      let r = t.format?.includes("int"),
        s = r ? "int" : "number",
        [a, H] = MSt[t.format];
      e._zod.check = (u) => {
        let f = u.value;
        if (r) {
          if (!Number.isInteger(f)) {
            u.issues.push({
              expected: s,
              format: t.format,
              code: "invalid_type",
              continue: !1,
              input: f,
              inst: e,
            });
            return;
          }
          if (!Number.isSafeInteger(f)) {
            if (f > 0)
              u.issues.push({
                input: f,
                code: "too_big",
                maximum: Number.MAX_SAFE_INTEGER,
                note: "Integers must be within the safe integer range.",
                inst: e,
                origin: s,
                inclusive: !0,
                continue: !t.abort,
              });
            else
              u.issues.push({
                input: f,
                code: "too_small",
                minimum: Number.MIN_SAFE_INTEGER,
                note: "Integers must be within the safe integer range.",
                inst: e,
                origin: s,
                inclusive: !0,
                continue: !t.abort,
              });
            return;
          }
        }
        if (f < a)
          u.issues.push({
            origin: "number",
            input: f,
            code: "too_small",
            minimum: a,
            inclusive: !0,
            inst: e,
            continue: !t.abort,
          });
        if (f > H)
          u.issues.push({
            origin: "number",
            input: f,
            code: "too_big",
            maximum: H,
            inclusive: !0,
            inst: e,
            continue: !t.abort,
          });
      };
    })),
    (bbi = to("$ZodCheckMaxLength", (e, t) => {
      var r;
      (hT.init(e, t),
        (r = e._zod.def).when ?? (r.when = uEr),
        (e._zod.check = (s) => {
          let a = s.value,
            H = a.length;
          if ((typeof a === "string" && H > t.maximum ? TSt(a) : H) <= t.maximum) return;
          let f = vSt(a);
          s.issues.push({
            origin: f,
            code: "too_big",
            maximum: t.maximum,
            inclusive: !0,
            input: a,
            inst: e,
            continue: !t.abort,
          });
        }));
    })),
    (jbi = to("$ZodCheckMinLength", (e, t) => {
      var r;
      (hT.init(e, t),
        (r = e._zod.def).when ?? (r.when = uEr),
        (e._zod.check = (s) => {
          let a = s.value,
            H = a.length;
          if ((typeof a === "string" && H >= t.minimum && H < t.minimum * 2 ? TSt(a) : H) >= t.minimum)
            return;
          let f = vSt(a);
          s.issues.push({
            origin: f,
            code: "too_small",
            minimum: t.minimum,
            inclusive: !0,
            input: a,
            inst: e,
            continue: !t.abort,
          });
        }));
    })),
    (Pbi = to("$ZodCheckLengthEquals", (e, t) => {
      var r;
      (hT.init(e, t),
        (r = e._zod.def).when ?? (r.when = uEr),
        (e._zod.check = (s) => {
          let a = s.value,
            H = a.length,
            u = typeof a === "string" && H >= t.length && H <= t.length * 2 ? TSt(a) : H;
          if (u === t.length) return;
          let f = vSt(a),
            d = u > t.length;
          s.issues.push({
            origin: f,
            ...(d ? { code: "too_big", maximum: t.length } : { code: "too_small", minimum: t.length }),
            inclusive: !0,
            exact: !0,
            input: s.value,
            inst: e,
            continue: !t.abort,
          });
        }));
    })),
    (o5e = to("$ZodCheckStringFormat", (e, t) => {
      var r, s;
      if ((hT.init(e, t), t.pattern))
        (r = e._zod).check ??
          (r.check = (a) => {
            if (((t.pattern.lastIndex = 0), t.pattern.test(a.value))) return;
            a.issues.push({
              origin: "string",
              code: "invalid_format",
              format: t.format,
              input: a.value,
              ...(t.pattern ? { pattern: t.pattern.toString() } : {}),
              inst: e,
              continue: !t.abort,
            });
          });
      else (s = e._zod).check ?? (s.check = () => {});
    })),
    (Cbi = to("$ZodCheckRegex", (e, t) => {
      (o5e.init(e, t),
        (e._zod.check = (r) => {
          if (((t.pattern.lastIndex = 0), t.pattern.test(r.value))) return;
          r.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "regex",
            input: r.value,
            pattern: t.pattern.toString(),
            inst: e,
            continue: !t.abort,
          });
        }));
    })),
    (wbi = to("$ZodCheckLowerCase", (e, t) => {
      (t.pattern ?? (t.pattern = Mbi), o5e.init(e, t));
    })),
    (kbi = to("$ZodCheckUpperCase", (e, t) => {
      (t.pattern ?? (t.pattern = xbi), o5e.init(e, t));
    })),
    (Obi = to("$ZodCheckIncludes", (e, t) => {
      hT.init(e, t);
      let r = pHe(t.includes),
        s = new RegExp(typeof t.position === "number" ? `^.{${t.position},}${r}` : r);
      ((t.pattern = s),
        (e._zod.check = (a) => {
          if (a.value.includes(t.includes, t.position)) return;
          a.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "includes",
            includes: t.includes,
            input: a.value,
            inst: e,
            continue: !t.abort,
          });
        }));
    })),
    (Ubi = to("$ZodCheckStartsWith", (e, t) => {
      hT.init(e, t);
      let r = new RegExp(`^${pHe(t.prefix)}.*`);
      (t.pattern ?? (t.pattern = r),
        (e._zod.check = (s) => {
          if (s.value.startsWith(t.prefix)) return;
          s.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "starts_with",
            prefix: t.prefix,
            input: s.value,
            inst: e,
            continue: !t.abort,
          });
        }));
    })),
    (Nbi = to("$ZodCheckEndsWith", (e, t) => {
      hT.init(e, t);
      let r = new RegExp(`.*${pHe(t.suffix)}$`);
      (t.pattern ?? (t.pattern = r),
        (e._zod.check = (s) => {
          if (s.value.endsWith(t.suffix)) return;
          s.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "ends_with",
            suffix: t.suffix,
            input: s.value,
            inst: e,
            continue: !t.abort,
          });
        }));
    })));
  ((Fbi = to("$ZodCheckProperties", (e, t) => {
    (hT.init(e, t),
      t5e(e, Symbol.iterator, function* () {
        yield e;
      }));
    let r;
    e._zod.check = (s) => {
      if (s.value == null) {
        s.issues.push({ expected: "object", code: "invalid_type", input: s.value, inst: e });
        return;
      }
      r ?? (r = Reflect.ownKeys(t.shape).map((u) => [u, t.shape[u]]));
      let a = s.value,
        H;
      for (let [u, f] of r) {
        let d = f._zod.run({ value: a[u], issues: [] }, {});
        if (d instanceof Promise) (H ?? (H = []), H.push(d.then((_) => Sbi(_, s, u))));
        else Sbi(d, s, u);
      }
      if (H)
        return Promise.all(H).then(() => {
          return;
        });
      return;
    };
  })),
    (Bbi = to("$ZodCheckOverwrite", (e, t) => {
      (hT.init(e, t),
        (e._zod.check = (r) => {
          r.value = t.tx(r.value);
        }));
    })));
});