
class ext {
  diff(e, t, r = {}) {
    let s;
    if (typeof r === "function") ((s = r), (r = {}));
    else if ("callback" in r) s = r.callback;
    let a = this.castInput(e, r),
      H = this.castInput(t, r),
      u = this.removeEmpty(this.tokenize(a, r)),
      f = this.removeEmpty(this.tokenize(H, r));
    return this.diffWithOptionsObj(u, f, r, s);
  }
  diffWithOptionsObj(e, t, r, s) {
    var a;
    let H = (B) => {
        if (((B = this.postProcess(B, r)), s)) {
          setTimeout(function () {
            s(B);
          }, 0);
          return;
        } else return B;
      },
      u = t.length,
      f = e.length,
      d = 1,
      _ = u + f;
    if (r.maxEditLength != null) _ = Math.min(_, r.maxEditLength);
    let L = (a = r.timeout) !== null && a !== void 0 ? a : 1 / 0,
      I = Date.now() + L,
      D = [{ oldPos: -1, lastComponent: void 0 }],
      S = this.extractCommon(D[0], t, e, 0, r);
    if (D[0].oldPos + 1 >= f && S + 1 >= u) return H(this.buildValues(D[0].lastComponent, t, e));
    let T = -1 / 0,
      C = 1 / 0,
      O = () => {
        for (let B = Math.max(T, -d); B <= Math.min(C, d); B += 2) {
          let V,
            q = D[B - 1],
            Z = D[B + 1];
          if (q) D[B - 1] = void 0;
          let se = !1;
          if (Z) {
            let z = Z.oldPos - B;
            se = Z && 0 <= z && z < u;
          }
          let ae = q && q.oldPos + 1 < f;
          if (!se && !ae) {
            D[B] = void 0;
            continue;
          }
          if (!ae || (se && q.oldPos < Z.oldPos)) V = this.addToPath(Z, !0, !1, 0, r);
          else V = this.addToPath(q, !1, !0, 1, r);
          if (((S = this.extractCommon(V, t, e, B, r)), V.oldPos + 1 >= f && S + 1 >= u))
            return H(this.buildValues(V.lastComponent, t, e)) || !0;
          else {
            if (((D[B] = V), V.oldPos + 1 >= f)) C = Math.min(C, B - 1);
            if (S + 1 >= u) T = Math.max(T, B + 1);
          }
        }
        d++;
      };
    if (s)
      (function B() {
        setTimeout(function () {
          if (d > _ || Date.now() > I) return s(void 0);
          if (!O()) B();
        }, 0);
      })();
    else
      while (d <= _ && Date.now() <= I) {
        let B = O();
        if (B) return B;
      }
  }
  addToPath(e, t, r, s, a) {
    let H = e.lastComponent;
    if (H && !a.oneChangePerToken && H.added === t && H.removed === r)
      return {
        oldPos: e.oldPos + s,
        lastComponent: { count: H.count + 1, added: t, removed: r, previousComponent: H.previousComponent },
      };
    else
      return {
        oldPos: e.oldPos + s,
        lastComponent: { count: 1, added: t, removed: r, previousComponent: H },
      };
  }
  extractCommon(e, t, r, s, a) {
    let H = t.length,
      u = r.length,
      f = e.oldPos,
      d = f - s,
      _ = 0;
    while (d + 1 < H && f + 1 < u && this.equals(r[f + 1], t[d + 1], a))
      if ((d++, f++, _++, a.oneChangePerToken))
        e.lastComponent = { count: 1, previousComponent: e.lastComponent, added: !1, removed: !1 };
    if (_ && !a.oneChangePerToken)
      e.lastComponent = { count: _, previousComponent: e.lastComponent, added: !1, removed: !1 };
    return ((e.oldPos = f), d);
  }
  equals(e, t, r) {
    if (r.comparator) return r.comparator(e, t);
    else return e === t || (!!r.ignoreCase && e.toLowerCase() === t.toLowerCase());
  }
  removeEmpty(e) {
    let t = [];
    for (let r = 0; r < e.length; r++) if (e[r]) t.push(e[r]);
    return t;
  }
  castInput(e, t) {
    return e;
  }
  tokenize(e, t) {
    return Array.from(e);
  }
  join(e) {
    return e.join("");
  }
  postProcess(e, t) {
    return e;
  }
  get useLongestToken() {
    return !1;
  }
  buildValues(e, t, r) {
    let s = [],
      a;
    while (e) (s.push(e), (a = e.previousComponent), delete e.previousComponent, (e = a));
    s.reverse();
    let H = s.length,
      u = 0,
      f = 0,
      d = 0;
    for (; u < H; u++) {
      let _ = s[u];
      if (!_.removed) {
        if (!_.added && this.useLongestToken) {
          let L = t.slice(f, f + _.count);
          ((L = L.map(function (I, D) {
            let S = r[d + D];
            return S.length > I.length ? S : I;
          })),
            (_.value = this.join(L)));
        } else _.value = this.join(t.slice(f, f + _.count));
        if (((f += _.count), !_.added)) d += _.count;
      } else ((_.value = this.join(r.slice(d, d + _.count))), (d += _.count));
    }
    return s;
  }
}