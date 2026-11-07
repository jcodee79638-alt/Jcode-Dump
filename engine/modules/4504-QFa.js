
function QFa(e) {
  return /can't resolve reference|resolves to more than one schema|outputSchema|schema.*reference|reference.*schema/i.test(
    e.message,
  );
}