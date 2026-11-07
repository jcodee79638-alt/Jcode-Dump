
function lTa(e) {
  let t = ["ROOT"],
    r = -1,
    s = null;
  function a(d, _, L) {
    switch (d) {
      case '"': {
        ((r = _), t.pop(), t.push(L), t.push("INSIDE_STRING"));
        break;
      }
      case "f":
      case "t":
      case "n": {
        ((r = _), (s = _), t.pop(), t.push(L), t.push("INSIDE_LITERAL"));
        break;
      }
      case "-": {
        (t.pop(), t.push(L), t.push("INSIDE_NUMBER"));
        break;
      }
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9": {
        ((r = _), t.pop(), t.push(L), t.push("INSIDE_NUMBER"));
        break;
      }
      case "{": {
        ((r = _), t.pop(), t.push(L), t.push("INSIDE_OBJECT_START"));
        break;
      }
      case "[": {
        ((r = _), t.pop(), t.push(L), t.push("INSIDE_ARRAY_START"));
        break;
      }
    }
  }
  function H(d, _) {
    switch (d) {
      case ",": {
        (t.pop(), t.push("INSIDE_OBJECT_AFTER_COMMA"));
        break;
      }
      case "}": {
        ((r = _), t.pop());
        break;
      }
    }
  }
  function u(d, _) {
    switch (d) {
      case ",": {
        (t.pop(), t.push("INSIDE_ARRAY_AFTER_COMMA"));
        break;
      }
      case "]": {
        ((r = _), t.pop());
        break;
      }
    }
  }
  for (let d = 0; d < e.length; d++) {
    let _ = e[d];
    switch (t[t.length - 1]) {
      case "ROOT":
        a(_, d, "FINISH");
        break;
      case "INSIDE_OBJECT_START": {
        switch (_) {
          case '"': {
            (t.pop(), t.push("INSIDE_OBJECT_KEY"));
            break;
          }
          case "}": {
            ((r = d), t.pop());
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_AFTER_COMMA": {
        switch (_) {
          case '"': {
            (t.pop(), t.push("INSIDE_OBJECT_KEY"));
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_KEY": {
        switch (_) {
          case '"': {
            (t.pop(), t.push("INSIDE_OBJECT_AFTER_KEY"));
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_AFTER_KEY": {
        switch (_) {
          case ":": {
            (t.pop(), t.push("INSIDE_OBJECT_BEFORE_VALUE"));
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_BEFORE_VALUE": {
        a(_, d, "INSIDE_OBJECT_AFTER_VALUE");
        break;
      }
      case "INSIDE_OBJECT_AFTER_VALUE": {
        H(_, d);
        break;
      }
      case "INSIDE_STRING": {
        switch (_) {
          case '"': {
            (t.pop(), (r = d));
            break;
          }
          case "\\": {
            t.push("INSIDE_STRING_ESCAPE");
            break;
          }
          default:
            r = d;
        }
        break;
      }
      case "INSIDE_ARRAY_START": {
        switch (_) {
          case "]": {
            ((r = d), t.pop());
            break;
          }
          default: {
            ((r = d), a(_, d, "INSIDE_ARRAY_AFTER_VALUE"));
            break;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_AFTER_VALUE": {
        switch (_) {
          case ",": {
            (t.pop(), t.push("INSIDE_ARRAY_AFTER_COMMA"));
            break;
          }
          case "]": {
            ((r = d), t.pop());
            break;
          }
          default: {
            r = d;
            break;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_AFTER_COMMA": {
        a(_, d, "INSIDE_ARRAY_AFTER_VALUE");
        break;
      }
      case "INSIDE_STRING_ESCAPE": {
        (t.pop(), (r = d));
        break;
      }
      case "INSIDE_NUMBER": {
        switch (_) {
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9": {
            r = d;
            break;
          }
          case "e":
          case "E":
          case "-":
          case ".":
            break;
          case ",": {
            if ((t.pop(), t[t.length - 1] === "INSIDE_ARRAY_AFTER_VALUE")) u(_, d);
            if (t[t.length - 1] === "INSIDE_OBJECT_AFTER_VALUE") H(_, d);
            break;
          }
          case "}": {
            if ((t.pop(), t[t.length - 1] === "INSIDE_OBJECT_AFTER_VALUE")) H(_, d);
            break;
          }
          case "]": {
            if ((t.pop(), t[t.length - 1] === "INSIDE_ARRAY_AFTER_VALUE")) u(_, d);
            break;
          }
          default: {
            t.pop();
            break;
          }
        }
        break;
      }
      case "INSIDE_LITERAL": {
        let I = e.substring(s, d + 1);
        if (!"false".startsWith(I) && !"true".startsWith(I) && !"null".startsWith(I)) {
          if ((t.pop(), t[t.length - 1] === "INSIDE_OBJECT_AFTER_VALUE")) H(_, d);
          else if (t[t.length - 1] === "INSIDE_ARRAY_AFTER_VALUE") u(_, d);
        } else r = d;
        break;
      }
    }
  }
  let f = e.slice(0, r + 1);
  for (let d = t.length - 1; d >= 0; d--)
    switch (t[d]) {
      case "INSIDE_STRING": {
        f += '"';
        break;
      }
      case "INSIDE_OBJECT_KEY":
      case "INSIDE_OBJECT_AFTER_KEY":
      case "INSIDE_OBJECT_AFTER_COMMA":
      case "INSIDE_OBJECT_START":
      case "INSIDE_OBJECT_BEFORE_VALUE":
      case "INSIDE_OBJECT_AFTER_VALUE": {
        f += "}";
        break;
      }
      case "INSIDE_ARRAY_START":
      case "INSIDE_ARRAY_AFTER_COMMA":
      case "INSIDE_ARRAY_AFTER_VALUE": {
        f += "]";
        break;
      }
      case "INSIDE_LITERAL": {
        let L = e.substring(s, e.length);
        if ("true".startsWith(L)) f += "true".slice(L.length);
        else if ("false".startsWith(L)) f += "false".slice(L.length);
        else if ("null".startsWith(L)) f += "null".slice(L.length);
      }
    }
  return f;
}