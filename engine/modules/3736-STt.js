
function STt(e) {
  if (typeof e == "function")
    throw TypeError(
      "`config` must be an object, got a function instead. Did you mean `createParser({onEvent: fn})`?",
    );
  let { onEvent: t = BIr, onError: r = BIr, onRetry: s = BIr, onComment: a, maxBufferSize: H } = e,
    u = [],
    f = 0,
    d = !0,
    _,
    L = "",
    I = 0,
    D,
    S = !1;
  function T(se) {
    if (S)
      throw Error(
        "Cannot feed parser: it was terminated after exceeding the configured max buffer size. Call `reset()` to resume parsing.",
      );
    if (
      (d &&
        ((d = !1),
        se.charCodeAt(0) === 239 &&
          se.charCodeAt(1) === 187 &&
          se.charCodeAt(2) === 191 &&
          (se = se.slice(3))),
      u.length === 0)
    ) {
      let Ae = O(se);
      (Ae !== "" && (u.push(Ae), (f = Ae.length)), C());
      return;
    }
    if (
      se.indexOf(`
`) === -1 &&
      se.indexOf("\r") === -1
    ) {
      (u.push(se), (f += se.length), C());
      return;
    }
    u.push(se);
    let ae = u.join("");
    ((u.length = 0), (f = 0));
    let z = O(ae);
    (z !== "" && (u.push(z), (f = z.length)), C());
  }
  function C() {
    H !== void 0 &&
      (f + L.length <= H ||
        ((S = !0),
        (u.length = 0),
        (f = 0),
        (_ = void 0),
        (L = ""),
        (I = 0),
        (D = void 0),
        r(
          new xTt(`Buffered data exceeded max buffer size of ${H} characters`, {
            type: "max-buffer-size-exceeded",
          }),
        )));
  }
  function O(se) {
    let ae = 0;
    if (se.indexOf("\r") === -1) {
      let z = se.indexOf(
        `
`,
        ae,
      );
      for (; z !== -1;) {
        if (ae === z) {
          (I > 0 && t({ id: _, event: D, data: L }),
            (_ = void 0),
            (L = ""),
            (I = 0),
            (D = void 0),
            (ae = z + 1),
            (z = se.indexOf(
              `
`,
              ae,
            )));
          continue;
        }
        let Ae = se.charCodeAt(ae);
        if (mwi(se, ae, Ae)) {
          let le = se.charCodeAt(ae + 5) === vhe ? ae + 6 : ae + 5,
            Be = se.slice(le, z);
          if (I === 0 && se.charCodeAt(z + 1) === dwi) {
            (t({ id: _, event: D, data: Be }),
              (_ = void 0),
              (L = ""),
              (D = void 0),
              (ae = z + 2),
              (z = se.indexOf(
                `
`,
                ae,
              )));
            continue;
          }
          ((L =
            I === 0
              ? Be
              : `${L}
${Be}`),
            I++);
        } else
          _wi(se, ae, Ae)
            ? (D = se.slice(se.charCodeAt(ae + 6) === vhe ? ae + 7 : ae + 6, z) || void 0)
            : B(se, ae, z);
        ((ae = z + 1),
          (z = se.indexOf(
            `
`,
            ae,
          )));
      }
      return se.slice(ae);
    }
    for (; ae < se.length;) {
      let z = se.indexOf("\r", ae),
        Ae = se.indexOf(
          `
`,
          ae,
        ),
        le = -1;
      if (
        (z !== -1 && Ae !== -1
          ? (le = z < Ae ? z : Ae)
          : z !== -1
            ? z === se.length - 1
              ? (le = -1)
              : (le = z)
            : Ae !== -1 && (le = Ae),
        le === -1)
      )
        break;
      (B(se, ae, le), (ae = le + 1), se.charCodeAt(ae - 1) === x1a && se.charCodeAt(ae) === dwi && ae++);
    }
    return se.slice(ae);
  }
  function B(se, ae, z) {
    if (ae === z) {
      q();
      return;
    }
    let Ae = se.charCodeAt(ae);
    if (mwi(se, ae, Ae)) {
      let Se = se.charCodeAt(ae + 5) === vhe ? ae + 6 : ae + 5,
        _e = se.slice(Se, z);
      ((L =
        I === 0
          ? _e
          : `${L}
${_e}`),
        I++);
      return;
    }
    if (_wi(se, ae, Ae)) {
      D = se.slice(se.charCodeAt(ae + 6) === vhe ? ae + 7 : ae + 6, z) || void 0;
      return;
    }
    if (Ae === 105 && se.charCodeAt(ae + 1) === 100 && se.charCodeAt(ae + 2) === 58) {
      let Se = se.slice(se.charCodeAt(ae + 3) === vhe ? ae + 4 : ae + 3, z);
      _ = Se.includes("\x00") ? void 0 : Se;
      return;
    }
    if (Ae === 58) {
      if (a) {
        let Se = se.slice(ae, z);
        a(Se.slice(se.charCodeAt(ae + 1) === vhe ? 2 : 1));
      }
      return;
    }
    let le = se.slice(ae, z),
      Be = le.indexOf(":");
    if (Be === -1) {
      V(le, "", le);
      return;
    }
    let Te = le.slice(0, Be),
      Lt = le.charCodeAt(Be + 1) === vhe ? 2 : 1,
      Ht = le.slice(Be + Lt);
    V(Te, Ht, le);
  }
  function V(se, ae, z) {
    switch (se) {
      case "event":
        D = ae || void 0;
        break;
      case "data":
        ((L =
          I === 0
            ? ae
            : `${L}
${ae}`),
          I++);
        break;
      case "id":
        _ = ae.includes("\x00") ? void 0 : ae;
        break;
      case "retry":
        /^\d+$/.test(ae)
          ? s(parseInt(ae, 10))
          : r(new xTt(`Invalid \`retry\` value: "${ae}"`, { type: "invalid-retry", value: ae, line: z }));
        break;
      default:
        r(
          new xTt(`Unknown field "${se.length > 20 ? `${se.slice(0, 20)}\u2026` : se}"`, {
            type: "unknown-field",
            field: se,
            value: ae,
            line: z,
          }),
        );
        break;
    }
  }
  function q() {
    (I > 0 && t({ id: _, event: D, data: L }), (_ = void 0), (L = ""), (I = 0), (D = void 0));
  }
  function Z(se = {}) {
    if (se.consume && u.length > 0) {
      let ae = u.join("");
      B(ae, 0, ae.length);
    }
    ((d = !0), (_ = void 0), (L = ""), (I = 0), (D = void 0), (u.length = 0), (f = 0), (S = !1));
  }
  return { feed: T, reset: Z };
}