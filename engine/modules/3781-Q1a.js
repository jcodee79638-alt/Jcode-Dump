
function Q1a(e) {
  let t = [e];
  while (t.length) {
    let r = t;
    t = [];
    for (let s of r) {
      if (Object.prototype.hasOwnProperty.call(s, "__proto__"))
        throw SyntaxError("Object contains forbidden prototype property");
      if (
        Object.prototype.hasOwnProperty.call(s, "constructor") &&
        s.constructor !== null &&
        typeof s.constructor === "object" &&
        Object.prototype.hasOwnProperty.call(s.constructor, "prototype")
      )
        throw SyntaxError("Object contains forbidden prototype property");
      for (let a in s) {
        let H = s[a];
        if (H && typeof H === "object") t.push(H);
      }
    }
  }
  return e;
}