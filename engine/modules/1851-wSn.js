
var wSn = Ie(function (nXH, CSn) {
  var oLt = VWe(),
    {
      CHAR_ASTERISK: tor,
      CHAR_AT: Yno,
      CHAR_BACKWARD_SLASH: qWe,
      CHAR_COMMA: Zno,
      CHAR_DOT: ror,
      CHAR_EXCLAMATION_MARK: nor,
      CHAR_FORWARD_SLASH: PSn,
      CHAR_LEFT_CURLY_BRACE: ior,
      CHAR_LEFT_PARENTHESES: sor,
      CHAR_LEFT_SQUARE_BRACKET: eio,
      CHAR_PLUS: tio,
      CHAR_QUESTION_MARK: TSn,
      CHAR_RIGHT_CURLY_BRACE: rio,
      CHAR_RIGHT_PARENTHESES: vSn,
      CHAR_RIGHT_SQUARE_BRACKET: nio,
    } = WWe(),
    bSn = (e) => e === PSn || e === qWe,
    jSn = (e) => {
      if (e.isPrefix !== !0) e.depth = e.isGlobstar ? 1 / 0 : 1;
    },
    iio = (e, t) => {
      let r = t || {},
        s = e.length - 1,
        a = r.parts === !0 || r.scanToEnd === !0,
        H = [],
        u = [],
        f = [],
        d = e,
        _ = -1,
        L = 0,
        I = 0,
        D = !1,
        S = !1,
        T = !1,
        C = !1,
        O = !1,
        B = !1,
        V = !1,
        q = !1,
        Z = !1,
        se = !1,
        ae = 0,
        z,
        Ae,
        le = { value: "", depth: 0, isGlob: !1 },
        Be = () => _ >= s,
        Te = () => d.charCodeAt(_ + 1),
        Lt = () => ((z = Ae), d.charCodeAt(++_));
      while (_ < s) {
        Ae = Lt();
        let Pe;
        if (Ae === qWe) {
          if (((V = le.backslashes = !0), (Ae = Lt()), Ae === ior)) B = !0;
          continue;
        }
        if (B === !0 || Ae === ior) {
          ae++;
          while (Be() !== !0 && (Ae = Lt())) {
            if (Ae === qWe) {
              ((V = le.backslashes = !0), Lt());
              continue;
            }
            if (Ae === ior) {
              ae++;
              continue;
            }
            if (B !== !0 && Ae === ror && (Ae = Lt()) === ror) {
              if (((D = le.isBrace = !0), (T = le.isGlob = !0), (se = !0), a === !0)) continue;
              break;
            }
            if (B !== !0 && Ae === Zno) {
              if (((D = le.isBrace = !0), (T = le.isGlob = !0), (se = !0), a === !0)) continue;
              break;
            }
            if (Ae === rio) {
              if ((ae--, ae === 0)) {
                ((B = !1), (D = le.isBrace = !0), (se = !0));
                break;
              }
            }
          }
          if (a === !0) continue;
          break;
        }
        if (Ae === PSn) {
          if ((H.push(_), u.push(le), (le = { value: "", depth: 0, isGlob: !1 }), se === !0)) continue;
          if (z === ror && _ === L + 1) {
            L += 2;
            continue;
          }
          I = _ + 1;
          continue;
        }
        if (r.noext !== !0) {
          if ((Ae === tio || Ae === Yno || Ae === tor || Ae === TSn || Ae === nor) === !0 && Te() === sor) {
            if (((T = le.isGlob = !0), (C = le.isExtglob = !0), (se = !0), Ae === nor && _ === L)) Z = !0;
            if (a === !0) {
              while (Be() !== !0 && (Ae = Lt())) {
                if (Ae === qWe) {
                  ((V = le.backslashes = !0), (Ae = Lt()));
                  continue;
                }
                if (Ae === vSn) {
                  ((T = le.isGlob = !0), (se = !0));
                  break;
                }
              }
              continue;
            }
            break;
          }
        }
        if (Ae === tor) {
          if (z === tor) O = le.isGlobstar = !0;
          if (((T = le.isGlob = !0), (se = !0), a === !0)) continue;
          break;
        }
        if (Ae === TSn) {
          if (((T = le.isGlob = !0), (se = !0), a === !0)) continue;
          break;
        }
        if (Ae === eio) {
          while (Be() !== !0 && (Pe = Lt())) {
            if (Pe === qWe) {
              ((V = le.backslashes = !0), Lt());
              continue;
            }
            if (Pe === nio) {
              ((S = le.isBracket = !0), (T = le.isGlob = !0), (se = !0));
              break;
            }
          }
          if (a === !0) continue;
          break;
        }
        if (r.nonegate !== !0 && Ae === nor && _ === L) {
          ((q = le.negated = !0), L++);
          continue;
        }
        if (r.noparen !== !0 && Ae === sor) {
          if (((T = le.isGlob = !0), a === !0)) {
            while (Be() !== !0 && (Ae = Lt())) {
              if (Ae === sor) {
                ((V = le.backslashes = !0), (Ae = Lt()));
                continue;
              }
              if (Ae === vSn) {
                se = !0;
                break;
              }
            }
            continue;
          }
          break;
        }
        if (T === !0) {
          if (((se = !0), a === !0)) continue;
          break;
        }
      }
      if (r.noext === !0) ((C = !1), (T = !1));
      let Ht = d,
        Se = "",
        _e = "";
      if (L > 0) ((Se = d.slice(0, L)), (d = d.slice(L)), (I -= L));
      if (Ht && T === !0 && I > 0) ((Ht = d.slice(0, I)), (_e = d.slice(I)));
      else if (T === !0) ((Ht = ""), (_e = d));
      else Ht = d;
      if (Ht && Ht !== "" && Ht !== "/" && Ht !== d) {
        if (bSn(Ht.charCodeAt(Ht.length - 1))) Ht = Ht.slice(0, -1);
      }
      if (r.unescape === !0) {
        if (_e) _e = oLt.removeBackslashes(_e);
        if (Ht && V === !0) Ht = oLt.removeBackslashes(Ht);
      }
      let we = {
        prefix: Se,
        input: e,
        start: L,
        base: Ht,
        glob: _e,
        isBrace: D,
        isBracket: S,
        isGlob: T,
        isExtglob: C,
        isGlobstar: O,
        negated: q,
        negatedExtglob: Z,
      };
      if (r.tokens === !0) {
        if (((we.maxDepth = 0), !bSn(Ae))) u.push(le);
        we.tokens = u;
      }
      if (r.parts === !0 || r.tokens === !0) {
        let Pe;
        for (let ye = 0; ye < H.length; ye++) {
          let ot = Pe ? Pe + 1 : L,
            Ee = H[ye],
            Ve = e.slice(ot, Ee);
          if (r.tokens) {
            if (ye === 0 && L !== 0) ((u[ye].isPrefix = !0), (u[ye].value = Se));
            else u[ye].value = Ve;
            (jSn(u[ye]), (we.maxDepth += u[ye].depth));
          }
          if (ye !== 0 || Ve !== "") f.push(Ve);
          Pe = Ee;
        }
        if (Pe && Pe + 1 < e.length) {
          let ye = e.slice(Pe + 1);
          if ((f.push(ye), r.tokens))
            ((u[u.length - 1].value = ye), jSn(u[u.length - 1]), (we.maxDepth += u[u.length - 1].depth));
        }
        ((we.slashes = H), (we.parts = f));
      }
      return we;
    };
  CSn.exports = iio;
});