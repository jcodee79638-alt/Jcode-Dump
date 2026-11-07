
function wPt(e) {
  let t = [];
  for (let r of e.output) {
    if (r.type !== "message") continue;
    for (let s of r.content) if (s.type === "output_text") t.push(s.text);
  }
  e.output_text = t.join("");
}