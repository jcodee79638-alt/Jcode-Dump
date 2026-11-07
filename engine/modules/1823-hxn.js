
var hxn = Ie(function (_xn, qht) {
  ((e, t) => {
    if (typeof define === "function" && define.amd) define([], t);
    else if (typeof qht === "object" && qht.exports) qht.exports = t();
    else e.fuzzysort = t();
  })(_xn, (e) => {
    var t = (it, At) => {
        if (!it || !At) return ot;
        var et = S(it);
        if (!_e(At)) At = D(At);
        var ut = et.bitflags;
        if ((ut & At._bitflags) !== ut) return ot;
        return C(et, At);
      },
      r = (it, At, et) => {
        if (!it) return et?.all ? T(At, et) : ye;
        var ut = S(it),
          { bitflags: ht, containsSpace: Et } = ut,
          tr = L(et?.threshold || 0),
          Rr = et?.limit || we,
          Vt = 0,
          Br = 0,
          Dt = At.length;
        function St(gr) {
          if (Vt < Rr) (Fe.add(gr), ++Vt);
          else if ((++Br, gr._score > Fe.peek()._score)) Fe.replaceTop(gr);
        }
        if (et?.key) {
          var wt = et.key;
          for (var Qr = 0; Qr < Dt; ++Qr) {
            var Li = At[Qr],
              sr = Se(Li, wt);
            if (!sr) continue;
            if (!_e(sr)) sr = D(sr);
            if ((ht & sr._bitflags) !== ht) continue;
            var Mt = C(ut, sr);
            if (Mt === ot) continue;
            if (Mt._score < tr) continue;
            ((Mt.obj = Li), St(Mt));
          }
        } else if (et?.keys) {
          var Lr = et.keys,
            Tr = Lr.length;
          e: for (var Qr = 0; Qr < Dt; ++Qr) {
            var Li = At[Qr];
            {
              var Dn = 0;
              for (var Mn = 0; Mn < Tr; ++Mn) {
                var wt = Lr[Mn],
                  sr = Se(Li, wt);
                if (!sr) {
                  Lt[Mn] = Ee;
                  continue;
                }
                if (!_e(sr)) sr = D(sr);
                ((Lt[Mn] = sr), (Dn |= sr._bitflags));
              }
              if ((ht & Dn) !== ht) continue;
            }
            if (Et) for (let kr = 0; kr < ut.spaceSearches.length; kr++) Be[kr] = Pe;
            for (var Mn = 0; Mn < Tr; ++Mn) {
              if (((sr = Lt[Mn]), sr === Ee)) {
                Ht[Mn] = Ee;
                continue;
              }
              if (((Ht[Mn] = C(ut, sr, !1, Et)), Ht[Mn] === ot)) {
                Ht[Mn] = Ee;
                continue;
              }
              if (Et)
                for (let Wi = 0; Wi < ut.spaceSearches.length; Wi++) {
                  if (Te[Wi] > -1000) {
                    if (Be[Wi] > Pe) {
                      var as = (Be[Wi] + Te[Wi]) / 4;
                      if (as > Be[Wi]) Be[Wi] = as;
                    }
                  }
                  if (Te[Wi] > Be[Wi]) Be[Wi] = Te[Wi];
                }
            }
            if (Et) {
              for (let kr = 0; kr < ut.spaceSearches.length; kr++) if (Be[kr] === Pe) continue e;
            } else {
              var xi = !1;
              for (let kr = 0; kr < Tr; kr++)
                if (Ht[kr]._score !== Pe) {
                  xi = !0;
                  break;
                }
              if (!xi) continue;
            }
            var go = new f(Tr);
            for (let kr = 0; kr < Tr; kr++) go[kr] = Ht[kr];
            if (Et) {
              var Fo = 0;
              for (let kr = 0; kr < ut.spaceSearches.length; kr++) Fo += Be[kr];
            } else {
              var Fo = Pe;
              for (let Wi = 0; Wi < Tr; Wi++) {
                var Mt = go[Wi];
                if (Mt._score > -1000) {
                  if (Fo > Pe) {
                    var as = (Fo + Mt._score) / 4;
                    if (as > Fo) Fo = as;
                  }
                }
                if (Mt._score > Fo) Fo = Mt._score;
              }
            }
            if (((go.obj = Li), (go._score = Fo), et?.scoreFn)) {
              if (((Fo = et.scoreFn(go)), !Fo)) continue;
              ((Fo = L(Fo)), (go._score = Fo));
            }
            if (Fo < tr) continue;
            St(go);
          }
        } else
          for (var Qr = 0; Qr < Dt; ++Qr) {
            var sr = At[Qr];
            if (!sr) continue;
            if (!_e(sr)) sr = D(sr);
            if ((ht & sr._bitflags) !== ht) continue;
            var Mt = C(ut, sr);
            if (Mt === ot) continue;
            if (Mt._score < tr) continue;
            St(Mt);
          }
        if (Vt === 0) return ye;
        var en = Array(Vt);
        for (var Qr = Vt - 1; Qr >= 0; --Qr) en[Qr] = Fe.poll();
        return ((en.total = Vt + Br), en);
      },
      s = (it, At = "<b>", et = "</b>") => {
        var ut = typeof At === "function" ? At : void 0,
          ht = it.target,
          Et = ht.length,
          tr = it.indexes,
          Rr = "",
          Vt = 0,
          Br = 0,
          Dt = !1,
          St = [];
        for (var wt = 0; wt < Et; ++wt) {
          var Qr = ht[wt];
          if (tr[Br] === wt) {
            if ((++Br, !Dt))
              if (((Dt = !0), ut)) (St.push(Rr), (Rr = ""));
              else Rr += At;
            if (Br === tr.length) {
              if (ut) ((Rr += Qr), St.push(ut(Rr, Vt++)), (Rr = ""), St.push(ht.substr(wt + 1)));
              else Rr += Qr + et + ht.substr(wt + 1);
              break;
            }
          } else if (Dt)
            if (((Dt = !1), ut)) (St.push(ut(Rr, Vt++)), (Rr = ""));
            else Rr += et;
          Rr += Qr;
        }
        return ut ? St : Rr;
      },
      a = (it) => {
        if (typeof it === "number") it = "" + it;
        else if (typeof it !== "string") it = "";
        var At = V(it);
        return d(it, { _targetLower: At._lower, _targetLowerCodes: At.lowerCodes, _bitflags: At.bitflags });
      },
      H = () => {
        (se.clear(), ae.clear());
      };
    class u {
      get ["indexes"]() {
        return this._indexes.slice(0, this._indexes.len).sort((it, At) => it - At);
      }
      set ["indexes"](it) {
        return (this._indexes = it);
      }
      ["highlight"](it, At) {
        return s(this, it, At);
      }
      get ["score"]() {
        return _(this._score);
      }
      set ["score"](it) {
        this._score = L(it);
      }
    }
    class f extends Array {
      get ["score"]() {
        return _(this._score);
      }
      set ["score"](it) {
        this._score = L(it);
      }
    }
    var d = (it, At) => {
        let et = new u();
        return (
          (et.target = it),
          (et.obj = At.obj ?? ot),
          (et._score = At._score ?? Pe),
          (et._indexes = At._indexes ?? []),
          (et._targetLower = At._targetLower ?? ""),
          (et._targetLowerCodes = At._targetLowerCodes ?? ot),
          (et._nextBeginningIndexes = At._nextBeginningIndexes ?? ot),
          (et._bitflags = At._bitflags ?? 0),
          et
        );
      },
      _ = (it) => {
        if (it === Pe) return 0;
        if (it > 1) return it;
        return Math.E ** (((-it + 1) ** 0.04307 - 1) * -2);
      },
      L = (it) => {
        if (it === 0) return Pe;
        if (it > 1) return it;
        return 1 - Math.pow(Math.log(it) / -2 + 1, 23.218017181332716);
      },
      I = (it) => {
        if (typeof it === "number") it = "" + it;
        else if (typeof it !== "string") it = "";
        it = it.trim();
        var At = V(it),
          et = [];
        if (At.containsSpace) {
          var ut = it.split(/\s+/);
          ut = [...new Set(ut)];
          for (var ht = 0; ht < ut.length; ht++) {
            if (ut[ht] === "") continue;
            var Et = V(ut[ht]);
            et.push({ lowerCodes: Et.lowerCodes, _lower: ut[ht].toLowerCase(), containsSpace: !1 });
          }
        }
        return {
          lowerCodes: At.lowerCodes,
          _lower: At._lower,
          containsSpace: At.containsSpace,
          bitflags: At.bitflags,
          spaceSearches: et,
        };
      },
      D = (it) => {
        if (it.length > 999) return a(it);
        var At = se.get(it);
        if (At !== void 0) return At;
        return ((At = a(it)), se.set(it, At), At);
      },
      S = (it) => {
        if (it.length > 999) return I(it);
        var At = ae.get(it);
        if (At !== void 0) return At;
        return ((At = I(it)), ae.set(it, At), At);
      },
      T = (it, At) => {
        var et = [];
        et.total = it.length;
        var ut = At?.limit || we;
        if (At?.key)
          for (var ht = 0; ht < it.length; ht++) {
            var Et = it[ht],
              tr = Se(Et, At.key);
            if (tr == ot) continue;
            if (!_e(tr)) tr = D(tr);
            var Rr = d(tr.target, { _score: tr._score, obj: Et });
            if ((et.push(Rr), et.length >= ut)) return et;
          }
        else if (At?.keys)
          for (var ht = 0; ht < it.length; ht++) {
            var Et = it[ht],
              Vt = new f(At.keys.length);
            for (var Br = At.keys.length - 1; Br >= 0; --Br) {
              var tr = Se(Et, At.keys[Br]);
              if (!tr) {
                Vt[Br] = Ee;
                continue;
              }
              if (!_e(tr)) tr = D(tr);
              ((tr._score = Pe), (tr._indexes.len = 0), (Vt[Br] = tr));
            }
            if (((Vt.obj = Et), (Vt._score = Pe), et.push(Vt), et.length >= ut)) return et;
          }
        else
          for (var ht = 0; ht < it.length; ht++) {
            var tr = it[ht];
            if (tr == ot) continue;
            if (!_e(tr)) tr = D(tr);
            if (((tr._score = Pe), (tr._indexes.len = 0), et.push(tr), et.length >= ut)) return et;
          }
        return et;
      },
      C = (it, At, et = !1, ut = !1) => {
        if (et === !1 && it.containsSpace) return O(it, At, ut);
        var { _lower: ht, lowerCodes: Et } = it,
          tr = Et[0],
          Rr = At._targetLowerCodes,
          Vt = Et.length,
          Br = Rr.length,
          Qr = 0,
          Dt = 0,
          St = 0;
        for (;;) {
          var wt = tr === Rr[Dt];
          if (wt) {
            if (((z[St++] = Dt), ++Qr, Qr === Vt)) break;
            tr = Et[Qr];
          }
          if ((++Dt, Dt >= Br)) return ot;
        }
        var Qr = 0,
          Li = !1,
          sr = 0,
          Mt = At._nextBeginningIndexes;
        if (Mt === ot) Mt = At._nextBeginningIndexes = Z(At.target);
        Dt = z[0] === 0 ? 0 : Mt[z[0] - 1];
        var Lr = 0;
        if (Dt !== Br)
          for (;;)
            if (Dt >= Br) {
              if (Qr <= 0) break;
              if ((++Lr, Lr > 200)) break;
              --Qr;
              var Tr = Ae[--sr];
              Dt = Mt[Tr];
            } else {
              var wt = Et[Qr] === Rr[Dt];
              if (wt) {
                if (((Ae[sr++] = Dt), ++Qr, Qr === Vt)) {
                  Li = !0;
                  break;
                }
                ++Dt;
              } else Dt = Mt[Dt];
            }
        var Dn = Vt <= 1 ? -1 : At._targetLower.indexOf(ht, z[0]),
          Mn = !!~Dn,
          as = !Mn ? !1 : Dn === 0 || At._nextBeginningIndexes[Dn - 1] === Dn;
        if (Mn && !as)
          for (var xi = 0; xi < Mt.length; xi = Mt[xi]) {
            if (xi <= Dn) continue;
            for (var go = 0; go < Vt; go++) if (Et[go] !== At._targetLowerCodes[xi + go]) break;
            if (go === Vt) {
              ((Dn = xi), (as = !0));
              break;
            }
          }
        var Fo = (kr) => {
          var Wi = 0,
            oo = 0;
          for (var $o = 1; $o < Vt; ++$o) if (kr[$o] - kr[$o - 1] !== 1) ((Wi -= kr[$o]), ++oo);
          var La = kr[Vt - 1] - kr[0] - (Vt - 1);
          if (((Wi -= (12 + La) * oo), kr[0] !== 0)) Wi -= kr[0] * kr[0] * 0.2;
          if (!Li) Wi *= 1000;
          else {
            var mA = 1;
            for (var $o = Mt[0]; $o < Br; $o = Mt[$o]) ++mA;
            if (mA > 24) Wi *= (mA - 24) * 10;
          }
          if (((Wi -= (Br - Vt) / 2), Mn)) Wi /= 1 + Vt * Vt * 1;
          if (as) Wi /= 1 + Vt * Vt * 1;
          return ((Wi -= (Br - Vt) / 2), Wi);
        };
        if (!Li) {
          if (Mn) for (var xi = 0; xi < Vt; ++xi) z[xi] = Dn + xi;
          var en = z,
            gr = Fo(en);
        } else if (as) {
          for (var xi = 0; xi < Vt; ++xi) z[xi] = Dn + xi;
          var en = z,
            gr = Fo(z);
        } else
          var en = Ae,
            gr = Fo(Ae);
        At._score = gr;
        for (var xi = 0; xi < Vt; ++xi) At._indexes[xi] = en[xi];
        At._indexes.len = Vt;
        let Ei = new u();
        return ((Ei.target = At.target), (Ei._score = At._score), (Ei._indexes = At._indexes), Ei);
      },
      O = (it, At, et) => {
        var ut = new Set(),
          ht = 0,
          Et = ot,
          tr = 0,
          Rr = it.spaceSearches,
          Vt = Rr.length,
          Br = 0,
          Dt = () => {
            for (let as = Br - 1; as >= 0; as--) At._nextBeginningIndexes[le[as * 2 + 0]] = le[as * 2 + 1];
          },
          St = !1;
        for (var Mn = 0; Mn < Vt; ++Mn) {
          Te[Mn] = Pe;
          var wt = Rr[Mn];
          if (((Et = C(wt, At)), et)) {
            if (Et === ot) continue;
            St = !0;
          } else if (Et === ot) return (Dt(), ot);
          var Qr = Mn === Vt - 1;
          if (!Qr) {
            var Li = Et._indexes,
              sr = !0;
            for (let xi = 0; xi < Li.len - 1; xi++)
              if (Li[xi + 1] - Li[xi] !== 1) {
                sr = !1;
                break;
              }
            if (sr) {
              var Mt = Li[Li.len - 1] + 1,
                Lr = At._nextBeginningIndexes[Mt - 1];
              for (let xi = Mt - 1; xi >= 0; xi--) {
                if (Lr !== At._nextBeginningIndexes[xi]) break;
                ((At._nextBeginningIndexes[xi] = Mt), (le[Br * 2 + 0] = xi), (le[Br * 2 + 1] = Lr), Br++);
              }
            }
          }
          if (((ht += Et._score / Vt), (Te[Mn] = Et._score / Vt), Et._indexes[0] < tr))
            ht -= (tr - Et._indexes[0]) * 2;
          tr = Et._indexes[0];
          for (var Tr = 0; Tr < Et._indexes.len; ++Tr) ut.add(Et._indexes[Tr]);
        }
        if (et && !St) return ot;
        Dt();
        var Dn = C(it, At, !0);
        if (Dn !== ot && Dn._score > ht) {
          if (et) for (var Mn = 0; Mn < Vt; ++Mn) Te[Mn] = Dn._score / Vt;
          return Dn;
        }
        if (et) Et = At;
        Et._score = ht;
        var Mn = 0;
        for (let as of ut) Et._indexes[Mn++] = as;
        return ((Et._indexes.len = Mn), Et);
      },
      B = (it) =>
        it.replace(/\p{Script=Latin}+/gu, (At) => At.normalize("NFD")).replace(/[\u0300-\u036f]/g, ""),
      V = (it) => {
        it = B(it);
        var At = it.length,
          et = it.toLowerCase(),
          ut = [],
          ht = 0,
          Et = !1;
        for (var tr = 0; tr < At; ++tr) {
          var Rr = (ut[tr] = et.charCodeAt(tr));
          if (Rr === 32) {
            Et = !0;
            continue;
          }
          var Vt = Rr >= 97 && Rr <= 122 ? Rr - 97 : Rr >= 48 && Rr <= 57 ? 26 : Rr <= 127 ? 30 : 31;
          ht |= 1 << Vt;
        }
        return { lowerCodes: ut, bitflags: ht, containsSpace: Et, _lower: et };
      },
      q = (it) => {
        var At = it.length,
          et = [],
          ut = 0,
          ht = !1,
          Et = !1;
        for (var tr = 0; tr < At; ++tr) {
          var Rr = it.charCodeAt(tr),
            Vt = Rr >= 65 && Rr <= 90,
            Br = Vt || (Rr >= 97 && Rr <= 122) || (Rr >= 48 && Rr <= 57),
            Dt = (Vt && !ht) || !Et || !Br;
          if (((ht = Vt), (Et = Br), Dt)) et[ut++] = tr;
        }
        return et;
      },
      Z = (it) => {
        it = B(it);
        var At = it.length,
          et = q(it),
          ut = [],
          ht = et[0],
          Et = 0;
        for (var tr = 0; tr < At; ++tr)
          if (ht > tr) ut[tr] = ht;
          else ((ht = et[++Et]), (ut[tr] = ht === void 0 ? At : ht));
        return ut;
      },
      se = new Map(),
      ae = new Map(),
      z = [],
      Ae = [],
      le = [],
      Be = [],
      Te = [],
      Lt = [],
      Ht = [],
      Se = (it, At) => {
        var et = it[At];
        if (et !== void 0) return et;
        if (typeof At === "function") return At(it);
        var ut = At;
        if (!Array.isArray(At)) ut = At.split(".");
        var ht = ut.length,
          Et = -1;
        while (it && ++Et < ht) it = it[ut[Et]];
        return it;
      },
      _e = (it) => typeof it === "object" && typeof it._bitflags === "number",
      we = 1 / 0,
      Pe = -we,
      ye = [];
    ye.total = 0;
    var ot = null,
      Ee = a(""),
      Ve = (it) => {
        var At = [],
          et = 0,
          ut = {},
          ht = (Et) => {
            for (var tr = 0, Rr = At[tr], Vt = 1; Vt < et;) {
              var Br = Vt + 1;
              ((tr = Vt),
                Br < et && At[Br]._score < At[Vt]._score && (tr = Br),
                (At[(tr - 1) >> 1] = At[tr]),
                (Vt = 1 + (tr << 1)));
            }
            for (var Dt = (tr - 1) >> 1; tr > 0 && Rr._score < At[Dt]._score; Dt = ((tr = Dt) - 1) >> 1)
              At[tr] = At[Dt];
            At[tr] = Rr;
          };
        return (
          (ut.add = (Et) => {
            var tr = et;
            At[et++] = Et;
            for (var Rr = (tr - 1) >> 1; tr > 0 && Et._score < At[Rr]._score; Rr = ((tr = Rr) - 1) >> 1)
              At[tr] = At[Rr];
            At[tr] = Et;
          }),
          (ut.poll = (Et) => {
            if (et !== 0) {
              var tr = At[0];
              return ((At[0] = At[--et]), ht(), tr);
            }
          }),
          (ut.peek = (Et) => {
            if (et !== 0) return At[0];
          }),
          (ut.replaceTop = (Et) => {
            ((At[0] = Et), ht());
          }),
          ut
        );
      },
      Fe = Ve();
    return { single: t, go: r, prepare: a, cleanup: H };
  });
});