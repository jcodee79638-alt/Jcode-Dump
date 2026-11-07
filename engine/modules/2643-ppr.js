
var ppr = Ie(function (_oi) {
  Object.defineProperty(_oi, "__esModule", { value: !0 });
  _oi.escapeHtml = UIt;
  _oi.spanAllZeroes = doi;
  _oi.spanAll = Z7o;
  _oi.spanLeadingZeroes = e4o;
  _oi.simpleGroup = t4o;
  function UIt(e) {
    return e
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
  function doi(e) {
    return UIt(e).replace(/(0+)/g, '<span class="zero">$1</span>');
  }
  function Z7o(e, t = 0) {
    return e
      .split("")
      .map((s, a) => `<span class="digit value-${UIt(s)} position-${a + t}">${doi(s)}</span>`)
      .join("");
  }
  function moi(e) {
    return UIt(e).replace(/^(0+)/, '<span class="zero">$1</span>');
  }
  function e4o(e) {
    return e
      .split(":")
      .map((r) => moi(r))
      .join(":");
  }
  function t4o(e, t = 0) {
    return e.split(":").map((s, a) => {
      if (/group-v4/.test(s)) return s;
      return `<span class="hover-group group-${a + t}">${moi(s)}</span>`;
    });
  }
});