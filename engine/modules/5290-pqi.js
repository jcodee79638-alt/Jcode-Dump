
function pqi(e) {
  if (e.length <= lqi) return e;
  return (
    `...

` + e.slice(-lqi)
  );
}