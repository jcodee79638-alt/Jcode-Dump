
function Ei(c) {
  return rr(c)
    ? c
    : `"${c.replaceAll(/["\\\p{Cc}]/gu, (e) => (e === '"' || e === "\\" ? `\\${e}` : `\\${e.codePointAt(0).toString(16)} `))}"`;
}