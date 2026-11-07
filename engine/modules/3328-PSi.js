
function PSi(e) {
  switch (sHe(e.ast)._tag) {
    case "Json":
      return wj(e);
    case "FormUrlEncoded":
      return D1e(e);
    case "Text":
    case "Uint8Array":
      return e;
  }
}