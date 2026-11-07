
var FSn = Ie(function (iXH, NSn) {
  var CY = WWe(),
    $h = VWe(),
    {
      MAX_LENGTH: aLt,
      POSIX_REGEX_SOURCE: sio,
      REGEX_NON_SPECIAL_CHARS: oio,
      REGEX_SPECIAL_CHARS_BACKREF: aio,
      REPLACEMENTS: kSn,
    } = CY,
    Hio = (e, t) => {
      if (typeof t.expandRange === "function") return t.expandRange(...e, t);
      e.sort();
      let r = `[${e.join("-")}]`;
      try {
        new RegExp(r);
      } catch (s) {
        return e.map((a) => $h.escapeRegex(a)).join("..");
      }
      return r;
    },
    dxe = (e, t) => `Missing ${e}: "${t}" - use "\\\\${t}" to match literal characters`,
    OSn = (e) => {
      let t = [],
        r = 0,
        s = 0,
        a = 0,
        H = "",
        u = !1;
      for (let f of e) {
        if (u === !0) {
          ((H += f), (u = !1));
          continue;
        }
        if (f === "\\") {
          ((H += f), (u = !0));
          continue;
        }
        if (f === '"') {
          ((a = a === 1 ? 0 : 1), (H += f));
          continue;
        }
        if (a === 0) {
          if (f === "[") r++;
          else if (f === "]" && r > 0) r--;
          else if (r === 0) {
            if (f === "(") s++;
            else if (f === ")" && s > 0) s--;
            else if (f === "|" && s === 0) {
              (t.push(H), (H = ""));
              continue;
            }
          }
        }
        H += f;
      }
      return (t.push(H), t);
    },
    cio = (e) => {
      let t = !1;
      for (let r of e) {
        if (t === !0) {
          t = !1;
          continue;
        }
        if (r === "\\") {
          t = !0;
          continue;
        }
        if (/[?*+@!()[\]{}]/.test(r)) return !1;
      }
      return !0;
    },
    USn = (e) => {
      let t = e.trim(),
        r = !0;
      while (r === !0) if (((r = !1), /^@\([^\\()[\]{}|]+\)$/.test(t))) ((t = t.slice(2, -1)), (r = !0));
      if (!cio(t)) return;
      return t.replace(/\\(.)/g, "$1");
    },
    Aio = (e) => {
      let t = e.map(USn).filter(Boolean);
      for (let r = 0; r < t.length; r++)
        for (let s = r + 1; s < t.length; s++) {
          let a = t[r],
            H = t[s],
            u = a[0];
          if (!u || a !== u.repeat(a.length) || H !== u.repeat(H.length)) continue;
          if (a === H || a.startsWith(H) || H.startsWith(a)) return !0;
        }
      return !1;
    },
    oor = (e, t = !0) => {
      if ((e[0] !== "+" && e[0] !== "*") || e[1] !== "(") return;
      let r = 0,
        s = 0,
        a = 0,
        H = !1;
      for (let u = 1; u < e.length; u++) {
        let f = e[u];
        if (H === !0) {
          H = !1;
          continue;
        }
        if (f === "\\") {
          H = !0;
          continue;
        }
        if (f === '"') {
          a = a === 1 ? 0 : 1;
          continue;
        }
        if (a === 1) continue;
        if (f === "[") {
          r++;
          continue;
        }
        if (f === "]" && r > 0) {
          r--;
          continue;
        }
        if (r > 0) continue;
        if (f === "(") {
          s++;
          continue;
        }
        if (f === ")") {
          if ((s--, s === 0)) {
            if (t === !0 && u !== e.length - 1) return;
            return { type: e[0], body: e.slice(2, u), end: u };
          }
        }
      }
    },
    uio = (e) => {
      let t = 0,
        r = [];
      while (t < e.length) {
        let a = oor(e.slice(t), !1);
        if (!a || a.type !== "*") return;
        let H = OSn(a.body).map((f) => f.trim());
        if (H.length !== 1) return;
        let u = USn(H[0]);
        if (!u || u.length !== 1) return;
        (r.push(u), (t += a.end + 1));
      }
      if (r.length < 1) return;
      return `${r.length === 1 ? $h.escapeRegex(r[0]) : `[${r.map((a) => $h.escapeRegex(a)).join("")}]`}*`;
    },
    lio = (e) => {
      let t = 0,
        r = e.trim(),
        s = oor(r);
      while (s) (t++, (r = s.body.trim()), (s = oor(r)));
      return t;
    },
    fio = (e, t) => {
      if (t.maxExtglobRecursion === !1) return { risky: !1 };
      let r =
          typeof t.maxExtglobRecursion === "number"
            ? t.maxExtglobRecursion
            : CY.DEFAULT_MAX_EXTGLOB_RECURSION,
        s = OSn(e).map((a) => a.trim());
      if (s.length > 1) {
        if (s.some((a) => a === "") || s.some((a) => /^[*?]+$/.test(a)) || Aio(s)) return { risky: !0 };
      }
      for (let a of s) {
        let H = uio(a);
        if (H) return { risky: !0, safeOutput: H };
        if (lio(a) > r) return { risky: !0 };
      }
      return { risky: !1 };
    },
    aor = (e, t) => {
      if (typeof e !== "string") throw TypeError("Expected a string");
      e = kSn[e] || e;
      let r = { ...t },
        s = typeof r.maxLength === "number" ? Math.min(aLt, r.maxLength) : aLt,
        a = e.length;
      if (a > s) throw SyntaxError(`Input length: ${a}, exceeds maximum allowed length: ${s}`);
      let H = { type: "bos", value: "", output: r.prepend || "" },
        u = [H],
        f = r.capture ? "" : "?:",
        d = $h.isWindows(t),
        _ = CY.globChars(d),
        L = CY.extglobChars(_),
        {
          DOT_LITERAL: I,
          PLUS_LITERAL: D,
          SLASH_LITERAL: S,
          ONE_CHAR: T,
          DOTS_SLASH: C,
          NO_DOT: O,
          NO_DOT_SLASH: B,
          NO_DOTS_SLASH: V,
          QMARK: q,
          QMARK_NO_DOT: Z,
          STAR: se,
          START_ANCHOR: ae,
        } = _,
        z = (tr) => `(${f}(?:(?!${ae}${tr.dot ? C : I}).)*?)`,
        Ae = r.dot ? "" : O,
        le = r.dot ? q : Z,
        Be = r.bash === !0 ? z(r) : se;
      if (r.capture) Be = `(${Be})`;
      if (typeof r.noext === "boolean") r.noextglob = r.noext;
      let Te = {
        input: e,
        index: -1,
        start: 0,
        dot: r.dot === !0,
        consumed: "",
        output: "",
        prefix: "",
        backtrack: !1,
        negated: !1,
        brackets: 0,
        braces: 0,
        parens: 0,
        quotes: 0,
        globstar: !1,
        tokens: u,
      };
      ((e = $h.removePrefix(e, Te)), (a = e.length));
      let Lt = [],
        Ht = [],
        Se = [],
        _e = H,
        we,
        Pe = () => Te.index === a - 1,
        ye = (Te.peek = (tr = 1) => e[Te.index + tr]),
        ot = (Te.advance = () => e[++Te.index] || ""),
        Ee = () => e.slice(Te.index + 1),
        Ve = (tr = "", Rr = 0) => {
          ((Te.consumed += tr), (Te.index += Rr));
        },
        Fe = (tr) => {
          ((Te.output += tr.output != null ? tr.output : tr.value), Ve(tr.value));
        },
        it = () => {
          let tr = 1;
          while (ye() === "!" && (ye(2) !== "(" || ye(3) === "?")) (ot(), Te.start++, tr++);
          if (tr % 2 === 0) return !1;
          return ((Te.negated = !0), Te.start++, !0);
        },
        At = (tr) => {
          (Te[tr]++, Se.push(tr));
        },
        et = (tr) => {
          (Te[tr]--, Se.pop());
        },
        ut = (tr) => {
          if (_e.type === "globstar") {
            let Rr = Te.braces > 0 && (tr.type === "comma" || tr.type === "brace"),
              Vt = tr.extglob === !0 || (Lt.length && (tr.type === "pipe" || tr.type === "paren"));
            if (tr.type !== "slash" && tr.type !== "paren" && !Rr && !Vt)
              ((Te.output = Te.output.slice(0, -_e.output.length)),
                (_e.type = "star"),
                (_e.value = "*"),
                (_e.output = Be),
                (Te.output += _e.output));
          }
          if (Lt.length && tr.type !== "paren") Lt[Lt.length - 1].inner += tr.value;
          if (tr.value || tr.output) Fe(tr);
          if (_e && _e.type === "text" && tr.type === "text") {
            ((_e.value += tr.value), (_e.output = (_e.output || "") + tr.value));
            return;
          }
          ((tr.prev = _e), u.push(tr), (_e = tr));
        },
        ht = (tr, Rr) => {
          let Vt = { ...L[Rr], conditions: 1, inner: "" };
          ((Vt.prev = _e),
            (Vt.parens = Te.parens),
            (Vt.output = Te.output),
            (Vt.startIndex = Te.index),
            (Vt.tokensIndex = u.length));
          let Br = (r.capture ? "(" : "") + Vt.open;
          (At("parens"),
            ut({ type: tr, value: Rr, output: Te.output ? "" : T }),
            ut({ type: "paren", extglob: !0, value: ot(), output: Br }),
            Lt.push(Vt));
        },
        Et = (tr) => {
          let Rr = e.slice(tr.startIndex, Te.index + 1),
            Vt = e.slice(tr.startIndex + 2, Te.index),
            Br = fio(Vt, r);
          if ((tr.type === "plus" || tr.type === "star") && Br.risky) {
            let wt = Br.safeOutput
                ? (tr.output ? "" : T) + (r.capture ? `(${Br.safeOutput})` : Br.safeOutput)
                : void 0,
              Qr = u[tr.tokensIndex];
            ((Qr.type = "text"), (Qr.value = Rr), (Qr.output = wt || $h.escapeRegex(Rr)));
            for (let Li = tr.tokensIndex + 1; Li < u.length; Li++)
              ((u[Li].value = ""), (u[Li].output = ""), delete u[Li].suffix);
            ((Te.output = tr.output + Qr.output),
              (Te.backtrack = !0),
              ut({ type: "paren", extglob: !0, value: we, output: "" }),
              et("parens"));
            return;
          }
          let Dt = tr.close + (r.capture ? ")" : ""),
            St;
          if (tr.type === "negate") {
            let wt = Be;
            if (tr.inner && tr.inner.length > 1 && tr.inner.includes("/")) wt = z(r);
            if (wt !== Be || Pe() || /^\)+$/.test(Ee())) Dt = tr.close = `)$))${wt}`;
            if (tr.inner.includes("*") && (St = Ee()) && /^\.[^\\/.]+$/.test(St)) {
              let Qr = aor(St, { ...t, fastpaths: !1 }).output;
              Dt = tr.close = `)${Qr})${wt})`;
            }
            if (tr.prev.type === "bos") Te.negatedExtglob = !0;
          }
          (ut({ type: "paren", extglob: !0, value: we, output: Dt }), et("parens"));
        };
      if (r.fastpaths !== !1 && !/(^[*!]|[/()[\]{}"])/.test(e)) {
        let tr = !1,
          Rr = e.replace(aio, (Vt, Br, Dt, St, wt, Qr) => {
            if (St === "\\") return ((tr = !0), Vt);
            if (St === "?") {
              if (Br) return Br + St + (wt ? q.repeat(wt.length) : "");
              if (Qr === 0) return le + (wt ? q.repeat(wt.length) : "");
              return q.repeat(Dt.length);
            }
            if (St === ".") return I.repeat(Dt.length);
            if (St === "*") {
              if (Br) return Br + St + (wt ? Be : "");
              return Be;
            }
            return Br ? Vt : `\\${Vt}`;
          });
        if (tr === !0)
          if (r.unescape === !0) Rr = Rr.replace(/\\/g, "");
          else Rr = Rr.replace(/\\+/g, (Vt) => (Vt.length % 2 === 0 ? "\\\\" : Vt ? "\\" : ""));
        if (Rr === e && r.contains === !0) return ((Te.output = e), Te);
        return ((Te.output = $h.wrapOutput(Rr, Te, t)), Te);
      }
      while (!Pe()) {
        if (((we = ot()), we === "\x00")) continue;
        if (we === "\\") {
          let Vt = ye();
          if (Vt === "/" && r.bash !== !0) continue;
          if (Vt === "." || Vt === ";") continue;
          if (!Vt) {
            ((we += "\\"), ut({ type: "text", value: we }));
            continue;
          }
          let Br = /^\\+/.exec(Ee()),
            Dt = 0;
          if (Br && Br[0].length > 2) {
            if (((Dt = Br[0].length), (Te.index += Dt), Dt % 2 !== 0)) we += "\\";
          }
          if (r.unescape === !0) we = ot();
          else we += ot();
          if (Te.brackets === 0) {
            ut({ type: "text", value: we });
            continue;
          }
        }
        if (Te.brackets > 0 && (we !== "]" || _e.value === "[" || _e.value === "[^")) {
          if (r.posix !== !1 && we === ":") {
            let Vt = _e.value.slice(1);
            if (Vt.includes("[")) {
              if (((_e.posix = !0), Vt.includes(":"))) {
                let Br = _e.value.lastIndexOf("["),
                  Dt = _e.value.slice(0, Br),
                  St = _e.value.slice(Br + 2),
                  wt = sio[St];
                if (wt) {
                  if (((_e.value = Dt + wt), (Te.backtrack = !0), ot(), !H.output && u.indexOf(_e) === 1))
                    H.output = T;
                  continue;
                }
              }
            }
          }
          if ((we === "[" && ye() !== ":") || (we === "-" && ye() === "]")) we = `\\${we}`;
          if (we === "]" && (_e.value === "[" || _e.value === "[^")) we = `\\${we}`;
          if (r.posix === !0 && we === "!" && _e.value === "[") we = "^";
          ((_e.value += we), Fe({ value: we }));
          continue;
        }
        if (Te.quotes === 1 && we !== '"') {
          ((we = $h.escapeRegex(we)), (_e.value += we), Fe({ value: we }));
          continue;
        }
        if (we === '"') {
          if (((Te.quotes = Te.quotes === 1 ? 0 : 1), r.keepQuotes === !0)) ut({ type: "text", value: we });
          continue;
        }
        if (we === "(") {
          (At("parens"), ut({ type: "paren", value: we }));
          continue;
        }
        if (we === ")") {
          if (Te.parens === 0 && r.strictBrackets === !0) throw SyntaxError(dxe("opening", "("));
          let Vt = Lt[Lt.length - 1];
          if (Vt && Te.parens === Vt.parens + 1) {
            Et(Lt.pop());
            continue;
          }
          (ut({ type: "paren", value: we, output: Te.parens ? ")" : "\\)" }), et("parens"));
          continue;
        }
        if (we === "[") {
          if (r.nobracket === !0 || !Ee().includes("]")) {
            if (r.nobracket !== !0 && r.strictBrackets === !0) throw SyntaxError(dxe("closing", "]"));
            we = `\\${we}`;
          } else At("brackets");
          ut({ type: "bracket", value: we });
          continue;
        }
        if (we === "]") {
          if (r.nobracket === !0 || (_e && _e.type === "bracket" && _e.value.length === 1)) {
            ut({ type: "text", value: we, output: `\\${we}` });
            continue;
          }
          if (Te.brackets === 0) {
            if (r.strictBrackets === !0) throw SyntaxError(dxe("opening", "["));
            ut({ type: "text", value: we, output: `\\${we}` });
            continue;
          }
          et("brackets");
          let Vt = _e.value.slice(1);
          if (_e.posix !== !0 && Vt[0] === "^" && !Vt.includes("/")) we = `/${we}`;
          if (((_e.value += we), Fe({ value: we }), r.literalBrackets === !1 || $h.hasRegexChars(Vt)))
            continue;
          let Br = $h.escapeRegex(_e.value);
          if (((Te.output = Te.output.slice(0, -_e.value.length)), r.literalBrackets === !0)) {
            ((Te.output += Br), (_e.value = Br));
            continue;
          }
          ((_e.value = `(${f}${Br}|${_e.value})`), (Te.output += _e.value));
          continue;
        }
        if (we === "{" && r.nobrace !== !0) {
          At("braces");
          let Vt = {
            type: "brace",
            value: we,
            output: "(",
            outputIndex: Te.output.length,
            tokensIndex: Te.tokens.length,
          };
          (Ht.push(Vt), ut(Vt));
          continue;
        }
        if (we === "}") {
          let Vt = Ht[Ht.length - 1];
          if (r.nobrace === !0 || !Vt) {
            ut({ type: "text", value: we, output: we });
            continue;
          }
          let Br = ")";
          if (Vt.dots === !0) {
            let Dt = u.slice(),
              St = [];
            for (let wt = Dt.length - 1; wt >= 0; wt--) {
              if ((u.pop(), Dt[wt].type === "brace")) break;
              if (Dt[wt].type !== "dots") St.unshift(Dt[wt].value);
            }
            ((Br = Hio(St, r)), (Te.backtrack = !0));
          }
          if (Vt.comma !== !0 && Vt.dots !== !0) {
            let Dt = Te.output.slice(0, Vt.outputIndex),
              St = Te.tokens.slice(Vt.tokensIndex);
            ((Vt.value = Vt.output = "\\{"), (we = Br = "\\}"), (Te.output = Dt));
            for (let wt of St) Te.output += wt.output || wt.value;
          }
          (ut({ type: "brace", value: we, output: Br }), et("braces"), Ht.pop());
          continue;
        }
        if (we === "|") {
          if (Lt.length > 0) Lt[Lt.length - 1].conditions++;
          ut({ type: "text", value: we });
          continue;
        }
        if (we === ",") {
          let Vt = we,
            Br = Ht[Ht.length - 1];
          if (Br && Se[Se.length - 1] === "braces") ((Br.comma = !0), (Vt = "|"));
          ut({ type: "comma", value: we, output: Vt });
          continue;
        }
        if (we === "/") {
          if (_e.type === "dot" && Te.index === Te.start + 1) {
            ((Te.start = Te.index + 1), (Te.consumed = ""), (Te.output = ""), u.pop(), (_e = H));
            continue;
          }
          ut({ type: "slash", value: we, output: S });
          continue;
        }
        if (we === ".") {
          if (Te.braces > 0 && _e.type === "dot") {
            if (_e.value === ".") _e.output = I;
            let Vt = Ht[Ht.length - 1];
            ((_e.type = "dots"), (_e.output += we), (_e.value += we), (Vt.dots = !0));
            continue;
          }
          if (Te.braces + Te.parens === 0 && _e.type !== "bos" && _e.type !== "slash") {
            ut({ type: "text", value: we, output: I });
            continue;
          }
          ut({ type: "dot", value: we, output: I });
          continue;
        }
        if (we === "?") {
          if (!(_e && _e.value === "(") && r.noextglob !== !0 && ye() === "(" && ye(2) !== "?") {
            ht("qmark", we);
            continue;
          }
          if (_e && _e.type === "paren") {
            let Br = ye(),
              Dt = we;
            if (Br === "<" && !$h.supportsLookbehinds())
              throw Error("Node.js v10 or higher is required for regex lookbehinds");
            if ((_e.value === "(" && !/[!=<:]/.test(Br)) || (Br === "<" && !/<([!=]|\w+>)/.test(Ee())))
              Dt = `\\${we}`;
            ut({ type: "text", value: we, output: Dt });
            continue;
          }
          if (r.dot !== !0 && (_e.type === "slash" || _e.type === "bos")) {
            ut({ type: "qmark", value: we, output: Z });
            continue;
          }
          ut({ type: "qmark", value: we, output: q });
          continue;
        }
        if (we === "!") {
          if (r.noextglob !== !0 && ye() === "(") {
            if (ye(2) !== "?" || !/[!=<:]/.test(ye(3))) {
              ht("negate", we);
              continue;
            }
          }
          if (r.nonegate !== !0 && Te.index === 0) {
            it();
            continue;
          }
        }
        if (we === "+") {
          if (r.noextglob !== !0 && ye() === "(" && ye(2) !== "?") {
            ht("plus", we);
            continue;
          }
          if ((_e && _e.value === "(") || r.regex === !1) {
            ut({ type: "plus", value: we, output: D });
            continue;
          }
          if (
            (_e && (_e.type === "bracket" || _e.type === "paren" || _e.type === "brace")) ||
            Te.parens > 0
          ) {
            ut({ type: "plus", value: we });
            continue;
          }
          ut({ type: "plus", value: D });
          continue;
        }
        if (we === "@") {
          if (r.noextglob !== !0 && ye() === "(" && ye(2) !== "?") {
            ut({ type: "at", extglob: !0, value: we, output: "" });
            continue;
          }
          ut({ type: "text", value: we });
          continue;
        }
        if (we !== "*") {
          if (we === "$" || we === "^") we = `\\${we}`;
          let Vt = oio.exec(Ee());
          if (Vt) ((we += Vt[0]), (Te.index += Vt[0].length));
          ut({ type: "text", value: we });
          continue;
        }
        if (_e && (_e.type === "globstar" || _e.star === !0)) {
          ((_e.type = "star"),
            (_e.star = !0),
            (_e.value += we),
            (_e.output = Be),
            (Te.backtrack = !0),
            (Te.globstar = !0),
            Ve(we));
          continue;
        }
        let tr = Ee();
        if (r.noextglob !== !0 && /^\([^?]/.test(tr)) {
          ht("star", we);
          continue;
        }
        if (_e.type === "star") {
          if (r.noglobstar === !0) {
            Ve(we);
            continue;
          }
          let Vt = _e.prev,
            Br = Vt.prev,
            Dt = Vt.type === "slash" || Vt.type === "bos",
            St = Br && (Br.type === "star" || Br.type === "globstar");
          if (r.bash === !0 && (!Dt || (tr[0] && tr[0] !== "/"))) {
            ut({ type: "star", value: we, output: "" });
            continue;
          }
          let wt = Te.braces > 0 && (Vt.type === "comma" || Vt.type === "brace"),
            Qr = Lt.length && (Vt.type === "pipe" || Vt.type === "paren");
          if (!Dt && Vt.type !== "paren" && !wt && !Qr) {
            ut({ type: "star", value: we, output: "" });
            continue;
          }
          while (tr.slice(0, 3) === "/**") {
            let Li = e[Te.index + 4];
            if (Li && Li !== "/") break;
            ((tr = tr.slice(3)), Ve("/**", 3));
          }
          if (Vt.type === "bos" && Pe()) {
            ((_e.type = "globstar"),
              (_e.value += we),
              (_e.output = z(r)),
              (Te.output = _e.output),
              (Te.globstar = !0),
              Ve(we));
            continue;
          }
          if (Vt.type === "slash" && Vt.prev.type !== "bos" && !St && Pe()) {
            ((Te.output = Te.output.slice(0, -(Vt.output + _e.output).length)),
              (Vt.output = `(?:${Vt.output}`),
              (_e.type = "globstar"),
              (_e.output = z(r) + (r.strictSlashes ? ")" : "|$)")),
              (_e.value += we),
              (Te.globstar = !0),
              (Te.output += Vt.output + _e.output),
              Ve(we));
            continue;
          }
          if (Vt.type === "slash" && Vt.prev.type !== "bos" && tr[0] === "/") {
            let Li = tr[1] !== void 0 ? "|$" : "";
            ((Te.output = Te.output.slice(0, -(Vt.output + _e.output).length)),
              (Vt.output = `(?:${Vt.output}`),
              (_e.type = "globstar"),
              (_e.output = `${z(r)}${S}|${S}${Li})`),
              (_e.value += we),
              (Te.output += Vt.output + _e.output),
              (Te.globstar = !0),
              Ve(we + ot()),
              ut({ type: "slash", value: "/", output: "" }));
            continue;
          }
          if (Vt.type === "bos" && tr[0] === "/") {
            ((_e.type = "globstar"),
              (_e.value += we),
              (_e.output = `(?:^|${S}|${z(r)}${S})`),
              (Te.output = _e.output),
              (Te.globstar = !0),
              Ve(we + ot()),
              ut({ type: "slash", value: "/", output: "" }));
            continue;
          }
          ((Te.output = Te.output.slice(0, -_e.output.length)),
            (_e.type = "globstar"),
            (_e.output = z(r)),
            (_e.value += we),
            (Te.output += _e.output),
            (Te.globstar = !0),
            Ve(we));
          continue;
        }
        let Rr = { type: "star", value: we, output: Be };
        if (r.bash === !0) {
          if (((Rr.output = ".*?"), _e.type === "bos" || _e.type === "slash")) Rr.output = Ae + Rr.output;
          ut(Rr);
          continue;
        }
        if (_e && (_e.type === "bracket" || _e.type === "paren") && r.regex === !0) {
          ((Rr.output = we), ut(Rr));
          continue;
        }
        if (Te.index === Te.start || _e.type === "slash" || _e.type === "dot") {
          if (_e.type === "dot") ((Te.output += B), (_e.output += B));
          else if (r.dot === !0) ((Te.output += V), (_e.output += V));
          else ((Te.output += Ae), (_e.output += Ae));
          if (ye() !== "*") ((Te.output += T), (_e.output += T));
        }
        ut(Rr);
      }
      while (Te.brackets > 0) {
        if (r.strictBrackets === !0) throw SyntaxError(dxe("closing", "]"));
        ((Te.output = $h.escapeLast(Te.output, "[")), et("brackets"));
      }
      while (Te.parens > 0) {
        if (r.strictBrackets === !0) throw SyntaxError(dxe("closing", ")"));
        ((Te.output = $h.escapeLast(Te.output, "(")), et("parens"));
      }
      while (Te.braces > 0) {
        if (r.strictBrackets === !0) throw SyntaxError(dxe("closing", "}"));
        ((Te.output = $h.escapeLast(Te.output, "{")), et("braces"));
      }
      if (r.strictSlashes !== !0 && (_e.type === "star" || _e.type === "bracket"))
        ut({ type: "maybe_slash", value: "", output: `${S}?` });
      if (Te.backtrack === !0) {
        Te.output = "";
        for (let tr of Te.tokens)
          if (((Te.output += tr.output != null ? tr.output : tr.value), tr.suffix)) Te.output += tr.suffix;
      }
      return Te;
    };
  aor.fastpaths = (e, t) => {
    let r = { ...t },
      s = typeof r.maxLength === "number" ? Math.min(aLt, r.maxLength) : aLt,
      a = e.length;
    if (a > s) throw SyntaxError(`Input length: ${a}, exceeds maximum allowed length: ${s}`);
    e = kSn[e] || e;
    let H = $h.isWindows(t),
      {
        DOT_LITERAL: u,
        SLASH_LITERAL: f,
        ONE_CHAR: d,
        DOTS_SLASH: _,
        NO_DOT: L,
        NO_DOTS: I,
        NO_DOTS_SLASH: D,
        STAR: S,
        START_ANCHOR: T,
      } = CY.globChars(H),
      C = r.dot ? I : L,
      O = r.dot ? D : L,
      B = r.capture ? "" : "?:",
      V = { negated: !1, prefix: "" },
      q = r.bash === !0 ? ".*?" : S;
    if (r.capture) q = `(${q})`;
    let Z = (Ae) => {
        if (Ae.noglobstar === !0) return q;
        return `(${B}(?:(?!${T}${Ae.dot ? _ : u}).)*?)`;
      },
      se = (Ae) => {
        switch (Ae) {
          case "*":
            return `${C}${d}${q}`;
          case ".*":
            return `${u}${d}${q}`;
          case "*.*":
            return `${C}${q}${u}${d}${q}`;
          case "*/*":
            return `${C}${q}${f}${d}${O}${q}`;
          case "**":
            return C + Z(r);
          case "**/*":
            return `(?:${C}${Z(r)}${f})?${O}${d}${q}`;
          case "**/*.*":
            return `(?:${C}${Z(r)}${f})?${O}${q}${u}${d}${q}`;
          case "**/.*":
            return `(?:${C}${Z(r)}${f})?${u}${d}${q}`;
          default: {
            let le = /^(.*?)\.(\w+)$/.exec(Ae);
            if (!le) return;
            let Be = se(le[1]);
            if (!Be) return;
            return Be + u + le[2];
          }
        }
      },
      ae = $h.removePrefix(e, V),
      z = se(ae);
    if (z && r.strictSlashes !== !0) z += `${f}?`;
    return z;
  };
  NSn.exports = aor;
});