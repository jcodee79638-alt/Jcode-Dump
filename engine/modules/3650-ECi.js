
var ECi,
  aya = (e, t) => {
    (Rvi.init(e, t), (e.name = "ZodError"));
    let r = Object.getPrototypeOf(e);
    if (ECi.has(r)) return;
    (ECi.add(r),
      iTt(r, "format", (s) => (a) => sEr(s, a)),
      iTt(r, "flatten", (s) => (a) => iEr(s, a)),
      iTt(r, "addIssue", (s) => (a) => {
        (s.issues.push(a), (s.message = JSON.stringify(s.issues, YGe, 2)));
      }),
      iTt(r, "addIssues", (s) => (a) => {
        (s.issues.push(...a), (s.message = JSON.stringify(s.issues, YGe, 2)));
      }),
      Object.defineProperty(r, "isEmpty", {
        configurable: !0,
        enumerable: !1,
        get() {
          return this.issues.length === 0;
        },
      }));
  },
  ON;