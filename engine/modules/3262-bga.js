
function bga(e, t) {
  var r;
  if (typeof e === "string") {
    var s = jga().parseFromString('<x-turndown id="turndown-root">' + e + "</x-turndown>", "text/html");
    r = s.getElementById("turndown-root");
  } else r = e.cloneNode(!0);
  return (xga({ element: r, isBlock: Kgr, isVoid: Yxi, isPre: t.preformattedCode ? Pga : null }), r);
}