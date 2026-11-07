
function sa(e) {
  const n = Pe(e),
    i = Pe(() => xr(n()));
  return (
    (i.toArray = () => {
      const s = i();
      return Array.isArray(s) ? s : s != null ? [s] : [];
    }),
    i
  );
}