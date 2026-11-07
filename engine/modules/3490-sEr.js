
function sEr(e, t = (r) => r.message) {
  let r = { _errors: [] },
    s = (a, H = []) => {
      for (let u of a.issues)
        if (u.code === "invalid_union" && u.errors.length)
          u.errors.map((f) => s({ issues: f }, [...H, ...u.path]));
        else if (u.code === "invalid_key") s({ issues: u.issues }, [...H, ...u.path]);
        else if (u.code === "invalid_element") s({ issues: u.issues }, [...H, ...u.path]);
        else {
          let f = [...H, ...u.path];
          if (f.length === 0) r._errors.push(t(u));
          else {
            let d = r,
              _ = 0;
            while (_ < f.length) {
              let L = f[_],
                I = _ === f.length - 1;
              if (L === "_errors") {
                if (I) d._errors.push(t(u));
                _++;
                continue;
              }
              if (!Object.prototype.hasOwnProperty.call(d, L))
                Object.defineProperty(d, L, {
                  value: { _errors: [] },
                  enumerable: !0,
                  writable: !0,
                  configurable: !0,
                });
              let D = d[L];
              if (I) D._errors.push(t(u));
              ((d = D), _++);
            }
          }
        }
    };
  return (s(e), r);
}