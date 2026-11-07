
function SaH(e) {
  return Km([e.http.closeAll, e.websockets.closeAll], { concurrency: "unbounded", discard: !0 });
}