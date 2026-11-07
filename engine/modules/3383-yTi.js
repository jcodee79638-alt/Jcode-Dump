
var yTi = Ie(function (DTi, S0r) {
  var ITi = (function (e) {
    (Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.decode = I),
      (e.encode = L),
      (e.familyOf = _),
      (e.name = void 0),
      (e.sizeOf = d),
      (e.v6 = e.v4 = void 0));
    let t = /^(\d{1,3}\.){3,3}\d{1,3}$/,
      r = 4,
      s = /^(::)?(((\d{1,3}\.){3}(\d{1,3}){1})?([0-9a-f]){0,4}:{0,2}){1,8}(::)?$/i,
      a = 16,
      H = {
        name: "v4",
        size: r,
        isFormat: (D) => t.test(D),
        encode(D, S, T) {
          ((T = ~~T), (S = S || new Uint8Array(T + r)));
          let C = D.length,
            O = 0;
          for (let B = 0; B < C;) {
            let V = D.charCodeAt(B++);
            if (V === 46) ((S[T++] = O), (O = 0));
            else O = O * 10 + (V - 48);
          }
          return ((S[T] = O), S);
        },
        decode(D, S) {
          return ((S = ~~S), `${D[S++]}.${D[S++]}.${D[S++]}.${D[S]}`);
        },
      };
    e.v4 = H;
    let u = {
      name: "v6",
      size: a,
      isFormat: (D) => D.length > 0 && s.test(D),
      encode(D, S, T) {
        T = ~~T;
        let C = T + a,
          O = -1,
          B = 0,
          V = 0,
          q = !0,
          Z = !1;
        S = S || new Uint8Array(T + a);
        for (let se = 0; se < D.length; se++) {
          let ae = D.charCodeAt(se);
          if (ae === 58) {
            if (q) {
              if (O !== -1) {
                if (T < C) S[T] = 0;
                if (T < C - 1) S[T + 1] = 0;
                T += 2;
              } else if (T < C) O = T;
            } else {
              if (Z === !0) {
                if (T < C) S[T] = V;
                T++;
              } else {
                if (T < C) S[T] = B >> 8;
                if (T < C - 1) S[T + 1] = B & 255;
                T += 2;
              }
              ((B = 0), (V = 0));
            }
            ((q = !0), (Z = !1));
          } else if (ae === 46) {
            if (T < C) S[T] = V;
            (T++, (V = 0), (B = 0), (q = !1), (Z = !0));
          } else {
            if (((q = !1), ae >= 97)) ae -= 87;
            else if (ae >= 65) ae -= 55;
            else ((ae -= 48), (V = V * 10 + ae));
            B = (B << 4) + ae;
          }
        }
        if (q === !1)
          if (Z === !0) {
            if (T < C) S[T] = V;
            T++;
          } else {
            if (T < C) S[T] = B >> 8;
            if (T < C - 1) S[T + 1] = B & 255;
            T += 2;
          }
        else if (O === 0) {
          if (T < C) S[T] = 0;
          if (T < C - 1) S[T + 1] = 0;
          T += 2;
        } else if (O !== -1) {
          T += 2;
          for (let se = Math.min(T - 1, C - 1); se >= O + 2; se--) S[se] = S[se - 2];
          ((S[O] = 0), (S[O + 1] = 0), (O = T));
        }
        if (O !== T && O !== -1) {
          if (T > C - 2) T = C - 2;
          while (C > O) S[--C] = T < C && T > O ? S[--T] : 0;
        } else while (T < C) S[T++] = 0;
        return S;
      },
      decode(D, S) {
        S = ~~S;
        let T = "";
        for (let C = 0; C < a; C += 2) {
          if (C !== 0) T += ":";
          T += ((D[S + C] << 8) | D[S + C + 1]).toString(16);
        }
        return T.replace(/(^|:)0(:0)*:0(:|$)/, "$1::$3").replace(/:{3,4}/, "::");
      },
    };
    e.v6 = u;
    let f = "ip";
    e.name = f;
    function d(D) {
      if (H.isFormat(D)) return H.size;
      if (u.isFormat(D)) return u.size;
      throw Error(`Invalid ip address: ${D}`);
    }
    function _(D) {
      return d(D) === H.size ? 1 : 2;
    }
    function L(D, S, T) {
      T = ~~T;
      let C = d(D);
      if (typeof S === "function") S = S(T + C);
      if (C === H.size) return H.encode(D, S, T);
      return u.encode(D, S, T);
    }
    function I(D, S, T) {
      if (((S = ~~S), (T = T || D.length - S), T === H.size)) return H.decode(D, S, T);
      if (T === u.size) return u.decode(D, S, T);
      throw Error(`Invalid buffer size needs to be ${H.size} for v4 or ${u.size} for v6.`);
    }
    return "default" in e ? e.default : e;
  })({});
  if (typeof define === "function" && define.amd)
    define([], function () {
      return ITi;
    });
  else if (typeof S0r === "object" && typeof DTi === "object") S0r.exports = ITi;
});