
var azi,
  Hzi,
  kPr = (e) => (e instanceof Error ? e.message : String(e)).replace(/^Invalid regular expression:\s*/i, ""),
  czi =
    'To match special characters like ( ) [ ] { } + * ? . literally, escape them with a backslash (e.g. "\\\\(") or test for them with String.includes instead.',
  ZCt = (e, t, r, s = "") => {
    if (e instanceof qy) return e.regex;
    if (typeof e === "string")
      try {
        return new RegExp(e, s);
      } catch (a) {
        throw new is(
          `String.${t} received the string ${JSON.stringify(e)}, which is not a valid regular expression pattern (${kPr(a)}). To match special characters like ( ) [ ] { } + * ? . literally, escape them with a backslash (e.g. "\\\\(") or test for them with String.includes instead.`,
          r,
        ).as("SyntaxError");
      }
    throw new is(
      `String.${t} expects a regular expression (a /pattern/flags literal or new RegExp(...)) or a string pattern, not ${e === null ? "null" : typeof e}.`,
      r,
    );
  },
  ewt = (e) => {
    let t = Array.from(e, (r) => r);
    if (e.index !== void 0) t.index = e.index;
    if (e.groups) {
      let r = Object.create(null);
      for (let [s, a] of Object.entries(e.groups)) if (!TT(s)) r[s] = a;
      t.groups = r;
    }
    return t;
  },
  Azi = (e, t, r, s) => {
    switch (t) {
      case "test":
        return e.regex.test(vd(r[0]));
      case "exec": {
        let a = e.regex.exec(vd(r[0]));
        return a === null ? null : ewt(a);
      }
      case "toString":
        return vd(e);
      default:
        throw new is(`RegExp method '${t}' is not available in CodeMode.`, s);
    }
  };