
function f3i(e) {
  let t = URL.canParse(e) ? new URL(e) : void 0;
  if (!t || (t.protocol !== "http:" && t.protocol !== "https:"))
    return Promise.reject(Error(`Only http and https links can be opened in the browser: ${e}`));
  return u3i(t.href);
}