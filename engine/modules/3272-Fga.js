
function Fga(e) {
  var t = this;
  return (
    this.rules.forEach(function (r) {
      if (typeof r.append === "function") e = iSi(e, r.append(t.options));
    }),
    e.replace(/^[\t\r\n]+/, "").replace(/[\t\r\n\s]+$/, "")
  );
}