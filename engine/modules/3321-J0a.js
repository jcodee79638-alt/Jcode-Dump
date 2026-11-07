
function J0a(e, t) {
  let r = new Map();
  for (let s of e)
    if (vN(s)) {
      K0a(s, t);
      let a = vbe(s),
        H = bSi(r, a);
      if (H.stream !== void 0) throw Error(`Multiple streaming success responses for status: ${a}`);
      if (H.noContent)
        throw Error(`Cannot combine no-content and streaming success responses for status: ${a}`);
      if (H.bufferedContentTypes.has(Qxt(s.contentType)))
        throw Error(
          `Cannot combine buffered and streaming success responses for status ${a} and content-type: ${s.contentType}`,
        );
      r.set(a, { ...H, stream: s });
    } else {
      let a = PZ(s.ast),
        H = bSi(r, a),
        u = lhe(s.ast);
      if (H.stream !== void 0) {
        if (u) throw Error(`Cannot combine no-content and streaming success responses for status: ${a}`);
        let f = sHe(s.ast);
        if (Qxt(f.contentType) === Qxt(H.stream.contentType))
          throw Error(
            `Cannot combine buffered and streaming success responses for status ${a} and content-type: ${f.contentType}`,
          );
      }
      if (!u) H.bufferedContentTypes.add(Qxt(sHe(s.ast).contentType));
      H.noContent = H.noContent || u;
    }
}