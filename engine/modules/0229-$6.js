
var $6 = ne(() => {
  Sj();
  KH();
  wC();
  mI();
  fye();
  R_();
  Yu();
  ((grn = BigInt(0)),
    (JOs = BigInt(1)),
    (KOs = BigInt(1000)),
    (zOs = /^(-?\d+(?:\.\d+)?)\s+(nanos?|micros?|millis?|seconds?|minutes?|hours?|days?|weeks?)$/),
    (Lrn = { _tag: "Millis", millis: 0 }),
    (QOs = { _tag: "Infinity" }),
    (YOs = { _tag: "NegativeInfinity" }),
    (ZOs = {
      [aut]: aut,
      [W_]() {
        return QFe(this.value);
      },
      [V_](e) {
        return FKt(e) && tUs(this, e);
      },
      toString() {
        switch (this.value._tag) {
          case "Infinity":
            return "Infinity";
          case "NegativeInfinity":
            return "-Infinity";
          case "Nanos":
            return `${this.value.nanos} nanos`;
          case "Millis":
            return `${this.value.millis} millis`;
        }
      },
      toJSON() {
        switch (this.value._tag) {
          case "Millis":
            return { _id: "Duration", _tag: "Millis", millis: this.value.millis };
          case "Nanos":
            return { _id: "Duration", _tag: "Nanos", nanos: String(this.value.nanos) };
          case "Infinity":
            return { _id: "Duration", _tag: "Infinity" };
          case "NegativeInfinity":
            return { _id: "Duration", _tag: "NegativeInfinity" };
        }
      },
      [F0]() {
        return this.toJSON();
      },
      pipe() {
        return vA(this, arguments);
      },
    }),
    (xU = OC(0)),
    (SU = OC(1 / 0)),
    (dye = OC(-1 / 0)),
    (Irn = Wr(2, (e, t) => {
      switch (e.value._tag) {
        case "Millis":
          return t.onMillis(e.value.millis);
        case "Nanos":
          return t.onNanos(e.value.nanos);
        case "Infinity":
          return t.onInfinity();
        case "NegativeInfinity":
          return (t.onNegativeInfinity ?? t.onInfinity)();
      }
    })),
    (RKt = Wr(3, (e, t, r) => {
      if (
        e.value._tag === "Infinity" ||
        e.value._tag === "NegativeInfinity" ||
        t.value._tag === "Infinity" ||
        t.value._tag === "NegativeInfinity"
      )
        return r.onInfinity(e, t);
      if (e.value._tag === "Millis")
        return t.value._tag === "Millis"
          ? r.onMillis(e.value.millis, t.value.millis)
          : r.onNanos($rn(e), t.value.nanos);
      else return r.onNanos(e.value.nanos, $rn(t));
    })),
    (Drn = epe((e, t) =>
      RKt(e, t, {
        onMillis: (r, s) => (r < s ? -1 : r > s ? 1 : 0),
        onNanos: (r, s) => (r < s ? -1 : r > s ? 1 : 0),
        onInfinity: (r, s) => {
          if (r.value._tag === s.value._tag) return 0;
          if (r.value._tag === "Infinity") return 1;
          if (r.value._tag === "NegativeInfinity") return -1;
          if (s.value._tag === "Infinity") return -1;
          return 1;
        },
      }),
    )),
    (yrn = xKt(Drn)),
    (VKt = SKt(Drn)),
    (Mrn = Wr(2, (e, t) =>
      RKt(e, t, {
        onMillis: (r, s) => OC(r + s),
        onNanos: (r, s) => OC(r + s),
        onInfinity: (r, s) => {
          let a = r.value._tag,
            H = s.value._tag;
          if (a === "Infinity" && H === "NegativeInfinity") return xU;
          if (a === "NegativeInfinity" && H === "Infinity") return xU;
          if (a === "Infinity" || H === "Infinity") return SU;
          if (a === "NegativeInfinity" || H === "NegativeInfinity") return dye;
          return xU;
        },
      }),
    )),
    (tUs = Wr(2, (e, t) => WKt(e, t))));
});