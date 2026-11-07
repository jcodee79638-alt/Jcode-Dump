
function o0a(e) {
  let t = new Gxt({
    headingStyle: "atx",
    hr: "---",
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
    emDelimiter: "*",
  });
  return (t.remove(["script", "style", "meta", "link"]), t.turndown(e));
}