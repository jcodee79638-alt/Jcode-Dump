
function Vi({ html: c, dir: t, className: e }, s) {
  const i = document.createDocumentFragment();
  if (typeof c == "string") {
    const n = document.createElement("p");
    n.dir = t || "auto";
    const r = c.split(/\r\n?|\n/);
    for (let a = 0, o = r.length; a < o; ++a) {
      const l = r[a];
      (n.append(document.createTextNode(l)), a < o - 1 && n.append(document.createElement("br")));
    }
    i.append(n);
  } else ji.render({ xfaHtml: c, div: i, intent: "richText" });
  (i.firstElementChild.classList.add("richText", e), s.append(i));
}