
function qQa(e) {
  let t = GQa(),
    r = (t && (t.crypto || t.msCrypto)) || (typeof iwt < "u" ? iwt : null);
  if (typeof r?.getRandomValues === "function")
    return () => {
      let s = new Uint8Array(1);
      return (r.getRandomValues(s), s[0] / 255);
    };
  else if (typeof r?.randomBytes === "function") return () => r.randomBytes(1).readUInt8() / 255;
  else if (iwt?.randomBytes) return () => iwt.randomBytes(1).readUInt8() / 255;
  throw new $we(u$e.PRNGDetectFailure, "Failed to find a reliable PRNG");
}