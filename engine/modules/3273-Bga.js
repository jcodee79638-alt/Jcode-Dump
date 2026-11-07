
function Bga(e) {
  var t = this.rules.forNode(e),
    r = nSi.call(this, e),
    s = e.flankingWhitespace;
  if (s.leading || s.trailing) r = r.trim();
  return s.leading + t.replacement(r, e, this.options) + s.trailing;
}