
function Rtr(e, t, r, s, a, H, u, f, d, _) {
  let L = [],
    I = [],
    D = !1,
    S = e.map(() => `c${d.n++}`),
    T = e.map((C, O) => (_ ? S[O] : `${JSON.stringify(C.key)}: ${S[O]}`));
  L.push(_ ? `let [ ${T.join(", ")} ] = ${t};` : `let { ${T.join(", ")} } = ${t};`);
  for (let [
    C,
    { field: O, key: B, codec: V, isArray: q, selection: Z, arrayDimensions: se },
  ] of e.entries()) {
    let ae = `${r}[${C}]`,
      z = JSON.stringify(B),
      Ae = S[C];
    if (Z) {
      if (a) (L.push(`if (${Ae} !== null) ${Ae} = JSON.parse(${Ae});`), (D = !0));
      else if (H) (L.push(`if (typeof ${Ae} === 'string') ${Ae} = JSON.parse(${Ae});`), (D = !0));
      let Ht = `s${d.n++}`,
        Se = f.length;
      if ((f.push(`const { selection: ${Ht} } = ${ae};`), q)) {
        let _e = `j${d.n++}`,
          we = Rtr(Z, `${Ae}[${_e}]`, Ht, s, !1, H, !0, f, d, !1);
        if (we.hasWork) {
          ((D = !0),
            L.push(`if (${Ae} !== null) {`),
            L.push(`	for (let ${_e} = 0; ${_e} < ${Ae}.length; ++${_e}) {`));
          for (let Pe of we.bodyStmts) L.push(`		${Pe}`);
          (L.push(`		${Ae}[${_e}] = ${we.literal};`), L.push("\t}"), L.push("}"));
        } else f.splice(Se, 1);
      } else {
        let _e = Rtr(Z, Ae, Ht, s, !1, H, !0, f, d, !1);
        if (_e.hasWork) {
          ((D = !0), L.push(`if (${Ae} !== null) {`));
          for (let we of _e.bodyStmts) L.push(`	${we}`);
          (L.push(`	${Ae} = ${_e.literal};`), L.push("}"));
        } else f.splice(Se, 1);
      }
      I.push(`${z}: ${Ae}`);
      continue;
    }
    let le = "",
      Be = "",
      Te = !1;
    if (vi(O, Kl)) {
      if (u && O.mapFromJsonValue) {
        Te = !0;
        let Ht = d.n++;
        ((Be = `field: dec${Ht}`), (le = `dec${Ht}.mapFromJsonValue`));
      } else if (!O.mapFromDriverValue.isNoop) {
        let Ht = d.n++;
        ((Be = `field: dec${Ht}`), (le = `dec${Ht}.mapFromDriverValue`));
      }
    } else if (vi(O, pH)) {
      if (!O.decoder.mapFromDriverValue.isNoop) {
        let Ht = d.n++;
        ((Be = `field: { decoder: dec${Ht} }`), (le = `dec${Ht}.mapFromDriverValue`));
      }
    } else if (vi(O, pH.Aliased)) {
      if (!O.sql.decoder.mapFromDriverValue.isNoop) {
        let Ht = d.n++;
        ((Be = `field: { sql: { decoder: dec${Ht} } }`), (le = `dec${Ht}.mapFromDriverValue`));
      }
    } else if (vi(O, TH) || vi(O, xy));
    else if (!O.getSQL().decoder.mapFromDriverValue.isNoop) {
      let Ht = d.n++;
      (f.push(`const dec${Ht} = ${ae}.field.getSQL().decoder;`), (le = `dec${Ht}.mapFromDriverValue`));
    }
    let Lt = "";
    if (!Te && V) Lt = `codec${d.n++}`;
    if (Be || Lt) {
      let Ht = [];
      if (Be) Ht.push(Be);
      if (Lt) Ht.push(`codec: ${Lt}`);
      f.push(`const { ${Ht.join(", ")} } = ${ae};`);
    }
    if (s) {
      if (((D = !0), L.push(`${Ae} = mapColumnValue(${Ae});`), le || Lt)) {
        let Ht = Ae;
        if (Lt) Ht = `${Lt}(${Ht}, ${se})`;
        if (le) Ht = `${le}(${Ht})`;
        L.push(`if (${Ae} !== null) ${Ae} = ${Ht};`);
      }
      I.push(`${z}: ${Ae}`);
    } else if (le || Lt) {
      D = !0;
      let Ht = Ae;
      if (Lt) Ht = `${Lt}(${Ht}, ${se})`;
      if (le) Ht = `${le}(${Ht})`;
      I.push(`${z}: ${Ae} === null ? null : ${Ht}`);
    } else I.push(`${z}: ${Ae}`);
  }
  return { bodyStmts: L, literal: `{ ${I.join(", ")} }`, hasWork: D };
}