
function Oga(e) {
  var t = e.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);
  return {
    leading: t[1],
    leadingAscii: t[2],
    leadingNonAscii: t[3],
    trailing: t[4],
    trailingNonAscii: t[5],
    trailingAscii: t[6],
  };
}