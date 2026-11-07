
function ii(e) {
  const n = Ei(e);
  if (
    !n ||
    typeof n != "object" ||
    Array.isArray(n) ||
    Object.entries(n).some(([i, s]) => i.length > 200 || typeof s != "string") ||
    Object.keys(n).length > 64
  )
    throw new Error('Enter a JSON object with string values, such as {"KEY": "value"}.');
  return n;
}