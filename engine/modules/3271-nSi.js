
function nSi(e) {
  var t = this;
  return Uga.call(
    e.childNodes,
    function (r, s) {
      s = new Cga(s, t.options);
      var a = "";
      if (s.nodeType === 3) a = s.isCode ? s.nodeValue : t.escape(s.nodeValue);
      else if (s.nodeType === 1) a = Bga.call(t, s);
      return iSi(r, a);
    },
    "",
  );
}