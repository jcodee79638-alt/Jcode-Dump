
var T0t = Ie(function (Wme) {
  var tb = (e, t) => () => {
      try {
        return (t || e((t = { exports: {} }).exports, t), t.exports);
      } catch (r) {
        throw ((t = 0), r);
      }
    },
    Awo = tb((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.range = e.balanced = void 0));
      var t = (a, H, u) => {
        let f = a instanceof RegExp ? r(a, u) : a,
          d = H instanceof RegExp ? r(H, u) : H,
          _ = f !== null && d != null && (0, e.range)(f, d, u);
        return (
          _ && {
            start: _[0],
            end: _[1],
            pre: u.slice(0, _[0]),
            body: u.slice(_[0] + f.length, _[1]),
            post: u.slice(_[1] + d.length),
          }
        );
      };
      e.balanced = t;
      var r = (a, H) => {
          let u = H.match(a);
          return u ? u[0] : null;
        },
        s = (a, H, u) => {
          let f,
            d,
            _,
            L,
            I,
            D = u.indexOf(a),
            S = u.indexOf(H, D + 1),
            T = D;
          if (D >= 0 && S > 0) {
            if (a === H) return [D, S];
            for (f = [], _ = u.length; T >= 0 && !I;) {
              if (T === D) (f.push(T), (D = u.indexOf(a, T + 1)));
              else if (f.length === 1) {
                let C = f.pop();
                C !== void 0 && (I = [C, S]);
              } else ((d = f.pop()), d !== void 0 && d < _ && ((_ = d), (L = S)), (S = u.indexOf(H, T + 1)));
              T = D < S && D >= 0 ? D : S;
            }
            f.length && L !== void 0 && (I = [_, L]);
          }
          return I;
        };
      e.range = s;
    }),
    uwo = tb((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.EXPANSION_MAX_REWRITES =
          e.EXPANSION_MAX_DEPTH =
          e.EXPANSION_MAX_LENGTH =
          e.EXPANSION_MAX =
            void 0),
        (e.expand = ae));
      var t = Awo(),
        r = "\x00SLASH" + Math.random() + "\x00",
        s = "\x00OPEN" + Math.random() + "\x00",
        a = "\x00CLOSE" + Math.random() + "\x00",
        H = "\x00COMMA" + Math.random() + "\x00",
        u = "\x00PERIOD" + Math.random() + "\x00",
        f = new RegExp(r, "g"),
        d = new RegExp(s, "g"),
        _ = new RegExp(a, "g"),
        L = new RegExp(H, "g"),
        I = new RegExp(u, "g"),
        D = /\\\\/g,
        S = /\\{/g,
        T = /\\}/g,
        C = /\\,/g,
        O = /\\\./g;
      ((e.EXPANSION_MAX = 1e5),
        (e.EXPANSION_MAX_LENGTH = 4000000),
        (e.EXPANSION_MAX_DEPTH = 1000),
        (e.EXPANSION_MAX_REWRITES = 1000));
      function B(Se) {
        return isNaN(Se) ? Se.charCodeAt(0) : parseInt(Se, 10);
      }
      function V(Se) {
        return Se.replace(D, r).replace(S, s).replace(T, a).replace(C, H).replace(O, u);
      }
      function q(Se) {
        return Se.replace(f, "\\").replace(d, "{").replace(_, "}").replace(L, ",").replace(I, ".");
      }
      function Z(Se, _e) {
        for (let we = 0; we < _e.length; we++) Se.push(_e[we]);
      }
      function se(Se) {
        let _e = [],
          we = "";
        for (;;) {
          let Pe = (0, t.balanced)("{", "}", Se);
          if (!Pe) {
            let Fe = Se.split(",");
            return ((Fe[0] = we + Fe[0]), Z(_e, Fe), _e);
          }
          let { pre: ye, body: ot, post: Ee } = Pe,
            Ve = ye.split(",");
          if (((Ve[0] = we + Ve[0]), (Ve[Ve.length - 1] += "{" + ot + "}"), !Ee.length))
            return (Z(_e, Ve), _e);
          ((we = Ve.pop()), Z(_e, Ve), (Se = Ee));
        }
      }
      function ae(Se, _e = {}) {
        if (!Se) return [];
        let {
          max: we = e.EXPANSION_MAX,
          maxLength: Pe = e.EXPANSION_MAX_LENGTH,
          maxDepth: ye = e.EXPANSION_MAX_DEPTH,
          maxRewrites: ot = e.EXPANSION_MAX_REWRITES,
        } = _e;
        return (
          Se.slice(0, 2) === "{}" && (Se = "\\{\\}" + Se.slice(2)),
          Ht(V(Se), we, Pe, ye, 0, ot, !0).map(q)
        );
      }
      function z(Se) {
        return "{" + Se + "}";
      }
      function Ae(Se) {
        return /^-?0\d/.test(Se);
      }
      function le(Se, _e) {
        return Se <= _e;
      }
      function Be(Se, _e) {
        return Se >= _e;
      }
      function Te(Se, _e, we, Pe, ye, ot) {
        let Ee = [],
          Ve = 0;
        for (let Fe = 0; Fe < Se.length; Fe++)
          for (let it = 0; it < we.length; it++) {
            if (Ee.length >= Pe) return Ee;
            let At = Se[Fe] + _e + we[it];
            if (!(ot && !At)) {
              if (Ve + At.length > ye) return Ee;
              (Ee.push(At), (Ve += At.length));
            }
          }
        return Ee;
      }
      function Lt(Se, _e, we, Pe) {
        let ye = Se.split(/\.\./),
          ot = [];
        if (ye[0] === void 0 || ye[1] === void 0) return ot;
        let Ee = B(ye[0]),
          Ve = B(ye[1]),
          Fe = Math.max(ye[0].length, ye[1].length),
          it = ye.length === 3 && ye[2] !== void 0 ? Math.max(Math.abs(B(ye[2])), 1) : 1,
          At = le;
        Ve < Ee && ((it *= -1), (At = Be));
        let et = ye.some(Ae),
          ut = 0;
        for (let ht = Ee; At(ht, Ve) && ot.length < we; ht += it) {
          let Et;
          if (_e) ((Et = String.fromCharCode(ht)), Et === "\\" && (Et = ""));
          else if (((Et = String(ht)), et)) {
            let tr = Fe - Et.length;
            if (tr > 0) {
              let Rr = Array(tr + 1).join("0");
              ht < 0 ? (Et = "-" + Rr + Et.slice(1)) : (Et = Rr + Et);
            }
          }
          if (ut + Et.length > Pe) break;
          (ot.push(Et), (ut += Et.length));
        }
        return ot;
      }
      function Ht(Se, _e, we, Pe, ye, ot, Ee) {
        if (ye > Pe) return [Se];
        let Ve = [""],
          Fe = 0,
          it = !1,
          At = !0;
        for (;;) {
          let et = (0, t.balanced)("{", "}", Se);
          if (!et) return Te(Ve, Se, [""], _e, we, it);
          let ut = et.pre;
          if (/\$$/.test(ut)) {
            if (
              ((Ve = Te(Ve, ut + "{" + et.body + "}", [""], _e, we, it && !et.post.length)),
              (At = !1),
              !et.post.length)
            )
              break;
            Se = et.post;
            continue;
          }
          let ht = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(et.body),
            Et = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(et.body),
            tr = ht || Et,
            Rr = et.body.indexOf(",") >= 0;
          if (!tr && !Rr) {
            if (Fe < ot && et.post.match(/,(?!,).*\}/)) {
              (Fe++, (Se = et.pre + "{" + et.body + a + et.post), (Ee = !0));
              continue;
            }
            return Te(Ve, ut + "{" + et.body + "}" + et.post, [""], _e, we, it);
          }
          At && ((it = Ee && !tr), (At = !1));
          let Vt;
          if (tr) Vt = Lt(et.body, Et, _e, we);
          else {
            let Br = se(et.body);
            if (
              Br.length === 1 &&
              Br[0] !== void 0 &&
              ((Br = Ht(Br[0], _e, we, Pe, ye + 1, ot, !1).map(z)), Br.length === 1)
            ) {
              if (((Ve = Te(Ve, ut + Br[0], [""], _e, we, it && !et.post.length)), !et.post.length)) break;
              Se = et.post;
              continue;
            }
            let Dt = it && !et.post.length && !ut;
            for (let wt = 0; Dt && wt < Ve.length; wt++) Ve[wt] && (Dt = !1);
            Vt = [];
            let St = 0;
            e: for (let wt = 0; wt < Br.length; wt++) {
              let Qr = Ht(Br[wt], _e, we, Pe, ye + 1, ot, !1);
              for (let Li = 0; Li < Qr.length; Li++) {
                let sr = Qr[Li];
                if (!(Dt && !sr)) {
                  if (Vt.length >= _e || St + sr.length > we) break e;
                  (Vt.push(sr), (St += sr.length));
                }
              }
            }
          }
          if (((Ve = Te(Ve, ut, Vt, _e, we, it && !et.post.length)), !et.post.length)) break;
          Se = et.post;
        }
        return Ve;
      }
    }),
    lwo = tb((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.parseClass = void 0));
      var t = {
          "[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}"],
          "[:alpha:]": ["\\p{L}\\p{Nl}"],
          "[:ascii:]": ["\\x00-\\x7f"],
          "[:blank:]": ["\\p{Zs}\\t"],
          "[:cntrl:]": ["\\p{Cc}"],
          "[:digit:]": ["\\p{Nd}"],
          "[:graph:]": ["\\p{Z}\\p{C}", !0],
          "[:lower:]": ["\\p{Ll}"],
          "[:print:]": ["\\p{C}", !0],
          "[:punct:]": ["\\p{P}\\p{S}"],
          "[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f"],
          "[:upper:]": ["\\p{Lu}"],
          "[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}"],
          "[:xdigit:]": ["A-Fa-f0-9"],
        },
        r = (H) => H.replace(/[[\]\\-]/g, "\\$&"),
        s = /$./,
        a = (H, u, f = !1, d) => {
          let _ = (ae) => {
              let z = d ? ae.normalize(d) : ae;
              return [...z].length === 1 ? z : ae;
            },
            L = u;
          if (H.charAt(L) !== "[") throw Error("not in a brace expression");
          let I = [],
            D = [],
            S = L + 1,
            T = !1,
            C = !1,
            O = !1,
            B = L,
            V = "";
          e: for (; S < H.length;) {
            let ae = String.fromCodePoint(H.codePointAt(S));
            if ((ae === "!" || ae === "^") && S === L + 1) {
              ((O = !0), S++);
              continue;
            }
            if (ae === "]" && T && !C) {
              B = S + 1;
              break;
            }
            if (((T = !0), ae === "\\" && !C)) {
              ((C = !0), S++);
              continue;
            }
            if (ae === "[" && !C) {
              for (let [Ae, [le, Be]] of Object.entries(t))
                if (H.startsWith(Ae, S)) {
                  if (V) return [s, H.length - L];
                  ((S += Ae.length), Be ? D.push(le) : I.push(le));
                  continue e;
                }
            }
            C = !1;
            let z = _(ae);
            if (V) {
              (z.codePointAt(0) > V.codePointAt(0) ? I.push(r(V) + "-" + r(z)) : z === V && I.push(r(z)),
                (V = ""),
                (S += ae.length));
              continue;
            }
            if (H.startsWith("-]", S + ae.length)) {
              (I.push(r(z + "-")), (S += ae.length + 1));
              continue;
            }
            if (H.startsWith("-", S + ae.length)) {
              ((V = z), (S += ae.length + 1));
              continue;
            }
            (I.push(r(z)), (S += ae.length));
          }
          if (B < S) return [s, 0];
          if (!I.length && !D.length) return [s, H.length - L];
          let q = "[" + (O ? "^" : "") + I.join("") + "]",
            Z = "[" + (O ? "" : "^") + D.join("") + "]",
            se = "^" + (I.length && D.length ? "(" + q + "|" + Z + ")" : I.length ? q : Z);
          return [new RegExp(se, f ? "iu" : "u"), B - L];
        };
      e.parseClass = a;
    }),
    fwo = tb((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.Matcher = void 0));
      var t = lwo(),
        r = { t: "match", id: 0 },
        s = "!?+*@",
        a = (_e) => ({ t: "lit", ch: _e }),
        H = (_e) => _e.replace(/[\\^$.*+?()[\]{}|/]/g, "\\$&"),
        u = (_e) => new RegExp(`^${H(_e)}$`, "iu"),
        f = (_e, we) => {
          if (we === _e.ch) return !0;
          if (!_e.re) return !1;
          let Pe = we.charCodeAt(0);
          if (Pe >= 128) return _e.re.test(we);
          let ye = (_e.ascii ??= new Uint8Array(128));
          return ((ye[Pe] ||= _e.re.test(we) ? 1 : 2), ye[Pe] === 1);
        },
        d = (_e, we, Pe, ye) => {
          let ot = [];
          for (let Ee = 0; Ee < _e.length;) {
            let Ve = String.fromCodePoint(_e.codePointAt(Ee));
            if (Ve === "\\") {
              let Fe = _e.codePointAt(Ee + 1),
                it = Fe === void 0 ? Ve : String.fromCodePoint(Fe);
              (ot.push(a(it)), (Ee += 1 + it.length));
              continue;
            }
            if (Ve === "[") {
              let [Fe, it] = (0, t.parseClass)(_e, Ee, we, ye);
              if (it) {
                (ot.push({ t: "class", re: Fe }), (Ee += it));
                continue;
              }
            }
            if (!Pe && s.includes(Ve) && _e[Ee + 1] === "(") {
              (ot.push({ t: "open", type: Ve }), (Ee += 2));
              continue;
            }
            (ot.push(
              !Pe && Ve === "|"
                ? { t: "bar" }
                : !Pe && Ve === ")"
                  ? { t: "close" }
                  : Ve === "*"
                    ? { t: "star" }
                    : Ve === "?"
                      ? { t: "any" }
                      : a(Ve),
            ),
              (Ee += Ve.length));
          }
          return ot;
        },
        _ = (_e) => {
          let we = new Map(),
            Pe = [];
          return (
            _e.forEach((ye, ot) => {
              ye.t === "open" ? Pe.push(ot) : ye.t === "close" && Pe.length && we.set(Pe.pop(), ot);
            }),
            we
          );
        },
        L = (_e, we, Pe, ye, ot) => {
          let Ee = [],
            Ve = [Ee];
          for (let Fe = Pe; Fe < ye; Fe++) {
            let it = _e[Fe],
              At = we.get(Fe);
            if (it.t === "open" && At !== void 0) {
              let et = L(_e, we, Fe + 1, At, !1);
              (Ee.push({ t: "ext", type: it.type, alts: et }), (Fe = At));
            } else
              it.t === "bar" && !ot
                ? Ve.push((Ee = []))
                : it.t === "open"
                  ? Ee.push(a(it.type), a("("))
                  : it.t === "bar"
                    ? Ee.push(a("|"))
                    : it.t === "close"
                      ? Ee.push(a(")"))
                      : Ee.push(it);
          }
          return Ve;
        },
        I = (_e, we) => {
          let Pe = [],
            ye = "",
            ot = () => {
              for (let Ee of ye.normalize(we)) Pe.push(a(Ee));
              ye = "";
            };
          for (let Ee of _e) {
            if (Ee.t === "lit") {
              ye += Ee.ch;
              continue;
            }
            (ot(), Pe.push(Ee.t === "ext" ? { ...Ee, alts: Ee.alts.map((Ve) => I(Ve, we)) } : Ee));
          }
          return (ot(), Pe);
        },
        D = (_e, we) => {
          let Pe = 1,
            ye = (Ve) => ({ t: "split", id: Pe++, out: Ve }),
            ot = (Ve, Fe) => Ve.reduceRight((it, At) => Ee(At, it), Fe),
            Ee = (Ve, Fe) => {
              switch (Ve.t) {
                case "lit":
                  let ut = we ? u(Ve.ch) : void 0;
                  return { t: "lit", id: Pe++, ch: Ve.ch, re: ut, next: Fe };
                case "any":
                case "star":
                  return { t: Ve.t, id: Pe++, next: Fe };
                case "class":
                  return { t: "class", id: Pe++, re: Ve.re, next: Fe };
              }
              let it = (ut) => Ve.alts.map((ht) => ot(ht, ut));
              switch (Ve.type) {
                case "@":
                  return ye(it(Fe));
                case "?":
                  return ye([Fe, ...it(Fe)]);
                case "!":
                  return { t: "neg", id: Pe++, sub: ye(it(r)), next: Fe };
              }
              let At = ye([]),
                et = ye(it(At));
              return (At.out.push(Fe, et), Ve.type === "*" ? At : et);
            };
          return [ot(_e, r), Pe];
        },
        S = (_e) => {
          let we = [],
            Pe = new Set(),
            ye = (Ee) => (Ee.t === "match" ? "match" : String(Ee.id)),
            ot = (Ee, Ve) => {
              if (Ee.t === "match" || Pe.has(Ee)) return;
              Pe.add(Ee);
              let Fe = (it) => we.push(`${Ve}${Ee.id}: ${it}`);
              switch (Ee.t) {
                case "split":
                  Fe(`split -> ${Ee.out.map(ye).join(", ")}`);
                  for (let it of Ee.out) ot(it, Ve);
                  return;
                case "neg":
                  return (Fe(`!(${ye(Ee.sub)}) -> ${ye(Ee.next)}`), ot(Ee.sub, Ve + "  "), ot(Ee.next, Ve));
                case "lit":
                  Fe(`${JSON.stringify(Ee.ch)} -> ${ye(Ee.next)}`);
                  break;
                case "class":
                  Fe(`${Ee.re} -> ${ye(Ee.next)}`);
                  break;
                default:
                  Fe(`${Ee.t === "any" ? "?" : "*"} -> ${ye(Ee.next)}`);
              }
              ot(Ee.next, Ve);
            };
          return (
            ot(_e, ""),
            [`start -> ${ye(_e)}`, ...we].join(`
`)
          );
        },
        T = class {
          gen;
          threads = [];
          match = !1;
          runs = [];
          ids = [];
          constructor(_e) {
            this.gen = _e;
          }
          get dead() {
            return !this.threads.length && !this.match && !this.runs.length;
          }
        },
        C = (_e, we) =>
          _e.ids.length !== we.ids.length ||
          _e.runs.length !== we.runs.length ||
          _e.ids.some((Pe, ye) => Pe !== we.ids[ye])
            ? !1
            : _e.runs.every((Pe) => we.runs.some((ye) => ye.neg === Pe.neg && C(ye.state, Pe.state))),
        O = (_e) => ({ has: new Float64Array(_e), seen: new Float64Array(_e), gen: 0 }),
        B = class {
          dots;
          dotStart;
          #e;
          constructor(_e, we, Pe) {
            ((this.dots = _e), (this.dotStart = we), (this.#e = Pe));
          }
          state() {
            return new T(++this.#e.gen);
          }
          done(_e) {
            return (
              (_e.ids = _e.threads.map((we) => we.id).sort((we, Pe) => we - Pe)),
              _e.match && _e.ids.unshift(r.id),
              _e
            );
          }
          #r(_e, we) {
            let { seen: Pe } = this.#e;
            return Pe[we.id] === _e.gen ? !1 : ((Pe[we.id] = _e.gen), !0);
          }
          #t(_e, we) {
            let { has: Pe } = this.#e;
            return Pe[we.id] === _e.gen ? !1 : ((Pe[we.id] = _e.gen), _e.threads.push(we), !0);
          }
          restricted(_e, we) {
            return we && (this.dots || (this.dotStart && _e === 0));
          }
          add(_e, we, Pe, ye) {
            switch (we.t) {
              case "split":
                if (!this.#r(_e, we)) return;
                for (let Ee of we.out) this.add(_e, Ee, Pe, ye);
                return;
              case "neg":
                if (!this.#r(_e, we)) return;
                let ot = this.state();
                return (
                  this.add(ot, we.sub, Pe, !1),
                  this.done(ot),
                  this.addRun(_e, { t: "run", neg: we, state: ot }, Pe, ye)
                );
              case "star":
                if (this.restricted(Pe, ye)) return;
                this.#t(_e, we) && this.add(_e, we.next, Pe, ye);
                return;
              case "match":
                _e.match = !0;
                return;
              default:
                this.#t(_e, we);
            }
          }
          addRun(_e, we, Pe, ye) {
            for (let ot of _e.runs) if (ot.neg === we.neg && C(ot.state, we.state)) return;
            (_e.runs.push(we), we.state.match || this.add(_e, we.neg.next, Pe, ye));
          }
          step(_e, we, Pe, ye) {
            let ot = this.state();
            for (let Ee of _e.threads)
              switch (Ee.t) {
                case "lit":
                  f(Ee, we) && this.add(ot, Ee.next, Pe + 1, ye);
                  break;
                case "any":
                  this.restricted(Pe, ye) || this.add(ot, Ee.next, Pe + 1, ye);
                  break;
                case "class":
                  !this.restricted(Pe, ye) && Ee.re.test(we) && this.add(ot, Ee.next, Pe + 1, ye);
                  break;
                case "star":
                  this.restricted(Pe, ye) || this.add(ot, Ee, Pe + 1, ye);
              }
            if (!this.restricted(Pe, ye))
              for (let Ee of _e.runs) {
                if (Ee.state.dead) {
                  this.addRun(ot, Ee, Pe + 1, ye);
                  continue;
                }
                let Ve = this.step(Ee.state, we, Pe, !1);
                this.addRun(ot, { t: "run", neg: Ee.neg, state: Ve }, Pe + 1, ye);
              }
            return this.done(ot);
          }
        },
        V = (_e) => {
          let we = _e.ids.join();
          if (!_e.runs.length) return we;
          let Pe = _e.runs.map((ye) => `${ye.neg.id}(${V(ye.state)})`);
          return `${we}|${Pe.sort().join("|")}`;
        },
        q = 262144,
        Z = class {
          #e;
          #r = new Map();
          #t = 0;
          #n;
          #i;
          #s;
          #a;
          constructor(_e, we) {
            ((this.#e = _e), (this.#s = new B(!1, !1, we)), (this.#a = new B(!1, !0, we)));
          }
          #c(_e) {
            return { state: _e, match: _e.match, dead: _e.dead, next: new Map() };
          }
          #H(_e) {
            let we = V(_e),
              Pe = this.#r.get(we);
            if (Pe) return Pe;
            this.#t > q && this.#f();
            let ye = this.#c(_e);
            return (this.#r.set(we, ye), (this.#t += we.length + 1), ye);
          }
          #f() {
            (this.#r.clear(), (this.#t = 0), (this.#n = void 0), (this.#i = void 0));
          }
          start(_e) {
            if (_e) {
              if (this.#i) return this.#i;
              let Pe = this.#a.state();
              return (this.#a.add(Pe, this.#e, 0, !0), (this.#i = this.#c(this.#a.done(Pe))));
            }
            if (this.#n) return this.#n;
            let we = this.#s.state();
            return (this.#s.add(we, this.#e, 0, !0), (this.#n = this.#H(this.#s.done(we))));
          }
          next(_e, we) {
            let Pe = we.charCodeAt(0),
              ye = Pe < 128 ? void 0 : _e.next.get(we);
            if (ye) return ye;
            let ot =
              _e === this.#i
                ? this.#H(this.#a.step(_e.state, we, 0, !0))
                : this.#H(this.#s.step(_e.state, we, 1, !0));
            return (
              Pe < 128
                ? (_e.ascii || ((_e.ascii = Array(128)), (this.#t += 128)), (_e.ascii[Pe] = ot))
                : _e.next.set(we, ot),
              this.#t++,
              ot
            );
          }
        },
        se = (_e) => {
          let we = [];
          for (let Pe = _e; Pe.t !== "match"; Pe = Pe.next) {
            if (Pe.t === "split" || Pe.t === "neg") return;
            we.push(Pe);
          }
          return we;
        },
        ae = (_e, we, Pe, ye) => {
          let ot = 0,
            Ee = Pe,
            Ve = -1,
            Fe = 0;
          for (; Ee < ye;) {
            let it = _e[ot];
            if (it?.t === "star") {
              ((Ve = ot++), (Fe = Ee));
              continue;
            }
            let At = we[Ee];
            if (
              it &&
              (it.t === "any" || (it.t === "lit" && f(it, At)) || (it.t === "class" && it.re.test(At)))
            ) {
              (ot++, Ee++);
              continue;
            }
            if (Ve === -1) return !1;
            ((ot = Ve + 1), (Ee = ++Fe));
          }
          for (; _e[ot]?.t === "star";) ot++;
          return ot === _e.length;
        },
        z = (_e) => {
          let we = 0,
            Pe = 0;
          for (let ye of _e) {
            let [ot, Ee] = Ae(ye);
            ((we += ot), (Pe += Ee));
          }
          return [we, Pe];
        },
        Ae = (_e) => {
          if (_e.t === "star") return [0, 1 / 0];
          if (_e.t !== "ext") return [1, 1];
          if (_e.type === "!") return [0, 1 / 0];
          let we = _e.alts.map(z),
            Pe = Math.min(...we.map((Ee) => Ee[0])),
            ye = Math.max(...we.map((Ee) => Ee[1])),
            ot = ye === 0 ? 0 : 1 / 0;
          return _e.type === "@"
            ? [Pe, ye]
            : _e.type === "?"
              ? [0, ye]
              : _e.type === "*"
                ? [0, ot]
                : [Pe, ot];
        },
        le = (_e, we, Pe) => {
          for (let ye = 0; ye < _e.length; ye++) if (!f(_e[ye], we[Pe + ye])) return !1;
          return !0;
        },
        Be = /[/\ud800-\udfff]/,
        Te = /[\ud800-\udfff]/,
        Lt = (_e) => (Te.test(_e) ? [..._e] : _e),
        Ht = (_e) => {
          if (_e.includes("/")) throw Error("can only match a single path portion, got: " + _e);
        },
        Se = class {
          pattern;
          options;
          #e;
          #r;
          #t;
          #n;
          #i;
          #s;
          #a;
          #c = !1;
          #H = 0;
          #f = 1 / 0;
          #l = [];
          #A = [];
          #o;
          #m;
          #L = !1;
          #$;
          #p;
          constructor(_e, we = {}) {
            if (_e.includes("/")) throw Error("can only match a single path portion, got pattern: " + _e);
            ((this.pattern = _e), (this.options = we));
            let { nocase: Pe = !1, noext: ye = !1, normalize: ot } = we;
            this.#p = ot === !0 ? "NFC" : ot || void 0;
            let Ee = /^[?*+@]\(\)$/.test(_e),
              Ve = d(_e, Pe, ye || Ee, this.#p),
              [Fe] = L(Ve, _(Ve), 0, Ve.length, !0);
            this.#p && (Fe = I(Fe, this.#p));
            let [it, At] = D(Fe, Pe);
            if (((this.#e = it), (this.#r = At), Fe.every((et) => et.t === "lit")))
              ((this.#i = Fe.map((et) => et.ch).join("")), Pe && (this.#s = u(this.#i)));
            else {
              let et = (Et) => (Et.t !== "lit" ? void 0 : Pe ? { ch: Et.ch, re: u(Et.ch) } : { ch: Et.ch });
              for (let Et of Fe) {
                let tr = et(Et);
                if (!tr) break;
                this.#l.push(tr);
              }
              for (let Et = Fe.length - 1; Et >= 0; Et--) {
                let tr = et(Fe[Et]);
                if (!tr) break;
                this.#A.unshift(tr);
              }
              ((this.#L = !!(this.#l.length || this.#A.length)),
                Pe ||
                  ((this.#o = this.#l.map((Et) => Et.ch).join("")),
                  (this.#m = this.#A.map((Et) => Et.ch).join(""))),
                (this.#a = se(this.#e)?.slice(this.#l.length, -this.#A.length || void 0)),
                (this.#c = !!this.#a?.every((Et) => Et.t === "star" || Et.t === "any")));
              let [ut, ht] = z(Fe);
              ((this.#H = ut), (this.#f = ht));
            }
          }
          test(_e) {
            return this.#p
              ? (Ht(_e), this.#h(_e.normalize(this.#p)))
              : Be.test(_e)
                ? (Ht(_e), this.#h(_e, [..._e]))
                : this.#h(_e, _e);
          }
          testUnchecked(_e) {
            return this.#h(this.#p ? _e.normalize(this.#p) : _e);
          }
          #h(_e, we) {
            if (this.#i !== void 0) return this.#s ? this.#s.test(_e) : _e === this.#i;
            let Pe = this.#H,
              ye = this.#f;
            if (we === void 0) {
              let At = _e.length,
                et = (At + 1) >> 1;
              if (At < Pe || et > ye) return !1;
              (et < Pe || At > ye) && (we = Lt(_e));
            }
            if (we !== void 0 && (we.length < Pe || we.length > ye)) return !1;
            let ot = this.#l.length;
            if (this.#L)
              if (this.#o !== void 0 && this.#m !== void 0) {
                if (!_e.startsWith(this.#o) || !_e.endsWith(this.#m)) return !1;
              } else {
                we ??= Lt(_e);
                let At = we.length - this.#A.length;
                if (!le(this.#l, we, 0) || !le(this.#A, we, At)) return !1;
              }
            let Ee = !this.options.dot && _e.startsWith(".");
            if (this.#a) {
              if (_e === "." || _e === ".." || (Ee && !ot)) return !1;
              if (this.#c) return !0;
              we ??= Lt(_e);
              let At = we.length - this.#A.length;
              return ae(this.#a, we, ot, At);
            }
            if (((we ??= Lt(_e)), _e === "." || _e === "..")) {
              this.#t ??= O(this.#r);
              let At = (this.#n ??= new B(!0, !1, this.#t)),
                et = At.state();
              At.add(et, this.#e, 0, !0);
              let ut = At.done(et);
              for (let ht = 0; ht < we.length; ht++) ut = At.step(ut, we[ht], ht, !0);
              return ut.match;
            }
            this.#t ??= O(this.#r);
            let Ve = (this.#$ ??= new Z(this.#e, this.#t)),
              Fe = Ve.start(Ee),
              it = we === _e;
            for (let At = 0; At < we.length; At++) {
              if (Fe.dead) return !1;
              let et = it ? _e.charCodeAt(At) : we[At].charCodeAt(0);
              Fe = Fe.ascii?.[et] ?? Ve.next(Fe, we[At]);
            }
            return Fe.match;
          }
          toString() {
            return S(this.#e);
          }
        };
      e.Matcher = Se;
    }),
    pwo = tb((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.assertValidPattern = void 0));
      var t = 65536,
        r = (s) => {
          if (typeof s != "string") throw TypeError("invalid pattern");
          if (s.length > t) throw TypeError("pattern is too long");
        };
      e.assertValidPattern = r;
    }),
    eKn = tb((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.escape = void 0));
      var t = (r, { windowsPathsNoEscape: s = !1, magicalBraces: a = !1 } = {}) =>
        a
          ? s
            ? r.replace(/[?*()[\]{}]/g, "[$&]")
            : r.replace(/[?*()[\]\\{}]/g, "\\$&")
          : s
            ? r.replace(/[?*()[\]]/g, "[$&]")
            : r.replace(/[?*()[\]\\]/g, "\\$&");
      e.escape = t;
    }),
    tKn = tb((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.unescape = void 0));
      var t = (r, { windowsPathsNoEscape: s = !1, magicalBraces: a = !0 } = {}) =>
        a
          ? s
            ? r.replace(/\[([^/\\])\]/g, "$1")
            : r.replace(/((?!\\).|^)\[([^/\\])\]/g, "$1$2").replace(/\\([^/])/g, "$1")
          : s
            ? r.replace(/\[([^/\\{}])\]/g, "$1")
            : r.replace(/((?!\\).|^)\[([^/\\{}])\]/g, "$1$2").replace(/\\([^/{}])/g, "$1");
      e.unescape = t;
    }),
    Bme = tb((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.unescape =
          e.escape =
          e.Minimatch =
          e.match =
          e.braceExpand =
          e.defaults =
          e.filter =
          e.GLOBSTAR =
          e.sep =
          e.minimatch =
            void 0));
      var t = uwo(),
        r = fwo(),
        s = pwo(),
        a = eKn(),
        H = tKn(),
        u = (ye, ot, Ee = {}) => (
          (0, s.assertValidPattern)(ot),
          !Ee.nocomment && ot.charAt(0) === "#" ? !1 : new _e(ot, Ee).match(ye)
        );
      e.minimatch = u;
      var f =
          typeof process == "object" && process
            ? process.env?.__MINIMATCH_TESTING_PLATFORM__ || "win32"
            : "posix",
        d = { win32: { sep: "\\" }, posix: { sep: "/" } };
      ((e.sep = f === "win32" ? d.win32.sep : d.posix.sep),
        (e.minimatch.sep = e.sep),
        (e.GLOBSTAR = Symbol("globstar **")),
        (e.minimatch.GLOBSTAR = e.GLOBSTAR));
      var _ =
        (ye, ot = {}) =>
        (Ee) =>
          (0, e.minimatch)(Ee, ye, ot);
      ((e.filter = _), (e.minimatch.filter = e.filter));
      var L = (ye, ot = {}) => Object.assign({}, ye, ot),
        I = (ye) => {
          if (!ye || typeof ye != "object" || !Object.keys(ye).length) return e.minimatch;
          let ot = e.minimatch;
          return Object.assign((Ee, Ve, Fe = {}) => ot(Ee, Ve, L(ye, Fe)), {
            Minimatch: class extends ot.Minimatch {
              constructor(Ee, Ve = {}) {
                super(Ee, L(ye, Ve));
              }
              static defaults(Ee) {
                return ot.defaults(L(ye, Ee)).Minimatch;
              }
            },
            unescape: (Ee, Ve = {}) => ot.unescape(Ee, L(ye, Ve)),
            escape: (Ee, Ve = {}) => ot.escape(Ee, L(ye, Ve)),
            filter: (Ee, Ve = {}) => ot.filter(Ee, L(ye, Ve)),
            defaults: (Ee) => ot.defaults(L(ye, Ee)),
            braceExpand: (Ee, Ve = {}) => ot.braceExpand(Ee, L(ye, Ve)),
            match: (Ee, Ve, Fe = {}) => ot.match(Ee, Ve, L(ye, Fe)),
            sep: ot.sep,
            GLOBSTAR: e.GLOBSTAR,
          });
        };
      ((e.defaults = I), (e.minimatch.defaults = e.defaults));
      var D = (ye, ot = {}) => (
        (0, s.assertValidPattern)(ye),
        ot.nobrace || !/\{(?:(?!\{).)*\}/.test(ye) ? [ye] : (0, t.expand)(ye, { max: ot.braceExpandMax })
      );
      ((e.braceExpand = D), (e.minimatch.braceExpand = e.braceExpand));
      var S = (ye, ot, Ee = {}) => {
        let Ve = new _e(ot, Ee);
        return ((ye = ye.filter((Fe) => Ve.match(Fe))), Ve.options.nonull && !ye.length && ye.push(ot), ye);
      };
      ((e.match = S), (e.minimatch.match = e.match));
      var T = /[?*]|[+@!]\(.*?\)|\[|\]/,
        C = (ye, ot) => {
          let Ee = ot + 1;
          (ye.charAt(Ee) === "!" || ye.charAt(Ee) === "^") && Ee++;
          let Ve = !1;
          for (; Ee < ye.length; Ee++) {
            let Fe = ye.charAt(Ee);
            if (Fe === "]" && Ve) return Ee;
            ((Ve = !0), Fe === "\\" && Ee++);
          }
          return -1;
        },
        O = (ye, ot) => {
          if (!ot && (ye === "+()" || ye === "@()")) return ye;
          let Ee = "";
          for (let Ve = 0; Ve < ye.length; Ve++) {
            let Fe = ye.charAt(Ve);
            if (Fe === "\\") Ee += ye.charAt(++Ve) || Fe;
            else {
              if (Fe === "*" || Fe === "?") return;
              if (Fe === "[") {
                let it = C(ye, Ve);
                if (it === -1) {
                  Ee += Fe;
                  continue;
                }
                let At = ye.slice(Ve + 1, it);
                if (
                  (At.startsWith("\\") && (At = At.slice(1)),
                  [...At].length !== 1 || "!^".includes(ye.charAt(Ve + 1)))
                )
                  return;
                ((Ee += At), (Ve = it));
              } else {
                if (!ot && "+@!".includes(Fe) && ye.charAt(Ve + 1) === "(" && ye.includes(")", Ve + 2))
                  return;
                Ee += Fe;
              }
            }
          }
          return Ee;
        },
        B = (ye) => {
          if (/^[?*+@]\(\)$/.test(ye) || ye.includes("[:")) return !1;
          let ot = 0;
          for (let Ee = 0; Ee < ye.length; Ee++) {
            let Ve = ye.charAt(Ee);
            if (Ve === "\\") {
              if (++Ee === ye.length) return !1;
            } else if (Ve === "[") {
              let Fe = C(ye, Ee);
              Fe !== -1 && (Ee = Fe);
            } else if ("+@!?*".includes(Ve) && ye.charAt(Ee + 1) === "(") (ot++, Ee++);
            else if (Ve === ")") {
              if (!ot--) return !1;
            } else if (Ve === "|" && !ot) return !1;
          }
          return !ot;
        },
        V,
        q,
        Z = (ye, ot) => (typeof ye == "string" ? ot === ye : ot !== "" && ye.testUnchecked(ot)),
        se = (ye, ot, Ee, Ve, Fe) => (Z(ye, ot) ? Ee : Ve !== void 0 && Z(ye, Ve) ? Fe : -1),
        ae = (ye) => ye === "." || ye === "..",
        z = (ye) => typeof ye == "string" && /^[a-z]:$/i.test(ye),
        Ae = (ye) => typeof ye == "string" && /^unc$/i.test(ye),
        le = (ye) => {
          if (ye[0] !== "" || ye[1] !== "") return -1;
          let ot = ye[2] !== "?" ? 2 : Ae(ye[3]) ? 4 : -1,
            Ee = ye[ot],
            Ve = ye[ot + 1];
          return ot !== -1 &&
            Ee !== void 0 &&
            Ee !== "" &&
            Ee !== e.GLOBSTAR &&
            Ve !== void 0 &&
            Ve !== "" &&
            Ve !== e.GLOBSTAR
            ? ot
            : -1;
        },
        Be = (ye, ot) => !ae(ye) && (ot || !ye.startsWith(".")),
        Te = (ye, ot, Ee, Ve, Fe) => {
          for (let it = ot; it < Ee;) {
            if (ye.charCodeAt(it) === 46) {
              if (!Ve) return !0;
              let et = ye.charCodeAt(it + 1) === 46 ? it + 2 : it + 1;
              if (et >= Ee || Lt(ye.charCodeAt(et), Fe)) return !0;
            }
            let At = Ht(ye, it, Fe);
            if (At === -1) return !1;
            for (it = At + 1; it < Ee && Lt(ye.charCodeAt(it), Fe);) it++;
          }
          return !1;
        },
        Lt = (ye, ot) => (ot === "/" ? ye === 47 : ot === "\\" ? ye === 92 : ye === 47 || ye === 92),
        Ht = (ye, ot, Ee) => {
          if (Ee !== "both") return ye.indexOf(Ee, ot);
          let Ve = ye.indexOf("/", ot),
            Fe = ye.indexOf("\\", ot);
          return Ve === -1 ? Fe : Fe === -1 ? Ve : Math.min(Ve, Fe);
        },
        Se = (ye, ot, Ee) =>
          Ee !== "both"
            ? ye.lastIndexOf(Ee, ot)
            : Math.max(ye.lastIndexOf("/", ot), ye.lastIndexOf("\\", ot)),
        _e = class {
          options;
          set;
          pattern;
          windowsPathsNoEscape;
          nonegate;
          negate;
          comment;
          empty;
          preserveMultipleSlashes;
          partial;
          globSet;
          globParts;
          nocase;
          isWindows;
          platform;
          windowsNoMagicRoot;
          maxGlobstarRecursion;
          #e;
          #r;
          #t;
          #n;
          #i = [];
          #s = [];
          #a = [];
          #c = new Map();
          #H = new WeakMap();
          constructor(ye, ot = {}) {
            ((0, s.assertValidPattern)(ye),
              (ot = ot || {}),
              (this.options = ot),
              (this.maxGlobstarRecursion = ot.maxGlobstarRecursion ?? 200),
              (this.pattern = ye),
              (this.platform = ot.platform || f),
              (this.isWindows = this.platform === "win32"));
            let Ee = "allowWindowsEscape";
            ((this.windowsPathsNoEscape = !!ot.windowsPathsNoEscape || ot[Ee] === !1),
              this.windowsPathsNoEscape && (this.pattern = this.pattern.replace(/\\/g, "/")),
              (this.preserveMultipleSlashes = !!ot.preserveMultipleSlashes),
              (this.negate = !1),
              (this.nonegate = !!ot.nonegate),
              (this.comment = !1),
              (this.empty = !1),
              (this.partial = !!ot.partial),
              (this.nocase = !!this.options.nocase),
              (this.windowsNoMagicRoot =
                ot.windowsNoMagicRoot !== void 0 ? ot.windowsNoMagicRoot : !!(this.isWindows && this.nocase)),
              (this.globSet = []),
              (this.globParts = []),
              (this.set = []),
              (this.#e = !this.preserveMultipleSlashes),
              (this.#t = (ot.optimizationLevel ?? 1) >= 2));
            let Ve = ot.normalize;
            ((this.#n = Ve === !0 ? "NFC" : Ve || void 0), this.make());
            let Fe = this.set.map((it) => this.#l(it));
            ((this.#a = this.set.map((it, At) => this.#e && it.length - 1 > Fe[At])),
              (this.#i = this.set.map((it, At) => {
                let et = this.#a[At] ? it.length - 1 : it.length,
                  ut = it.slice(Fe[At] + 1, et).filter((ht) => typeof ht == "string" && !!ht);
                return [...new Set(ut)];
              })),
              (this.#r = this.#i.some((it) => it.length)),
              (this.#s = this.set.map((it, At) => {
                let [et, ut, ht] = it;
                if (this.#a[At] && it.length === 2 && et === e.GLOBSTAR && ut !== e.GLOBSTAR) return "tail";
                if (this.#a[At] && ot.matchBase && it.length === 1 && et !== e.GLOBSTAR && et !== "")
                  return "base";
                if (!(!this.#e || Fe[At] !== -1)) {
                  if (
                    it.length === 3 &&
                    et === e.GLOBSTAR &&
                    ht === e.GLOBSTAR &&
                    ut !== e.GLOBSTAR &&
                    ut !== "" &&
                    this.maxGlobstarRecursion > 0
                  )
                    return "mid";
                  if (it.length === 2 && ut === e.GLOBSTAR && et !== e.GLOBSTAR && et !== "") return "head";
                }
              })));
          }
          #f(ye) {
            return this.#n ? ye.normalize(this.#n) : ye;
          }
          #l(ye) {
            if (!this.isWindows) return -1;
            if (z(ye[0])) return 0;
            if (ye[0] === "" && ye[1] === "" && ye[2] === "?" && z(ye[3])) return 3;
            let ot = le(ye);
            return ot === -1 ? -1 : ot + 1;
          }
          hasMagic() {
            if (this.options.magicalBraces && this.set.length > 1) return !0;
            for (let ye of this.set) for (let ot of ye) if (typeof ot != "string") return !0;
            return !1;
          }
          make() {
            let ye = this.pattern,
              ot = this.options;
            if (!ot.nocomment && ye.charAt(0) === "#") {
              this.comment = !0;
              return;
            }
            if (!ye) {
              this.empty = !0;
              return;
            }
            (this.parseNegate(), (this.globSet = [...new Set(this.braceExpand())]));
            let Ee = this.globSet.map((Fe) => this.#E(Fe));
            this.globParts = this.preprocess(Ee);
            let Ve = this.globParts.map((Fe, it, At) => {
              if (this.isWindows && this.windowsNoMagicRoot) {
                let et = Fe[2] === "?" && Ae(Fe[3]) ? 6 : 4,
                  ut =
                    Fe[0] === "" &&
                    Fe[1] === "" &&
                    (Fe[2] === "?" || !T.test(Fe[2])) &&
                    Fe.slice(3, et).every((Et) => !T.test(Et)),
                  ht = /^[a-z]:/i.test(Fe[0]);
                if (ut)
                  return [
                    ...Fe.slice(0, et).map((Et) => this.#f(Et)),
                    ...Fe.slice(et).map((Et) => this.parse(Et)),
                  ];
                if (ht) return [this.#f(Fe[0]), ...Fe.slice(1).map((Et) => this.parse(Et))];
              }
              return Fe.map((et) => this.parse(et));
            });
            if (((this.set = Ve.filter((Fe) => Fe.indexOf(!1) === -1)), this.isWindows))
              for (let Fe = 0; Fe < this.set.length; Fe++) {
                let it = this.set[Fe];
                it[0] === "" &&
                  it[1] === "" &&
                  this.globParts[Fe][2] === "?" &&
                  (z(it[3]) || Ae(this.globParts[Fe][3])) &&
                  (Ae(this.globParts[Fe][3]) && (it[3] = "UNC"), (it[2] = "?"));
              }
            ot.noext || this.mergeRows();
          }
          mergeRows() {
            let ye = !0;
            for (; ye;) {
              ye = !1;
              let ot = Math.max(0, ...this.set.map((Ee) => Ee.length));
              for (let Ee = 0; Ee < ot; Ee++) {
                let Ve = new Map();
                this.set.forEach((it, At) => {
                  if (!(it[Ee] instanceof r.Matcher) || !B(this.globParts[At][Ee])) return;
                  let et = [...this.globParts[At]];
                  et[Ee] = "";
                  let ut = `${it.length}/${et.join("/")}`,
                    ht = Ve.get(ut);
                  ht ? ht.push(At) : Ve.set(ut, [At]);
                });
                let Fe = new Set();
                for (let it of Ve.values()) {
                  if (it.length < 2) continue;
                  let [At, ...et] = it,
                    ut = `@(${it.map((ht) => this.globParts[ht][Ee]).join("|")})`;
                  ((this.globParts[At][Ee] = ut), (this.set[At][Ee] = this.parse(ut)));
                  for (let ht of et) Fe.add(ht);
                }
                Fe.size &&
                  ((ye = !0),
                  (this.set = this.set.filter((it, At) => !Fe.has(At))),
                  (this.globParts = this.globParts.filter((it, At) => !Fe.has(At))));
              }
            }
          }
          preprocess(ye) {
            if (this.options.noglobstar)
              for (let Ee of ye) for (let Ve = 0; Ve < Ee.length; Ve++) Ee[Ve] === "**" && (Ee[Ve] = "*");
            let { optimizationLevel: ot = 1 } = this.options;
            return (
              ot >= 2
                ? ((ye = this.firstPhasePreProcess(ye)), (ye = this.secondPhasePreProcess(ye)))
                : ot >= 1
                  ? (ye = this.levelOneOptimize(ye))
                  : (ye = this.adjascentGlobstarOptimize(ye)),
              ye
            );
          }
          adjascentGlobstarOptimize(ye) {
            return ye.map((ot) => {
              let Ee = -1;
              for (; (Ee = ot.indexOf("**", Ee + 1)) !== -1;) {
                let Ve = Ee;
                for (; ot[Ve + 1] === "**";) Ve++;
                Ve !== Ee && ot.splice(Ee, Ve - Ee);
              }
              return ot;
            });
          }
          levelOneOptimize(ye) {
            return ye.map((ot) => {
              let Ee = this.#l(ot) + 1;
              return (
                (ot = ot.reduce((Ve, Fe) => {
                  let it = Ve[Ve.length - 1];
                  return Fe === "**" && it === "**"
                    ? Ve
                    : Fe === ".." && Ve.length > Ee && it && it !== ".." && it !== "." && it !== "**"
                      ? (Ve.pop(), Ve)
                      : (Ve.push(Fe), Ve);
                }, [])),
                ot.length === 0 ? [""] : ot
              );
            });
          }
          #A(ye) {
            let ot = !this.isWindows || !ye.includes("\\") ? "/" : ye.includes("/") ? "both" : "\\",
              Ee = this.#e ? 0 : -1,
              Ve = "",
              Fe = 0,
              it,
              At = 0,
              et = !!this.options.dot;
            e: for (let ut = 0; ut < this.set.length; ut++) {
              let ht = this.set[ut],
                Et = ht[ht.length - 1],
                tr = Ee !== -1 && this.#a[ut] && Et !== e.GLOBSTAR;
              if (tr && Ee === 0) {
                let Br = Se(ye, ye.length, ot);
                if (((Fe = Br + 1), (Ve = ye.slice(Fe)), Ve === "" && Br >= 0)) {
                  let St = Br;
                  for (; St > 0 && Lt(ye.charCodeAt(St - 1), ot);) St--;
                  ((At = St === 0 ? 0 : Se(ye, St - 1, ot) + 1), (it = ye.slice(At, St)));
                }
                let Dt = this.#t && (ae(Ve) || (Ve === "" && it !== void 0 && ae(it)));
                ((Ee = Dt ? -1 : 1), (tr = !Dt));
              }
              let Rr = -1;
              if (tr && typeof Et == "string" && ((Rr = se(Et, Ve, Fe, it, At)), Rr === -1)) continue;
              if (this.#r) {
                for (let Br of this.#i[ut]) if (!ye.includes(Br)) continue e;
              }
              if (tr && typeof Et == "object" && ((Rr = se(Et, Ve, Fe, it, At)), Rr === -1)) continue;
              let Vt = this.#s[ut];
              if (Vt === "base" && tr) return "yes";
              if (Vt === "tail" && tr) {
                if (this.#t && Te(ye, 0, Rr, !0, ot)) return "maybe";
                if (!Te(ye, 0, Rr, et, ot)) return "yes";
                continue;
              }
              if (Vt === "mid" || Vt === "head") {
                let Br = this.#m(ye, ht, Vt === "head", et, ot);
                if (Br !== "no") return Br;
                continue;
              }
              return "maybe";
            }
            return "no";
          }
          #o(ye, ot, Ee) {
            let Ve = !!this.options.dot,
              Fe = ye.length;
            if (Ee === "head") {
              if (Fe < 2 || !Z(ot[0], ye[0])) return !1;
              for (let At = 1; At < Fe; At++) if (!Be(ye[At], Ve)) return !1;
              return !0;
            }
            let it = ot[1];
            if (Ee === "tail") {
              let At = Fe - 1;
              if (!Z(it, ye[At]) && (ye[At] !== "" || Fe === 1 || !Z(it, ye[--At]))) return !1;
              for (let et = 0; et < At; et++) if (!Be(ye[et], Ve)) return !1;
              return !0;
            }
            for (let At = 0; At < Fe; At++) {
              if (Z(it, ye[At]) && At + 1 < Fe) {
                let et = At + 1;
                for (; et < Fe && Be(ye[et], Ve);) et++;
                if (et === Fe) return !0;
              }
              if (!Be(ye[At], Ve)) return !1;
            }
            return !1;
          }
          #m(ye, ot, Ee, Ve, Fe) {
            if (this.#t && Te(ye, 0, ye.length, !0, Fe)) return "maybe";
            let it = ot[Ee ? 0 : 1],
              At = 0;
            for (let et = Ht(ye, At, Fe); et !== -1; et = Ht(ye, At, Fe)) {
              let ut = et + 1;
              for (; ut < ye.length && Lt(ye.charCodeAt(ut), Fe);) ut++;
              if (
                (typeof it == "string"
                  ? et - At === it.length && ye.startsWith(it, At)
                  : et > At && it.testUnchecked(ye.slice(At, et))) &&
                !Te(ye, ut, ye.length, Ve, Fe)
              )
                return "yes";
              if (Ee || Te(ye, At, ut, Ve, Fe)) return "no";
              At = ut;
            }
            return "no";
          }
          #L(ye) {
            let ot = V;
            return ot?.f === ye &&
              ot.isWindows === this.isWindows &&
              ot.preserveMultipleSlashes === this.preserveMultipleSlashes &&
              ot.normalize === this.#n
              ? ot
              : void 0;
          }
          #$(ye) {
            let { isWindows: ot, preserveMultipleSlashes: Ee } = this,
              Ve = this.#E(ot ? ye.split("\\").join("/") : ye),
              Fe = this.#n;
            return (
              Fe && (Ve = Ve.map((it) => it.normalize(Fe))),
              (V = { f: ye, isWindows: ot, preserveMultipleSlashes: Ee, normalize: Fe, parts: Ve }),
              V
            );
          }
          #p(ye) {
            let ot = [...ye],
              Ee = !1;
            do {
              if (((Ee = !1), !this.preserveMultipleSlashes)) {
                for (let it = 1; it < ot.length - 1; it++) {
                  let At = ot[it];
                  (it === 1 && At === "" && ot[0] === "") ||
                    ((At === "." || At === "") && ((Ee = !0), ot.splice(it, 1), it--));
                }
                ot[0] === "." && ot.length === 2 && (ot[1] === "." || ot[1] === "") && ((Ee = !0), ot.pop());
              }
              let Ve = this.#l(ot) + 1,
                Fe = Ve;
              for (; (Fe = ot.indexOf("..", Fe + 1)) !== -1;) {
                let it = ot[Fe - 1];
                it &&
                  it !== "." &&
                  it !== ".." &&
                  it !== "**" &&
                  ((Ee = !0), ot.splice(Fe - 1, 2), (Fe = Math.max(Fe - 2, Ve)));
              }
            } while (Ee);
            return ot.length === 0 ? [""] : ot;
          }
          firstPhasePreProcess(ye) {
            let { braceExpandMax: ot = 1e5 } = this.options,
              Ee = !1;
            do {
              Ee = !1;
              for (let Ve of ye) {
                let Fe = -1;
                for (; (Fe = Ve.indexOf("**", Fe + 1)) !== -1;) {
                  let et = Fe;
                  for (; Ve[et + 1] === "**";) et++;
                  et > Fe && Ve.splice(Fe + 1, et - Fe);
                  let ut = Ve[Fe + 1],
                    ht = Ve[Fe + 2],
                    Et = Ve[Fe + 3];
                  if (
                    ut !== ".." ||
                    !ht ||
                    ht === "." ||
                    ht === ".." ||
                    !Et ||
                    Et === "." ||
                    Et === ".." ||
                    ye.length >= ot
                  )
                    continue;
                  ((Ee = !0), Ve.splice(Fe, 1));
                  let tr = Ve.slice(0);
                  ((tr[Fe] = "**"), ye.push(tr), Fe--);
                }
                if (!this.preserveMultipleSlashes) {
                  for (let et = 1; et < Ve.length - 1; et++) {
                    let ut = Ve[et];
                    (et === 1 && ut === "" && Ve[0] === "") ||
                      ((ut === "." || ut === "") && ((Ee = !0), Ve.splice(et, 1), et--));
                  }
                  Ve[0] === "." &&
                    Ve.length === 2 &&
                    (Ve[1] === "." || Ve[1] === "") &&
                    ((Ee = !0), Ve.pop());
                }
                let it = this.#l(Ve) + 1,
                  At = it;
                for (; (At = Ve.indexOf("..", At + 1)) !== -1;) {
                  let et = Ve[At - 1];
                  if (et && et !== "." && et !== ".." && et !== "**") {
                    Ee = !0;
                    let ut = At === 1 && Ve[At + 1] === "**" ? ["."] : [];
                    (Ve.splice(At - 1, 2, ...ut),
                      Ve.length === 0 && Ve.push(""),
                      (At = Math.max(At - 2, it)));
                  }
                }
              }
            } while (Ee);
            return ye;
          }
          secondPhasePreProcess(ye) {
            if (ye.length > 1000) return ye;
            for (let ot = 0; ot < ye.length - 1; ot++)
              for (let Ee = ot + 1; Ee < ye.length; Ee++) {
                let Ve = this.partsMatch(ye[ot], ye[Ee], !this.preserveMultipleSlashes);
                if (Ve) {
                  ((ye[ot] = []), (ye[Ee] = Ve));
                  break;
                }
              }
            return ye.filter((ot) => ot.length);
          }
          partsMatch(ye, ot, Ee = !1) {
            let Ve = 0,
              Fe = 0,
              it = [],
              At = "";
            for (; Ve < ye.length && Fe < ot.length;)
              if (ye[Ve] === ot[Fe]) (it.push(At === "b" ? ot[Fe] : ye[Ve]), Ve++, Fe++);
              else if (Ee && ye[Ve] === "**" && ot[Fe] === ye[Ve + 1]) (it.push(ye[Ve]), Ve++);
              else if (Ee && ot[Fe] === "**" && ye[Ve] === ot[Fe + 1]) (it.push(ot[Fe]), Fe++);
              else if (
                ye[Ve] === "*" &&
                ot[Fe] &&
                (this.options.dot || !ot[Fe].startsWith(".")) &&
                ot[Fe] !== "**"
              ) {
                if (At === "b") return !1;
                ((At = "a"), it.push(ye[Ve]), Ve++, Fe++);
              } else if (
                ot[Fe] === "*" &&
                ye[Ve] &&
                (this.options.dot || !ye[Ve].startsWith(".")) &&
                ye[Ve] !== "**"
              ) {
                if (At === "a") return !1;
                ((At = "b"), it.push(ot[Fe]), Ve++, Fe++);
              } else return !1;
            return ye.length === ot.length && it;
          }
          parseNegate() {
            if (this.nonegate) return;
            let ye = this.pattern,
              ot = !1,
              Ee = 0;
            for (let Ve = 0; Ve < ye.length && ye.charAt(Ve) === "!"; Ve++) ((ot = !ot), Ee++);
            (Ee && (this.pattern = ye.slice(Ee)), (this.negate = ot));
          }
          #h(ye, ot, Ee, Ve) {
            let Fe = 0,
              it = 0,
              At = this.isWindows ? le(ot) : -1,
              et = At === -1 ? -1 : le(Ee);
            if (et !== -1) {
              let ut = Ee[et],
                ht = Ee[et + 1];
              typeof ut != "string" || typeof ht != "string"
                ? ((Fe = At), (it = et))
                : ot[At].toLowerCase() === ut.toLowerCase() &&
                  ot[At + 1].toLowerCase() === ht.toLowerCase() &&
                  ((Fe = At + 2), (it = et + 2));
            } else if (this.isWindows) {
              let ut = typeof ye[0] == "string" && /^[a-z]:$/i.test(ye[0]),
                ht = !ut && ye[0] === "" && ye[1] === "" && ye[2] === "?" && /^[a-z]:$/i.test(ye[3]),
                Et = typeof Ee[0] == "string" && /^[a-z]:$/i.test(Ee[0]),
                tr =
                  !Et &&
                  Ee[0] === "" &&
                  Ee[1] === "" &&
                  Ee[2] === "?" &&
                  typeof Ee[3] == "string" &&
                  /^[a-z]:$/i.test(Ee[3]),
                Rr = ht ? 3 : ut ? 0 : void 0,
                Vt = tr ? 3 : Et ? 0 : void 0;
              if (typeof Rr == "number" && typeof Vt == "number") {
                let [Br, Dt] = [ye[Rr], Ee[Vt]];
                Br.toLowerCase() === Dt.toLowerCase() && ((it = Vt + 1), (Fe = Rr + 1));
              }
            }
            return (
              (ye = ot),
              Ee.includes(e.GLOBSTAR) ? this.#_(ye, Ee, Ve, Fe, it) : this.#g(ye, Ee, Ve, Fe, it)
            );
          }
          #_(ye, ot, Ee, Ve, Fe) {
            let { head: it, body: At, tail: et, segments: ut } = this.#y(ot, Ee, Fe);
            if (it.length) {
              let Et = Ve + it.length;
              if (!this.#g(ye, it, Ee, Ve, 0, Et)) return !1;
              ((Ve += it.length), (Fe += it.length));
            }
            let ht = 0;
            if (et.length) {
              if (et.length + Ve > ye.length) return !1;
              let Et = ye.length - et.length;
              if (this.#g(ye, et, Ee, Et, 0)) ht = et.length;
              else {
                if (
                  ye[ye.length - 1] !== "" ||
                  Ve + et.length === ye.length ||
                  (Et--, !this.#g(ye, et, Ee, Et, 0))
                )
                  return !1;
                ht = et.length + 1;
              }
            }
            if (!At.length) {
              let Et = !!ht;
              for (let tr = Ve; tr < ye.length - ht; tr++) {
                let Rr = String(ye[tr]);
                if (((Et = !0), Rr === "." || Rr === ".." || (!this.options.dot && Rr.startsWith("."))))
                  return !1;
              }
              return Ee || Et;
            }
            return !!this.#I(ye, ut, ye.length - ht, Ve, 0, Ee, 0, !!ht, new Set());
          }
          #y(ye, ot, Ee) {
            let Ve = this.#H.get(ye);
            Ve || ((Ve = []), this.#H.set(ye, Ve));
            let Fe = Ee * 2 + (ot ? 1 : 0),
              it = Ve[Fe];
            if (it) return it;
            let At = ye.indexOf(e.GLOBSTAR, Ee),
              et = ye.lastIndexOf(e.GLOBSTAR),
              ut = ye.slice(Ee, At),
              ht = ye.slice(At + 1, ot ? void 0 : et),
              Et = ot ? [] : ye.slice(et + 1),
              tr = [[[], 0]],
              Rr = tr[0],
              Vt = 0,
              Br = [0];
            for (let St of ht)
              St === e.GLOBSTAR ? (Br.push(Vt), (Rr = [[], 0]), tr.push(Rr)) : (Rr[0].push(St), Vt++);
            tr.forEach((St, wt) => {
              St[1] = Vt - Br[wt];
            });
            let Dt = { head: ut, body: ht, tail: Et, segments: tr };
            return ((Ve[Fe] = Dt), Dt);
          }
          #I(ye, ot, Ee, Ve, Fe, it, At, et, ut) {
            let ht = ot[Fe];
            if (!ht) {
              if (it) return Ve >= Ee || (Ve === Ee - 1 && ye[Ve] === "");
              for (let Vt = Ve; Vt < Ee; Vt++) {
                et = !0;
                let Br = ye[Vt];
                if (Br === "." || Br === ".." || (!this.options.dot && Br.startsWith("."))) return !1;
              }
              return et;
            }
            let [Et, tr] = ht,
              Rr = it ? Ee : Ee - tr;
            for (; Ve <= Rr;) {
              let Vt = Fe * (ye.length + 1) + Ve;
              if (ut.has(Vt)) return !1;
              if (
                (ut.add(Vt), this.#g(ye, Et, it, Ve, 0, Ve + Et.length) && At < this.maxGlobstarRecursion)
              ) {
                let Dt = this.#I(ye, ot, Ee, Ve + Et.length, Fe + 1, it, At + 1, et, ut);
                if (Dt !== !1) return Dt;
              }
              if (Ve === Rr) break;
              let Br = ye[Ve];
              if (Br === "." || Br === ".." || (!this.options.dot && Br.startsWith("."))) return !1;
              Ve++;
            }
            return it || null;
          }
          #g(ye, ot, Ee, Ve, Fe, it = ye.length) {
            let At, et, ut, ht;
            for (
              At = Ve, et = Fe, ht = Math.min(it, ye.length), ut = ot.length;
              At < ht && et < ut;
              At++, et++
            ) {
              let Et = ot[et],
                tr = ye[At];
              if (Et === !1 || Et === e.GLOBSTAR || !Z(Et, tr)) return !1;
            }
            if (At === ht && et === ut) return !0;
            if (At === ht) return Ee;
            if (et === ut) return At === ht - 1 && ye[At] === "";
            throw Error("wtf?");
          }
          braceExpand() {
            return (0, e.braceExpand)(this.pattern, this.options);
          }
          parse(ye) {
            (0, s.assertValidPattern)(ye);
            let ot = this.options;
            if (ye === "**") return e.GLOBSTAR;
            if (ye === "") return "";
            let { nocase: Ee, nocaseMagicOnly: Ve, noext: Fe = !1, dot: it, normalize: At } = ot,
              et = O(ye, Fe);
            if (et !== void 0 && !(Ee && !Ve && ye.toUpperCase() !== ye.toLowerCase())) return this.#f(et);
            let ut = this.#c.get(ye);
            return (
              ut ||
                ((ut = new r.Matcher(ye, { nocase: Ee, noext: Fe, dot: it, normalize: At })),
                this.#c.set(ye, ut)),
              ut
            );
          }
          #E(ye) {
            return this.preserveMultipleSlashes
              ? ye.split("/")
              : this.isWindows && /^\/\/[^/]+/.test(ye)
                ? ["", ...ye.split(/\/+/)]
                : ye.split(/\/+/);
          }
          match(ye, ot = this.partial) {
            if (this.comment) return !1;
            if (this.empty) return ye === "";
            if (ye === "/" && ot) return !0;
            let Ee = this.options,
              Ve = this.#L(ye);
            if (!Ve) {
              if (!ot && !this.#n && (this.#e || this.#r) && q !== ye) {
                q = ye;
                let ut = this.#A(ye);
                if (ut === "no") return Ee.flipNegate ? !1 : this.negate;
                if (ut === "yes") return Ee.flipNegate ? !0 : !this.negate;
              }
              Ve = this.#$(ye);
            }
            let Fe = Ve.parts,
              it = this.#t ? (Ve.resolved ??= this.#p(Fe)) : Fe,
              At = this.set,
              et = Fe[Fe.length - 1];
            if (!et) for (let ut = Fe.length - 2; !et && ut >= 0; ut--) et = Fe[ut];
            for (let ut = 0; ut < At.length; ut++) {
              let ht = At[ut],
                Et = ot ? void 0 : this.#s[ut];
              if (
                Et === "base"
                  ? Z(ht[0], et)
                  : Et
                    ? this.#o(it, ht, Et)
                    : Ee.matchBase && ht.length === 1
                      ? this.#h([et], [et], ht, ot)
                      : this.#h(Fe, it, ht, ot)
              )
                return Ee.flipNegate ? !0 : !this.negate;
            }
            return Ee.flipNegate ? !1 : this.negate;
          }
          static defaults(ye) {
            return e.minimatch.defaults(ye).Minimatch;
          }
        };
      e.Minimatch = _e;
      var we = eKn();
      Object.defineProperty(e, "escape", {
        enumerable: !0,
        get: function () {
          return we.escape;
        },
      });
      var Pe = tKn();
      (Object.defineProperty(e, "unescape", {
        enumerable: !0,
        get: function () {
          return Pe.unescape;
        },
      }),
        (e.minimatch.Minimatch = _e),
        (e.minimatch.escape = a.escape),
        (e.minimatch.unescape = H.unescape));
    }),
    dwo = tb((e) => {
      var t = (O, B) => () => (B || O((B = { exports: {} }).exports, B), B.exports),
        r = t((O) => {
          (Object.defineProperty(O, "__esModule", { value: !0 }), (O.tracing = O.metrics = void 0));
          var B = cr("diagnostics_channel");
          ((O.metrics = (0, B.channel)("lru-cache:metrics")),
            (O.tracing = (0, B.tracingChannel)("lru-cache")));
        }),
        s = t((O) => {
          (Object.defineProperty(O, "__esModule", { value: !0 }),
            (O.defaultPerf = void 0),
            (O.defaultPerf =
              typeof performance == "object" && performance && typeof performance.now == "function"
                ? performance
                : Date));
        });
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.LRUCache = void 0));
      var a = r(),
        H = s(),
        u = () => a.metrics.hasSubscribers || a.tracing.hasSubscribers,
        f = new Set(),
        d = typeof process == "object" && process ? process : {},
        _ = (O, B, V, q) => {
          typeof d.emitWarning == "function" ? d.emitWarning(O, B, V, q) : console.error(`[${V}] ${B}: ${O}`);
        },
        L = (O) => !f.has(O),
        I = (O) => !!O && O === Math.floor(O) && O > 0 && isFinite(O),
        D = (O) =>
          I(O)
            ? O <= Math.pow(2, 8)
              ? Uint8Array
              : O <= Math.pow(2, 16)
                ? Uint16Array
                : O <= Math.pow(2, 32)
                  ? Uint32Array
                  : O <= Number.MAX_SAFE_INTEGER
                    ? S
                    : null
            : null,
        S = class extends Array {
          constructor(O) {
            (super(O), this.fill(0));
          }
        },
        T = class O {
          heap;
          length;
          static #e = !1;
          static create(B) {
            let V = D(B);
            if (!V) return [];
            O.#e = !0;
            let q = new O(B, V);
            return ((O.#e = !1), q);
          }
          constructor(B, V) {
            if (!O.#e) throw TypeError("instantiate Stack using Stack.create(n)");
            ((this.heap = new V(B)), (this.length = 0));
          }
          push(B) {
            this.heap[this.length++] = B;
          }
          pop() {
            return this.heap[--this.length];
          }
        },
        C = class O {
          #e;
          #r;
          #t;
          #n;
          #i;
          #s;
          #a;
          #c;
          get perf() {
            return this.#c;
          }
          ttl;
          ttlResolution;
          ttlAutopurge;
          updateAgeOnGet;
          updateAgeOnHas;
          allowStale;
          noDisposeOnSet;
          noUpdateTTL;
          maxEntrySize;
          sizeCalculation;
          noDeleteOnFetchRejection;
          noDeleteOnStaleGet;
          allowStaleOnFetchAbort;
          allowStaleOnFetchRejection;
          ignoreFetchAbort;
          backgroundFetchSize;
          #H;
          #f;
          #l;
          #A;
          #o;
          #m;
          #L;
          #$;
          #p;
          #h;
          #_;
          #y;
          #I;
          #g;
          #E;
          #D;
          #b;
          #u;
          #j;
          static unsafeExposeInternals(B) {
            return {
              starts: B.#I,
              ttls: B.#g,
              autopurgeTimers: B.#E,
              sizes: B.#y,
              keyMap: B.#l,
              keyList: B.#A,
              valList: B.#o,
              next: B.#m,
              prev: B.#L,
              get head() {
                return B.#$;
              },
              get tail() {
                return B.#p;
              },
              free: B.#h,
              isBackgroundFetch: (V) => B.#d(V),
              backgroundFetch: (V, q, Z, se) => B.#N(V, q, Z, se),
              moveToTail: (V) => B.#G(V),
              indexes: (V) => B.#S(V),
              rindexes: (V) => B.#v(V),
              isStale: (V) => B.#M(V),
            };
          }
          get max() {
            return this.#e;
          }
          get maxSize() {
            return this.#r;
          }
          get calculatedSize() {
            return this.#f;
          }
          get size() {
            return this.#H;
          }
          get fetchMethod() {
            return this.#s;
          }
          get memoMethod() {
            return this.#a;
          }
          get dispose() {
            return this.#t;
          }
          get onInsert() {
            return this.#n;
          }
          get disposeAfter() {
            return this.#i;
          }
          constructor(B) {
            let {
              max: V = 0,
              ttl: q,
              ttlResolution: Z = 1,
              ttlAutopurge: se,
              updateAgeOnGet: ae,
              updateAgeOnHas: z,
              allowStale: Ae,
              dispose: le,
              onInsert: Be,
              disposeAfter: Te,
              noDisposeOnSet: Lt,
              noUpdateTTL: Ht,
              maxSize: Se = 0,
              maxEntrySize: _e = 0,
              sizeCalculation: we,
              fetchMethod: Pe,
              memoMethod: ye,
              noDeleteOnFetchRejection: ot,
              noDeleteOnStaleGet: Ee,
              allowStaleOnFetchRejection: Ve,
              allowStaleOnFetchAbort: Fe,
              ignoreFetchAbort: it,
              backgroundFetchSize: At = 1,
              perf: et,
            } = B;
            if (((this.backgroundFetchSize = At), et !== void 0 && typeof et?.now != "function"))
              throw TypeError("perf option must have a now() method if specified");
            if (((this.#c = et ?? H.defaultPerf), V !== 0 && !I(V)))
              throw TypeError("max option must be a nonnegative integer");
            let ut = V ? D(V) : Array;
            if (!ut) throw Error("invalid max value: " + V);
            if (
              ((this.#e = V),
              (this.#r = Se),
              (this.maxEntrySize = _e || this.#r),
              (this.sizeCalculation = we),
              this.sizeCalculation)
            ) {
              if (!this.#r && !this.maxEntrySize)
                throw TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
              if (typeof this.sizeCalculation != "function")
                throw TypeError("sizeCalculation set to non-function");
            }
            if (ye !== void 0 && typeof ye != "function")
              throw TypeError("memoMethod must be a function if defined");
            if (((this.#a = ye), Pe !== void 0 && typeof Pe != "function"))
              throw TypeError("fetchMethod must be a function if specified");
            if (
              ((this.#s = Pe),
              (this.#b = !!Pe),
              (this.#l = new Map()),
              (this.#A = Array.from({ length: V }).fill(void 0)),
              (this.#o = Array.from({ length: V }).fill(void 0)),
              (this.#m = new ut(V)),
              (this.#L = new ut(V)),
              (this.#$ = 0),
              (this.#p = 0),
              (this.#h = T.create(V)),
              (this.#H = 0),
              (this.#f = 0),
              typeof le == "function" && (this.#t = le),
              typeof Be == "function" && (this.#n = Be),
              typeof Te == "function"
                ? ((this.#i = Te), (this.#_ = []))
                : ((this.#i = void 0), (this.#_ = void 0)),
              (this.#D = !!this.#t),
              (this.#j = !!this.#n),
              (this.#u = !!this.#i),
              (this.noDisposeOnSet = !!Lt),
              (this.noUpdateTTL = !!Ht),
              (this.noDeleteOnFetchRejection = !!ot),
              (this.allowStaleOnFetchRejection = !!Ve),
              (this.allowStaleOnFetchAbort = !!Fe),
              (this.ignoreFetchAbort = !!it),
              this.maxEntrySize !== 0)
            ) {
              if (this.#r !== 0 && !I(this.#r))
                throw TypeError("maxSize must be a positive integer if specified");
              if (!I(this.maxEntrySize))
                throw TypeError("maxEntrySize must be a positive integer if specified");
              this.#V();
            }
            if (
              ((this.allowStale = !!Ae),
              (this.noDeleteOnStaleGet = !!Ee),
              (this.updateAgeOnGet = !!ae),
              (this.updateAgeOnHas = !!z),
              (this.ttlResolution = I(Z) || Z === 0 ? Z : 1),
              (this.ttlAutopurge = !!se),
              (this.ttl = q || 0),
              this.ttl)
            ) {
              if (!I(this.ttl)) throw TypeError("ttl must be a positive integer if specified");
              this.#P();
            }
            if (this.#e === 0 && this.ttl === 0 && this.#r === 0)
              throw TypeError("At least one of max, maxSize, or ttl is required");
            if (!this.ttlAutopurge && !this.#e && !this.#r) {
              let ht = "LRU_CACHE_UNBOUNDED";
              L(ht) &&
                (f.add(ht),
                _(
                  "TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.",
                  "UnboundedCacheWarning",
                  ht,
                  O,
                ));
            }
          }
          getRemainingTTL(B) {
            return this.#l.has(B) ? 1 / 0 : 0;
          }
          #P() {
            let B = new S(this.#e),
              V = new S(this.#e);
            ((this.#g = B), (this.#I = V));
            let q = this.ttlAutopurge ? Array.from({ length: this.#e }) : void 0;
            ((this.#E = q),
              (this.#U = (Ae, le, Be = this.#c.now()) => {
                ((V[Ae] = le !== 0 ? Be : 0), (B[Ae] = le), Z(Ae, le));
              }),
              (this.#x = (Ae) => {
                ((V[Ae] = B[Ae] !== 0 ? this.#c.now() : 0), Z(Ae, B[Ae]));
              }));
            let Z = this.ttlAutopurge
              ? (Ae, le) => {
                  if ((q?.[Ae] && (clearTimeout(q[Ae]), (q[Ae] = void 0)), le && le !== 0 && q)) {
                    let Be = setTimeout(() => {
                      this.#M(Ae) ? (this.#O(this.#A[Ae], "expire"), (q[Ae] = void 0)) : Z(Ae, z(Ae));
                    }, le + 1);
                    (Be.unref && Be.unref(), (q[Ae] = Be));
                  }
                }
              : () => {};
            this.#T = (Ae, le) => {
              if (B[le]) {
                let Be = B[le],
                  Te = V[le];
                if (!Be || !Te) return;
                ((Ae.ttl = Be), (Ae.start = Te), (Ae.now = se || ae()));
                let Lt = Ae.now - Te;
                Ae.remainingTTL = Be - Lt;
              }
            };
            let se = 0,
              ae = () => {
                let Ae = this.#c.now();
                if (this.ttlResolution > 0) {
                  se = Ae;
                  let le = setTimeout(() => (se = 0), this.ttlResolution);
                  le.unref && le.unref();
                }
                return Ae;
              };
            this.getRemainingTTL = (Ae) => {
              let le = this.#l.get(Ae);
              return le === void 0 ? 0 : z(le);
            };
            let z = (Ae) => {
              let le = B[Ae],
                Be = V[Ae];
              if (!le || !Be) return 1 / 0;
              let Te = (se || ae()) - Be;
              return le - Te;
            };
            this.#M = (Ae) => {
              let le = V[Ae],
                Be = B[Ae];
              return !!Be && !!le && (se || ae()) - le > Be;
            };
          }
          #x = () => {};
          #T = () => {};
          #U = () => {};
          #M = () => !1;
          #V() {
            let B = new S(this.#e);
            ((this.#f = 0),
              (this.#y = B),
              (this.#w = (V) => {
                ((this.#f -= B[V]), (B[V] = 0));
              }),
              (this.#F = (V, q, Z, se) => {
                if (!I(Z)) {
                  if (this.#d(q)) return this.backgroundFetchSize;
                  if (se) {
                    if (typeof se != "function") throw TypeError("sizeCalculation must be a function");
                    if (((Z = se(q, V)), !I(Z)))
                      throw TypeError("sizeCalculation return invalid (expect positive integer)");
                  } else
                    throw TypeError(
                      "invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.",
                    );
                }
                return Z;
              }),
              (this.#C = (V, q, Z) => {
                if (((B[V] = q), this.#r)) {
                  let se = this.#r - B[V];
                  for (; this.#f > se;) this.#R(!0);
                }
                ((this.#f += B[V]), Z && ((Z.entrySize = q), (Z.totalCalculatedSize = this.#f)));
              }));
          }
          #w = (B) => {};
          #C = (B, V, q) => {};
          #F = (B, V, q, Z) => {
            if (q || Z) throw TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
            return 0;
          };
          *#S({ allowStale: B = this.allowStale } = {}) {
            if (this.#H)
              for (let V = this.#p; this.#B(V) && ((B || !this.#M(V)) && (yield V), V !== this.#$);)
                V = this.#L[V];
          }
          *#v({ allowStale: B = this.allowStale } = {}) {
            if (this.#H)
              for (let V = this.#$; this.#B(V) && ((B || !this.#M(V)) && (yield V), V !== this.#p);)
                V = this.#m[V];
          }
          #B(B) {
            return B !== void 0 && this.#l.get(this.#A[B]) === B;
          }
          *entries() {
            for (let B of this.#S())
              this.#o[B] !== void 0 &&
                this.#A[B] !== void 0 &&
                !this.#d(this.#o[B]) &&
                (yield [this.#A[B], this.#o[B]]);
          }
          *rentries() {
            for (let B of this.#v())
              this.#o[B] !== void 0 &&
                this.#A[B] !== void 0 &&
                !this.#d(this.#o[B]) &&
                (yield [this.#A[B], this.#o[B]]);
          }
          *keys() {
            for (let B of this.#S()) {
              let V = this.#A[B];
              V !== void 0 && !this.#d(this.#o[B]) && (yield V);
            }
          }
          *rkeys() {
            for (let B of this.#v()) {
              let V = this.#A[B];
              V !== void 0 && !this.#d(this.#o[B]) && (yield V);
            }
          }
          *values() {
            for (let B of this.#S()) this.#o[B] !== void 0 && !this.#d(this.#o[B]) && (yield this.#o[B]);
          }
          *rvalues() {
            for (let B of this.#v()) this.#o[B] !== void 0 && !this.#d(this.#o[B]) && (yield this.#o[B]);
          }
          [Symbol.iterator]() {
            return this.entries();
          }
          [Symbol.toStringTag] = "LRUCache";
          find(B, V = {}) {
            for (let q of this.#S()) {
              let Z = this.#o[q],
                se = this.#d(Z) ? Z.__staleWhileFetching : Z;
              if (se !== void 0 && B(se, this.#A[q], this)) return this.#q(this.#A[q], V);
            }
          }
          forEach(B, V = this) {
            for (let q of this.#S()) {
              let Z = this.#o[q],
                se = this.#d(Z) ? Z.__staleWhileFetching : Z;
              se !== void 0 && B.call(V, se, this.#A[q], this);
            }
          }
          rforEach(B, V = this) {
            for (let q of this.#v()) {
              let Z = this.#o[q],
                se = this.#d(Z) ? Z.__staleWhileFetching : Z;
              se !== void 0 && B.call(V, se, this.#A[q], this);
            }
          }
          purgeStale() {
            let B = !1;
            for (let V of this.#v({ allowStale: !0 }))
              this.#M(V) && (this.#O(this.#A[V], "expire"), (B = !0));
            return B;
          }
          info(B) {
            let V = this.#l.get(B);
            if (V === void 0) return;
            let q = this.#o[V],
              Z = this.#d(q) ? q.__staleWhileFetching : q;
            if (Z === void 0) return;
            let se = { value: Z };
            if (this.#g && this.#I) {
              let ae = this.#g[V],
                z = this.#I[V];
              if (ae && z) {
                let Ae = ae - (this.#c.now() - z);
                ((se.ttl = Ae), (se.start = Date.now()));
              }
            }
            return (this.#y && (se.size = this.#y[V]), se);
          }
          dump() {
            let B = [];
            for (let V of this.#S({ allowStale: !0 })) {
              let q = this.#A[V],
                Z = this.#o[V],
                se = this.#d(Z) ? Z.__staleWhileFetching : Z;
              if (se === void 0 || q === void 0) continue;
              let ae = { value: se };
              if (this.#g && this.#I) {
                ae.ttl = this.#g[V];
                let z = this.#c.now() - this.#I[V];
                ae.start = Math.floor(Date.now() - z);
              }
              (this.#y && (ae.size = this.#y[V]), B.unshift([q, ae]));
            }
            return B;
          }
          load(B) {
            this.clear();
            for (let [V, q] of B) {
              if (q.start) {
                let Z = Date.now() - q.start;
                q.start = this.#c.now() - Z;
              }
              this.#k(V, q.value, q);
            }
          }
          set(B, V, q = {}) {
            let { status: Z = a.metrics.hasSubscribers ? {} : void 0 } = q;
            ((q.status = Z),
              Z && ((Z.op = "set"), (Z.key = B), V !== void 0 && (Z.value = V), (Z.cache = this)));
            let se = this.#k(B, V, q);
            return (Z && a.metrics.hasSubscribers && a.metrics.publish(Z), se);
          }
          #k(B, V, q, Z) {
            let {
                ttl: se = this.ttl,
                start: ae,
                noDisposeOnSet: z = this.noDisposeOnSet,
                sizeCalculation: Ae = this.sizeCalculation,
                status: le,
              } = q,
              Be = this.#d(V);
            if (V === void 0) return (le && (le.set = "deleted"), this.delete(B), this);
            let { noUpdateTTL: Te = this.noUpdateTTL } = q;
            le && !Be && (le.value = V);
            let Lt = this.#F(B, V, q.size || 0, Ae, le);
            if (this.maxEntrySize && Lt > this.maxEntrySize)
              return (this.#O(B, "set"), le && ((le.set = "miss"), (le.maxEntrySizeExceeded = !0)), this);
            let Ht = this.#H === 0 ? void 0 : this.#l.get(B);
            if (Ht === void 0)
              ((Ht =
                this.#H === 0
                  ? this.#p
                  : this.#h.length !== 0
                    ? this.#h.pop()
                    : this.#H === this.#e
                      ? this.#R(!1)
                      : this.#H),
                (this.#A[Ht] = B),
                (this.#o[Ht] = V),
                this.#l.set(B, Ht),
                (this.#m[this.#p] = Ht),
                (this.#L[Ht] = this.#p),
                (this.#p = Ht),
                this.#H++,
                this.#C(Ht, Lt, le),
                le && (le.set = "add"),
                (Te = !1),
                this.#j && !Be && this.#n?.(V, B, "add"));
            else {
              this.#G(Ht);
              let Se = this.#o[Ht];
              if (V !== Se) {
                if (!z)
                  if (this.#d(Se)) {
                    Se !== Z && Se.__abortController.abort(Error("replaced"));
                    let { __staleWhileFetching: _e } = Se;
                    _e !== void 0 &&
                      _e !== V &&
                      (this.#D && this.#t?.(_e, B, "set"), this.#u && this.#_?.push([_e, B, "set"]));
                  } else (this.#D && this.#t?.(Se, B, "set"), this.#u && this.#_?.push([Se, B, "set"]));
                if ((this.#w(Ht), this.#C(Ht, Lt, le), (this.#o[Ht] = V), !Be)) {
                  let _e = Se && this.#d(Se) ? Se.__staleWhileFetching : Se,
                    we = _e === void 0 ? "add" : V !== _e ? "replace" : "update";
                  (le && ((le.set = we), _e !== void 0 && (le.oldValue = _e)),
                    this.#j && this.onInsert?.(V, B, we));
                }
              } else Be || (le && (le.set = "update"), this.#j && this.onInsert?.(V, B, "update"));
            }
            if (
              (se !== 0 && !this.#g && this.#P(),
              this.#g && (Te || this.#U(Ht, se, ae), le && this.#T(le, Ht)),
              !z && this.#u && this.#_)
            ) {
              let Se = this.#_,
                _e;
              for (; (_e = Se?.shift());) this.#i?.(..._e);
            }
            return this;
          }
          pop() {
            try {
              for (; this.#H;) {
                let B = this.#o[this.#$];
                if ((this.#R(!0), this.#d(B))) {
                  if (B.__staleWhileFetching) return B.__staleWhileFetching;
                } else if (B !== void 0) return B;
              }
            } finally {
              if (this.#u && this.#_) {
                let B = this.#_,
                  V;
                for (; (V = B?.shift());) this.#i?.(...V);
              }
            }
          }
          #R(B) {
            let V = this.#$,
              q = this.#A[V],
              Z = this.#o[V],
              se = this.#d(Z);
            se && Z.__abortController.abort(Error("evicted"));
            let ae = se ? Z.__staleWhileFetching : Z;
            return (
              (this.#D || this.#u) &&
                ae !== void 0 &&
                (this.#D && this.#t?.(ae, q, "evict"), this.#u && this.#_?.push([ae, q, "evict"])),
              this.#w(V),
              this.#E?.[V] && (clearTimeout(this.#E[V]), (this.#E[V] = void 0)),
              B && ((this.#A[V] = void 0), (this.#o[V] = void 0), this.#h.push(V)),
              this.#H === 1 ? ((this.#$ = this.#p = 0), (this.#h.length = 0)) : (this.#$ = this.#m[V]),
              this.#l.delete(q),
              this.#H--,
              V
            );
          }
          has(B, V = {}) {
            let { status: q = a.metrics.hasSubscribers ? {} : void 0 } = V;
            ((V.status = q), q && ((q.op = "has"), (q.key = B), (q.cache = this)));
            let Z = this.#J(B, V);
            return (a.metrics.hasSubscribers && a.metrics.publish(q), Z);
          }
          #J(B, V = {}) {
            let { updateAgeOnHas: q = this.updateAgeOnHas, status: Z } = V,
              se = this.#l.get(B);
            if (se !== void 0) {
              let ae = this.#o[se];
              if (this.#d(ae) && ae.__staleWhileFetching === void 0) return !1;
              if (this.#M(se)) Z && ((Z.has = "stale"), this.#T(Z, se));
              else return (q && this.#x(se), Z && ((Z.has = "hit"), this.#T(Z, se)), !0);
            } else Z && (Z.has = "miss");
            return !1;
          }
          peek(B, V = {}) {
            let { status: q = u() ? {} : void 0 } = V;
            (q && ((q.op = "peek"), (q.key = B), (q.cache = this)), (V.status = q));
            let Z = this.#X(B, V);
            return (a.metrics.hasSubscribers && a.metrics.publish(q), Z);
          }
          #X(B, V) {
            let { status: q, allowStale: Z = this.allowStale } = V,
              se = this.#l.get(B);
            if (se === void 0 || (!Z && this.#M(se))) {
              q && (q.peek = se === void 0 ? "miss" : "stale");
              return;
            }
            let ae = this.#o[se],
              z = this.#d(ae) ? ae.__staleWhileFetching : ae;
            return (q && (z !== void 0 ? ((q.peek = "hit"), (q.value = z)) : (q.peek = "miss")), z);
          }
          #N(B, V, q, Z) {
            let se = V === void 0 ? void 0 : this.#o[V];
            if (this.#d(se)) return se;
            let ae = new AbortController(),
              { signal: z } = q;
            z?.addEventListener("abort", () => ae.abort(z.reason), { signal: ae.signal });
            let Ae = { signal: ae.signal, options: q, context: Z },
              le = (_e, we = !1) => {
                let { aborted: Pe } = ae.signal,
                  ye = q.ignoreFetchAbort && _e !== void 0,
                  ot = q.ignoreFetchAbort || !!(q.allowStaleOnFetchAbort && _e !== void 0);
                if (
                  (q.status &&
                    (Pe && !we
                      ? ((q.status.fetchAborted = !0),
                        (q.status.fetchError = ae.signal.reason),
                        ye && (q.status.fetchAbortIgnored = !0))
                      : (q.status.fetchResolved = !0)),
                  Pe && !ye && !we)
                )
                  return Te(ae.signal.reason, ot);
                let Ee = Ht,
                  Ve = this.#o[V];
                return (
                  (Ve === Ht || (Ve === void 0 && ye && we)) &&
                    (_e === void 0
                      ? Ee.__staleWhileFetching !== void 0
                        ? (this.#o[V] = Ee.__staleWhileFetching)
                        : this.#O(B, "fetch")
                      : (q.status && (q.status.fetchUpdated = !0), this.#k(B, _e, Ae.options, Ee))),
                  _e
                );
              },
              Be = (_e) => (
                q.status && ((q.status.fetchRejected = !0), (q.status.fetchError = _e)),
                Te(_e, !1)
              ),
              Te = (_e, we) => {
                let { aborted: Pe } = ae.signal,
                  ye = Pe && q.allowStaleOnFetchAbort,
                  ot = ye || q.allowStaleOnFetchRejection,
                  Ee = ot || q.noDeleteOnFetchRejection,
                  Ve = Ht;
                if (
                  (this.#o[V] === Ht &&
                    (!Ee || (!we && Ve.__staleWhileFetching === void 0)
                      ? this.#O(B, "fetch")
                      : ye || (this.#o[V] = Ve.__staleWhileFetching)),
                  ot)
                )
                  return (
                    q.status && Ve.__staleWhileFetching !== void 0 && (q.status.returnedStale = !0),
                    Ve.__staleWhileFetching
                  );
                if (Ve.__returned === Ve) throw _e;
              },
              Lt = (_e, we) => {
                let Pe = this.#s?.(B, se, Ae);
                (ae.signal.addEventListener("abort", () => {
                  (!q.ignoreFetchAbort || q.allowStaleOnFetchAbort) &&
                    (_e(void 0), q.allowStaleOnFetchAbort && (_e = (ye) => le(ye, !0)));
                }),
                  Pe && Pe instanceof Promise
                    ? Pe.then((ye) => _e(ye === void 0 ? void 0 : ye), we)
                    : Pe !== void 0 && _e(Pe));
              };
            q.status && (q.status.fetchDispatched = !0);
            let Ht = new Promise(Lt).then(le, Be),
              Se = Object.assign(Ht, { __abortController: ae, __staleWhileFetching: se, __returned: void 0 });
            return (
              V === void 0
                ? (this.#k(B, Se, { ...Ae.options, status: void 0 }), (V = this.#l.get(B)))
                : (this.#o[V] = Se),
              Se
            );
          }
          #d(B) {
            if (!this.#b) return !1;
            let V = B;
            return (
              !!V &&
              V instanceof Promise &&
              V.hasOwnProperty("__staleWhileFetching") &&
              V.__abortController instanceof AbortController
            );
          }
          fetch(B, V = {}) {
            let q = a.tracing.hasSubscribers,
              { status: Z = u() ? {} : void 0 } = V;
            ((V.status = Z), Z && V.context && (Z.context = V.context));
            let se = this.#K(B, V);
            return (Z && q && ((Z.trace = !0), a.tracing.tracePromise(() => se, Z).catch(() => {})), se);
          }
          async #K(B, V = {}) {
            let {
              allowStale: q = this.allowStale,
              updateAgeOnGet: Z = this.updateAgeOnGet,
              noDeleteOnStaleGet: se = this.noDeleteOnStaleGet,
              ttl: ae = this.ttl,
              noDisposeOnSet: z = this.noDisposeOnSet,
              size: Ae = 0,
              sizeCalculation: le = this.sizeCalculation,
              noUpdateTTL: Be = this.noUpdateTTL,
              noDeleteOnFetchRejection: Te = this.noDeleteOnFetchRejection,
              allowStaleOnFetchRejection: Lt = this.allowStaleOnFetchRejection,
              ignoreFetchAbort: Ht = this.ignoreFetchAbort,
              allowStaleOnFetchAbort: Se = this.allowStaleOnFetchAbort,
              context: _e,
              forceRefresh: we = !1,
              status: Pe,
              signal: ye,
            } = V;
            if (
              (Pe && ((Pe.op = "fetch"), (Pe.key = B), we && (Pe.forceRefresh = !0), (Pe.cache = this)),
              !this.#b)
            )
              return (
                Pe && (Pe.fetch = "get"),
                this.#q(B, { allowStale: q, updateAgeOnGet: Z, noDeleteOnStaleGet: se, status: Pe })
              );
            let ot = {
                allowStale: q,
                updateAgeOnGet: Z,
                noDeleteOnStaleGet: se,
                ttl: ae,
                noDisposeOnSet: z,
                size: Ae,
                sizeCalculation: le,
                noUpdateTTL: Be,
                noDeleteOnFetchRejection: Te,
                allowStaleOnFetchRejection: Lt,
                allowStaleOnFetchAbort: Se,
                ignoreFetchAbort: Ht,
                status: Pe,
                signal: ye,
              },
              Ee = this.#l.get(B);
            if (Ee === void 0) {
              Pe && (Pe.fetch = "miss");
              let Ve = this.#N(B, Ee, ot, _e);
              return (Ve.__returned = Ve);
            } else {
              let Ve = this.#o[Ee];
              if (this.#d(Ve)) {
                let et = q && Ve.__staleWhileFetching !== void 0;
                return (
                  Pe && ((Pe.fetch = "inflight"), et && (Pe.returnedStale = !0)),
                  et ? Ve.__staleWhileFetching : (Ve.__returned = Ve)
                );
              }
              let Fe = this.#M(Ee);
              if (!we && !Fe)
                return (Pe && (Pe.fetch = "hit"), this.#G(Ee), Z && this.#x(Ee), Pe && this.#T(Pe, Ee), Ve);
              let it = this.#N(B, Ee, ot, _e),
                At = it.__staleWhileFetching !== void 0 && q;
              return (
                Pe && ((Pe.fetch = Fe ? "stale" : "refresh"), At && Fe && (Pe.returnedStale = !0)),
                At ? it.__staleWhileFetching : (it.__returned = it)
              );
            }
          }
          forceFetch(B, V = {}) {
            let q = a.tracing.hasSubscribers,
              { status: Z = u() ? {} : void 0 } = V;
            ((V.status = Z), Z && V.context && (Z.context = V.context));
            let se = this.#W(B, V);
            return (Z && q && ((Z.trace = !0), a.tracing.tracePromise(() => se, Z).catch(() => {})), se);
          }
          async #W(B, V = {}) {
            let q = await this.#K(B, V);
            if (q === void 0) throw Error("fetch() returned undefined");
            return q;
          }
          memo(B, V = {}) {
            let { status: q = a.metrics.hasSubscribers ? {} : void 0 } = V;
            ((V.status = q),
              q && ((q.op = "memo"), (q.key = B), V.context && (q.context = V.context), (q.cache = this)));
            let Z = this.#Y(B, V);
            return (q && (q.value = Z), a.metrics.hasSubscribers && a.metrics.publish(q), Z);
          }
          #Y(B, V = {}) {
            let q = this.#a;
            if (!q) throw Error("no memoMethod provided to constructor");
            let { context: Z, status: se, forceRefresh: ae, ...z } = V;
            se && ae && (se.forceRefresh = !0);
            let Ae = this.#q(B, z),
              le = ae || Ae === void 0;
            if ((se && ((se.memo = le ? "miss" : "hit"), le || (se.value = Ae)), !le)) return Ae;
            let Be = q(B, Ae, { options: z, context: Z });
            return (se && (se.value = Be), this.#k(B, Be, z), Be);
          }
          get(B, V = {}) {
            let { status: q = a.metrics.hasSubscribers ? {} : void 0 } = V;
            ((V.status = q), q && ((q.op = "get"), (q.key = B), (q.cache = this)));
            let Z = this.#q(B, V);
            return (
              q && (Z !== void 0 && (q.value = Z), a.metrics.hasSubscribers && a.metrics.publish(q)),
              Z
            );
          }
          #q(B, V = {}) {
            let {
                allowStale: q = this.allowStale,
                updateAgeOnGet: Z = this.updateAgeOnGet,
                noDeleteOnStaleGet: se = this.noDeleteOnStaleGet,
                status: ae,
              } = V,
              z = this.#l.get(B);
            if (z === void 0) {
              ae && (ae.get = "miss");
              return;
            }
            let Ae = this.#o[z],
              le = this.#d(Ae);
            return (
              ae && this.#T(ae, z),
              this.#M(z)
                ? le
                  ? (ae && (ae.get = "stale-fetching"),
                    q && Ae.__staleWhileFetching !== void 0
                      ? (ae && (ae.returnedStale = !0), Ae.__staleWhileFetching)
                      : void 0)
                  : (se || this.#O(B, "expire"),
                    ae && (ae.get = "stale"),
                    q ? (ae && (ae.returnedStale = !0), Ae) : void 0)
                : (ae && (ae.get = le ? "fetching" : "hit"),
                  this.#G(z),
                  Z && this.#x(z),
                  le ? Ae.__staleWhileFetching : Ae)
            );
          }
          #z(B, V) {
            ((this.#L[V] = B), (this.#m[B] = V));
          }
          #G(B) {
            B !== this.#p &&
              (B === this.#$ ? (this.#$ = this.#m[B]) : this.#z(this.#L[B], this.#m[B]),
              this.#z(this.#p, B),
              (this.#p = B));
          }
          delete(B) {
            return this.#O(B, "delete");
          }
          #O(B, V) {
            a.metrics.hasSubscribers && a.metrics.publish({ op: "delete", delete: V, key: B, cache: this });
            let q = !1;
            if (this.#H !== 0) {
              let Z = this.#l.get(B);
              if (Z !== void 0)
                if (
                  (this.#E?.[Z] && (clearTimeout(this.#E[Z]), (this.#E[Z] = void 0)), (q = !0), this.#H === 1)
                )
                  this.#Q(V);
                else {
                  this.#w(Z);
                  let se = this.#o[Z];
                  if (
                    (this.#d(se)
                      ? se.__abortController.abort(Error("deleted"))
                      : (this.#D || this.#u) &&
                        (this.#D && this.#t?.(se, B, V), this.#u && this.#_?.push([se, B, V])),
                    this.#l.delete(B),
                    (this.#A[Z] = void 0),
                    (this.#o[Z] = void 0),
                    Z === this.#p)
                  )
                    this.#p = this.#L[Z];
                  else if (Z === this.#$) this.#$ = this.#m[Z];
                  else {
                    let ae = this.#L[Z];
                    this.#m[ae] = this.#m[Z];
                    let z = this.#m[Z];
                    this.#L[z] = this.#L[Z];
                  }
                  (this.#H--, this.#h.push(Z));
                }
            }
            if (this.#u && this.#_?.length) {
              let Z = this.#_,
                se;
              for (; (se = Z?.shift());) this.#i?.(...se);
            }
            return q;
          }
          clear() {
            return this.#Q("delete");
          }
          #Q(B) {
            for (let V of this.#v({ allowStale: !0 })) {
              let q = this.#o[V];
              if (this.#d(q)) q.__abortController.abort(Error("deleted"));
              else {
                let Z = this.#A[V];
                (this.#D && this.#t?.(q, Z, B), this.#u && this.#_?.push([q, Z, B]));
              }
            }
            if ((this.#l.clear(), this.#o.fill(void 0), this.#A.fill(void 0), this.#g && this.#I)) {
              (this.#g.fill(0), this.#I.fill(0));
              for (let V of this.#E ?? []) V !== void 0 && clearTimeout(V);
              this.#E?.fill(void 0);
            }
            if (
              (this.#y && this.#y.fill(0),
              (this.#$ = 0),
              (this.#p = 0),
              (this.#h.length = 0),
              (this.#f = 0),
              (this.#H = 0),
              this.#u && this.#_)
            ) {
              let V = this.#_,
                q;
              for (; (q = V?.shift());) this.#i?.(...q);
            }
          }
        };
      e.LRUCache = C;
    }),
    iKn = tb((e) => {
      var t =
        (e && e.__importDefault) ||
        function (St) {
          return St && St.__esModule ? St : { default: St };
        };
      (Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.Minipass = e.isWritable = e.isReadable = e.isStream = void 0));
      var r = typeof process == "object" && process ? process : { stdout: null, stderr: null },
        s = cr("events"),
        a = t(cr("stream")),
        H = cr("string_decoder"),
        u = (St) =>
          !!St &&
          typeof St == "object" &&
          (St instanceof Dt || St instanceof a.default || (0, e.isReadable)(St) || (0, e.isWritable)(St));
      e.isStream = u;
      var f = (St) =>
        !!St &&
        typeof St == "object" &&
        St instanceof s.EventEmitter &&
        typeof St.pipe == "function" &&
        St.pipe !== a.default.Writable.prototype.pipe;
      e.isReadable = f;
      var d = (St) =>
        !!St &&
        typeof St == "object" &&
        St instanceof s.EventEmitter &&
        typeof St.write == "function" &&
        typeof St.end == "function";
      e.isWritable = d;
      var _ = Symbol("EOF"),
        L = Symbol("maybeEmitEnd"),
        I = Symbol("emittedEnd"),
        D = Symbol("emittingEnd"),
        S = Symbol("emittedError"),
        T = Symbol("closed"),
        C = Symbol("read"),
        O = Symbol("flush"),
        B = Symbol("flushChunk"),
        V = Symbol("encoding"),
        q = Symbol("decoder"),
        Z = Symbol("flowing"),
        se = Symbol("paused"),
        ae = Symbol("resume"),
        z = Symbol("buffer"),
        Ae = Symbol("pipes"),
        le = Symbol("bufferLength"),
        Be = Symbol("bufferPush"),
        Te = Symbol("bufferShift"),
        Lt = Symbol("objectMode"),
        Ht = Symbol("destroyed"),
        Se = Symbol("error"),
        _e = Symbol("emitData"),
        we = Symbol("emitEnd"),
        Pe = Symbol("emitEnd2"),
        ye = Symbol("async"),
        ot = Symbol("abort"),
        Ee = Symbol("aborted"),
        Ve = Symbol("signal"),
        Fe = Symbol("dataListeners"),
        it = Symbol("discarded"),
        At = (St) => Promise.resolve().then(St),
        et = (St) => St(),
        ut = (St) => St === "end" || St === "finish" || St === "prefinish",
        ht = (St) =>
          St instanceof ArrayBuffer ||
          (!!St &&
            typeof St == "object" &&
            St.constructor &&
            St.constructor.name === "ArrayBuffer" &&
            St.byteLength >= 0),
        Et = (St) => !Buffer.isBuffer(St) && ArrayBuffer.isView(St),
        tr = class {
          src;
          dest;
          opts;
          ondrain;
          constructor(St, wt, Qr) {
            ((this.src = St),
              (this.dest = wt),
              (this.opts = Qr),
              (this.ondrain = () => St[ae]()),
              this.dest.on("drain", this.ondrain));
          }
          unpipe() {
            this.dest.removeListener("drain", this.ondrain);
          }
          proxyErrors(St) {}
          end() {
            (this.unpipe(), this.opts.end && this.dest.end());
          }
        },
        Rr = class extends tr {
          unpipe() {
            (this.src.removeListener("error", this.proxyErrors), super.unpipe());
          }
          constructor(St, wt, Qr) {
            (super(St, wt, Qr),
              (this.proxyErrors = (Li) => this.dest.emit("error", Li)),
              St.on("error", this.proxyErrors));
          }
        },
        Vt = (St) => !!St.objectMode,
        Br = (St) => !St.objectMode && !!St.encoding && St.encoding !== "buffer",
        Dt = class extends s.EventEmitter {
          [Z] = !1;
          [se] = !1;
          [Ae] = [];
          [z] = [];
          [Lt];
          [V];
          [ye];
          [q];
          [_] = !1;
          [I] = !1;
          [D] = !1;
          [T] = !1;
          [S] = null;
          [le] = 0;
          [Ht] = !1;
          [Ve];
          [Ee] = !1;
          [Fe] = 0;
          [it] = !1;
          writable = !0;
          readable = !0;
          constructor(...St) {
            let wt = St[0] || {};
            if ((super(), wt.objectMode && typeof wt.encoding == "string"))
              throw TypeError("Encoding and objectMode may not be used together");
            (Vt(wt)
              ? ((this[Lt] = !0), (this[V] = null))
              : Br(wt)
                ? ((this[V] = wt.encoding), (this[Lt] = !1))
                : ((this[Lt] = !1), (this[V] = null)),
              (this[ye] = !!wt.async),
              (this[q] = this[V] ? new H.StringDecoder(this[V]) : null),
              wt &&
                wt.debugExposeBuffer === !0 &&
                Object.defineProperty(this, "buffer", { get: () => this[z] }),
              wt &&
                wt.debugExposePipes === !0 &&
                Object.defineProperty(this, "pipes", { get: () => this[Ae] }));
            let { signal: Qr } = wt;
            Qr && ((this[Ve] = Qr), Qr.aborted ? this[ot]() : Qr.addEventListener("abort", () => this[ot]()));
          }
          get bufferLength() {
            return this[le];
          }
          get encoding() {
            return this[V];
          }
          set encoding(St) {
            throw Error("Encoding must be set at instantiation time");
          }
          setEncoding(St) {
            throw Error("Encoding must be set at instantiation time");
          }
          get objectMode() {
            return this[Lt];
          }
          set objectMode(St) {
            throw Error("objectMode must be set at instantiation time");
          }
          get async() {
            return this[ye];
          }
          set async(St) {
            this[ye] = this[ye] || !!St;
          }
          [ot]() {
            ((this[Ee] = !0), this.emit("abort", this[Ve]?.reason), this.destroy(this[Ve]?.reason));
          }
          get aborted() {
            return this[Ee];
          }
          set aborted(St) {}
          write(St, wt, Qr) {
            if (this[Ee]) return !1;
            if (this[_]) throw Error("write after end");
            if (this[Ht])
              return (
                this.emit(
                  "error",
                  Object.assign(Error("Cannot call write after a stream was destroyed"), {
                    code: "ERR_STREAM_DESTROYED",
                  }),
                ),
                !0
              );
            (typeof wt == "function" && ((Qr = wt), (wt = "utf8")), wt || (wt = "utf8"));
            let Li = this[ye] ? At : et;
            if (!this[Lt] && !Buffer.isBuffer(St)) {
              if (Et(St)) St = Buffer.from(St.buffer, St.byteOffset, St.byteLength);
              else if (ht(St)) St = Buffer.from(St);
              else if (typeof St != "string")
                throw Error("Non-contiguous data written to non-objectMode stream");
            }
            return this[Lt]
              ? (this[Z] && this[le] !== 0 && this[O](!0),
                this[Z] ? this.emit("data", St) : this[Be](St),
                this[le] !== 0 && this.emit("readable"),
                Qr && Li(Qr),
                this[Z])
              : St.length
                ? (typeof St == "string" &&
                    !(wt === this[V] && !this[q]?.lastNeed) &&
                    (St = Buffer.from(St, wt)),
                  Buffer.isBuffer(St) && this[V] && (St = this[q].write(St)),
                  this[Z] && this[le] !== 0 && this[O](!0),
                  this[Z] ? this.emit("data", St) : this[Be](St),
                  this[le] !== 0 && this.emit("readable"),
                  Qr && Li(Qr),
                  this[Z])
                : (this[le] !== 0 && this.emit("readable"), Qr && Li(Qr), this[Z]);
          }
          read(St) {
            if (this[Ht]) return null;
            if (((this[it] = !1), this[le] === 0 || St === 0 || (St && St > this[le])))
              return (this[L](), null);
            (this[Lt] && (St = null),
              this[z].length > 1 &&
                !this[Lt] &&
                (this[z] = [this[V] ? this[z].join("") : Buffer.concat(this[z], this[le])]));
            let wt = this[C](St || null, this[z][0]);
            return (this[L](), wt);
          }
          [C](St, wt) {
            if (this[Lt]) this[Te]();
            else {
              let Qr = wt;
              St === Qr.length || St === null
                ? this[Te]()
                : typeof Qr == "string"
                  ? ((this[z][0] = Qr.slice(St)), (wt = Qr.slice(0, St)), (this[le] -= St))
                  : ((this[z][0] = Qr.subarray(St)), (wt = Qr.subarray(0, St)), (this[le] -= St));
            }
            return (this.emit("data", wt), !this[z].length && !this[_] && this.emit("drain"), wt);
          }
          end(St, wt, Qr) {
            return (
              typeof St == "function" && ((Qr = St), (St = void 0)),
              typeof wt == "function" && ((Qr = wt), (wt = "utf8")),
              St !== void 0 && this.write(St, wt),
              Qr && this.once("end", Qr),
              (this[_] = !0),
              (this.writable = !1),
              (this[Z] || !this[se]) && this[L](),
              this
            );
          }
          [ae]() {
            this[Ht] ||
              (!this[Fe] && !this[Ae].length && (this[it] = !0),
              (this[se] = !1),
              (this[Z] = !0),
              this.emit("resume"),
              this[z].length ? this[O]() : this[_] ? this[L]() : this.emit("drain"));
          }
          resume() {
            return this[ae]();
          }
          pause() {
            ((this[Z] = !1), (this[se] = !0), (this[it] = !1));
          }
          get destroyed() {
            return this[Ht];
          }
          get flowing() {
            return this[Z];
          }
          get paused() {
            return this[se];
          }
          [Be](St) {
            (this[Lt] ? (this[le] += 1) : (this[le] += St.length), this[z].push(St));
          }
          [Te]() {
            return (this[Lt] ? (this[le] -= 1) : (this[le] -= this[z][0].length), this[z].shift());
          }
          [O](St = !1) {
            do;
            while (this[B](this[Te]()) && this[z].length);
            !St && !this[z].length && !this[_] && this.emit("drain");
          }
          [B](St) {
            return (this.emit("data", St), this[Z]);
          }
          pipe(St, wt) {
            if (this[Ht]) return St;
            this[it] = !1;
            let Qr = this[I];
            return (
              (wt = wt || {}),
              St === r.stdout || St === r.stderr ? (wt.end = !1) : (wt.end = wt.end !== !1),
              (wt.proxyErrors = !!wt.proxyErrors),
              Qr
                ? wt.end && St.end()
                : (this[Ae].push(wt.proxyErrors ? new Rr(this, St, wt) : new tr(this, St, wt)),
                  this[ye] ? At(() => this[ae]()) : this[ae]()),
              St
            );
          }
          unpipe(St) {
            let wt = this[Ae].find((Qr) => Qr.dest === St);
            wt &&
              (this[Ae].length === 1
                ? (this[Z] && this[Fe] === 0 && (this[Z] = !1), (this[Ae] = []))
                : this[Ae].splice(this[Ae].indexOf(wt), 1),
              wt.unpipe());
          }
          addListener(St, wt) {
            return this.on(St, wt);
          }
          on(St, wt) {
            let Qr = super.on(St, wt);
            if (St === "data") ((this[it] = !1), this[Fe]++, !this[Ae].length && !this[Z] && this[ae]());
            else if (St === "readable" && this[le] !== 0) super.emit("readable");
            else if (ut(St) && this[I]) (super.emit(St), this.removeAllListeners(St));
            else if (St === "error" && this[S]) {
              let Li = wt;
              this[ye] ? At(() => Li.call(this, this[S])) : Li.call(this, this[S]);
            }
            return Qr;
          }
          removeListener(St, wt) {
            return this.off(St, wt);
          }
          off(St, wt) {
            let Qr = super.off(St, wt);
            return (
              St === "data" &&
                ((this[Fe] = this.listeners("data").length),
                this[Fe] === 0 && !this[it] && !this[Ae].length && (this[Z] = !1)),
              Qr
            );
          }
          removeAllListeners(St) {
            let wt = super.removeAllListeners(St);
            return (
              (St === "data" || St === void 0) &&
                ((this[Fe] = 0), !this[it] && !this[Ae].length && (this[Z] = !1)),
              wt
            );
          }
          get emittedEnd() {
            return this[I];
          }
          [L]() {
            !this[D] &&
              !this[I] &&
              !this[Ht] &&
              this[z].length === 0 &&
              this[_] &&
              ((this[D] = !0),
              this.emit("end"),
              this.emit("prefinish"),
              this.emit("finish"),
              this[T] && this.emit("close"),
              (this[D] = !1));
          }
          emit(St, ...wt) {
            let Qr = wt[0];
            if (St !== "error" && St !== "close" && St !== Ht && this[Ht]) return !1;
            if (St === "data")
              return !this[Lt] && !Qr ? !1 : this[ye] ? (At(() => this[_e](Qr)), !0) : this[_e](Qr);
            if (St === "end") return this[we]();
            if (St === "close") {
              if (((this[T] = !0), !this[I] && !this[Ht])) return !1;
              let sr = super.emit("close");
              return (this.removeAllListeners("close"), sr);
            } else if (St === "error") {
              ((this[S] = Qr), super.emit(Se, Qr));
              let sr = !this[Ve] || this.listeners("error").length ? super.emit("error", Qr) : !1;
              return (this[L](), sr);
            } else if (St === "resume") {
              let sr = super.emit("resume");
              return (this[L](), sr);
            } else if (St === "finish" || St === "prefinish") {
              let sr = super.emit(St);
              return (this.removeAllListeners(St), sr);
            }
            let Li = super.emit(St, ...wt);
            return (this[L](), Li);
          }
          [_e](St) {
            for (let Qr of this[Ae]) Qr.dest.write(St) === !1 && this.pause();
            let wt = this[it] ? !1 : super.emit("data", St);
            return (this[L](), wt);
          }
          [we]() {
            return this[I]
              ? !1
              : ((this[I] = !0), (this.readable = !1), this[ye] ? (At(() => this[Pe]()), !0) : this[Pe]());
          }
          [Pe]() {
            if (this[q]) {
              let wt = this[q].end();
              if (wt) {
                for (let Qr of this[Ae]) Qr.dest.write(wt);
                this[it] || super.emit("data", wt);
              }
            }
            for (let wt of this[Ae]) wt.end();
            let St = super.emit("end");
            return (this.removeAllListeners("end"), St);
          }
          async collect() {
            let St = Object.assign([], { dataLength: 0 });
            this[Lt] || (St.dataLength = 0);
            let wt = this.promise();
            return (
              this.on("data", (Qr) => {
                (St.push(Qr), this[Lt] || (St.dataLength += Qr.length));
              }),
              await wt,
              St
            );
          }
          async concat() {
            if (this[Lt]) throw Error("cannot concat in objectMode");
            let St = await this.collect();
            return this[V] ? St.join("") : Buffer.concat(St, St.dataLength);
          }
          async promise() {
            return new Promise((St, wt) => {
              (this.on(Ht, () => wt(Error("stream destroyed"))),
                this.on("error", (Qr) => wt(Qr)),
                this.on("end", () => St()));
            });
          }
          [Symbol.asyncIterator]() {
            this[it] = !1;
            let St = !1,
              wt = async () => (this.pause(), (St = !0), { value: void 0, done: !0 });
            return {
              next: () => {
                if (St) return wt();
                let Qr = this.read();
                if (Qr !== null) return Promise.resolve({ done: !1, value: Qr });
                if (this[_]) return wt();
                let Li,
                  sr,
                  Mt = (Mn) => {
                    (this.off("data", Lr), this.off("end", Tr), this.off(Ht, Dn), wt(), sr(Mn));
                  },
                  Lr = (Mn) => {
                    (this.off("error", Mt),
                      this.off("end", Tr),
                      this.off(Ht, Dn),
                      this.pause(),
                      Li({ value: Mn, done: !!this[_] }));
                  },
                  Tr = () => {
                    (this.off("error", Mt),
                      this.off("data", Lr),
                      this.off(Ht, Dn),
                      wt(),
                      Li({ done: !0, value: void 0 }));
                  },
                  Dn = () => Mt(Error("stream destroyed"));
                return new Promise((Mn, as) => {
                  ((sr = as),
                    (Li = Mn),
                    this.once(Ht, Dn),
                    this.once("error", Mt),
                    this.once("end", Tr),
                    this.once("data", Lr));
                });
              },
              throw: wt,
              return: wt,
              [Symbol.asyncIterator]() {
                return this;
              },
              [Symbol.asyncDispose]: async () => {},
            };
          }
          [Symbol.iterator]() {
            this[it] = !1;
            let St = !1,
              wt = () => (
                this.pause(),
                this.off(Se, wt),
                this.off(Ht, wt),
                this.off("end", wt),
                (St = !0),
                { done: !0, value: void 0 }
              ),
              Qr = () => {
                if (St) return wt();
                let Li = this.read();
                return Li === null ? wt() : { done: !1, value: Li };
              };
            return (
              this.once("end", wt),
              this.once(Se, wt),
              this.once(Ht, wt),
              {
                next: Qr,
                throw: wt,
                return: wt,
                [Symbol.iterator]() {
                  return this;
                },
                [Symbol.dispose]: () => {},
              }
            );
          }
          destroy(St) {
            if (this[Ht]) return (St ? this.emit("error", St) : this.emit(Ht), this);
            ((this[Ht] = !0), (this[it] = !0), (this[z].length = 0), (this[le] = 0));
            let wt = this;
            return (
              typeof wt.close == "function" && !this[T] && wt.close(),
              St ? this.emit("error", St) : this.emit(Ht),
              this
            );
          }
          static get isStream() {
            return e.isStream;
          }
        };
      e.Minipass = Dt;
    }),
    mwo = tb((e) => {
      var t =
          (e && e.__createBinding) ||
          (Object.create
            ? function (Mt, Lr, Tr, Dn) {
                Dn === void 0 && (Dn = Tr);
                var Mn = Object.getOwnPropertyDescriptor(Lr, Tr);
                ((!Mn || ("get" in Mn ? !Lr.__esModule : Mn.writable || Mn.configurable)) &&
                  (Mn = {
                    enumerable: !0,
                    get: function () {
                      return Lr[Tr];
                    },
                  }),
                  Object.defineProperty(Mt, Dn, Mn));
              }
            : function (Mt, Lr, Tr, Dn) {
                (Dn === void 0 && (Dn = Tr), (Mt[Dn] = Lr[Tr]));
              }),
        r =
          (e && e.__setModuleDefault) ||
          (Object.create
            ? function (Mt, Lr) {
                Object.defineProperty(Mt, "default", { enumerable: !0, value: Lr });
              }
            : function (Mt, Lr) {
                Mt.default = Lr;
              }),
        s =
          (e && e.__importStar) ||
          (function () {
            var Mt = function (Lr) {
              return (
                (Mt =
                  Object.getOwnPropertyNames ||
                  function (Tr) {
                    var Dn = [];
                    for (var Mn in Tr) Object.prototype.hasOwnProperty.call(Tr, Mn) && (Dn[Dn.length] = Mn);
                    return Dn;
                  }),
                Mt(Lr)
              );
            };
            return function (Lr) {
              if (Lr && Lr.__esModule) return Lr;
              var Tr = {};
              if (Lr != null)
                for (var Dn = Mt(Lr), Mn = 0; Mn < Dn.length; Mn++) Dn[Mn] !== "default" && t(Tr, Lr, Dn[Mn]);
              return (r(Tr, Lr), Tr);
            };
          })();
      (Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.PathScurry =
          e.Path =
          e.PathScurryDarwin =
          e.PathScurryPosix =
          e.PathScurryWin32 =
          e.PathScurryBase =
          e.PathPosix =
          e.PathWin32 =
          e.PathBase =
          e.ChildrenCache =
          e.ResolveCache =
            void 0));
      var a = dwo(),
        H = cr("path"),
        u = cr("url"),
        f = cr("fs"),
        d = s(cr("fs")),
        _ = f.realpathSync.native,
        L = cr("fs/promises"),
        I = iKn(),
        D = {
          lstatSync: f.lstatSync,
          readdir: f.readdir,
          readdirSync: f.readdirSync,
          readlinkSync: f.readlinkSync,
          realpathSync: _,
          promises: { lstat: L.lstat, readdir: L.readdir, readlink: L.readlink, realpath: L.realpath },
        },
        S = (Mt) =>
          !Mt || Mt === D || Mt === d ? D : { ...D, ...Mt, promises: { ...D.promises, ...Mt.promises } },
        T = /^\\\\\?\\([a-z]:)\\?$/i,
        C = /^\\\\\?\\UNC\\([^\\]+\\[^\\]+)\\?$/i,
        O = /^\\\\[^\\?]+\\[^\\]+$/,
        B = (Mt) => Mt.replace(/\//g, "\\").replace(T, "$1\\").replace(C, "\\\\$1\\").replace(O, "$&\\"),
        V = /^[\\/]{2}\?[\\/]unc[\\/][^\\/]+[\\/][^\\/]+(?:[\\/]|$)/i,
        q = /^[\\/]{2}\?[\\/](?=[a-z]:)/i,
        Z = /^[\\/]{2}\?[\\/]unc(?=[\\/][^\\/]+[\\/][^\\/])/i,
        se = /[\\/]/,
        ae = 0,
        z = 1,
        Ae = 2,
        le = 4,
        Be = 6,
        Te = 8,
        Lt = 10,
        Ht = 12,
        Se = 15,
        _e = ~Se,
        we = 16,
        Pe = 32,
        ye = 64,
        ot = 128,
        Ee = 256,
        Ve = 512,
        Fe = ye | ot | Ve,
        it = 1023,
        At = (Mt) =>
          Mt.isFile()
            ? Te
            : Mt.isDirectory()
              ? le
              : Mt.isSymbolicLink()
                ? Lt
                : Mt.isCharacterDevice()
                  ? Ae
                  : Mt.isBlockDevice()
                    ? Be
                    : Mt.isSocket()
                      ? Ht
                      : Mt.isFIFO()
                        ? z
                        : ae,
        et = new a.LRUCache({ max: 4096 }),
        ut = (Mt) => {
          let Lr = et.get(Mt);
          if (Lr) return Lr;
          let Tr = Mt.normalize("NFKD");
          return (et.set(Mt, Tr), Tr);
        },
        ht = new a.LRUCache({ max: 4096 }),
        Et = (Mt) => {
          let Lr = ht.get(Mt);
          if (Lr) return Lr;
          let Tr = ut(Mt.toLowerCase());
          return (ht.set(Mt, Tr), Tr);
        },
        tr = class extends a.LRUCache {
          constructor() {
            super({ max: 256 });
          }
        };
      e.ResolveCache = tr;
      var Rr = class extends a.LRUCache {
        constructor(Mt = 16384) {
          super({ maxSize: Mt, sizeCalculation: (Lr) => Lr.length + 1 });
        }
      };
      e.ChildrenCache = Rr;
      var Vt = Symbol("PathScurry setAsCwd"),
        Br = class {
          name;
          root;
          roots;
          parent;
          nocase;
          isCWD = !1;
          #e;
          #r;
          get dev() {
            return this.#r;
          }
          #t;
          get mode() {
            return this.#t;
          }
          #n;
          get nlink() {
            return this.#n;
          }
          #i;
          get uid() {
            return this.#i;
          }
          #s;
          get gid() {
            return this.#s;
          }
          #a;
          get rdev() {
            return this.#a;
          }
          #c;
          get blksize() {
            return this.#c;
          }
          #H;
          get ino() {
            return this.#H;
          }
          #f;
          get size() {
            return this.#f;
          }
          #l;
          get blocks() {
            return this.#l;
          }
          #A;
          get atimeMs() {
            return this.#A;
          }
          #o;
          get mtimeMs() {
            return this.#o;
          }
          #m;
          get ctimeMs() {
            return this.#m;
          }
          #L;
          get birthtimeMs() {
            return this.#L;
          }
          #$;
          get atime() {
            return this.#$;
          }
          #p;
          get mtime() {
            return this.#p;
          }
          #h;
          get ctime() {
            return this.#h;
          }
          #_;
          get birthtime() {
            return this.#_;
          }
          #y;
          #I;
          #g;
          #E;
          #D;
          #b;
          #u;
          #j;
          #P;
          #x;
          get parentPath() {
            return (this.parent || this).fullpath();
          }
          get path() {
            return this.parentPath;
          }
          constructor(Mt, Lr = ae, Tr, Dn, Mn, as, xi) {
            ((this.name = Mt),
              (this.#y = Mn ? Et(Mt) : ut(Mt)),
              (this.#u = Lr & it),
              (this.nocase = Mn),
              (this.roots = Dn),
              (this.root = Tr || this),
              (this.#j = as),
              (this.#g = xi.fullpath),
              (this.#D = xi.relative),
              (this.#b = xi.relativePosix),
              (this.parent = xi.parent),
              this.parent ? (this.#e = this.parent.#e) : (this.#e = S(xi.fs)));
          }
          get fs() {
            return this.#e;
          }
          depth() {
            return this.#I !== void 0
              ? this.#I
              : this.parent
                ? (this.#I = this.parent.depth() + 1)
                : (this.#I = 0);
          }
          childrenCache() {
            return this.#j;
          }
          resolve(Mt) {
            if (!Mt) return this;
            let Lr = this.getRootString(Mt),
              Tr = Mt.substring(Lr.length).split(this.splitSep);
            return Lr ? this.getRoot(Lr).#T(Tr) : this.#T(Tr);
          }
          #T(Mt) {
            let Lr = this;
            for (let Tr of Mt) Lr = Lr.child(Tr);
            return Lr;
          }
          children() {
            let Mt = this.#j.get(this);
            if (Mt) return Mt;
            let Lr = Object.assign([], { provisional: 0 });
            return (this.#j.set(this, Lr), (this.#u &= ~we), Lr);
          }
          child(Mt, Lr) {
            if (Mt === "" || Mt === ".") return this;
            if (Mt === "..") return this.parent || this;
            let Tr = this.children(),
              Dn = this.nocase ? Et(Mt) : ut(Mt);
            for (let go of Tr) if (go.#y === Dn) return go;
            let Mn = this.parent ? this.sep : "",
              as = this.#g ? this.#g + Mn + Mt : void 0,
              xi = this.newChild(Mt, ae, { ...Lr, parent: this, fullpath: as });
            return (this.canReaddir() || (xi.#u |= ot), Tr.push(xi), xi);
          }
          relative() {
            if (this.isCWD) return "";
            if (this.#D !== void 0) return this.#D;
            let Mt = this.name,
              Lr = this.parent;
            if (!Lr) return (this.#D = this.name);
            let Tr = Lr.relative();
            return Tr + (!Tr || !Lr.parent ? "" : this.sep) + Mt;
          }
          relativePosix() {
            if (this.sep === "/") return this.relative();
            if (this.isCWD) return "";
            if (this.#b !== void 0) return this.#b;
            let Mt = this.name,
              Lr = this.parent;
            if (!Lr) return (this.#b = this.fullpathPosix());
            let Tr = Lr.relativePosix();
            return Tr + (!Tr || !Lr.parent ? "" : "/") + Mt;
          }
          fullpath() {
            if (this.#g !== void 0) return this.#g;
            let Mt = this.name,
              Lr = this.parent;
            if (!Lr) return (this.#g = this.name);
            let Tr = Lr.fullpath() + (Lr.parent ? this.sep : "") + Mt;
            return (this.#g = Tr);
          }
          fullpathPosix() {
            if (this.#E !== void 0) return this.#E;
            if (this.sep === "/") return (this.#E = this.fullpath());
            if (!this.parent) {
              let Dn = this.fullpath().replace(/\\/g, "/");
              return /^[a-z]:\//i.test(Dn) ? (this.#E = `//?/${Dn}`) : (this.#E = Dn);
            }
            let Mt = this.parent,
              Lr = Mt.fullpathPosix(),
              Tr = Lr + (!Lr || !Mt.parent ? "" : "/") + this.name;
            return (this.#E = Tr);
          }
          isUnknown() {
            return (this.#u & Se) === ae;
          }
          isType(Mt) {
            return this[`is${Mt}`]();
          }
          getType() {
            return this.isUnknown()
              ? "Unknown"
              : this.isDirectory()
                ? "Directory"
                : this.isFile()
                  ? "File"
                  : this.isSymbolicLink()
                    ? "SymbolicLink"
                    : this.isFIFO()
                      ? "FIFO"
                      : this.isCharacterDevice()
                        ? "CharacterDevice"
                        : this.isBlockDevice()
                          ? "BlockDevice"
                          : this.isSocket()
                            ? "Socket"
                            : "Unknown";
          }
          isFile() {
            return (this.#u & Se) === Te;
          }
          isDirectory() {
            return (this.#u & Se) === le;
          }
          isCharacterDevice() {
            return (this.#u & Se) === Ae;
          }
          isBlockDevice() {
            return (this.#u & Se) === Be;
          }
          isFIFO() {
            return (this.#u & Se) === z;
          }
          isSocket() {
            return (this.#u & Se) === Ht;
          }
          isSymbolicLink() {
            return (this.#u & Lt) === Lt;
          }
          lstatCached() {
            return this.#u & Pe ? this : void 0;
          }
          readlinkCached() {
            return this.#P;
          }
          realpathCached() {
            return this.#x;
          }
          readdirCached() {
            let Mt = this.children();
            return Mt.slice(0, Mt.provisional);
          }
          canReadlink() {
            if (this.#P) return !0;
            if (!this.parent) return !1;
            let Mt = this.#u & Se;
            return !((Mt !== ae && Mt !== Lt) || this.#u & Ee || this.#u & ot);
          }
          calledReaddir() {
            return !!(this.#u & we);
          }
          isENOENT() {
            return !!(this.#u & ot);
          }
          isNamed(Mt) {
            return this.nocase ? this.#y === Et(Mt) : this.#y === ut(Mt);
          }
          async readlink() {
            let Mt = this.#P;
            if (Mt) return Mt;
            if (this.canReadlink() && this.parent)
              try {
                let Lr = await this.#e.promises.readlink(this.fullpath()),
                  Tr = (await this.parent.realpath())?.resolve(Lr);
                if (Tr) return (this.#P = Tr);
              } catch (Lr) {
                this.#v(Lr.code);
                return;
              }
          }
          readlinkSync() {
            let Mt = this.#P;
            if (Mt) return Mt;
            if (this.canReadlink() && this.parent)
              try {
                let Lr = this.#e.readlinkSync(this.fullpath()),
                  Tr = this.parent.realpathSync()?.resolve(Lr);
                if (Tr) return (this.#P = Tr);
              } catch (Lr) {
                this.#v(Lr.code);
                return;
              }
          }
          #U(Mt) {
            this.#u |= we;
            for (let Lr = Mt.provisional; Lr < Mt.length; Lr++) {
              let Tr = Mt[Lr];
              Tr && Tr.#M();
            }
          }
          #M() {
            this.#u & ot || ((this.#u = (this.#u | ot) & _e), this.#V());
          }
          #V() {
            let Mt = this.children();
            Mt.provisional = 0;
            for (let Lr of Mt) Lr.#M();
          }
          #w() {
            ((this.#u |= Ve), this.#C());
          }
          #C() {
            if (this.#u & ye) return;
            let Mt = this.#u;
            ((Mt & Se) === le && (Mt &= _e), (this.#u = Mt | ye), this.#V());
          }
          #F(Mt = "") {
            Mt === "ENOTDIR" || Mt === "EPERM"
              ? this.#C()
              : Mt === "ENOENT"
                ? this.#M()
                : (this.children().provisional = 0);
          }
          #S(Mt = "") {
            Mt === "ENOTDIR" ? this.parent.#C() : Mt === "ENOENT" && this.#M();
          }
          #v(Mt = "") {
            let Lr = this.#u;
            ((Lr |= Ee),
              Mt === "ENOENT" && (Lr |= ot),
              (Mt === "EINVAL" || Mt === "UNKNOWN") && (Lr &= _e),
              (this.#u = Lr),
              Mt === "ENOTDIR" && this.parent && this.parent.#C());
          }
          #B(Mt, Lr) {
            return this.#R(Mt, Lr) || this.#k(Mt, Lr);
          }
          #k(Mt, Lr) {
            let Tr = At(Mt),
              Dn = this.newChild(Mt.name, Tr, { parent: this }),
              Mn = Dn.#u & Se;
            return (
              Mn !== le && Mn !== Lt && Mn !== ae && (Dn.#u |= ye),
              Lr.unshift(Dn),
              Lr.provisional++,
              Dn
            );
          }
          #R(Mt, Lr) {
            for (let Tr = Lr.provisional; Tr < Lr.length; Tr++) {
              let Dn = Lr[Tr];
              if ((this.nocase ? Et(Mt.name) : ut(Mt.name)) === Dn.#y) return this.#J(Mt, Dn, Tr, Lr);
            }
          }
          #J(Mt, Lr, Tr, Dn) {
            let Mn = Lr.name;
            return (
              (Lr.#u = (Lr.#u & _e) | At(Mt)),
              Mn !== Mt.name && (Lr.name = Mt.name),
              Tr !== Dn.provisional && (Tr === Dn.length - 1 ? Dn.pop() : Dn.splice(Tr, 1), Dn.unshift(Lr)),
              Dn.provisional++,
              Lr
            );
          }
          async lstat() {
            if ((this.#u & ot) === 0)
              try {
                return (this.#X(await this.#e.promises.lstat(this.fullpath())), this);
              } catch (Mt) {
                this.#S(Mt.code);
              }
          }
          lstatSync() {
            if ((this.#u & ot) === 0)
              try {
                return (this.#X(this.#e.lstatSync(this.fullpath())), this);
              } catch (Mt) {
                this.#S(Mt.code);
              }
          }
          #X(Mt) {
            let {
              atime: Lr,
              atimeMs: Tr,
              birthtime: Dn,
              birthtimeMs: Mn,
              blksize: as,
              blocks: xi,
              ctime: go,
              ctimeMs: Fo,
              dev: en,
              gid: gr,
              ino: Ei,
              mode: kr,
              mtime: Wi,
              mtimeMs: oo,
              nlink: $o,
              rdev: La,
              size: mA,
              uid: Bs,
            } = Mt;
            ((this.#$ = Lr),
              (this.#A = Tr),
              (this.#_ = Dn),
              (this.#L = Mn),
              (this.#c = as),
              (this.#l = xi),
              (this.#h = go),
              (this.#m = Fo),
              (this.#r = en),
              (this.#s = gr),
              (this.#H = Ei),
              (this.#t = kr),
              (this.#p = Wi),
              (this.#o = oo),
              (this.#n = $o),
              (this.#a = La),
              (this.#f = mA),
              (this.#i = Bs));
            let iH = At(Mt);
            ((this.#u = (this.#u & _e) | iH | Pe), iH !== ae && iH !== le && iH !== Lt && (this.#u |= ye));
          }
          #N = [];
          #d = !1;
          #K(Mt) {
            this.#d = !1;
            let Lr = this.#N.slice();
            ((this.#N.length = 0), Lr.forEach((Tr) => Tr(null, Mt)));
          }
          readdirCB(Mt, Lr = !1) {
            if (!this.canReaddir()) {
              Lr ? Mt(null, []) : queueMicrotask(() => Mt(null, []));
              return;
            }
            let Tr = this.children();
            if (this.calledReaddir()) {
              let Mn = Tr.slice(0, Tr.provisional);
              Lr ? Mt(null, Mn) : queueMicrotask(() => Mt(null, Mn));
              return;
            }
            if ((this.#N.push(Mt), this.#d)) return;
            this.#d = !0;
            let Dn = this.fullpath();
            this.#e.readdir(Dn, { withFileTypes: !0 }, (Mn, as) => {
              if (Mn) (this.#F(Mn.code), (Tr.provisional = 0));
              else {
                for (let xi of as) this.#B(xi, Tr);
                this.#U(Tr);
              }
              this.#K(Tr.slice(0, Tr.provisional));
            });
          }
          #W;
          async readdir() {
            if (!this.canReaddir()) return [];
            let Mt = this.children();
            if (this.calledReaddir()) return Mt.slice(0, Mt.provisional);
            let Lr = this.fullpath();
            if (this.#W) await this.#W;
            else {
              let Tr = () => {};
              this.#W = new Promise((Dn) => (Tr = Dn));
              try {
                for (let Dn of await this.#e.promises.readdir(Lr, { withFileTypes: !0 })) this.#B(Dn, Mt);
                this.#U(Mt);
              } catch (Dn) {
                (this.#F(Dn.code), (Mt.provisional = 0));
              }
              ((this.#W = void 0), Tr());
            }
            return Mt.slice(0, Mt.provisional);
          }
          readdirSync() {
            if (!this.canReaddir()) return [];
            let Mt = this.children();
            if (this.calledReaddir()) return Mt.slice(0, Mt.provisional);
            let Lr = this.fullpath();
            try {
              for (let Tr of this.#e.readdirSync(Lr, { withFileTypes: !0 })) this.#B(Tr, Mt);
              this.#U(Mt);
            } catch (Tr) {
              (this.#F(Tr.code), (Mt.provisional = 0));
            }
            return Mt.slice(0, Mt.provisional);
          }
          canReaddir() {
            if (this.#u & Fe) return !1;
            let Mt = Se & this.#u;
            return Mt === ae || Mt === le || Mt === Lt;
          }
          shouldWalk(Mt, Lr) {
            return (this.#u & le) === le && !(this.#u & Fe) && !Mt.has(this) && (!Lr || Lr(this));
          }
          async realpath() {
            if (this.#x) return this.#x;
            if (!((Ve | Ee | ot) & this.#u))
              try {
                let Mt = await this.#e.promises.realpath(this.fullpath());
                return (this.#x = this.resolve(Mt));
              } catch {
                this.#w();
              }
          }
          realpathSync() {
            if (this.#x) return this.#x;
            if (!((Ve | Ee | ot) & this.#u))
              try {
                let Mt = this.#e.realpathSync(this.fullpath());
                return (this.#x = this.resolve(Mt));
              } catch {
                this.#w();
              }
          }
          [Vt](Mt) {
            if (Mt === this) return;
            ((Mt.isCWD = !1), (this.isCWD = !0));
            let Lr = new Set([]),
              Tr = [],
              Dn = this;
            for (; Dn && Dn.parent;)
              (Lr.add(Dn),
                (Dn.#D = Tr.join(this.sep)),
                (Dn.#b = Tr.join("/")),
                (Dn = Dn.parent),
                Tr.push(".."));
            for (Dn = Mt; Dn && Dn.parent && !Lr.has(Dn);)
              ((Dn.#D = void 0), (Dn.#b = void 0), (Dn = Dn.parent));
          }
        };
      e.PathBase = Br;
      var Dt = class Mt extends Br {
        sep = "\\";
        splitSep = se;
        constructor(Lr, Tr = ae, Dn, Mn, as, xi, go) {
          super(Lr, Tr, Dn, Mn, as, xi, go);
        }
        newChild(Lr, Tr = ae, Dn = {}) {
          return new Mt(Lr, Tr, this.root, this.roots, this.nocase, this.childrenCache(), Dn);
        }
        getRootString(Lr) {
          return V.exec(Lr)?.[0] ?? H.win32.parse(Lr).root;
        }
        getRoot(Lr) {
          if (((Lr = B(Lr.toUpperCase())), Lr === this.root.name || /^[\\/]$/.test(Lr))) return this.root;
          for (let [Tr, Dn] of Object.entries(this.roots))
            if (this.sameRoot(Lr, Tr)) return (this.roots[Lr] = Dn);
          return (this.roots[Lr] = new Qr(Lr, { nocase: this.nocase, fs: this.fs }).root);
        }
        sameRoot(Lr, Tr = this.root.name) {
          return B(Lr.toUpperCase()) === Tr;
        }
      };
      e.PathWin32 = Dt;
      var St = class Mt extends Br {
        splitSep = "/";
        sep = "/";
        constructor(Lr, Tr = ae, Dn, Mn, as, xi, go) {
          super(Lr, Tr, Dn, Mn, as, xi, go);
        }
        getRootString(Lr) {
          return Lr.startsWith("/") ? "/" : "";
        }
        getRoot(Lr) {
          return this.root;
        }
        newChild(Lr, Tr = ae, Dn = {}) {
          return new Mt(Lr, Tr, this.root, this.roots, this.nocase, this.childrenCache(), Dn);
        }
      };
      e.PathPosix = St;
      var wt = class {
        root;
        rootPath;
        roots;
        cwd;
        #e;
        #r;
        #t;
        nocase;
        #n;
        constructor(
          Mt = process.cwd(),
          Lr,
          Tr,
          { nocase: Dn, childrenCacheSize: Mn = 16384, fs: as = D } = {},
        ) {
          ((this.#n = S(as)),
            (Mt instanceof URL || Mt.startsWith("file://")) && (Mt = (0, u.fileURLToPath)(Mt)));
          let xi = Lr.resolve(Mt);
          ((this.roots = Object.create(null)),
            (this.rootPath = this.parseRootPath(xi)),
            (this.#e = new tr()),
            (this.#r = new tr()),
            (this.#t = new Rr(Mn)));
          let go = xi.substring(this.rootPath.length).split(Tr);
          if ((go.length === 1 && !go[0] && go.pop(), Dn === void 0))
            throw TypeError("must provide nocase setting to PathScurryBase ctor");
          ((this.nocase = Dn), (this.root = this.newRoot(this.#n)), (this.roots[this.rootPath] = this.root));
          let Fo = this.root,
            en = go.length - 1,
            gr = Lr.sep,
            Ei = this.rootPath,
            kr = !1;
          for (let Wi of go) {
            let oo = en--;
            ((Fo = Fo.child(Wi, {
              relative: Array(oo).fill("..").join(gr),
              relativePosix: Array(oo).fill("..").join("/"),
              fullpath: (Ei += (kr ? "" : gr) + Wi),
            })),
              (kr = !0));
          }
          this.cwd = Fo;
        }
        depth(Mt = this.cwd) {
          return (typeof Mt == "string" && (Mt = this.cwd.resolve(Mt)), Mt.depth());
        }
        childrenCache() {
          return this.#t;
        }
        resolve(...Mt) {
          let Lr = "";
          for (let Mn = Mt.length - 1; Mn >= 0; Mn--) {
            let as = Mt[Mn];
            if (!(!as || as === ".") && ((Lr = Lr ? `${as}/${Lr}` : as), this.isAbsolute(as))) break;
          }
          let Tr = this.#e.get(Lr);
          if (Tr !== void 0) return Tr;
          let Dn = this.cwd.resolve(Lr).fullpath();
          return (this.#e.set(Lr, Dn), Dn);
        }
        resolvePosix(...Mt) {
          let Lr = "";
          for (let Mn = Mt.length - 1; Mn >= 0; Mn--) {
            let as = Mt[Mn];
            if (!(!as || as === ".") && ((Lr = Lr ? `${as}/${Lr}` : as), this.isAbsolute(as))) break;
          }
          let Tr = this.#r.get(Lr);
          if (Tr !== void 0) return Tr;
          let Dn = this.cwd.resolve(Lr).fullpathPosix();
          return (this.#r.set(Lr, Dn), Dn);
        }
        relative(Mt = this.cwd) {
          return (typeof Mt == "string" && (Mt = this.cwd.resolve(Mt)), Mt.relative());
        }
        relativePosix(Mt = this.cwd) {
          return (typeof Mt == "string" && (Mt = this.cwd.resolve(Mt)), Mt.relativePosix());
        }
        basename(Mt = this.cwd) {
          return (typeof Mt == "string" && (Mt = this.cwd.resolve(Mt)), Mt.name);
        }
        dirname(Mt = this.cwd) {
          return (typeof Mt == "string" && (Mt = this.cwd.resolve(Mt)), (Mt.parent || Mt).fullpath());
        }
        async readdir(Mt = this.cwd, Lr = { withFileTypes: !0 }) {
          typeof Mt == "string"
            ? (Mt = this.cwd.resolve(Mt))
            : Mt instanceof Br || ((Lr = Mt), (Mt = this.cwd));
          let { withFileTypes: Tr } = Lr;
          if (Mt.canReaddir()) {
            let Dn = await Mt.readdir();
            return Tr ? Dn : Dn.map((Mn) => Mn.name);
          } else return [];
        }
        readdirSync(Mt = this.cwd, Lr = { withFileTypes: !0 }) {
          typeof Mt == "string"
            ? (Mt = this.cwd.resolve(Mt))
            : Mt instanceof Br || ((Lr = Mt), (Mt = this.cwd));
          let { withFileTypes: Tr = !0 } = Lr;
          return Mt.canReaddir() ? (Tr ? Mt.readdirSync() : Mt.readdirSync().map((Dn) => Dn.name)) : [];
        }
        async lstat(Mt = this.cwd) {
          return (typeof Mt == "string" && (Mt = this.cwd.resolve(Mt)), Mt.lstat());
        }
        lstatSync(Mt = this.cwd) {
          return (typeof Mt == "string" && (Mt = this.cwd.resolve(Mt)), Mt.lstatSync());
        }
        async readlink(Mt = this.cwd, { withFileTypes: Lr } = { withFileTypes: !1 }) {
          typeof Mt == "string"
            ? (Mt = this.cwd.resolve(Mt))
            : Mt instanceof Br || ((Lr = Mt.withFileTypes), (Mt = this.cwd));
          let Tr = await Mt.readlink();
          return Lr ? Tr : Tr?.fullpath();
        }
        readlinkSync(Mt = this.cwd, { withFileTypes: Lr } = { withFileTypes: !1 }) {
          typeof Mt == "string"
            ? (Mt = this.cwd.resolve(Mt))
            : Mt instanceof Br || ((Lr = Mt.withFileTypes), (Mt = this.cwd));
          let Tr = Mt.readlinkSync();
          return Lr ? Tr : Tr?.fullpath();
        }
        async realpath(Mt = this.cwd, { withFileTypes: Lr } = { withFileTypes: !1 }) {
          typeof Mt == "string"
            ? (Mt = this.cwd.resolve(Mt))
            : Mt instanceof Br || ((Lr = Mt.withFileTypes), (Mt = this.cwd));
          let Tr = await Mt.realpath();
          return Lr ? Tr : Tr?.fullpath();
        }
        realpathSync(Mt = this.cwd, { withFileTypes: Lr } = { withFileTypes: !1 }) {
          typeof Mt == "string"
            ? (Mt = this.cwd.resolve(Mt))
            : Mt instanceof Br || ((Lr = Mt.withFileTypes), (Mt = this.cwd));
          let Tr = Mt.realpathSync();
          return Lr ? Tr : Tr?.fullpath();
        }
        async walk(Mt = this.cwd, Lr = {}) {
          typeof Mt == "string"
            ? (Mt = this.cwd.resolve(Mt))
            : Mt instanceof Br || ((Lr = Mt), (Mt = this.cwd));
          let { withFileTypes: Tr = !0, follow: Dn = !1, filter: Mn, walkFilter: as } = Lr,
            xi = [];
          (!Mn || Mn(Mt)) && xi.push(Tr ? Mt : Mt.fullpath());
          let go = new Set(),
            Fo = (gr, Ei) => {
              (go.add(gr),
                gr.readdirCB((kr, Wi) => {
                  if (kr) return Ei(kr);
                  let oo = Wi.length;
                  if (!oo) return Ei();
                  let $o = () => {
                    --oo === 0 && Ei();
                  };
                  for (let La of Wi)
                    ((!Mn || Mn(La)) && xi.push(Tr ? La : La.fullpath()),
                      Dn && La.isSymbolicLink()
                        ? La.realpath()
                            .then((mA) => (mA?.isUnknown() ? mA.lstat() : mA))
                            .then((mA) => (mA?.shouldWalk(go, as) ? Fo(mA, $o) : $o()))
                        : La.shouldWalk(go, as)
                          ? Fo(La, $o)
                          : $o());
                }, !0));
            },
            en = Mt;
          return new Promise((gr, Ei) => {
            Fo(en, (kr) => {
              if (kr) return Ei(kr);
              gr(xi);
            });
          });
        }
        walkSync(Mt = this.cwd, Lr = {}) {
          typeof Mt == "string"
            ? (Mt = this.cwd.resolve(Mt))
            : Mt instanceof Br || ((Lr = Mt), (Mt = this.cwd));
          let { withFileTypes: Tr = !0, follow: Dn = !1, filter: Mn, walkFilter: as } = Lr,
            xi = [];
          (!Mn || Mn(Mt)) && xi.push(Tr ? Mt : Mt.fullpath());
          let go = new Set([Mt]);
          for (let Fo of go) {
            let en = Fo.readdirSync();
            for (let gr of en) {
              (!Mn || Mn(gr)) && xi.push(Tr ? gr : gr.fullpath());
              let Ei = gr;
              if (gr.isSymbolicLink()) {
                if (!(Dn && (Ei = gr.realpathSync()))) continue;
                Ei.isUnknown() && Ei.lstatSync();
              }
              Ei.shouldWalk(go, as) && go.add(Ei);
            }
          }
          return xi;
        }
        [Symbol.asyncIterator]() {
          return this.iterate();
        }
        iterate(Mt = this.cwd, Lr = {}) {
          return (
            typeof Mt == "string"
              ? (Mt = this.cwd.resolve(Mt))
              : Mt instanceof Br || ((Lr = Mt), (Mt = this.cwd)),
            this.stream(Mt, Lr)[Symbol.asyncIterator]()
          );
        }
        [Symbol.iterator]() {
          return this.iterateSync();
        }
        *iterateSync(Mt = this.cwd, Lr = {}) {
          typeof Mt == "string"
            ? (Mt = this.cwd.resolve(Mt))
            : Mt instanceof Br || ((Lr = Mt), (Mt = this.cwd));
          let { withFileTypes: Tr = !0, follow: Dn = !1, filter: Mn, walkFilter: as } = Lr;
          (!Mn || Mn(Mt)) && (yield Tr ? Mt : Mt.fullpath());
          let xi = new Set([Mt]);
          for (let go of xi) {
            let Fo = go.readdirSync();
            for (let en of Fo) {
              (!Mn || Mn(en)) && (yield Tr ? en : en.fullpath());
              let gr = en;
              if (en.isSymbolicLink()) {
                if (!(Dn && (gr = en.realpathSync()))) continue;
                gr.isUnknown() && gr.lstatSync();
              }
              gr.shouldWalk(xi, as) && xi.add(gr);
            }
          }
        }
        stream(Mt = this.cwd, Lr = {}) {
          typeof Mt == "string"
            ? (Mt = this.cwd.resolve(Mt))
            : Mt instanceof Br || ((Lr = Mt), (Mt = this.cwd));
          let { withFileTypes: Tr = !0, follow: Dn = !1, filter: Mn, walkFilter: as } = Lr,
            xi = new I.Minipass({ objectMode: !0 });
          (!Mn || Mn(Mt)) && xi.write(Tr ? Mt : Mt.fullpath());
          let go = new Set(),
            Fo = [Mt],
            en = 0,
            gr = () => {
              let Ei = !1;
              for (; !Ei;) {
                let kr = Fo.shift();
                if (!kr) {
                  en === 0 && xi.end();
                  return;
                }
                (en++, go.add(kr));
                let Wi = ($o, La, mA = !1) => {
                    if ($o) return xi.emit("error", $o);
                    if (Dn && !mA) {
                      let Bs = [];
                      for (let iH of La)
                        iH.isSymbolicLink() &&
                          Bs.push(iH.realpath().then((xa) => (xa?.isUnknown() ? xa.lstat() : xa)));
                      if (Bs.length) {
                        Promise.all(Bs).then(() => Wi(null, La, !0));
                        return;
                      }
                    }
                    for (let Bs of La)
                      Bs && (!Mn || Mn(Bs)) && (xi.write(Tr ? Bs : Bs.fullpath()) || (Ei = !0));
                    en--;
                    for (let Bs of La) {
                      let iH = Bs.realpathCached() || Bs;
                      iH.shouldWalk(go, as) && Fo.push(iH);
                    }
                    Ei && !xi.flowing ? xi.once("drain", gr) : oo || gr();
                  },
                  oo = !0;
                (kr.readdirCB(Wi, !0), (oo = !1));
              }
            };
          return (gr(), xi);
        }
        streamSync(Mt = this.cwd, Lr = {}) {
          typeof Mt == "string"
            ? (Mt = this.cwd.resolve(Mt))
            : Mt instanceof Br || ((Lr = Mt), (Mt = this.cwd));
          let { withFileTypes: Tr = !0, follow: Dn = !1, filter: Mn, walkFilter: as } = Lr,
            xi = new I.Minipass({ objectMode: !0 }),
            go = new Set();
          (!Mn || Mn(Mt)) && xi.write(Tr ? Mt : Mt.fullpath());
          let Fo = [Mt],
            en = 0,
            gr = () => {
              let Ei = !1;
              for (; !Ei;) {
                let kr = Fo.shift();
                if (!kr) {
                  en === 0 && xi.end();
                  return;
                }
                (en++, go.add(kr));
                let Wi = kr.readdirSync();
                for (let oo of Wi) (!Mn || Mn(oo)) && (xi.write(Tr ? oo : oo.fullpath()) || (Ei = !0));
                en--;
                for (let oo of Wi) {
                  let $o = oo;
                  if (oo.isSymbolicLink()) {
                    if (!(Dn && ($o = oo.realpathSync()))) continue;
                    $o.isUnknown() && $o.lstatSync();
                  }
                  $o.shouldWalk(go, as) && Fo.push($o);
                }
              }
              Ei && !xi.flowing && xi.once("drain", gr);
            };
          return (gr(), xi);
        }
        chdir(Mt = this.cwd) {
          let Lr = this.cwd;
          ((this.cwd = typeof Mt == "string" ? this.cwd.resolve(Mt) : Mt), this.cwd[Vt](Lr));
        }
      };
      e.PathScurryBase = wt;
      var Qr = class extends wt {
        sep = "\\";
        constructor(Mt = process.cwd(), Lr = {}) {
          let { nocase: Tr = !0 } = Lr;
          (typeof Mt == "string" && !Mt.startsWith("file://") && (Mt = Mt.replace(q, "").replace(Z, "\\")),
            super(Mt, H.win32, "\\", { ...Lr, nocase: Tr }),
            (this.nocase = Tr));
          for (let Dn = this.cwd; Dn; Dn = Dn.parent) Dn.nocase = this.nocase;
        }
        parseRootPath(Mt) {
          return H.win32.parse(Mt).root.toUpperCase();
        }
        newRoot(Mt) {
          return new Dt(this.rootPath, le, void 0, this.roots, this.nocase, this.childrenCache(), { fs: Mt });
        }
        isAbsolute(Mt) {
          return Mt.startsWith("/") || Mt.startsWith("\\") || /^[a-z]:(\/|\\)/i.test(Mt);
        }
      };
      e.PathScurryWin32 = Qr;
      var Li = class extends wt {
        sep = "/";
        constructor(Mt = process.cwd(), Lr = {}) {
          let { nocase: Tr = !1 } = Lr;
          (super(Mt, H.posix, "/", { ...Lr, nocase: Tr }), (this.nocase = Tr));
        }
        parseRootPath(Mt) {
          return "/";
        }
        newRoot(Mt) {
          return new St(this.rootPath, le, void 0, this.roots, this.nocase, this.childrenCache(), { fs: Mt });
        }
        isAbsolute(Mt) {
          return Mt.startsWith("/");
        }
      };
      e.PathScurryPosix = Li;
      var sr = class extends Li {
        constructor(Mt = process.cwd(), Lr = {}) {
          let { nocase: Tr = !0 } = Lr;
          super(Mt, { ...Lr, nocase: Tr });
        }
      };
      ((e.PathScurryDarwin = sr), (e.Path = Dt), (e.PathScurry = Qr));
    }),
    sKn = tb((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.Pattern = void 0));
      var t = Bme(),
        r = (u) => u.length >= 1,
        s = (u) => u.length >= 1,
        a = Symbol.for("nodejs.util.inspect.custom"),
        H = class u {
          #e;
          #r;
          #t;
          length;
          #n;
          #i;
          #s;
          #a;
          #c;
          #H;
          #f = !0;
          constructor(f, d, _, L) {
            if (!r(f)) throw TypeError("empty pattern list");
            if (!s(d)) throw TypeError("empty glob list");
            if (d.length !== f.length) throw TypeError("mismatched pattern list and glob list lengths");
            if (((this.length = f.length), _ < 0 || _ >= this.length)) throw TypeError("index out of range");
            if (((this.#e = f), (this.#r = d), (this.#t = _), (this.#n = L), this.#t === 0)) {
              if (this.isUNC()) {
                let I = this.#l() ? 6 : 4,
                  D = this.#e.slice(0, I),
                  S = this.#r.slice(0, I),
                  T = this.#e.slice(I),
                  C = this.#r.slice(I);
                T[0] === "" && (T.shift(), C.shift());
                let O = [...D, ""].join("/"),
                  B = [...S, ""].join("/");
                ((this.#e = [O, ...T]), (this.#r = [B, ...C]), (this.length = this.#e.length));
              } else if (this.isDrive() || this.isAbsolute()) {
                let [I, ...D] = this.#e,
                  [S, ...T] = this.#r;
                D[0] === "" && (D.shift(), T.shift());
                let C = `${I}/`,
                  O = `${S}/`;
                ((this.#e = [C, ...D]), (this.#r = [O, ...T]), (this.length = this.#e.length));
              }
            }
          }
          [a]() {
            return `Pattern <${this.#r.slice(this.#t).join("/")}>`;
          }
          pattern() {
            return this.#e[this.#t];
          }
          isString() {
            return typeof this.#e[this.#t] == "string";
          }
          isGlobstar() {
            return this.#e[this.#t] === t.GLOBSTAR;
          }
          isMatcher() {
            return typeof this.#e[this.#t] == "object";
          }
          globString() {
            return (this.#s =
              this.#s ||
              (this.#t === 0
                ? this.isAbsolute()
                  ? this.#r[0] + this.#r.slice(1).join("/")
                  : this.#r.join("/")
                : this.#r.slice(this.#t).join("/")));
          }
          hasMore() {
            return this.length > this.#t + 1;
          }
          rest() {
            return this.#i !== void 0
              ? this.#i
              : this.hasMore()
                ? ((this.#i = new u(this.#e, this.#r, this.#t + 1, this.#n)),
                  (this.#i.#H = this.#H),
                  (this.#i.#c = this.#c),
                  (this.#i.#a = this.#a),
                  this.#i)
                : (this.#i = null);
          }
          #l() {
            let f = this.#e;
            return f[2] === "?" && typeof f[3] == "string" && /^unc$/i.test(f[3]);
          }
          isUNC() {
            let f = this.#e,
              d = this.#l() ? 4 : 2;
            return this.#c !== void 0
              ? this.#c
              : (this.#c =
                  this.#n === "win32" &&
                  this.#t === 0 &&
                  f[0] === "" &&
                  f[1] === "" &&
                  typeof f[d] == "string" &&
                  !!f[d] &&
                  typeof f[d + 1] == "string" &&
                  !!f[d + 1]);
          }
          isDrive() {
            let f = this.#e;
            return this.#a !== void 0
              ? this.#a
              : (this.#a =
                  this.#n === "win32" &&
                  this.#t === 0 &&
                  this.length > 1 &&
                  typeof f[0] == "string" &&
                  /^[a-z]:$/i.test(f[0]));
          }
          isAbsolute() {
            let f = this.#e;
            return this.#H !== void 0
              ? this.#H
              : (this.#H = (f[0] === "" && f.length > 1) || this.isDrive() || this.isUNC());
          }
          root() {
            let f = this.#e[0];
            return typeof f == "string" && this.isAbsolute() && this.#t === 0 ? f : "";
          }
          checkFollowGlobstar() {
            return !(this.#t === 0 || !this.isGlobstar() || !this.#f);
          }
          markFollowGlobstar() {
            return this.#t === 0 || !this.isGlobstar() || !this.#f ? !1 : ((this.#f = !1), !0);
          }
        };
      e.Pattern = H;
    }),
    oKn = tb((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.Ignore = void 0));
      var t = Bme(),
        r = sKn(),
        s = typeof process == "object" && process ? "win32" : "linux",
        a = class {
          relative;
          relativeChildren;
          absolute;
          absoluteChildren;
          platform;
          mmopts;
          slashRoot;
          constructor(
            H,
            {
              nobrace: u,
              nocase: f,
              noext: d,
              noglobstar: _,
              normalize: L,
              platform: I = s,
              root: D,
              windowsPathsNoEscape: S,
              allowWindowsEscape: T,
            },
            C,
          ) {
            ((this.relative = []),
              (this.absolute = []),
              (this.relativeChildren = []),
              (this.absoluteChildren = []),
              (this.platform = I),
              (S = !!S || T === !1),
              (this.mmopts = {
                dot: !0,
                nobrace: u,
                nocase: f,
                noext: d,
                noglobstar: _,
                normalize: L,
                optimizationLevel: 2,
                platform: I,
                nocomment: !0,
                nonegate: !0,
                windowsPathsNoEscape: S,
              }));
            let O = C?.resolve(D ?? "/").fullpath() ?? "/";
            this.slashRoot = (0, t.escape)(O.replace(/\\/g, "/").replace(/\/$/, ""), {
              windowsPathsNoEscape: S,
            });
            for (let B of H) this.add(B);
          }
          add(H) {
            let u = new t.Minimatch(H, this.mmopts);
            for (let f = 0; f < u.set.length; f++) {
              let d = u.set[f],
                _ = u.globParts[f];
              if (!d || !_) throw Error("invalid pattern object");
              for (; d[0] === "." && _[0] === ".";) (d.shift(), _.shift());
              let L = new r.Pattern(d, _, 0, this.platform),
                I = L.root() === "/" ? `${this.slashRoot}/${L.rest()?.globString() ?? ""}` : L.globString(),
                D = new t.Minimatch(I, this.mmopts),
                S = _[_.length - 1] === "**",
                T = L.isAbsolute();
              (T ? this.absolute.push(D) : this.relative.push(D),
                S && (T ? this.absoluteChildren.push(D) : this.relativeChildren.push(D)));
            }
          }
          ignored(H) {
            let u = H.fullpath(),
              f = `${u}/`,
              d = H.relative() || ".",
              _ = `${d}/`;
            for (let L of this.relative) if (L.match(d) || L.match(_)) return !0;
            for (let L of this.absolute) if (L.match(u) || L.match(f)) return !0;
            return !1;
          }
          childrenIgnored(H) {
            let u = `${H.fullpath()}/`,
              f = `${H.relative() || "."}/`;
            for (let d of this.relativeChildren) if (d.match(f)) return !0;
            for (let d of this.absoluteChildren) if (d.match(u)) return !0;
            return !1;
          }
        };
      e.Ignore = a;
    }),
    _wo = tb((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.Processor = e.SubWalks = e.MatchRecord = e.HasWalkedCache = void 0));
      var t = Bme(),
        r = class u {
          parent;
          store;
          constructor(f) {
            this.parent = f;
          }
          copy() {
            return new u(this);
          }
          #e(f) {
            let d = this.store?.get(f);
            return d || !this.parent ? d : this.parent.#e(f);
          }
          hasWalked(f, d) {
            return !!this.#e(f.fullpath())?.has(d.globString());
          }
          storeWalked(f, d) {
            let _ = f.fullpath(),
              L = this.#e(_);
            L ? L.add(d.globString()) : (this.store ??= new Map()).set(_, new Set([d.globString()]));
          }
        };
      e.HasWalkedCache = r;
      var s = class u {
        static ABSOLUTE = 2;
        static IF_DIR = 1;
        store = new Map();
        add(f, d, _) {
          let L = (d ? u.ABSOLUTE : 0) | (_ ? u.IF_DIR : 0),
            I = this.store.get(f);
          this.store.set(f, I === void 0 ? L : L & I);
        }
      };
      e.MatchRecord = s;
      var a = class {
        store = new Map();
        add(u, f) {
          if (!u.canReaddir()) return;
          let d = this.store.get(u);
          d ? d.find((_) => _.globString() === f.globString()) || d.push(f) : this.store.set(u, [f]);
        }
        get(u) {
          let f = this.store.get(u);
          if (!f) throw Error("attempting to walk unknown path");
          return f;
        }
        entries() {
          return this.keys().map((u) => [u, this.store.get(u)]);
        }
        keys() {
          return [...this.store.keys()].filter((u) => u.canReaddir());
        }
      };
      e.SubWalks = a;
      var H = class u {
        hasWalkedCache;
        matches = new s();
        subwalks = new a();
        patterns;
        follow;
        dot;
        opts;
        constructor(f, d) {
          ((this.opts = f),
            (this.follow = !!f.follow),
            (this.dot = !!f.dot),
            (this.hasWalkedCache = d ? d.copy() : new r()));
        }
        processPatterns(f, d) {
          this.patterns = d;
          let _ = d.map((L) => [f, L]);
          for (let [L, I] of _) {
            this.hasWalkedCache.storeWalked(L, I);
            let D = I.root(),
              S = I.isAbsolute() && this.opts.absolute !== !1;
            if (D) {
              L = L.resolve(D === "/" && this.opts.root !== void 0 ? this.opts.root : D);
              let B = I.rest();
              if (B) I = B;
              else {
                this.matches.add(L, !0, !1);
                continue;
              }
            }
            if (L.isENOENT()) continue;
            let T,
              C,
              O = !1;
            for (; typeof (T = I.pattern()) == "string" && (C = I.rest());)
              ((L = L.resolve(T)), (I = C), (O = !0));
            if (((T = I.pattern()), (C = I.rest()), O)) {
              if (this.hasWalkedCache.hasWalked(L, I)) continue;
              this.hasWalkedCache.storeWalked(L, I);
            }
            if (typeof T == "string") {
              let B = T === ".." || T === "" || T === ".";
              this.matches.add(L.resolve(T), S, B);
              continue;
            } else if (T === t.GLOBSTAR) {
              (!L.isSymbolicLink() || this.follow || I.checkFollowGlobstar()) && this.subwalks.add(L, I);
              let B = C?.pattern(),
                V = C?.rest();
              if (!C || ((B === "" || B === ".") && !V)) this.matches.add(L, S, B === "" || B === ".");
              else if (B === "..") {
                let q = L.parent || L;
                V
                  ? this.hasWalkedCache.hasWalked(q, V) || this.subwalks.add(q, V)
                  : this.matches.add(q, S, !0);
              }
            } else typeof T == "object" && this.subwalks.add(L, I);
          }
          return this;
        }
        subwalkTargets() {
          return this.subwalks.keys();
        }
        child() {
          return new u(this.opts, this.hasWalkedCache);
        }
        filterEntries(f, d) {
          let _ = this.subwalks.get(f),
            L = this.child();
          for (let I of d)
            for (let D of _) {
              let S = D.isAbsolute(),
                T = D.pattern(),
                C = D.rest();
              T === t.GLOBSTAR
                ? L.testGlobstar(I, D, C, S)
                : typeof T == "object"
                  ? L.testMatcher(I, T, C, S)
                  : L.testString(I, T, C, S);
            }
          return L;
        }
        testGlobstar(f, d, _, L) {
          if (
            ((this.dot || !f.name.startsWith(".")) &&
              (d.hasMore() || this.matches.add(f, L, !1),
              f.canReaddir() &&
                (this.follow || !f.isSymbolicLink()
                  ? this.subwalks.add(f, d)
                  : f.isSymbolicLink() &&
                    (_ && d.checkFollowGlobstar()
                      ? this.subwalks.add(f, _)
                      : d.markFollowGlobstar() && this.subwalks.add(f, d)))),
            _)
          ) {
            let I = _.pattern();
            if (typeof I == "string" && I !== ".." && I !== "" && I !== ".")
              this.testString(f, I, _.rest(), L);
            else if (I === "..") {
              let D = f.parent || f;
              this.subwalks.add(D, _);
            } else typeof I == "object" && this.testMatcher(f, I, _.rest(), L);
          }
        }
        testMatcher(f, d, _, L) {
          d.testUnchecked(f.name) && (_ ? this.subwalks.add(f, _) : this.matches.add(f, L, !1));
        }
        testString(f, d, _, L) {
          f.isNamed(d) && (_ ? this.subwalks.add(f, _) : this.matches.add(f, L, !1));
        }
      };
      e.Processor = H;
    }),
    hwo = tb((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.GlobStream = e.GlobWalker = e.GlobUtil = void 0));
      var t = iKn(),
        r = oKn(),
        s = _wo(),
        { ABSOLUTE: a, IF_DIR: H } = s.MatchRecord,
        u = (L, I, D) =>
          typeof L == "string" ? new r.Ignore([L], I, D) : Array.isArray(L) ? new r.Ignore(L, I, D) : L,
        f = class {
          path;
          patterns;
          opts;
          seen = new Set();
          paused = !1;
          aborted = !1;
          #e = [];
          #r;
          #t;
          signal;
          maxDepth;
          includeChildMatches;
          constructor(L, I, D) {
            if (
              ((this.patterns = L),
              (this.path = I),
              (this.opts = D),
              (this.#t = !D.posix && D.platform === "win32" ? "\\" : "/"),
              (this.includeChildMatches = D.includeChildMatches !== !1),
              (D.ignore || !this.includeChildMatches) &&
                ((this.#r = u(D.ignore ?? [], D, I)),
                !this.includeChildMatches && typeof this.#r.add != "function"))
            )
              throw Error("cannot ignore child matches, ignore lacks add() method.");
            ((this.maxDepth = D.maxDepth || 1 / 0),
              D.signal &&
                ((this.signal = D.signal),
                this.signal.addEventListener("abort", () => {
                  this.#e.length = 0;
                })));
          }
          #n(L) {
            return this.seen.has(L) || !!this.#r?.ignored?.(L);
          }
          #i(L) {
            return !!this.#r?.childrenIgnored?.(L);
          }
          pause() {
            this.paused = !0;
          }
          resume() {
            if (this.signal?.aborted) return;
            this.paused = !1;
            let L;
            for (; !this.paused && (L = this.#e.shift());) L();
          }
          onResume(L) {
            this.paused ? this.#e.push(L) : L();
          }
          async matchCheck(L, I) {
            if (I && this.opts.nodir) return;
            let D, S;
            if (this.opts.realpath) {
              if (((D = L.realpathCached() || (await L.realpath())), !D)) return;
              S = D;
            } else S = L;
            let T = S.isUnknown() || this.opts.stat ? await S.lstat() : S;
            if (this.opts.follow && this.opts.nodir && T?.isSymbolicLink()) {
              let C = await T.realpath();
              C && (C.isUnknown() || this.opts.stat) && (await C.lstat());
            }
            return this.matchCheckTest(T, I);
          }
          matchCheckTest(L, I) {
            return L &&
              (this.maxDepth === 1 / 0 || L.depth() <= this.maxDepth) &&
              (!I || L.canReaddir()) &&
              (!this.opts.nodir || !L.isDirectory()) &&
              (!this.opts.nodir ||
                !this.opts.follow ||
                !L.isSymbolicLink() ||
                !L.realpathCached()?.isDirectory()) &&
              !this.#n(L)
              ? L
              : void 0;
          }
          matchCheckSync(L, I) {
            if (I && this.opts.nodir) return;
            let D, S;
            if (this.opts.realpath) {
              if (((D = L.realpathCached() || L.realpathSync()), !D)) return;
              S = D;
            } else S = L;
            let T = S.isUnknown() || this.opts.stat ? S.lstatSync() : S;
            if (this.opts.follow && this.opts.nodir && T?.isSymbolicLink()) {
              let C = T.realpathSync();
              C && (C?.isUnknown() || this.opts.stat) && C.lstatSync();
            }
            return this.matchCheckTest(T, I);
          }
          matchFinish(L, I) {
            this.#n(L) || this.#s(L, I);
          }
          #s(L, I) {
            if (!this.includeChildMatches && this.#r?.add) {
              let T = `${L.relativePosix()}/**`;
              this.#r.add(T);
            }
            let D = this.opts.absolute === void 0 ? I : this.opts.absolute;
            this.seen.add(L);
            let S = this.opts.mark && L.isDirectory() ? this.#t : "";
            if (this.opts.withFileTypes) this.matchEmit(L);
            else if (D) {
              let T = this.opts.posix ? L.fullpathPosix() : L.fullpath();
              this.matchEmit(T + S);
            } else {
              let T = this.opts.posix ? L.relativePosix() : L.relative(),
                C = this.opts.dotRelative && !T.startsWith(`..${this.#t}`) ? `.${this.#t}` : "";
              this.matchEmit(T ? C + T + S : `.${S}`);
            }
          }
          async match(L, I, D) {
            let S = await this.matchCheck(L, D);
            S && this.matchFinish(S, I);
          }
          matchSync(L, I, D) {
            let S = this.matchCheckSync(L, D);
            S && this.#s(S, I);
          }
          walkCB(L, I, D) {
            if (this.signal?.aborted) return D();
            this.walkCB2(L, I, new s.Processor(this.opts), D);
          }
          walkCB2(L, I, D, S) {
            if (this.#i(L) || this.signal?.aborted) return S();
            if (this.paused) {
              this.onResume(() => this.walkCB2(L, I, D, S));
              return;
            }
            D.processPatterns(L, I);
            let T = 1,
              C = () => {
                --T === 0 && S();
              };
            for (let [O, B] of D.matches.store)
              this.#n(O) || (T++, this.match(O, !!(B & a), !!(B & H)).then(() => C()));
            for (let O of D.subwalkTargets()) {
              if (this.maxDepth !== 1 / 0 && O.depth() >= this.maxDepth) continue;
              T++;
              let B = O.readdirCached();
              O.calledReaddir()
                ? this.walkCB3(O, B, D, C)
                : O.readdirCB((V, q) => this.walkCB3(O, q, D, C), !0);
            }
            C();
          }
          walkCB3(L, I, D, S) {
            let T = D.filterEntries(L, I),
              C = 1,
              O = () => {
                --C === 0 && S();
              };
            for (let [B, V] of T.matches.store)
              this.#n(B) || (C++, this.match(B, !!(V & a), !!(V & H)).then(() => O()));
            for (let [B, V] of T.subwalks.entries()) (C++, this.walkCB2(B, V, T.child(), O));
            O();
          }
          walkCBSync(L, I, D) {
            if (this.signal?.aborted) return D();
            this.walkCB2Sync(L, I, new s.Processor(this.opts), D);
          }
          walkCB2Sync(L, I, D, S) {
            if (this.#i(L) || this.signal?.aborted) return S();
            if (this.paused) {
              this.onResume(() => this.walkCB2Sync(L, I, D, S));
              return;
            }
            D.processPatterns(L, I);
            let T = 1,
              C = () => {
                --T === 0 && S();
              };
            for (let [O, B] of D.matches.store) this.#n(O) || this.matchSync(O, !!(B & a), !!(B & H));
            for (let O of D.subwalkTargets()) {
              if (this.maxDepth !== 1 / 0 && O.depth() >= this.maxDepth) continue;
              T++;
              let B = O.readdirSync();
              this.walkCB3Sync(O, B, D, C);
            }
            C();
          }
          walkCB3Sync(L, I, D, S) {
            let T = D.filterEntries(L, I),
              C = 1,
              O = () => {
                --C === 0 && S();
              };
            for (let [B, V] of T.matches.store) this.#n(B) || this.matchSync(B, !!(V & a), !!(V & H));
            for (let [B, V] of T.subwalks.entries()) (C++, this.walkCB2Sync(B, V, T.child(), O));
            O();
          }
        };
      e.GlobUtil = f;
      var d = class extends f {
        matches = [];
        constructor(L, I, D) {
          super(L, I, D);
        }
        matchEmit(L) {
          this.matches.push(L);
        }
        async walk() {
          if (this.signal?.aborted) throw this.signal.reason;
          return (
            this.path.isUnknown() && (await this.path.lstat()),
            await new Promise((L, I) => {
              this.walkCB(this.path, this.patterns, () => {
                this.signal?.aborted ? I(this.signal.reason) : L(this.matches);
              });
            }),
            this.matches
          );
        }
        walkSync() {
          if (this.signal?.aborted) throw this.signal.reason;
          return (
            this.path.isUnknown() && this.path.lstatSync(),
            this.walkCBSync(this.path, this.patterns, () => {
              if (this.signal?.aborted) throw this.signal.reason;
            }),
            this.matches
          );
        }
      };
      e.GlobWalker = d;
      var _ = class extends f {
        results;
        constructor(L, I, D) {
          (super(L, I, D),
            (this.results = new t.Minipass({ signal: this.signal, objectMode: !0 })),
            this.results.on("drain", () => this.resume()),
            this.results.on("resume", () => this.resume()));
        }
        matchEmit(L) {
          (this.results.write(L), this.results.flowing || this.pause());
        }
        stream() {
          let L = this.path;
          return (
            L.isUnknown()
              ? L.lstat().then(() => {
                  this.walkCB(L, this.patterns, () => this.results.end());
                })
              : this.walkCB(L, this.patterns, () => this.results.end()),
            this.results
          );
        }
        streamSync() {
          return (
            this.path.isUnknown() && this.path.lstatSync(),
            this.walkCBSync(this.path, this.patterns, () => this.results.end()),
            this.results
          );
        }
      };
      e.GlobStream = _;
    }),
    aKn = tb((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.Glob = void 0));
      var t = Bme(),
        r = cr("url"),
        s = mwo(),
        a = sKn(),
        H = hwo(),
        u = typeof process == "object" && process ? "win32" : "linux",
        f = class {
          absolute;
          cwd;
          root;
          dot;
          dotRelative;
          follow;
          ignore;
          magicalBraces;
          mark;
          matchBase;
          maxDepth;
          nobrace;
          nocase;
          nodir;
          noext;
          noglobstar;
          pattern;
          platform;
          realpath;
          scurry;
          stat;
          signal;
          windowsPathsNoEscape;
          withFileTypes;
          includeChildMatches;
          opts;
          patterns;
          constructor(d, _) {
            if (!_) throw TypeError("glob options required");
            if (
              ((this.withFileTypes = !!_.withFileTypes),
              (this.signal = _.signal),
              (this.follow = !!_.follow),
              (this.dot = !!_.dot),
              (this.dotRelative = !!_.dotRelative),
              (this.nodir = !!_.nodir),
              (this.mark = !!_.mark),
              _.cwd
                ? (_.cwd instanceof URL || _.cwd.startsWith("file://")) &&
                  (_.cwd = (0, r.fileURLToPath)(_.cwd))
                : (this.cwd = ""),
              (this.cwd = _.cwd || ""),
              (this.root = _.root),
              (this.magicalBraces = !!_.magicalBraces),
              (this.nobrace = !!_.nobrace),
              (this.noext = !!_.noext),
              (this.realpath = !!_.realpath),
              (this.absolute = _.absolute),
              (this.includeChildMatches = _.includeChildMatches !== !1),
              (this.noglobstar = !!_.noglobstar),
              (this.matchBase = !!_.matchBase),
              (this.maxDepth = typeof _.maxDepth == "number" ? _.maxDepth : 1 / 0),
              (this.stat = !!_.stat),
              (this.ignore = _.ignore),
              this.withFileTypes && this.absolute !== void 0)
            )
              throw Error("cannot set absolute and withFileTypes:true");
            let L = typeof d == "string" ? [d] : d;
            if (
              ((this.windowsPathsNoEscape = !!_.windowsPathsNoEscape || _.allowWindowsEscape === !1),
              this.windowsPathsNoEscape && (L = L.map((O) => O.replace(/\\/g, "/"))),
              this.matchBase)
            ) {
              if (_.noglobstar) throw TypeError("base matching requires globstar");
              L = L.map((O) => (O.includes("/") ? O : `./**/${O}`));
            }
            if (
              ((this.pattern = L),
              (this.platform = _.platform || u),
              (this.opts = { ..._, platform: this.platform }),
              _.scurry)
            ) {
              if (((this.scurry = _.scurry), _.nocase !== void 0 && _.nocase !== _.scurry.nocase))
                throw Error("nocase option contradicts provided scurry option");
            } else {
              let O =
                _.platform === "win32"
                  ? s.PathScurryWin32
                  : _.platform === "darwin"
                    ? s.PathScurryDarwin
                    : _.platform
                      ? s.PathScurryPosix
                      : s.PathScurry;
              this.scurry = new O(this.cwd, { nocase: _.nocase, fs: _.fs });
            }
            this.nocase = this.scurry.nocase;
            let I = this.platform === "darwin" || this.platform === "win32",
              D = {
                braceExpandMax: 1e4,
                ..._,
                dot: this.dot,
                matchBase: this.matchBase,
                nobrace: this.nobrace,
                nocase: this.nocase,
                nocaseMagicOnly: I,
                nocomment: !0,
                noext: this.noext,
                nonegate: !0,
                optimizationLevel: 2,
                platform: this.platform,
                windowsPathsNoEscape: this.windowsPathsNoEscape,
              },
              S = this.pattern.map((O) => new t.Minimatch(O, D)),
              [T, C] = S.reduce((O, B) => (O[0].push(...B.set), O[1].push(...B.globParts), O), [[], []]);
            this.patterns = T.map((O, B) => {
              let V = C[B];
              if (!V) throw Error("invalid pattern object");
              return new a.Pattern(O, V, 0, this.platform);
            });
          }
          async walk() {
            return await new H.GlobWalker(this.patterns, this.scurry.cwd, {
              ...this.opts,
              maxDepth: this.maxDepth !== 1 / 0 ? this.maxDepth + this.scurry.cwd.depth() : 1 / 0,
              platform: this.platform,
              nocase: this.nocase,
              includeChildMatches: this.includeChildMatches,
            }).walk();
          }
          walkSync() {
            return new H.GlobWalker(this.patterns, this.scurry.cwd, {
              ...this.opts,
              maxDepth: this.maxDepth !== 1 / 0 ? this.maxDepth + this.scurry.cwd.depth() : 1 / 0,
              platform: this.platform,
              nocase: this.nocase,
              includeChildMatches: this.includeChildMatches,
            }).walkSync();
          }
          stream() {
            return new H.GlobStream(this.patterns, this.scurry.cwd, {
              ...this.opts,
              maxDepth: this.maxDepth !== 1 / 0 ? this.maxDepth + this.scurry.cwd.depth() : 1 / 0,
              platform: this.platform,
              nocase: this.nocase,
              includeChildMatches: this.includeChildMatches,
            }).stream();
          }
          streamSync() {
            return new H.GlobStream(this.patterns, this.scurry.cwd, {
              ...this.opts,
              maxDepth: this.maxDepth !== 1 / 0 ? this.maxDepth + this.scurry.cwd.depth() : 1 / 0,
              platform: this.platform,
              nocase: this.nocase,
              includeChildMatches: this.includeChildMatches,
            }).streamSync();
          }
          iterateSync() {
            return this.streamSync()[Symbol.iterator]();
          }
          [Symbol.iterator]() {
            return this.iterateSync();
          }
          iterate() {
            return this.stream()[Symbol.asyncIterator]();
          }
          [Symbol.asyncIterator]() {
            return this.iterate();
          }
        };
      e.Glob = f;
    }),
    HKn = tb((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.hasMagic = void 0));
      var t = Bme(),
        r = (s, a = {}) => {
          for (let H of Array.isArray(s) ? s : [s]) if (new t.Minimatch(H, a).hasMagic()) return !0;
          return !1;
        };
      e.hasMagic = r;
    });
  Object.defineProperty(Wme, "__esModule", { value: !0 });
  Wme.glob =
    Wme.sync =
    Wme.iterate =
    Wme.iterateSync =
    Wme.stream =
    Wme.streamSync =
    Wme.Ignore =
    Wme.hasMagic =
    Wme.Glob =
    Wme.unescape =
    Wme.escape =
      void 0;
  Wme.globStreamSync = _7e;
  Wme.globStream = LAr;
  Wme.globSync = $Ar;
  Wme.globIterateSync = h7e;
  Wme.globIterate = gAr;
  var rKn = Bme(),
    Rme = aKn(),
    Lwo = HKn(),
    cKn = Bme();
  Object.defineProperty(Wme, "escape", {
    enumerable: !0,
    get: function () {
      return cKn.escape;
    },
  });
  Object.defineProperty(Wme, "unescape", {
    enumerable: !0,
    get: function () {
      return cKn.unescape;
    },
  });
  var $wo = aKn();
  Object.defineProperty(Wme, "Glob", {
    enumerable: !0,
    get: function () {
      return $wo.Glob;
    },
  });
  var gwo = HKn();
  Object.defineProperty(Wme, "hasMagic", {
    enumerable: !0,
    get: function () {
      return gwo.hasMagic;
    },
  });
  var Ewo = oKn();
  Object.defineProperty(Wme, "Ignore", {
    enumerable: !0,
    get: function () {
      return Ewo.Ignore;
    },
  });
  function _7e(e, t = {}) {
    return new Rme.Glob(e, t).streamSync();
  }
  function LAr(e, t = {}) {
    return new Rme.Glob(e, t).stream();
  }
  function $Ar(e, t = {}) {
    return new Rme.Glob(e, t).walkSync();
  }
  async function nKn(e, t = {}) {
    return new Rme.Glob(e, t).walk();
  }
  function h7e(e, t = {}) {
    return new Rme.Glob(e, t).iterateSync();
  }
  function gAr(e, t = {}) {
    return new Rme.Glob(e, t).iterate();
  }
  Wme.streamSync = _7e;
  Wme.stream = Object.assign(LAr, { sync: _7e });
  Wme.iterateSync = h7e;
  Wme.iterate = Object.assign(gAr, { sync: h7e });
  Wme.sync = Object.assign($Ar, { stream: _7e, iterate: h7e });
  Wme.glob = Object.assign(nKn, {
    glob: nKn,
    globSync: $Ar,
    sync: Wme.sync,
    globStream: LAr,
    stream: Wme.stream,
    globStreamSync: _7e,
    streamSync: Wme.streamSync,
    globIterate: gAr,
    iterate: Wme.iterate,
    globIterateSync: h7e,
    iterateSync: Wme.iterateSync,
    Glob: Rme.Glob,
    hasMagic: Lwo.hasMagic,
    escape: rKn.escape,
    unescape: rKn.unescape,
  });
  Wme.glob.glob = Wme.glob;
});