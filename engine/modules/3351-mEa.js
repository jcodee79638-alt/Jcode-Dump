
function mEa(e, t, r) {
  let s = j1e(t.method),
    a = s ? $Ea(t) : "application/x-www-form-urlencoded",
    H = e.get(a);
  if (!H) return YQ(`Unsupported content-type: ${a}`, { status: 415 });
  let { _tag: u, decode: f } = H;
  switch (u) {
    case "Multipart": {
      if (H.mode === "buffered") {
        let _ = on(t.multipart);
        if (H.limits) _ = m1(_, her(H.limits));
        return Hi(_, f);
      }
      return Jt(H.limits ? QBe(t.multipartStream, her(H.limits)) : t.multipartStream);
    }
    case "Json":
      let d = on(
        Hi(t.text, (_) => {
          if (_ === "") return H.nullOnEmpty ? Jt(null) : Usn;
          return Jt(JSON.parse(_));
        }),
      );
      return Hi(d, f);
    case "Text":
      return Hi(on(t.text), f);
    case "FormUrlEncoded": {
      let _ = s ? Vn(on(t.urlParamsBody), uun) : Jt(r);
      return Hi(_, f);
    }
    case "Uint8Array":
      return Hi(
        Vn(on(t.arrayBuffer), (_) => new Uint8Array(_)),
        f,
      );
  }
}