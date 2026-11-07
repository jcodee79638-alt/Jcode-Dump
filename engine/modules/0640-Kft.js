
var Kft = ne(() => {
  YYt();
  BH();
  uye();
  KH();
  Hf();
  Yu();
  $Q();
  Ov();
  jW();
  bie();
  g1e();
  Vye();
  yBs = {
    ...Bq({
      label: "Config",
      evaluate(e) {
        return this.parse(e.getRef(Eft));
      },
    }),
    [DZt]: DZt,
    toJSON() {
      return { _id: "Config" };
    },
  };
  ((GQ = Wr(2, (e, t) => Gpe((r) => Vn(e.parse(r), t)))),
    (XAn = Wr(2, (e, t) => Gpe((r) => $s(e.parse(r), (s) => t(s).parse(r))))));
  ((XQ = Wr(2, (e, t) =>
    XAn(e, (r) => {
      if (Rft(r.cause)) {
        let s = r.cause.issue;
        if (fRe(s)) return KAn(t);
      }
      return TBs(r.cause);
    }),
  )),
    (yZt = ni(function* (e, t) {
      let r = yield* e.load(t);
      if (r === void 0) return;
      switch (r._tag) {
        case "Value":
          return r.value;
        case "Record": {
          if (r.value !== void 0) return r.value;
          let s = {};
          for (let a of r.keys) {
            let H = yield* yZt(e, [...t, a]);
            if (H !== void 0) s[a] = H;
          }
          return s;
        }
        case "Array": {
          if (r.value !== void 0) return r.value;
          let s = [];
          for (let a = 0; a < r.length; a++) s.push(yield* yZt(e, [...t, a]));
          return s;
        }
      }
    })),
    (pRe = ni(function* (e, t, r) {
      switch (e._tag) {
        case "Objects": {
          let s = {};
          for (let a of e.propertySignatures) {
            let H = a.name;
            if (typeof H === "string") {
              let u = yield* pRe(a.type, t, [...r, H]);
              if (u !== void 0) s[H] = u;
            }
          }
          if (e.indexSignatures.length > 0) {
            let a = yield* t.load(r);
            if (a && a._tag === "Record")
              for (let H of e.indexSignatures) {
                let u = $1e(H.parameter);
                for (let f of a.keys)
                  if (!Object.hasOwn(s, f) && u(f)) {
                    let d = yield* pRe(H.type, t, [...r, f]);
                    if (d !== void 0) s[f] = d;
                  }
              }
          }
          return s;
        }
        case "Arrays": {
          let s = yield* t.load(r);
          if (s && s._tag === "Value") return s.value;
          let a = [];
          for (let H = 0; H < e.elements.length; H++) a.push(yield* pRe(e.elements[H], t, [...r, H]));
          return a;
        }
        case "Union":
          return yield* yZt(t, r);
        case "Suspend":
          return yield* pRe(e.thunk(), t, r);
        default: {
          let s = yield* t.load(r);
          if (s === void 0) return;
          if (s._tag === "Value") return s.value;
          if (s._tag === "Record" && s.value !== void 0) return s.value;
          if (s._tag === "Array" && s.value !== void 0) return s.value;
          return;
        }
      }
    })));
  ((MBs = Jo(["true", "yes", "on", "1", "y"])),
    (xBs = Jo(["false", "no", "off", "0", "n"])),
    (SBs = Jo([...MBs.literals, ...xBs.literals]).pipe(
      v$(
        Vi,
        Zq({
          decode: (e) => e === "true" || e === "yes" || e === "on" || e === "1" || e === "y",
          encode: (e) => (e ? "true" : "false"),
        }),
      ),
    )));
});