
function JSi(e, t, r) {
  let s = new Map();
  return (e.forEach(a), s);
  function a(d) {
    if (vN(d)) {
      f(d);
      return;
    }
    let _ = d.ast,
      L = t(_);
    if (lhe(_)) H(L, r(d.ast) ?? "<No Content>");
    else u(d, L, sHe(_));
  }
  function H(d, _) {
    let L = s.get(d);
    if (L === void 0) s.set(d, { descriptions: new Set([_]), content: void 0, streamContent: void 0 });
    else if (_ !== void 0) L.descriptions.add(_);
  }
  function u(d, _, L) {
    let I = r(d.ast),
      D = s.get(_),
      { _tag: S, contentType: T } = L;
    if (D === void 0)
      s.set(_, {
        descriptions: new Set(I !== void 0 ? [I] : []),
        content: new Map([[S, new Map([[T, new Set([d])]])]]),
        streamContent: void 0,
      });
    else {
      if (I !== void 0) D.descriptions.add(I);
      if (D.content === void 0) D.content = new Map([[S, new Map([[T, new Set([d])]])]]);
      else {
        let C = D.content.get(S);
        if (C === void 0) D.content.set(S, new Map([[T, new Set([d])]]));
        else {
          let O = C.get(T);
          if (O === void 0) C.set(T, new Set([d]));
          else O.add(d);
        }
      }
    }
  }
  function f(d) {
    let _ = vbe(d),
      L = s.get(_);
    if (L === void 0)
      s.set(_, { descriptions: new Set(), content: void 0, streamContent: new Map([[d.contentType, d]]) });
    else if (L.streamContent === void 0) L.streamContent = new Map([[d.contentType, d]]);
    else L.streamContent.set(d.contentType, d);
  }
}