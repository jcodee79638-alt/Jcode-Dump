
var $Sn = Ie(function (Y5H, LSn) {
  var $no = rLt(),
    {
      MAX_LENGTH: mSn,
      CHAR_BACKSLASH: eor,
      CHAR_BACKTICK: gno,
      CHAR_COMMA: Eno,
      CHAR_DOT: Ino,
      CHAR_LEFT_PARENTHESES: Dno,
      CHAR_RIGHT_PARENTHESES: yno,
      CHAR_LEFT_CURLY_BRACE: Mno,
      CHAR_RIGHT_CURLY_BRACE: xno,
      CHAR_LEFT_SQUARE_BRACKET: _Sn,
      CHAR_RIGHT_SQUARE_BRACKET: hSn,
      CHAR_DOUBLE_QUOTE: Sno,
      CHAR_SINGLE_QUOTE: Tno,
      CHAR_NO_BREAK_SPACE: vno,
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: bno,
    } = dSn(),
    jno = (e, t = {}) => {
      if (typeof e !== "string") throw TypeError("Expected a string");
      let r = t || {},
        s = typeof r.maxLength === "number" ? Math.min(mSn, r.maxLength) : mSn;
      if (e.length > s) throw SyntaxError(`Input length (${e.length}), exceeds max characters (${s})`);
      let a = { type: "root", input: e, nodes: [] },
        H = [a],
        u = a,
        f = a,
        d = 0,
        _ = e.length,
        L = 0,
        I = 0,
        D,
        S = () => e[L++],
        T = (C) => {
          if (C.type === "text" && f.type === "dot") f.type = "text";
          if (f && f.type === "text" && C.type === "text") {
            f.value += C.value;
            return;
          }
          return (u.nodes.push(C), (C.parent = u), (C.prev = f), (f = C), C);
        };
      T({ type: "bos" });
      while (L < _) {
        if (((u = H[H.length - 1]), (D = S()), D === bno || D === vno)) continue;
        if (D === eor) {
          T({ type: "text", value: (t.keepEscaping ? D : "") + S() });
          continue;
        }
        if (D === hSn) {
          T({ type: "text", value: "\\" + D });
          continue;
        }
        if (D === _Sn) {
          d++;
          let C;
          while (L < _ && (C = S())) {
            if (((D += C), C === _Sn)) {
              d++;
              continue;
            }
            if (C === eor) {
              D += S();
              continue;
            }
            if (C === hSn) {
              if ((d--, d === 0)) break;
            }
          }
          T({ type: "text", value: D });
          continue;
        }
        if (D === Dno) {
          ((u = T({ type: "paren", nodes: [] })), H.push(u), T({ type: "text", value: D }));
          continue;
        }
        if (D === yno) {
          if (u.type !== "paren") {
            T({ type: "text", value: D });
            continue;
          }
          ((u = H.pop()), T({ type: "text", value: D }), (u = H[H.length - 1]));
          continue;
        }
        if (D === Sno || D === Tno || D === gno) {
          let C = D,
            O;
          if (t.keepQuotes !== !0) D = "";
          while (L < _ && (O = S())) {
            if (O === eor) {
              D += O + S();
              continue;
            }
            if (O === C) {
              if (t.keepQuotes === !0) D += O;
              break;
            }
            D += O;
          }
          T({ type: "text", value: D });
          continue;
        }
        if (D === Mno) {
          I++;
          let O = {
            type: "brace",
            open: !0,
            close: !1,
            dollar: (f.value && f.value.slice(-1) === "$") || u.dollar === !0,
            depth: I,
            commas: 0,
            ranges: 0,
            nodes: [],
          };
          ((u = T(O)), H.push(u), T({ type: "open", value: D }));
          continue;
        }
        if (D === xno) {
          if (u.type !== "brace") {
            T({ type: "text", value: D });
            continue;
          }
          let C = "close";
          ((u = H.pop()), (u.close = !0), T({ type: C, value: D }), I--, (u = H[H.length - 1]));
          continue;
        }
        if (D === Eno && I > 0) {
          if (u.ranges > 0) {
            u.ranges = 0;
            let C = u.nodes.shift();
            u.nodes = [C, { type: "text", value: $no(u) }];
          }
          (T({ type: "comma", value: D }), u.commas++);
          continue;
        }
        if (D === Ino && I > 0 && u.commas === 0) {
          let C = u.nodes;
          if (I === 0 || C.length === 0) {
            T({ type: "text", value: D });
            continue;
          }
          if (f.type === "dot") {
            if (
              ((u.range = []),
              (f.value += D),
              (f.type = "range"),
              u.nodes.length !== 3 && u.nodes.length !== 5)
            ) {
              ((u.invalid = !0), (u.ranges = 0), (f.type = "text"));
              continue;
            }
            (u.ranges++, (u.args = []));
            continue;
          }
          if (f.type === "range") {
            C.pop();
            let O = C[C.length - 1];
            ((O.value += f.value + D), (f = O), u.ranges--);
            continue;
          }
          T({ type: "dot", value: D });
          continue;
        }
        T({ type: "text", value: D });
      }
      do
        if (((u = H.pop()), u.type !== "root")) {
          u.nodes.forEach((B) => {
            if (!B.nodes) {
              if (B.type === "open") B.isOpen = !0;
              if (B.type === "close") B.isClose = !0;
              if (!B.nodes) B.type = "text";
              B.invalid = !0;
            }
          });
          let C = H[H.length - 1],
            O = C.nodes.indexOf(u);
          C.nodes.splice(O, 1, ...u.nodes);
        }
      while (H.length > 0);
      return (T({ type: "eos" }), a);
    };
  LSn.exports = jno;
});