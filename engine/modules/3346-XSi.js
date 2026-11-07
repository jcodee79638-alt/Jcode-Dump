
function XSi(e, t) {
  switch (t) {
    case "Uint8Array":
      return zSi.ast;
    case "Text":
      return re.ast;
    case "FormUrlEncoded":
    case "Json":
      return e;
    case "Multipart":
      return QSi(e);
  }
}