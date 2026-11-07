
function UEa(e, t, r) {
  switch (t._tag) {
    case "Json":
      return (s) => {
        if (s === void 0 || r) return Jt(Rd({ status: e }));
        try {
          let a = JSON.stringify(s);
          return Jt(YQ(a, { status: e, contentType: t.contentType }));
        } catch (a) {
          return bn(new hy(Lo(s), { message: globalThis.String(a) }));
        }
      };
    case "Text":
      return (s) => Jt(YQ(s, { status: e, contentType: t.contentType }));
    case "Uint8Array":
      return (s) => Jt(eer(s, { status: e, contentType: t.contentType }));
    case "FormUrlEncoded":
      return (s) => Jt(jun(s, { status: e }).pipe(nse("content-type", t.contentType)));
  }
}