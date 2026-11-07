
var dTt = ne(() => {
  h5e();
  qa = km.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite",
  ]);
  UN = class UN extends Error {
    get errors() {
      return this.issues;
    }
    constructor(e) {
      super();
      ((this.issues = []),
        (this.addIssue = (r) => {
          this.issues = [...this.issues, r];
        }),
        (this.addIssues = (r = []) => {
          this.issues = [...this.issues, ...r];
        }));
      let t = new.target.prototype;
      if (Object.setPrototypeOf) Object.setPrototypeOf(this, t);
      else this.__proto__ = t;
      ((this.name = "ZodError"), (this.issues = e));
    }
    format(e) {
      let t =
          e ||
          function (a) {
            return a.message;
          },
        r = { _errors: [] },
        s = (a) => {
          for (let H of a.issues)
            if (H.code === "invalid_union") H.unionErrors.map(s);
            else if (H.code === "invalid_return_type") s(H.returnTypeError);
            else if (H.code === "invalid_arguments") s(H.argumentsError);
            else if (H.path.length === 0) r._errors.push(t(H));
            else {
              let u = r,
                f = 0;
              while (f < H.path.length) {
                let d = H.path[f],
                  _ = f === H.path.length - 1;
                if (d === "_errors") {
                  if (_) u._errors.push(t(H));
                  f++;
                  continue;
                }
                if (!Object.prototype.hasOwnProperty.call(u, d))
                  if (d === "__proto__")
                    Object.defineProperty(u, d, {
                      value: { _errors: [] },
                      writable: !0,
                      enumerable: !0,
                      configurable: !0,
                    });
                  else u[d] = { _errors: [] };
                if (((u = u[d]), _)) u._errors.push(t(H));
                f++;
              }
            }
        };
      return (s(this), r);
    }
    static assert(e) {
      if (!(e instanceof UN)) throw Error(`Not a ZodError: ${e}`);
    }
    toString() {
      return this.message;
    }
    get message() {
      return JSON.stringify(this.issues, km.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
      return this.issues.length === 0;
    }
    flatten(e = (t) => t.message) {
      let t = Object.create(null),
        r = [];
      for (let s of this.issues)
        if (s.path.length > 0) {
          let a = s.path[0];
          ((t[a] = t[a] || []), t[a].push(e(s)));
        } else r.push(e(s));
      return { formErrors: r, fieldErrors: t };
    }
    get formErrors() {
      return this.flatten();
    }
  };
  UN.create = (e) => new UN(e);
});