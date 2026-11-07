
function mwi(e, t, r) {
  return (
    r === 100 &&
    e.charCodeAt(t + 1) === 97 &&
    e.charCodeAt(t + 2) === 116 &&
    e.charCodeAt(t + 3) === 97 &&
    e.charCodeAt(t + 4) === 58
  );
}