
function Ebi(e) {
  let t = ["Z"];
  if (e.offset) t.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  let r = `${HEr({ precision: e.precision, seconds: !0 })}(?:${t.join("|")})`,
    s = e.local ? `${r}|${HEr({ precision: e.precision })}` : r;
  return new RegExp(`^${Lbi}T(?:${s})$`);
}