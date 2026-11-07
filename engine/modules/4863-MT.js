
var MT,
  zVi,
  QVi,
  d3a = (e, t) => {
    let r = e.length,
      s = 0,
      a = (D) => {
        throw new zVi(`${D} at position ${s}`);
      },
      H = (D) => {
        throw new QVi(`${D} at position ${s}`);
      },
      u = () => {
        if ((I(), s >= r)) a("Unexpected end of input");
        if (e[s] === '"') return f();
        if (e[s] === "{") return d();
        if (e[s] === "[") return _();
        if (
          e.substring(s, s + 4) === "null" ||
          (MT.NULL & t && r - s < 4 && "null".startsWith(e.substring(s)))
        )
          return ((s += 4), null);
        if (
          e.substring(s, s + 4) === "true" ||
          (MT.BOOL & t && r - s < 4 && "true".startsWith(e.substring(s)))
        )
          return ((s += 4), !0);
        if (
          e.substring(s, s + 5) === "false" ||
          (MT.BOOL & t && r - s < 5 && "false".startsWith(e.substring(s)))
        )
          return ((s += 5), !1);
        if (
          e.substring(s, s + 8) === "Infinity" ||
          (MT.INFINITY & t && r - s < 8 && "Infinity".startsWith(e.substring(s)))
        )
          return ((s += 8), 1 / 0);
        if (
          e.substring(s, s + 9) === "-Infinity" ||
          (MT.MINUS_INFINITY & t && 1 < r - s && r - s < 9 && "-Infinity".startsWith(e.substring(s)))
        )
          return ((s += 9), -1 / 0);
        if (e.substring(s, s + 3) === "NaN" || (MT.NAN & t && r - s < 3 && "NaN".startsWith(e.substring(s))))
          return ((s += 3), NaN);
        return L();
      },
      f = () => {
        let D = s,
          S = !1;
        s++;
        while (s < r && (e[s] !== '"' || (S && e[s - 1] === "\\"))) ((S = e[s] === "\\" ? !S : !1), s++);
        if (e.charAt(s) == '"')
          try {
            return JSON.parse(e.substring(D, ++s - Number(S)));
          } catch (T) {
            H(String(T));
          }
        else if (MT.STR & t)
          try {
            return JSON.parse(e.substring(D, s - Number(S)) + '"');
          } catch (T) {
            return JSON.parse(e.substring(D, e.lastIndexOf("\\")) + '"');
          }
        a("Unterminated string literal");
      },
      d = () => {
        (s++, I());
        let D = {};
        try {
          while (e[s] !== "}") {
            if ((I(), s >= r && MT.OBJ & t)) return D;
            let S = f();
            (I(), s++);
            try {
              let T = u();
              Object.defineProperty(D, S, { value: T, writable: !0, enumerable: !0, configurable: !0 });
            } catch (T) {
              if (MT.OBJ & t) return D;
              else throw T;
            }
            if ((I(), e[s] === ",")) s++;
          }
        } catch (S) {
          if (MT.OBJ & t) return D;
          else a("Expected '}' at end of object");
        }
        return (s++, D);
      },
      _ = () => {
        s++;
        let D = [];
        try {
          while (e[s] !== "]") if ((D.push(u()), I(), e[s] === ",")) s++;
        } catch (S) {
          if (MT.ARR & t) return D;
          a("Expected ']' at end of array");
        }
        return (s++, D);
      },
      L = () => {
        if (s === 0) {
          if (e === "-" && MT.NUM & t) a("Not sure what '-' is");
          try {
            return JSON.parse(e);
          } catch (S) {
            if (MT.NUM & t)
              try {
                if (e[e.length - 1] === ".") return JSON.parse(e.substring(0, e.lastIndexOf(".")));
                return JSON.parse(e.substring(0, e.lastIndexOf("e")));
              } catch (T) {}
            H(String(S));
          }
        }
        let D = s;
        if (e[s] === "-") s++;
        while (e[s] && !",]}".includes(e[s])) s++;
        if (s == r && !(MT.NUM & t)) a("Unterminated number literal");
        try {
          return JSON.parse(e.substring(D, s));
        } catch (S) {
          if (e.substring(D, s) === "-" && MT.NUM & t) a("Not sure what '-' is");
          try {
            return JSON.parse(e.substring(D, e.lastIndexOf("e")));
          } catch (T) {
            H(String(T));
          }
        }
      },
      I = () => {
        while (
          s < r &&
          ` 
\r	`.includes(e[s])
        )
          s++;
      };
    return u();
  },
  LTr = (e) => p3a(e, MT.ALL ^ MT.NUM);