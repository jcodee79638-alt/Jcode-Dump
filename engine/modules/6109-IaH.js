
function IaH(e) {
  if (e.port !== 0) return Bwr(e, e.port);
  return Bwr(e, 4096).pipe($s(() => Bwr(e, 0)));
}