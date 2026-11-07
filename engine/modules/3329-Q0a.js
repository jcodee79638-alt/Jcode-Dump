
function Q0a(e, t) {
  switch (o0r(e.ast, t)._tag) {
    case "Json":
      return wj(e);
    case "FormUrlEncoded":
      return D1e(e);
    case "Text":
    case "Uint8Array":
    case "Multipart":
      return e;
  }
}