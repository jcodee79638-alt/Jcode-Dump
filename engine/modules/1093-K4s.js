
function K4s(e) {
  return (e.replace(/['\u2019]/g, "").match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? []).reduce(
    (t, r, s) => t + (s === 0 ? r.toLowerCase() : `${r[0].toUpperCase()}${r.slice(1)}`),
    "",
  );
}