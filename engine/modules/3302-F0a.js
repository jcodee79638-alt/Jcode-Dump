
function F0a(e) {
  switch (e) {
    case "Multipart":
      return "multipart/form-data";
    case "Json":
      return "application/json";
    case "FormUrlEncoded":
      return "application/x-www-form-urlencoded";
    case "Uint8Array":
      return "application/octet-stream";
    case "Text":
      return "text/plain";
  }
}