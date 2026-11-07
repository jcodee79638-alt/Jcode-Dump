
function m1n(e, t, r = Iht.DEFAULT) {
  let s = ght(e, !1),
    a = [],
    H = 0;
  function u(Se) {
    return Se
      ? () =>
          H === 0 &&
          Se(s.getTokenOffset(), s.getTokenLength(), s.getTokenStartLine(), s.getTokenStartCharacter())
      : () => !0;
  }
  function f(Se) {
    return Se
      ? (_e) =>
          H === 0 &&
          Se(_e, s.getTokenOffset(), s.getTokenLength(), s.getTokenStartLine(), s.getTokenStartCharacter())
      : () => !0;
  }
  function d(Se) {
    return Se
      ? (_e) =>
          H === 0 &&
          Se(
            _e,
            s.getTokenOffset(),
            s.getTokenLength(),
            s.getTokenStartLine(),
            s.getTokenStartCharacter(),
            () => a.slice(),
          )
      : () => !0;
  }
  function _(Se) {
    return Se
      ? () => {
          if (H > 0) H++;
          else if (
            Se(
              s.getTokenOffset(),
              s.getTokenLength(),
              s.getTokenStartLine(),
              s.getTokenStartCharacter(),
              () => a.slice(),
            ) === !1
          )
            H = 1;
        }
      : () => !0;
  }
  function L(Se) {
    return Se
      ? () => {
          if (H > 0) H--;
          if (H === 0)
            Se(s.getTokenOffset(), s.getTokenLength(), s.getTokenStartLine(), s.getTokenStartCharacter());
        }
      : () => !0;
  }
  let I = _(t.onObjectBegin),
    D = d(t.onObjectProperty),
    S = L(t.onObjectEnd),
    T = _(t.onArrayBegin),
    C = L(t.onArrayEnd),
    O = d(t.onLiteralValue),
    B = f(t.onSeparator),
    V = u(t.onComment),
    q = f(t.onError),
    Z = r && r.disallowComments,
    se = r && r.allowTrailingComma;
  function ae() {
    while (!0) {
      let Se = s.scan();
      switch (s.getTokenError()) {
        case 4:
          z(14);
          break;
        case 5:
          z(15);
          break;
        case 3:
          z(13);
          break;
        case 1:
          if (!Z) z(11);
          break;
        case 2:
          z(12);
          break;
        case 6:
          z(16);
          break;
      }
      switch (Se) {
        case 12:
        case 13:
          if (Z) z(10);
          else V();
          break;
        case 16:
          z(1);
          break;
        case 15:
        case 14:
          break;
        default:
          return Se;
      }
    }
  }
  function z(Se, _e = [], we = []) {
    if ((q(Se), _e.length + we.length > 0)) {
      let Pe = s.getToken();
      while (Pe !== 17) {
        if (_e.indexOf(Pe) !== -1) {
          ae();
          break;
        } else if (we.indexOf(Pe) !== -1) break;
        Pe = ae();
      }
    }
  }
  function Ae(Se) {
    let _e = s.getTokenValue();
    if (Se) O(_e);
    else (D(_e), a.push(_e));
    return (ae(), !0);
  }
  function le() {
    switch (s.getToken()) {
      case 11:
        let Se = s.getTokenValue(),
          _e = Number(Se);
        if (isNaN(_e)) (z(2), (_e = 0));
        O(_e);
        break;
      case 7:
        O(null);
        break;
      case 8:
        O(!0);
        break;
      case 9:
        O(!1);
        break;
      default:
        return !1;
    }
    return (ae(), !0);
  }
  function Be() {
    if (s.getToken() !== 10) return (z(3, [], [2, 5]), !1);
    if ((Ae(!1), s.getToken() === 6)) {
      if ((B(":"), ae(), !Ht())) z(4, [], [2, 5]);
    } else z(5, [], [2, 5]);
    return (a.pop(), !0);
  }
  function Te() {
    (I(), ae());
    let Se = !1;
    while (s.getToken() !== 2 && s.getToken() !== 17) {
      if (s.getToken() === 5) {
        if (!Se) z(4, [], []);
        if ((B(","), ae(), s.getToken() === 2 && se)) break;
      } else if (Se) z(6, [], []);
      if (!Be()) z(4, [], [2, 5]);
      Se = !0;
    }
    if ((S(), s.getToken() !== 2)) z(7, [2], []);
    else ae();
    return !0;
  }
  function Lt() {
    (T(), ae());
    let Se = !0,
      _e = !1;
    while (s.getToken() !== 4 && s.getToken() !== 17) {
      if (s.getToken() === 5) {
        if (!_e) z(4, [], []);
        if ((B(","), ae(), s.getToken() === 4 && se)) break;
      } else if (_e) z(6, [], []);
      if (Se) (a.push(0), (Se = !1));
      else a[a.length - 1]++;
      if (!Ht()) z(4, [], [4, 5]);
      _e = !0;
    }
    if ((C(), !Se)) a.pop();
    if (s.getToken() !== 4) z(8, [4], []);
    else ae();
    return !0;
  }
  function Ht() {
    switch (s.getToken()) {
      case 3:
        return Lt();
      case 1:
        return Te();
      case 10:
        return Ae(!0);
      default:
        return le();
    }
  }
  if ((ae(), s.getToken() === 17)) {
    if (r.allowEmptyContent) return !0;
    return (z(4, [], []), !1);
  }
  if (!Ht()) return (z(4, [], []), !1);
  if (s.getToken() !== 17) z(9, [], []);
  return !0;
}