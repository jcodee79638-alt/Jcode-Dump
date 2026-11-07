
var JFe = (e) => {
    let t = new Set(Reflect.ownKeys(e));
    if (e.constructor === Object) return t;
    if (e instanceof Error) t.delete("stack");
    let r = Object.getPrototypeOf(e),
      s = r;
    while (s !== null && s !== Object.prototype) {
      let a = Reflect.ownKeys(s);
      for (let H = 0; H < a.length; H++) t.add(a[H]);
      s = Object.getPrototypeOf(s);
    }
    if (t.has("constructor") && typeof e.constructor === "function" && r === e.constructor.prototype)
      t.delete("constructor");
    return t;
  },
  KFe;