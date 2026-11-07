
function Ze(e) {
  if (Je === null) return e();
  const n = Je;
  Je = null;
  try {
    return e();
  } finally {
    Je = n;
  }
}