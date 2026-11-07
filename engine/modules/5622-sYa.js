
function sYa(e, t, r) {
  let s = (Array.isArray(r.contents) ? r.contents : [r.contents]).filter(ux),
    a = [],
    H = [];
  for (let u of s) {
    let f = typeof u.uri === "string" ? u.uri : t,
      d = typeof u.mimeType === "string" ? u.mimeType : "application/octet-stream";
    if (typeof u.text === "string") {
      a.push(`Resource: ${f}
MIME: ${d}
${u.text}`);
      continue;
    }
    if (typeof u.blob === "string") {
      let _ = oQi(u.blob);
      if (!iQi.has(d)) {
        a.push(`[Binary MCP resource omitted: ${f} (${d}, ${gwe(_)}) is not a supported attachment type]`);
        continue;
      }
      if (_ > awt) {
        a.push(`[Binary MCP resource omitted: ${f} (${d}, ${gwe(_)}) exceeds ${gwe(awt)}]`);
        continue;
      }
      (a.push(`[Binary MCP resource attached: ${f} (${d})]`),
        H.push({ type: "file", mime: d, url: `data:${d};base64,${u.blob}`, filename: f }));
      continue;
    }
    a.push(`[MCP resource content without text or blob: ${f}]`);
  }
  return {
    contents: s.length,
    attachments: H,
    text:
      a.join(`

`) || `MCP resource ${t} from ${e} returned no contents.`,
  };
}